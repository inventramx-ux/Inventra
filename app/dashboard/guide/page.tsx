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
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  // Build sections dynamically from translations
  const sectionIcons = [
    <Camera key="0" className="w-6 h-6" />,
    <FileText key="1" className="w-6 h-6" />,
    <Edit3 key="2" className="w-6 h-6" />,
    <DollarSign key="3" className="w-6 h-6" />,
    <Zap key="4" className="w-6 h-6" />,
    <FileText key="5" className="w-6 h-6" />,
  ];

  // Hardcoded Spanish section data
  const sectionData = [
    {
      title: 'Captura de Imagen de Calidad',
      description: 'La imagen es lo más importante. Una buena foto atrae más compradores.',
      steps: [
        {
          title: 'Iluminación Perfecta',
          description: 'Utiliza luz natural o iluminación clara para que el producto se vea bien.',
          tips: ['Fotografía durante el día junto a una ventana', 'Evita sombras y contraluz excesivo', 'Si es de noche, usa luces blancas/LED', 'Evita luz amarillenta que distorsiona colores']
        },
        {
          title: 'Ángulos Estratégicos',
          description: 'Muestra el producto desde diferentes perspectivas.',
          tips: ['Captura la parte frontal principal', 'Incluye vistas laterales y traseras', 'Toma fotos de detalles importantes', 'Fotografía el producto en su contexto de uso']
        },
        {
          title: 'Fondo Limpio',
          description: 'Un fondo simple hace que el producto destaque.',
          tips: ['Usa fondos blancos o neutros', 'Evita fondos desordenados', 'Asegúrate de que el fondo no compita con el producto', 'Considera usar fondos lisos o texturas sutiles']
        },
        {
          title: 'Resolución y Tamaño',
          description: 'Las imágenes claras y grandes generan más confianza.',
          tips: ['Captura en alta resolución', 'Imágenes mínimo 1200x1200 píxeles', 'Mantén la proporción aspectos naturales', 'No comprimas demasiado la imagen']
        }
      ],
      examples: {
        good: 'Producto bien iluminado sobre fondo blanco, en alta resolución, mostrando detalles nítidos.',
        bad: 'Imagen borrosa, mal iluminada, con fondo desordenado o colores distorsionados.'
      }
    },
    {
      title: 'Descripción Estratégica del Producto',
      description: 'Una descripción clara convierte curiosos en compradores.',
      steps: [
        {
          title: 'Encabezado Atractivo',
          description: 'Comienza con lo más importante.',
          tips: ['Menciona la marca y modelo', 'Incluye características clave', 'Usa palabras que buscan los compradores', 'Sé claro y conciso']
        },
        {
          title: 'Beneficios y Características',
          description: 'Explica qué hace especial tu producto.',
          tips: ['Lista características técnicas', 'Destaca los beneficios principales', 'Usa formato de viñetas', 'Sé específico con las medidas y especificaciones']
        },
        {
          title: 'Condición y Detalles',
          description: 'Transparencia genera confianza.',
          tips: ['Especifica si es nuevo o usado', 'Describe el estado exacto', 'Menciona cualquier defecto menor', 'Incluye garantía si aplica']
        },
        {
          title: 'Llamada a la Acción',
          description: 'Invita al comprador a tomar acción.',
          tips: ['Ofrece respuesta rápida', 'Proporciona múltiples canales de contacto', 'Menciona envío rápido', 'Destaca políticas de retorno']
        }
      ]
    },
    {
      title: 'Optimización de Precio',
      description: 'El precio correcto es clave para vender rápido.',
      steps: [
        {
          title: 'Investigación de Mercado',
          description: 'Analiza precios competitivos.',
          tips: ['Revisa productos similares en la plataforma', 'Considera el estado del producto', 'Ten en cuenta los costos de envío', 'Analiza la demanda actual']
        },
        {
          title: 'Estrategia de Precio',
          description: 'Define tu estrategia de precios.',
          tips: ['Comienza competitivo para ganar vistas', 'Consideracosto + margen de ganancia', 'Ofrece descuentos por volumen', 'Ajusta según las tendencias']
        },
        {
          title: 'Promociones Efectivas',
          description: 'Aumenta urgencia en el comprador.',
          tips: ['Usa precios psicológicos (ej. $99.99)', 'Ofrece envío gratis', 'Crea ofertas por tiempo limitado', 'Destaca si el precio es especial']
        },
        {
          title: 'Monitoreo Continuo',
          description: 'Mantén tu precio competitivo.',
          tips: ['Revisa precios de competencia regularmente', 'Ajusta según la estación', 'Analiza tasas de venta y visitas', 'Optimiza basado en datos']
        }
      ]
    },
    {
      title: 'Envío y Logística',
      description: 'El envío rápido y confiable aumenta ventas.',
      steps: [
        {
          title: 'Opciones de Envío',
          description: 'Ofrece flexibilidad al comprador.',
          tips: ['Ofrece envío estándar y express', 'Especifica tiempos de entrega', 'Calcula costos correctamente', 'Considera envío gratis si es posible']
        },
        {
          title: 'Embalaje Profesional',
          description: 'Protege tu producto durante el viaje.',
          tips: ['Usa cajas adecuadas al tamaño', 'Empaqueta con cuidado', 'Protege con amortiguantes', 'Sella bien los paquetes']
        },
        {
          title: 'Seguimiento y Comunicación',
          description: 'Mantén informado al comprador.',
          tips: ['Proporciona número de seguimiento', 'Responde preguntas rápidamente', 'Confirma entrega', 'Resuelve problemas prontamente']
        },
        {
          title: 'Políticas Claras',
          description: 'Transparencia en devoluciones.',
          tips: ['Especifica política de devolución', 'Indica quién paga retorno', 'Ofrece garantía si aplica', 'Sé flexible con problemas de envío']
        }
      ]
    },
    {
      title: 'SEO y Posicionamiento',
      description: 'Aparece primero en los resultados de búsqueda.',
      steps: [
        {
          title: 'Palabras Clave Relevantes',
          description: 'Usa términos que buscan los compradores.',
          tips: ['Incluye marca y modelo', 'Usa palabras genéricas y específicas', 'Evita spamming de palabras clave', 'Analiza palabras clave populares']
        },
        {
          title: 'Categorización Correcta',
          description: 'Coloca tu producto en la categoría adecuada.',
          tips: ['Selecciona la categoría principal correcta', 'Incluye subcategorías relevantes', 'Sé específico en atributos', 'Completa todos los campos']
        },
        {
          title: 'Optimización de Título',
          description: 'El título es lo primero que ven.',
          tips: ['Máximo 60 caracteres', 'Incluye palabras clave principales', 'Empieza con lo más importante', 'Evita caracteres especiales innecesarios']
        },
        {
          title: 'Reputación y Calificaciones',
          description: 'Las buenas reviews suben el ranking.',
          tips: ['Solicita calificaciones a compradores', 'Responde a todas las reviews', 'Mantén excelente servicio al cliente', 'Resuelve problemas rápidamente']
        }
      ]
    },
    {
      title: 'Gestión de Inventario',
      description: 'Mantén control sobre tu stock.',
      steps: [
        {
          title: 'Control de Stock',
          description: 'Evita sobrevender.',
          tips: ['Actualiza cantidad disponible', 'Sincroniza con otros canales', 'Establece alertas de bajo stock', 'Planifica reordenes a tiempo']
        },
        {
          title: 'Variaciones y Opciones',
          description: 'Oferece múltiples alternativas.',
          tips: ['Lista todos los colores disponibles', 'Incluye diferentes tamaños', 'Especifica opciones de material', 'Muestra precio para cada variante']
        },
        {
          title: 'Rotación de Inventario',
          description: 'Vende productos antiguos primero.',
          tips: ['Identifica productos lentos', 'Crea promociones para limpiar stock', 'Actualiza descripciones regularmente', 'Consideradescuentos estratégicos']
        },
        {
          title: 'Análisis de Demanda',
          description: 'Predice qué se venderá.',
          tips: ['Analiza historial de ventas', 'Observa tendencias estacionales', 'Lee comentarios de clientes', 'Ajusta inventario según demanda']
        }
      ]
    }
  ];

  const sections: Section[] = sectionData.map((data, idx) => ({
    title: data.title,
    description: data.description,
    icon: sectionIcons[idx],
    steps: data.steps,
    examples: idx === 0 || idx === 2 ? data.examples : undefined
  }));

  /* Old hardcoded section - keeping for reference but no longer used
  const sections_old: Section[] = [
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
  */

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-3">Guía Completa de Ventas Online</h1>
        <p className="text-gray-400 text-lg">
          Aprende todos los secretos para vender más productos en plataformas online
        </p>
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-emerald-400 mb-1">Imágenes de Calidad</h3>
              <p className="text-sm text-gray-400">= Las fotos atraen más compradores</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-400 mb-1">Descripción Detallada</h3>
              <p className="text-sm text-gray-400">= Convierte curiosos en compradores</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-amber-400 mb-1">Precio Competitivo</h3>
              <p className="text-sm text-gray-400">= Vende rápido y consistente</p>
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
                        <h5 className="font-semibold text-emerald-400">Bien Hecho</h5>
                      </div>
                      <p className="text-sm text-gray-300">{section.examples.good}</p>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <h5 className="font-semibold text-red-400">Evitar</h5>
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
          Consejos Profesionales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Consistencia es Clave</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Actualiza tus productos regularmente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Mantén un horario de respuestas rápido</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Publica ofertas periódicamente</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Análisis de Datos</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Revisa tus métricas de ventas regularmente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Aprende de productos que no venden</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Ajusta estrategias según datos reales</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Relaciones con Clientes</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Responde todas las preguntas honestamente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Sé amable y profesional siempre</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Resuelve problemas rápidamente</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Innovación Constante</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Experimenta con nuevos formatos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Mantente actualizado en tendencias</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">→</span>
                <span>Prueba nuevas estrategias de marketing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center mt-8">
        <h2 className="text-2xl font-bold text-white mb-3">¡Comienza Ahora!</h2>
        <p className="text-gray-400 mb-6">
          Aplica estos consejos en tus productos y ve cómo aumentan tus ventas
        </p>
        <Link
          href="/dashboard/publications"
          className="inline-block bg-white text-black font-semibold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Ir a Publicaciones
        </Link>
      </div>
    </div>
  );
}
