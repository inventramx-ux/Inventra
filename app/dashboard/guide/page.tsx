'use client';

import { useState } from 'react';
import {
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Image,
  FileText,
  DollarSign,
  Zap,
  Camera,
  Edit3
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface Section {
  title: string;
  description: string;
  icon: React.ReactNode;
  steps: {
    title: string;
    description: string;
    tips: string[];
  }[];
  examples?: {
    good: string;
    bad: string;
  };
}

export default function GuidePage() {
  const t = useTranslations('guide');
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  const sections: Section[] = [
    {
      title: 'Captura de Imagen de Calidad',
      description: 'La imagen es lo más importante. Una buena foto atrae más compradores.',
      icon: <Camera className="w-6 h-6" />,
      steps: [
        {
          title: 'Iluminación Perfecta',
          description: 'Utiliza luz natural o iluminación clara para que el producto se vea bien.',
          tips: [
            'Fotografía durante el día junto a una ventana',
            'Evita sombras y contraluz excesivo',
            'Si es de noche, usa luces blancas/LED',
            'Evita luz amarillenta que distorsiona colores'
          ]
        },
        {
          title: 'Fondo Limpio',
          description: 'Un fondo simple hace que el producto destaque.',
          tips: [
            'Usa fondo blanco, gris o neutro',
            'Puedes usar nuestro removedor de fondo en "Optimización de Imágenes"',
            'Evita fondos desordenados o colores que compitan',
            'El producto debe ser el protagonista'
          ]
        },
        {
          title: 'Ángulos Estratégicos',
          description: 'Muestra el producto desde sus mejores ángulos.',
          tips: [
            'Fotografía de frente para primera imagen',
            'Incluye detalles importantes (logo, estado, etc.)',
            'Para ropa: muestra cuelga la prenda',
            'Para electrónica: muestra pantalla, botones, conectores'
          ]
        },
        {
          title: 'Resolución Alta',
          description: 'Imágenes claras y nítidas generan más confianza.',
          tips: [
            'Mínimo 800x800 píxeles',
            'Usa nuestro upscaler si tus fotos son pequeñas',
            'Evita imágenes borrosas o pixeladas',
            'Formato: JPG, PNG o WEBP'
          ]
        }
      ],
      examples: {
        good: 'Foto clara con iluminación natural, fondo blanco, producto nítido y bien enfocado',
        bad: 'Foto borrosa, fondo desordenado, iluminación deficiente, producto pequeño en la imagen'
      }
    },
    {
      title: 'Datos del Producto Precisos',
      description: 'Información correcta aumenta la visibilidad y confianza del comprador.',
      icon: <FileText className="w-6 h-6" />,
      steps: [
        {
          title: 'Marca y Modelo',
          description: 'Sé específico con la marca y modelo exacto.',
          tips: [
            'Escribe la marca oficial (no "Samung" sino "Samsung")',
            'Incluye el modelo exacto (ej: iPhone 15 Pro Max)',
            'Agrega año de fabricación si aplica',
            'Evita abreviaciones confusas'
          ]
        },
        {
          title: 'Condición del Producto',
          description: 'Indica si es nuevo, usado, refurbished, etc.',
          tips: [
            '"Nuevo" = nunca usado, empaque original',
            '"Usado/Como nuevo" = sin defectos visibles',
            '"Usado/Bien" = funciona perfectamente, mínimo desgaste',
            'Sé honesto: aumenta ventas y reduce devoluciones'
          ]
        },
        {
          title: 'Categoría Correcta',
          description: 'Clasifica tu producto en la categoría adecuada.',
          tips: [
            'Elige la categoría más específica posible',
            'No fuerces producto a categoría incorrecta',
            'Ejemplo: Audi A4 en "Autos > Sedanes" no en "Accesorios"',
            'Mejor categoría = mejor visibilidad'
          ]
        },
        {
          title: 'Stock Real',
          description: 'Indica cantidad disponible correctamente.',
          tips: [
            'Actualiza el stock después de cada venta',
            'Stock 0 = no aparece en búsquedas',
            'Stock alto = más confianza si es legítimo',
            'Evita mentir sobre disponibilidad'
          ]
        }
      ]
    },
    {
      title: 'Descripción Ganadora',
      description: 'Una descripción clara y convincente vende más rápido.',
      icon: <Edit3 className="w-6 h-6" />,
      steps: [
        {
          title: 'Estructura Efectiva',
          description: 'Organiza la información de forma clara.',
          tips: [
            'Párrafo 1: ¿Qué es? (Identificación clara)',
            'Párrafo 2: ¿Por qué es bueno? (Beneficios)',
            'Párrafo 3: ¿Cuál es el estado? (Condición)',
            'Usa viñetas para características principales'
          ]
        },
        {
          title: 'Palabras Clave (SEO)',
          description: 'Usa términos que los compradores buscan.',
          tips: [
            'Incluye marca, modelo y características',
            'Piensa: ¿cómo lo buscaría un comprador?',
            'Ejemplo: No "auto" sino "Audi A4 2018 sedan gasolina"',
            'Repite términos clave sin sonar spam'
          ]
        },
        {
          title: 'Resalta Beneficios',
          description: 'Explica el valor, no solo características.',
          tips: [
            'No solo "Pantalla 4K" sino "Pantalla 4K para películas en HD sin publicidad"',
            'Beneficio = cómo mejora la vida del comprador',
            'Destaca con **negritas** las cosas importantes',
            'Convierte características en ventajas'
          ]
        },
        {
          title: 'Honestidad Total',
          description: 'Menciona cualquier defecto o limitación.',
          tips: [
            'Pequeño rasguño? Menciónalo',
            'Batería al 90%? Dilo',
            'Sin estuche original? Especifica',
            'Honestidad = menos devoluciones y mejor reputación'
          ]
        }
      ],
      examples: {
        good: 'iPhone 15 Pro Max 256GB. Nuevo sin abrir. Garantía apple 1 año. Cámara profesional, procesador A17. Perfecto para fotografía.',
        bad: 'iphone muy bueno precio bajo unico duenio'
      }
    },
    {
      title: 'Precio Realista y Competitivo',
      description: 'El precio correcto genera ventas rápidas.',
      icon: <DollarSign className="w-6 h-6" />,
      steps: [
        {
          title: 'Investiga el Mercado',
          description: 'Mira precios de productos similares.',
          tips: [
            'Busca el mismo producto en la plataforma',
            'Anota precios de 5-10 productos similares',
            'Considera: condición, incluye accesorios, garantía',
            'Precio = promedio - 5-10% para vender rápido'
          ]
        },
        {
          title: 'Usa la IA para Estimar',
          description: 'Nuestra IA analiza imágenes para sugerir precio.',
          tips: [
            'Sube una foto clara de tu producto',
            'La IA considerará: marca, modelo, condición',
            'Compara sugerencia con tu investigación',
            'Ajusta según demanda local'
          ]
        },
        {
          title: 'Ajustes Estratégicos',
          description: 'Modifica precio según situación.',
          tips: [
            'Incluye accesorios = sube precio 5-15%',
            'Garantía extra = sube precio 10-20%',
            'Envío gratis = sube 3-5% sobre precio base',
            'Nuevo en caja = sube 20-30% vs usado'
          ]
        },
        {
          title: 'Promociones',
          description: 'Atrae compradores con ofertas.',
          tips: [
            'Precio inicial alto, después rebaja = genera FOMO',
            'Descuento por compra múltiple',
            '"Precio flexible" si aceptas negociación',
            '3-5% descuento = vende 30% más rápido'
          ]
        }
      ]
    },
    {
      title: 'Optimización con IA (Paso Final)',
      description: 'Deja que la IA perfeccione tu publicación.',
      icon: <Zap className="w-6 h-6" />,
      steps: [
        {
          title: 'Completa Todos los Datos',
          description: 'Cuanta más información, mejor resultado.',
          tips: [
            'Llena marca, modelo, condición, categoría',
            'Agrega descripción base (aunque sea corta)',
            'Indica si hay envío gratis',
            'Especifica si hay garantía'
          ]
        },
        {
          title: 'Sube Imagen Clara',
          description: 'La IA analiza la imagen para estimar precio.',
          tips: [
            'Imagen frontal, bien iluminada',
            'Producto visible y nítido',
            'Sin personas ni manos (solo el producto)',
            'Fondo simple para mejor análisis'
          ]
        },
        {
          title: 'Presiona Optimizar',
          description: 'Deja que la IA haga la magia.',
          tips: [
            'La IA generará: título, descripción, precio, hashtags',
            'Toma 10-30 segundos',
            'Puedes editar resultados si lo necesitas',
            'Usa la sugerencia como base para mejorar'
          ]
        },
        {
          title: 'Revisa y Publica',
          description: 'Verifica antes de publicar en tu plataforma.',
          tips: [
            'Lee el título: ¿es atractivo? ¿tiene info clave?',
            'Revisión descripción: ¿venderías esto así?',
            'Verifica precio: ¿es competitivo?',
            'Copia y publica en tu plataforma'
          ]
        }
      ]
    },
    {
      title: 'Plataformas Recomendadas',
      description: 'Dónde publicar para máximo alcance.',
      icon: <FileText className="w-6 h-6" />,
      steps: [
        {
          title: 'Mercado Libre',
          description: 'La plataforma #1 en Latinoamérica.',
          tips: [
            'Mayor audiencia de compradores',
            'Mejor para volumen de ventas',
            'Usa nuestras palabras clave optimizadas',
            'Foto principal es crítica'
          ]
        },
        {
          title: 'Facebook Marketplace',
          description: 'Comprador local, transacción rápida.',
          tips: [
            'Audiencia local de tu área',
            'Venta más rápida (24-48h)',
            'Menos competencia para productos específicos',
            'Ideal para artículos grandes/locales'
          ]
        },
        {
          title: 'Etsy',
          description: 'Para handmade, vintage y artesanía.',
          tips: [
            'Audiencia global con presupuesto',
            'Mejor para productos únicos',
            'Buscan calidad, no precio bajo',
            'Envío internacional'
          ]
        },
        {
          title: 'Amazon / Shopify',
          description: 'Para vendedores con inventario.',
          tips: [
            'Mejor si tienes múltiples unidades',
            'Requiere mayor inversión inicial',
            'Audiencia masiva pero más competencia',
            'Mejor para marcas establecidas'
          ]
        }
      ]
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-3">Manual de Uso Inventra</h1>
        <p className="text-gray-400 text-lg">
          Guía completa para crear publicaciones que vendan. Sigue estos pasos para obtener los mejores resultados.
        </p>
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-emerald-400 mb-1">Buena Foto</h3>
              <p className="text-sm text-gray-400">= 50% de éxito en ventas</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-400 mb-1">Datos Precisos</h3>
              <p className="text-sm text-gray-400">= Menos devolviones</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-amber-400 mb-1">Precio Correcto</h3>
              <p className="text-sm text-gray-400">= Venta rápida</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
          >
            {/* Header */}
            <button
              onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
              className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                  <p className="text-sm text-gray-400 mt-1">{section.description}</p>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedSection === idx ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Content */}
            {expandedSection === idx && (
              <div className="border-t border-white/10 p-6 space-y-6">
                {/* Steps */}
                <div className="space-y-4">
                  {section.steps.map((step, stepIdx) => (
                    <div key={stepIdx} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold text-white flex-shrink-0">
                          {stepIdx + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{step.title}</h4>
                          <p className="text-sm text-gray-400">{step.description}</p>
                        </div>
                      </div>

                      {/* Tips */}
                      <div className="ml-11 space-y-2">
                        {step.tips.map((tip, tipIdx) => (
                          <div key={tipIdx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                            <p className="text-sm text-gray-300">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Examples */}
                {section.examples && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/10">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <h5 className="font-semibold text-emerald-400">Bien Hecho ✓</h5>
                      </div>
                      <p className="text-sm text-gray-300">{section.examples.good}</p>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <h5 className="font-semibold text-red-400">Evitar ✗</h5>
                      </div>
                      <p className="text-sm text-gray-300">{section.examples.bad}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pro Tips Section */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-white/10 rounded-xl p-8 mt-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-400" />
          Tips Pro para Superar la Competencia
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-white">📸 Fotografía Profesional</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Mínimo 3 fotos desde ángulos diferentes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Una foto del detalle importante</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Una foto mostrando el empaque/accesorios</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">🎯 Posicionamiento SEO</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Palabra clave en título (primeras 50 caracteres)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Repite clave 2-3 veces en descripción</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Agrega variantes: marca + modelo + año</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">⭐ Credibilidad Instantánea</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Envío gratis (aumenta 40% probabilidad venta)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Garantía o devolución sin riesgos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Responde rápido a mensajes</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">💰 Estrategia de Precio</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Precio 5% debajo de competencia = vende 3x rápido</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Termina en .999 (psicología precio)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Actualiza precio cada 3 días si no vende</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center mt-8">
        <h2 className="text-2xl font-bold text-white mb-3">¿Listo para Crear tu Primera Publicación?</h2>
        <p className="text-gray-400 mb-6">
          Sigue esta guía y usa nuestra IA para optimizar automáticamente tus publicaciones.
        </p>
        <Link
          href="/dashboard/publications"
          className="inline-block bg-white text-black font-semibold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Ir al Dashboard
        </Link>
      </div>
    </div>
  );
}
