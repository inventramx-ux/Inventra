'use client';
import React from "react";
import { FaTiktok } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useLocale, useTranslations } from "next-intl";

import { useEffect, useState, useRef } from 'react';

import { useRouter } from 'next/navigation';

import Link from 'next/link';

import { ArrowRight, Check, Brain, HeartHandshakeIcon, Menu, X, Instagram, Crown, Users, Plus, BriefcaseBusiness, Image, LayoutDashboard, Settings, Mail, Bell, MessageSquare, ChevronDown, CreditCard, ShoppingBag, Sparkles, TrendingUp, BarChart3, FileText, Layout, ChevronRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton, useAuth } from '@clerk/nextjs';
import { animate } from 'framer-motion';
import { useCurrency } from "@/app/contexts/CurrencyContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";









const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const targetPosition = elementRect - bodyRect - offset;

    animate(window.scrollY, targetPosition, {
      type: "tween",
      duration: 0.5,
      ease: [0.65, 0, 0.35, 1], // easeInOutQuart
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
  }
};

const BLUE_CHART_POINTS = [
  93, 91, 88, 86, 85, 82, 80, 78, 81, 79,
  77, 79, 75, 74, 75, 70, 68, 69, 67, 69,
  68, 70, 67, 66, 68, 64, 61, 62, 60, 62,
  60, 61, 57, 56, 57, 52, 50, 51, 49, 51,
  50, 52, 49, 48, 50, 46, 43, 44, 42, 44,
  42, 43, 39, 38, 39, 34, 32, 33, 31, 33,
  32, 34, 31, 30, 32, 28, 25, 26, 24, 26,
  24, 25, 21, 20, 21, 16, 14, 15, 13, 15,
  14, 16, 13, 12, 14, 10,  7,  8,  6,  8,
   6,  7,  3,  2,  3,  2,  4,  3,  5,  7
];

const blueLinePath = BLUE_CHART_POINTS.map((y, i) => `${i === 0 ? 'M' : 'L'} ${(i / (BLUE_CHART_POINTS.length - 1)) * 100} ${y}`).join(' ');
const blueAreaPath = [
  ...BLUE_CHART_POINTS.map((y, i) => {
    const x = (i / (BLUE_CHART_POINTS.length - 1)) * 100;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }),
  'L 100 100',
  'L 0 100',
  'Z'
].join(' ');

export default function Home() {
  const { isLoaded } = useAuth();
  const { proPrice, currency } = useCurrency();
  const currentLocale = useLocale();
  const t = useTranslations('landing');

  const features = [
    {
      title: t('features.feature1Title'),
      description: t('features.feature1Description'),
    },
    {
      title: t('features.feature1Title'),
      description: t('features.feature1Description'),
    },
      {
      title: t('features.feature1Title'),
      description: t('features.feature1Description'),
    },
      {
      title: t('features.feature1Title'),
      description: t('features.feature1Description'),
    },
  ];

  const plans = [
    {
      name: t('pricing.freeName'),
      price: t('pricing.freePrice'),
      period: '/month',
      description: t('pricing.freeDescription'),
      features: [t('pricing.freeFeature1'), t('pricing.freeFeature2'), t('pricing.freeFeature3')],
      cta: t('pricing.freeCta'),
      highlighted: true,
    },
    {
      name: t('pricing.proName'),
      price: '$15',
      period: '/month',
      description: t('pricing.proDescription'),
      features: [t('pricing.proFeature1'), t('pricing.proFeature2'), t('pricing.proFeature3')],
      cta: t('pricing.proCta'),
      highlighted: false,
    },
  ];

  const faqItems = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1'),
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2'),
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3'),
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4'),
    },
    {
      question: t('faq.q5'),
      answer: t('faq.a5'),
    },
    {
      question: t('faq.q6'),
      answer: t('faq.a6'),
    },
    {
      question: t('faq.q7'),
      answer: t('faq.a7'),
    },
  ];

  return (

    <div className="min-h-screen relative">



      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-lg border-b border-white/20">
        <InlineNavbar />
      </nav>






      <motion.section 
        className="pt-32 md:pt-40 pb-12 md:pb-20 relative z-10 overflow-x-clip"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-[800px] -z-10",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)]",
            "[mask-image:radial-gradient(circle_at_50%_350px,transparent,black_75%),linear-gradient(to_bottom,black_40%,transparent_100%)]",
            "[mask-composite:intersect]",
          )}
        />

        <div className="max-w-4xl mx-auto px-4">

          <div className="">


            <div className="relative">
              <h1 className="text-center text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-[1.15] tracking-tight
