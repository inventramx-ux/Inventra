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

  // Build sections dynamically from translations
  const sectionIcons = [
    <Camera key="0" className="w-6 h-6" />,
    <FileText key="1" className="w-6 h-6" />,
    <Edit3 key="2" className="w-6 h-6" />,
    <DollarSign key="3" className="w-6 h-6" />,
    <Zap key="4" className="w-6 h-6" />,
    <FileText key="5" className="w-6 h-6" />,
  ];

  const sections: Section[] = [0, 1, 2, 3, 4, 5].map((idx) => {
    const sectionKey = `sections.section${idx}` as const;
    const title = t(`${sectionKey}.title`);
    const description = t(`${sectionKey}.description`);
    
    const steps = [0, 1, 2, 3].map((stepIdx) => ({
      title: t(`${sectionKey}.step${stepIdx}.title`),
      description: t(`${sectionKey}.step${stepIdx}.description`),
      tips: [0, 1, 2, 3].map(tipIdx => t(`${sectionKey}.step${stepIdx}.tips.${tipIdx}`))
    }));

    const result: Section = {
      title,
      description,
      icon: sectionIcons[idx],
      steps
    };

    // Add examples for sections that have them
    if (idx === 0 || idx === 2) {
      result.examples = {
        good: t(`${sectionKey}.examples.good`),
        bad: t(`${sectionKey}.examples.bad`)
      };
    }

    return result;
  });

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
        <h1 className="text-4xl font-bold text-white mb-3">{t('title')}</h1>
        <p className="text-gray-400 text-lg">
          {t('subtitle')}
        </p>
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-emerald-400 mb-1">{t('quickTips.tip0.title')}</h3>
              <p className="text-sm text-gray-400">= {t('quickTips.tip0.subtitle')}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-400 mb-1">{t('quickTips.tip1.title')}</h3>
              <p className="text-sm text-gray-400">= {t('quickTips.tip1.subtitle')}</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-amber-400 mb-1">{t('quickTips.tip2.title')}</h3>
              <p className="text-sm text-gray-400">= {t('quickTips.tip2.subtitle')}</p>
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
                        <h5 className="font-semibold text-emerald-400">{t('examples.wellDone')}</h5>
                      </div>
                      <p className="text-sm text-gray-300">{section.examples.good}</p>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <h5 className="font-semibold text-red-400">{t('examples.avoid')}</h5>
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
          {t('proTips.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1, 2, 3].map((tipIdx) => (
            <div key={tipIdx} className="space-y-3">
              <h3 className="font-semibold text-white">{t(`proTips.tip${tipIdx}.title`)}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[0, 1, 2].map((subIdx) => (
                  <li key={subIdx} className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">→</span>
                    <span>{t(`proTips.tip${tipIdx}.tips.${subIdx}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center mt-8">
        <h2 className="text-2xl font-bold text-white mb-3">{t('cta.title')}</h2>
        <p className="text-gray-400 mb-6">
          {t('cta.subtitle')}
        </p>
        <Link
          href="/dashboard/publications"
          className="inline-block bg-white text-black font-semibold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {t('cta.button')}
        </Link>
      </div>
    </div>
  );
}
