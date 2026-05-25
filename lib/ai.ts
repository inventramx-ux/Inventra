import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export interface OptimizationResult {
  title: string;
  description: string;
  suggestedPrice: string;
  hashtags: string[];
  modelUsed?: string;
  optimizationState?: string;
}

export async function optimizePublication(
  name: string,
  platform: string,
  data: any,
  enabledFields: Record<string, boolean> = {},
  style: string = "Profesional",
  isPro: boolean = false,
  length: string = "medium",
  locale: string = "es"
): Promise<OptimizationResult> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "tu_llave_aqui") {
    throw new Error("Falta la GROQ_API_KEY en las variables de entorno.");
  }

  const modelsToTry = [
    "llama-3.3-70b-versatile",
    "llama-3.1-70b-versatile",
    "llama3-70b-8192",
    "mixtral-8x7b-32768"
  ];

  // Filtrar solo los datos habilitados
  const getVal = (field: string, val: any) => enabledFields[field] ? val : "No incluir";

  let lengthInstruction = "";
  if (length === "short") {
    lengthInstruction = "IMPORTANTE: La descripción debe ser MUY CORTA y DIRECTA (1 o 2 párrafos breves máximo).";
  } else if (length === "long") {
    lengthInstruction = "IMPORTANTE: La descripción debe ser DETALLADA y LARGA (3 o 4 párrafos), enfatizando todas las características y beneficios a profundidad.";
  } else {
    lengthInstruction = "IMPORTANTE: La descripción debe tener una longitud MEDIA (2 o 3 párrafos), concisa pero informativa sobre los beneficios clave.";
  }

  // Build the prompt - include image reference if available
  let imageContext = '';
  if (data.imageUrl && typeof data.imageUrl === 'string') {
    // Include image reference in the prompt
    imageContext = '\n\nIMAGE PROVIDED: An image of the product has been provided. Analyze it carefully for condition, features, and visible details.';
  }

  const textPrompt = `
You are an expert vehicle and product appraiser with deep knowledge of current market prices and e-commerce optimization.

Analyze the provided information carefully and identify exactly what you see — the specific make, model, year, trim level, condition, and any visible modifications or features.${imageContext}

YOUR TASKS:
1. PRICE ESTIMATION: Based on the product details and any visible information, provide a realistic current market price in USD.
   - Identify the specific item (not a generic guess)
   - Consider current US market conditions
   - Account for visible condition from the product information
   - Factor in any special features, trim levels, or modifications mentioned
   - Return ONLY the numeric price (no symbols, no commas, no text) for the "suggestedPrice" field
   - Examples: "225000" for a 2019 Ferrari 488 GTB in good condition; "12000" for a 2015 Honda Civic in average condition
   - Be accurate. Do not return placeholder values like 10 or 100
   - Do not return absurdly high values like 10000000 unless the item genuinely warrants it

2. MARKETING CONTENT: Generate optimized content for the platform: "${platform}"

PRODUCT DATA:
- Name: "${name}"
- Description: "${getVal('description', data.description)}"
- Tags SEO: "${getVal('tags', data.tags)}"
- Condition: "${getVal('condition', data.condition)}"
- Brand: "${getVal('brand', data.brand)}"
- Model: "${getVal('model', data.model)}"
- Category: "${getVal('category', data.category)}"
- Free Shipping: "${getVal('shipping', data.shipping === 'free' ? 'Yes' : 'No')}"
- Warranty: "${getVal('warranty', data.warranty)}"
- Stock: "${getVal('stock', data.stock)}"

CRITICAL INSTRUCTIONS:
0. OUTPUT LANGUAGE: All response text (title, description, etc.) MUST be strictly in ${locale === 'es' ? 'Spanish' : 'English'}.
1. If a field says "No incluir", DO NOT mention that data in the optimization.
2. Use the "Tags SEO" to incorporate those keywords naturally in the description and title.
3. Title: Maximize clicks and SEO specific to ${platform}.
4. Description: ${lengthInstruction} Avoid long introductions or excessive filler text. Use bullet points for benefits.
   IMPORTANT: Use Markdown format in the description. Use **bold** to highlight keywords. Use hyphens (-) for bullet lists. NO other format types. Description MUST be very clear and easy to read.
5. Return ONLY a JSON object (no markdown code blocks, just the JSON text):
{
  "title": "optimized title",
  "description": "optimized description with markdown format",
  "suggestedPrice": "numeric value only (ej: 225000)",
  "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5"]${isPro ? ',\n  "optimizationState": "Optimization state (ej. Excellent, Analyzed)"' : ''}
}
`;

  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`Intentando optimización con modelo Groq: ${modelName}`);
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: textPrompt }],
        model: modelName,
        response_format: { type: "json_object" },
      });

      const text = chatCompletion.choices[0]?.message?.content || "";
      if (!text) throw new Error("La IA no devolvió contenido.");

      const parsed = JSON.parse(text);
      return {
        ...parsed,
        modelUsed: modelName
      } as OptimizationResult;
    } catch (error: any) {
      console.error(`Error con modelo Groq ${modelName}:`, error.message);
      lastError = error;

      // Manejar errores de cuota o límites de tokens
      if (error.status === 429) {
        continue; // Intentar con el siguiente modelo
      }

      // Si el error es de autenticación
      if (error.status === 401) {
        throw new Error("Tu API KEY de Groq es inválida.");
      }

      // Si no es un error que queramos ignorar para el fallback
      if (error.status !== 404 && error.status !== 429) {
        throw new Error(error.message || "Error al comunicarse con Groq.");
      }
    }
  }

  throw new Error(lastError?.message || "No se pudo encontrar un modelo de Groq disponible.");
}