bg-gradient-to-b from-white via-white to-gray-400
bg-clip-text text-transparent pb-2 mt-10">
                {t('hero.title')}
              </h1>



              <p className="text-center text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8 md:mb-10">
                {t('hero.subtitle')}

              </p>

              <div className="flex justify-center items-center gap-3 mb-10" style={{ animationDelay: '0.2s' }}>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`/avatar${i}.png`}
                      alt={`User ${i}`}
                      className="h-9 w-9 md:h-10 md:w-10 rounded-full border-2 border-white object-cover shadow-lg"
                    />
                  ))}
                </div>
                <p className="text-white font-semibold text-lg md:text-1xl tracking-tight ml-2">
                  {t('hero.joinUsers')} <span className="text-white">{t('hero.usersCount')}</span>
                </p>
              </div>

              <div className="flex flex-col items-center justify-center ">

                {!isLoaded ? (
                  <div className="w-full sm:w-auto justify-center bg-gradient-to-b from-white via-white to-gray-400 text-black font-medium py-2.5 px-6 rounded-full inline-flex items-center gap-2 h-16">
                    <img src="lpmini.png" alt="" className="w-8 h-8 brightness-0" />  Comienza ahora - Es gratis
                  </div>
                ) : (
                  <>
                    <SignedIn>
                      <Link href="/dashboard" className="w-full sm:w-auto justify-center bg-gradient-to-b from-white via-white to-gray-400 text-black font-medium py-2.5 px-6 rounded-full inline-flex items-center gap-2 cursor-pointer h-16 ">

                        <img src="lpmini.png" alt="" className="w-8 h-8 brightness-0" />  Comienza ahora - Es gratis

                      </Link>
                    </SignedIn>
                    <SignedOut>

                      <SignUpButton>
                        <Link href="/dashboard" className="w-full sm:w-auto justify-center bg-gradient-to-b from-white via-white to-gray-400 text-black font-medium py-2.5 px-6 rounded-full inline-flex items-center gap-2 cursor-pointer h-16 ">

                          <img src="lpmini.png" alt="" className="w-8 h-8 brightness-0" />  Comienza ahora - Es gratis

                        </Link>

                      </SignUpButton>

                    </SignedOut>
                  </>
                )}

                <Link
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('features');
                  }}
                  className=""
                >


                </Link>

              </div>
              <div className='relative mt-8'>
                <div className="absolute inset-0 bg-black/40 blur-3xl -z-10 scale-[2.5] pointer-events-none" />
                <div className='text-white/30 flex items-center justify-center gap-2 font-semibold tracking-wider'>
                  <CreditCard size={14} />
                  <p> NO SE REQUIERE TARJETA DE CRÉDITO </p>
                </div>
              </div>
            </div>
            {/* Dashboard Preview Section */}
            <DashboardPreview />

          </div>

        </div>

      </motion.section>

      {/* Logos Section */}
      <motion.section 
        className="py-12 border-t border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 mb-8 uppercase tracking-widest">
            Usado por vendedores en empresas como
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20 lg:gap-x-24">
            {/* Mercado Libre - Local SVG */}
            <img
              src="/logos/mercadolibre.png"
              alt="Mercado Libre"
              className="h-7 md:h-8 lg:h-9 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              style={{ filter: 'brightness(0) invert(1)' }}
            />

            {/* Facebook Marketplace */}
            <img
              src="https://cdn.simpleicons.org/facebook/white"
              alt="Facebook Marketplace"
              className="h-7 md:h-8 lg:h-9 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
            />

            {/* eBay */}
            <img
              src="https://cdn.simpleicons.org/ebay/white"
              alt="eBay"
              className="h-8 md:h-9 lg:h-10 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
            />

            {/* Shopify */}
            <img
              src="https://cdn.simpleicons.org/shopify/white"
              alt="Shopify"
              className="h-8 md:h-9 lg:h-10 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
            />

            {/* Amazon */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              alt="Amazon"
              className="h-6 md:h-7 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              style={{ filter: 'brightness(0) invert(1)', marginTop: '6px' }}
            />

            {/* Etsy - Local wordmark SVG */}
            <img
              src="/logos/etsy.png"
              alt="Etsy"
              className="h-7 md:h-8 lg:h-9 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="premium-features" 
        className="py-24 px-4 border-t border-white/10 relative overflow-hidden bg-black/20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header with Title and Button */}
          <div className="flex flex-col md:flex-row items-start items-start md:items-center justify-between gap-6 mb-16 px-4">
            <div className="max-w-2xl text-left">
              <h2 className="text-4xl md:text-5xl  mb-6 tracking-tight ont-semibold mb-6 leading-[1.15] tracking-tight
bg-gradient-to-b from-white via-white to-gray-400
bg-clip-text text-transparent font-semibold" >
                {t('premiumFeatures.title')}
              </h2>
              <p className="text-gray-400 text-lg">
                {t('premiumFeatures.subtitle')}
              </p>
            </div>
            <div className="flex items-center">
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="bg-white text-black font-bold py-3.5 px-8 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                  <img src="/img.png" alt="" width={20} height={20} />
                  Probar ahora
                  <ChevronRight size={20} strokeWidth={3} />
                </Link>
              </SignedIn>

              <SignedOut>
                <SignUpButton mode="redirect" forceRedirectUrl="/dashboard">
                  <button className="bg-white text-black font-bold py-3.5 px-8 rounded-lg hover:bg-gray-200 transition-all  flex items-center gap-2">
                    <img src="/img.png" alt="" width={20} height={20} />
                    Probar ahora
                    <ChevronRight size={20} strokeWidth={3} />
                  </button>
                </SignUpButton>
              </SignedOut>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {/* Card 1: Optimización de publicaciones */}
            <div className="relative rounded-3xl bg-white/[0.03] border border-white/10 p-8 flex flex-col h-full overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -z-10" />

              {/* Preview Area: Clean listing preview */}
              <div className="relative bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden p-5 aspect-square font-sans flex flex-col">
                <div className="flex flex-col flex-1 gap-4">
                  {/* Header */}
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{t('premiumFeatures.card1PreviewLabel')}</h4>

                  {/* Image Container */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center">
                    <Image size={48} className="text-white/10" />
                  </div>

                  {/* Title Block */}
                  <div className="space-y-2">
                    <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{t('premiumFeatures.card1OptimizedTitle')}</h5>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {t('premiumFeatures.card1SuggestedPrice')}
                    </h3>
                  </div>

                  {/* Price Block */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 mt-auto">
                    <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">AI SUGGESTED PRICE</h5>
                    <span className="text-2xl font-bold text-white tracking-tight">$12,999 USD</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                                <p className="text-gray-400 font-bold text-lg text-sm">INVENTRA</p>

                <div className="flex items-center gap-3">
                  <h3 className="font-semibold lg:text-[30px] leading-[1.15] tracking-tight bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent">{t('premiumFeatures.card1Title')}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mt-2">
                  {t('premiumFeatures.card1Description')}
                </p>
              </div>
            </div>

            {/* Card 2: Optimización de Imágenes */}
            <div className="relative rounded-3xl bg-white/[0.03] border border-white/10 p-8 flex flex-col h-full overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -z-10" />

              {/* Replica UI Mockup */}
              <div className="relative bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden p-5 aspect-square font-sans flex flex-col">
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">OPTIMIZACIÓN DE IMÁGENES</h4>

                {/* Toolbar Tabs */}
                <div className="flex bg-black p-1 rounded-xl border border-white/5 shadow-inner w-full mb-5 gap-0.5">
                  {[
                    { label: 'FONDO', active: true },
                    { label: 'RESOLUCIÓN' },
                    { label: 'COLOR' },
                    { label: 'NITIDEZ' },
                  ].map((tab, i) => (
                    <div key={i} className={`flex-1 text-center px-2 py-2 rounded-lg ${tab.active ? 'bg-white text-black' : 'text-zinc-500'}`}>
                      <span className="text-[9px] font-black uppercase tracking-wider">{tab.label}</span>
                    </div>
                  ))}
                </div>

                {/* Content Area */}
                <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] space-y-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h5 className="text-sm font-bold text-white">{t('premiumFeatures.card2BgLabel')}</h5>
                      <p className="text-[10px] text-zinc-500 font-medium">{t('premiumFeatures.card2BgDesc')}</p>
                    </div>
                    <div className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-md text-[10px] text-zinc-300 font-bold shrink-0">
                      {t('premiumFeatures.card2Select')}
                    </div>
                  </div>

                  {/* Mock Image Grid */}
                  <div className="flex gap-3">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-white/20 bg-white/5 flex items-center justify-center">
                      <Image size={24} className="text-white/20" />
                    </div>
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/5 bg-white/[0.02] flex items-center justify-center opacity-40">
                      <Image size={24} className="text-white/20" />
                    </div>
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/5 bg-white/[0.02] flex items-center justify-center opacity-20">
                      <Image size={24} className="text-white/20" />
                    </div>
                  </div>

                  {/* Color options */}
                  <div className="space-y-2 mt-auto">
                    <h6 className="text-[9px] text-zinc-600 uppercase font-black tracking-widest">{t('premiumFeatures.card2ResultBg')}</h6>
                    <div className="flex gap-2">
                      <div className="h-7 w-7 rounded-lg bg-white border-2 border-white shadow-sm" />
                      <div className="h-7 w-7 rounded-lg bg-black border border-white/10" />
                      <div className="h-7 w-7 rounded-lg bg-zinc-500 border border-white/5" />
                      <div className="h-7 w-7 rounded-lg border border-dashed border-white/20 flex items-center justify-center">
                        <Plus size={10} className="text-zinc-500" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="pt-6">
                  <p className="text-gray-400 font-bold text-lg text-sm">INVENTRA</p>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold lg:text-[30px] leading-[1.15] tracking-tight bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent">{t('premiumFeatures.card2Title')}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mt-2">
                  {t('premiumFeatures.card2Description')}
                </p>
              </div>
            </div>

            {/* Card 3: Métricas avanzadas */}
            <div className="relative rounded-3xl bg-white/[0.03] border border-white/10 p-8 flex flex-col h-full overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -z-10" />

              {/* Preview Area: Stats/Chart */}
              <div className="relative bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden p-5 aspect-square font-sans flex flex-col">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3">
                    <p className="text-[8px] text-zinc-500 font-bold mb-1 uppercase tracking-wider">{t('premiumFeatures.card3Publications')}</p>
                    <p className="text-xl font-bold text-white">24</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3">
                    <p className="text-[8px] text-zinc-500 font-bold mb-1 uppercase tracking-wider">{t('premiumFeatures.card3WithAI')}</p>
                    <p className="text-xl font-bold text-white">18</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3">
                    <p className="text-[8px] text-zinc-500 font-bold mb-1 uppercase tracking-wider">{t('premiumFeatures.card3Success')}</p>
                    <p className="text-xl font-bold text-white">94%</p>
                  </div>
                </div>

                {/* Activity Chart Area */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 relative flex-1 flex flex-col">
                  <h4 className="text-[12px] font-bold text-white mb-6">Actividad de Publicación</h4>

                  <div className="relative flex-1 w-full flex items-end pr-2">
                    {/* Y-Axis Labels */}
                    <div className="flex flex-col justify-between text-[9px] text-zinc-600 h-full pr-3 pb-1">
                      <span>30</span>
                      <span>20</span>
                      <span>10</span>
                      <span>0</span>
                    </div>

                    {/* Chart Area */}
                    <div className="flex-1 h-full relative border-l border-b border-white/5">
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* Blue Area Fill */}
                        <path
                          d={blueAreaPath}
                          fill="#3b82f6"
                        />
                        {/* Blue Line */}
                        <path
                          d={blueLinePath}
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          vectorEffect="non-scaling-stroke"
                        />
                        {/* Dot at end of blue line */}
                        <circle cx="100" cy={BLUE_CHART_POINTS[BLUE_CHART_POINTS.length - 1]} r="2.5" fill="#3b82f6" />
                      </svg>
                    </div>
                  </div>

                  {/* X-Axis Labels */}
                  <div className="flex justify-between ml-[28px] mt-3 text-[9px] text-zinc-600 uppercase tracking-wider">
                    <span>Ene</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Abr</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                
                                <p className="text-gray-400 font-bold text-lg text-sm">INVENTRA</p>

                <div className="flex items-center gap-3">
                  <h3 className="font-semibold lg:text-[30px] leading-[1.15] tracking-tight bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent">{t('premiumFeatures.card3Title')}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mt-2">
                  {t('premiumFeatures.card3Description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}

      <motion.section 
        id="features" 
        className="py-20 px-4 border-t border-white/10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >

        <div className="max-w-4xl mx-auto">

          <div className="mb-16">
<p className="text-gray-400 font-medium text-lg text-sm">LAS 4 FUNCIONES PRINCIPALES</p>
            <h2 className="mt-5 text-3xl font-medium  mb-4 font-semibold lg:text-[30px] leading-[1.15] tracking-tight bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent">
              {t('features.sectionTitle')}
            </h2>

            <p className="text-gray-400">
              {t('features.sectionSubtitle')}
            </p>

          </div>




          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">

            {features.map((feature, index) => (

              <div key={index} className="group p-4 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">

                <h3 className="text-white font-medium mb-2">{feature.title}</h3>

                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>

              </div>

            ))}

          </div>

        </div>

      </motion.section>



      {/* Pricing Section */}

      <motion.section 
        id="pricing" 
        className="py-20 px-4 border-t border-white/10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >

        <div className="max-w-5xl mx-auto">

          <div className="mb-16 text-center">

            <h2 className="text-3xl font-medium text-white mb-4">
              {t('pricing.sectionTitle')}
            </h2>

            <p className="text-gray-400">
              {t('pricing.sectionSubtitle')}
            </p>

          </div>



          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">

            {plans.map((plan, index) => (

              <div key={index} className="relative overflow-visible">
                {plan.name === 'Pro' && (
                  <div className="absolute left-1/2 -top-3 -translate-x-1/2 rounded-full bg-[#c0c0c0] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_14px_45px_rgba(192,192,192,0.4)]">
                    AHORRA UN 33%
                  </div>
                )}

                <div className={`flex flex-col p-6 md:p-8 rounded-2xl border  transition-all ${plan.highlighted ? 'border-white/30 bg-white/5 ring-1 ring-white/10 scale-100' : ' border-2 border-[#c0c0c0] bg-black/40 shadow-[0_0_30px_rgba(192,192,192,0.3)]'}`}>

                  <div className="mb-6 pt-3">

                    <h3 className="text-white font-semibold text-xl mb-1">{plan.name}</h3>

                  <span className="text-4xl font-bold text-white">
                    {plan.name === 'Pro' ? proPrice : `${plan.price} ${currency}`}
                  </span>

                  <span className="text-gray-500 text-sm">{plan.period}</span>

                  <p className="text-gray-400 text-sm mt-3">{plan.description}</p>

                </div>



                <ul className="space-y-4 mb-8 flex-1">

                  {plan.features.map((feature, i) => (

                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">

                      <Check size={16} className="text-white mt-0.5 flex-shrink-0" />

                      <span>{feature}</span>

                    </li>

                  ))}

                </ul>



                <SignedIn>
                  <Link
                    href={plan.highlighted ? '/dashboard' : '/checkout'}
                    className={`block text-center py-3 px-6 rounded-xl font-semibold transition-all shadow-lg ${plan.highlighted
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                  >
                    {plan.cta}
                  </Link>
                </SignedIn>
                <SignedOut>
                  <SignUpButton mode="redirect" forceRedirectUrl="/dashboard">
                    <button
                      className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all shadow-lg ${plan.highlighted
                        ? 'bg-white text-black hover:bg-gray-100'
                        : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                    >
                      {plan.cta}
                    </button>
                  </SignUpButton>
                </SignedOut>

              </div>
            </div>

            ))}

          </div>

        </div>

      </motion.section>

<motion.section 
  className="py-24 px-4 border-t border-white/10"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: true, amount: 0.3 }}
>
  <div className="max-w-6xl mx-auto">
    <div className="mb-16">
      <p className="text-gray-400 font-medium text-sm uppercase tracking-widest mb-4">DEL PENSAMIENTO AL ACCION</p>
      <h2 className="text-4xl md:text-5xl font-semibold mb-4 leading-[1.15] tracking-tight bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent">
        Así es como se usa Inventra
      </h2>
      <p className="text-gray-400 text-lg max-w-2xl">
        Este es un ejemplo real de una publicación creada con Inventra optimizada para ecommerce
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Description */}
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-500/20 border border-gray-500/40 flex items-center justify-center">
              <span className="text-gray-400 font-bold text-lg">1</span>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">{currentLocale === 'es' ? 'Ingresa los datos del producto' : 'Enter your product data'}</h3>
              <p className="text-gray-400 text-sm">{currentLocale === 'es' ? 'Proporciona información básica como nombre, descripción y características del artículo' : 'Provide basic information such as name, description and product features'}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-500/20 border border-gray-500/40 flex items-center justify-center">
              <span className="text-gray-400 font-bold text-lg">2</span>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">{currentLocale === 'es' ? 'La IA optimiza automáticamente' : 'AI optimizes automatically'}</h3>
              <p className="text-gray-400 text-sm">{currentLocale === 'es' ? 'Nuestro modelo genera títulos atractivos y descripciones convincentes para vender más rápido' : 'Our model generates attractive titles and convincing descriptions to sell faster'}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-500/20 border border-gray-500/40 flex items-center justify-center">
              <span className="text-gray-400 font-bold text-lg">3</span>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">{currentLocale === 'es' ? 'Publica en tu plataforma' : 'Publish on your platform'}</h3>
              <p className="text-gray-400 text-sm">{currentLocale === 'es' ? 'Copia la publicación optimizada y publícala en Mercado Libre, Facebook o tu tienda en línea' : 'Copy the optimized listing and publish it on Mercado Libre, Facebook or your online store'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* iPhone Mockup */}
      <div className="flex justify-center">
        <div className="relative">
          {/* iPhone Frame */}
          <div className="w-72 bg-black rounded-[48px] shadow-2xl relative overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
            {/* Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-10"></div>
            
            {/* Screen Content */}
            <div className="absolute inset-0 bg-white rounded-[44px] overflow-hidden flex flex-col m-[6px]">
              {/* Status Bar */}
              <div className="bg-white h-6 flex items-center justify-between px-6 text-[10px] font-semibold text-gray-800">
                <span>9:41</span>
                <span>●●●●●</span>
              </div>

              {/* Product Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {/* Product Image Container */}
                <div className="aspect-square w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border border-gray-300 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[11px] text-gray-500 font-medium">Imagen del producto</span>
                  </div>
                </div>

                {/* Product Title */}
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">
                    iPhone 15 Pro Max — Cámara Profesional y Rendimiento Ultrarrápido
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">★</span>
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-500">(2.4k reviews)</span>
                </div>

                {/* Price Section */}
                <div className="bg-blue-50 rounded-lg p-3 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900">$24,999</span>
                    <span className="text-xs text-gray-500 line-through">$28,999</span>
                  </div>
                  <span className="text-[10px] text-green-700 font-semibold">14% de descuento</span>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1h2v2H7V4zm2 4H7v2h2V8zm2-4h2v2h-2V4zm2 4h-2v2h2V8z" />
                    </svg>
                    <p className="text-[11px] text-gray-700 leading-tight flex-1">
                      Procesador A18 Pro de última generación, pantalla OLED 6.9", batería de hasta 33 horas
                    </p>
                  </div>
                </div>
              </div>

              {/* Buy Button */}
              <div className="bg-white border-t border-gray-200 p-3">
                <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors">
                  Comprar Ahora
                </button>
              </div>
            </div>
          </div>

          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-[48px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl -z-10"></div>
        </div>
      </div>
    </div>
  </div>
</motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="py-24 px-4 border-t border-white/10" 
        id="faq"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-[20px] text-gray-400 line-clamp-2">{t('faq.title')}</h1>
          <h2 className="text-3xl font-semibold text-white mb-6">
            <span className="block max-w-[600px] text-white/25 lg:text-[50px] font-semibold mb-6 leading-[1.15] tracking-tight
bg-gradient-to-b from-white via-white to-gray-400
bg-clip-text text-transparent pb-2">{t('faq.subtitle')} </span>
          </h2>
          <p className="text-gray-400 mb-12">{t('faq.subtitle')}</p>

          <div className="border-t border-white/10">
            {faqItems.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </motion.section>


 
      {/* Inlined Footer (previously in app/components/Footer.tsx) */}
<div className="border border-white/10 rounded-lg bg-white/5 px-6 py-4 ml-4 mr-4 mb-8">
  {/* your content here */}
      <footer className="border- border-white/10 py-8">
      <div className="aura lights">
       
  
      
      </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10 pb-8">

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">

              <img

                src="/inventralogo.png"

                alt="Inventra"

                width={120}

                height={28}

                className="h-6 w-auto opacity-80"

              />

              <p className="text-gray-500 text-sm">

                &copy; {new Date().getFullYear()} Inventra.

              </p >
<p className="text-gray-500 text-sm flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
                  <rect width="300" height="600" fill="#078930"/>
                  <rect x="300" width="300" height="600" fill="white"/>
                  <rect x="600" width="300" height="600" fill="#CE3126"/>
                </svg>
                {t('footer.tagline')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-xs"
              >
                <span>Powered by</span>
                <svg
                  viewBox="0 0 116 100"
                  fill="currentColor"
                  className="h-3 w-auto shrink-0"
                >
                  <path d="M57.5 0L115 100H0L57.5 0Z" />
                </svg>
                <span className="font-semibold tracking-tight uppercase text-[10px]">Vercel</span>
              </a>
            </div>

          </div>

        </div>

      </footer>
</div>





    </div>

  );

}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-white font-medium pr-8">{question}</span>
        <ChevronDown
          className={`size-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-400 text-sm leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}



function DashboardPreview() {
  const scale_ref_width = 1040;
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        // Obtenemos el ancho del contenedor padre (max-w-4xl aprox 896px)
        const parentWidth = containerRef.current.offsetWidth || window.innerWidth;
        // El chasis completo tiene un ancho de referencia de 1040px (1000px dash + padding/borders)
        const referenceWidth = 1040;
        const newScale = Math.min(1, parentWidth / referenceWidth);
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div ref={containerRef} className="mt-16 md:mt-24 relative w-full max-w-[1040px] mx-auto aspect-[1040/560]">
      {/* Brillo de fondo mejorado - Escala con el contenedor */}
      <div
        className="absolute -inset-10 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10 blur-[100px] -z-10 opacity-60"
        style={{ transform: `scale(${scale})` }}
      />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 origin-top"
        style={{
          width: '1040px',
          transform: `scale(${scale})`
        }}
      >
        {/* Marco exterior grueso (Chasis) */}
        <div
          className="relative rounded-[2.5rem] border-[10px] border-[#1a1a1a] p-0.5 bg-[#0a0a0a] shadow-[0_0_60px_rgba(0,0,0,0.9)] pointer-events-none select-none origin-bottom opacity-100"
          style={{
            perspective: '2000px',
            transform: 'rotateX(6deg)',
          }}
        >
          {/* Borde interior fino (Efecto cristal/luz) */}
          <div className="relative rounded-[1.8rem] border border-white/5 bg-[#070707] overflow-hidden">
            {/* Reflejo de luz superior */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none z-20" />

            {/* El Dashboard real (Interno) */}
            <div className="flex h-[500px] w-[1000px] bg-[#070707] text-gray-300 font-sans shrink-0">
              {/* Mock Sidebar */}
              <div className="w-52 border-r border-white/5 bg-[#0a0a0a] flex flex-col shrink-0">
                <div className="p-4 border-b border-white/5 flex justify-center">
                  <img src="/inventralogo.png" alt="Logo" className="h-6 w-auto opacity-90" />
                </div>

                <div className="flex-1 py-4 px-3 space-y-6">
                  <div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2 flex items-center gap-2">
                      General
                    </div>
                    <div className="space-y-1">
                      {[
                        { icon: LayoutDashboard, label: 'Dashboard', active: true },
                        { icon: ShoppingBag, label: 'Publicaciones', active: false },
                        { icon: Settings, label: 'Configuración', active: false },
                      ].map((item, i) => (
                        <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${item.active ? 'text-white bg-white/10 font-medium' : 'text-gray-400'}`}>
                          <item.icon className="size-4" />
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2">Soporte</div>
                    <div className="px-3 py-2 flex items-start gap-3 bg-white/5 rounded-lg border border-white/5">
                      <Mail className="size-4 mt-1" />
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-white">Contacto</div>
                        <div className="text-[9px] text-blue-400 truncate">inventramx@gmail.com</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 border-t border-white/5 flex items-center gap-3">
                  <div className="size-8 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white">U</div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-white truncate">Usuario</div>
                    <div className="text-[10px] text-gray-500 truncate">pro@inventra.mx</div>
                  </div>
                </div>
              </div>

              {/* Mock Main Content */}
              <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#070707]">
                {/* Header */}
                <header className="h-14 border-b border-white/5 flex items-center px-6 bg-[#0a0a0a]">
                  <Menu className="size-4 text-gray-500 mr-4" />
                  <div className="flex-1" />
                  <div className="flex items-center gap-4 text-gray-500">
                    <Bell className="size-4" />
                    <div className="size-6 rounded-full border border-white/10" />
                  </div>
                </header>

                {/* Page Content */}
                <div className="p-6 space-y-8 overflow-y-auto no-scrollbar">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Bienvenido, Usuario</h2>
                    <p className="text-xs text-gray-500 mt-1">Aquí tienes un resumen de tu actividad.</p>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { label: 'Publicaciones', value: '48', sub: 'Total creadas', icon: ShoppingBag, color: 'text-blue-400' },
                      { label: 'Optimizaciones', value: '32', sub: 'Generadas con IA', icon: Sparkles, color: 'text-emerald-400' },
                      { label: 'Eficiencia', value: '86%', sub: 'Tasa de éxito', icon: TrendingUp, color: 'text-indigo-400' },
                      { label: 'Plan', value: 'Pro', sub: 'Acceso completo', icon: Crown, color: 'text-amber-400' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-[#0a0a0a] border border-white/5 p-4 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-medium text-gray-500 uppercase tracking-tight">{stat.label}</span>
                          <stat.icon className={`size-4 ${stat.color} opacity-80`} />
                        </div>
                        <div className="text-xl font-bold text-white">{stat.value}</div>
                        <div className="text-[10px] text-gray-500 mt-1">{stat.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <div className="px-4 py-1.5 bg-white text-black text-xs font-semibold rounded-lg flex items-center gap-2">
                      <Plus className="size-3" /> Nueva Publicación
                    </div>
                    <div className="px-4 py-1.5 border border-white/10 text-white text-xs font-semibold rounded-lg flex items-center gap-2">
                      <Sparkles className="size-3" /> Ver Métricas
                    </div>
                  </div>

                  {/* Table */}
                  <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center">
                      <div className="text-xs font-bold text-white">Publicaciones Recientes</div>
                      <div className="text-[10px] text-blue-400 font-medium">Ver todas →</div>
                    </div>
                    <div className="p-0 overflow-x-auto">
                      <table className="w-full text-left text-[11px]">
                        <thead className="bg-white/[0.02] text-gray-500 border-b border-white/5">
                          <tr>
                            <th className="px-4 py-3 font-medium uppercase tracking-tighter">Producto</th>
                            <th className="px-4 py-3 font-medium uppercase tracking-tighter">Plataforma</th>
                            <th className="px-4 py-3 font-medium uppercase tracking-tighter text-center">Estado</th>
                            <th className="px-4 py-3 font-medium uppercase tracking-tighter text-right">Fecha</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {[
                            { name: 'iPhone 15 Pro Max', platform: 'Mercado Libre', date: 'Hoy', status: 'Optimizado', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                            { name: 'MacBook Air M2', platform: 'Amazon', date: 'Ayer', status: 'Borrador', color: 'bg-blue-400/10 text-blue-400 border-blue-400/20' },
                            { name: 'Sony WH-1000XM5', platform: 'Etsy', date: '12 Mar', status: 'Optimizado', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                          ].map((pub, i) => (
                            <tr key={i}>
                              <td className="px-4 py-3 text-white font-medium">{pub.name}</td>
                              <td className="px-4 py-3 text-gray-400">{pub.platform}</td>
                              <td className="px-4 py-3 text-center">
                                <span className={`px-2 py-0.5 rounded-full border text-[9px] font-medium ${pub.color}`}>
                                  {pub.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right text-gray-500">{pub.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



// Inline Navbar component implementation

function InlineNavbar() {
  const { isLoaded } = useAuth();
  const { proPrice } = useCurrency();
  const t = useTranslations('landing');
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (

    <div>
      <div className="">   <Link
        href="/checkout"
        className='flex items-center justify-center bg-white/7  text-white border-b border-white/10 w-full h-14  group'
      >
        <p className="text-sm font-medium flex items-center gap-2 ">
          <img src="/lpmini.png" alt="Logo" className="w-6 h-auto" />
          <span>{t('nav.proBanner')} <span className="text-white font-bold">{t('nav.proBannerBold')}</span> {t('nav.proBannerSuffix')} {proPrice}</span>
          <ArrowRight className="w-4 h-4 " />
        </p>
      </Link></div>
      <SignedIn>

      </SignedIn>
      <SignedOut>

      </SignedOut>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/inventralogo.png"
                alt="Inventra"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-white font-semibold hidden sm:inline"></span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            <Link
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('features');
              }}
              className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center gap-1"
            >
              Características
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </Link>
            <Link
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('pricing');
              }}
              className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center gap-1"
            >
              Planes
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </Link>
            <Link
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('faq');
              }}
              className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center gap-1"
            >
              FAQ
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </Link>

          </div>

          <div className="hidden md:flex items-center gap-4 min-w-[280px] justify-end">
            <LanguageSwitcher />
            {!isLoaded ? (
              <div className="flex items-center gap-4">
                <a className="px-6 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 cursor-pointer">Iniciar Sesión</a>
              </div>
            ) : (
              <>
                <SignedOut>
                  <SignInButton>
                    <a className="px-6 py-2 text-sm font-semibold text-white bg-white/10  rounded-lg transition-all duration-200 cursor-pointer">Iniciar Sesión</a>
                  </SignInButton>
                  <SignUpButton>
                    <a className="bg-white text-black font-medium py-2 px-6 rounded-lg text-sm cursor-pointer ml-2">Registrarse</a>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link href="/dashboard" className="bg-white text-black font-medium py-2 px-6 rounded-lg ] transition-colors text-sm">
                    Dashboard
                  </Link>
                  <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: 'w-9 h-9' } }} />
                </SignedIn>
              </>
            )}
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <div className="flex flex-col gap-4">
              <Link
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  scrollToSection('features');
                }}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 block w-full"
              >
                Características
              </Link>
              <Link
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  scrollToSection('pricing');
                }}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 block w-full"
              >
                Planes
              </Link>
              {!isLoaded ? (
                <div className="h-10 w-full bg-white/5 animate-pulse rounded-lg" />
              ) : (
                <>
                  <SignedOut>
                    <SignInButton>
                      <a className="px-6 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 cursor-pointer block w-full text-center">Iniciar Sesión</a>
                    </SignInButton>
                    <SignUpButton>
                      <a className="bg-white text-black font-medium py-2 px-6 rounded-lg text-sm text-center cursor-pointer">Registrarse</a>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/dashboard" className="bg-white text-black font-medium py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors text-sm text-center">
                      Dashboard
                    </Link>
                    <div className="flex items-center gap-2">
                      <UserButton afterSignOutUrl="/" />
                      <span className="text-slate-400 text-sm">Cuenta</span>
                    </div>
                  </SignedIn>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>

  );

}