import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingBag, 
  CreditCard, 
  Award, 
  MapPin, 
  Recycle, 
  PhoneCall, 
  Zap, 
  Star, 
  Heart, 
  Download, 
  ArrowRight, 
  Eye, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Leaf, 
  Smile, 
  AlertTriangle, 
  RefreshCw,
  QrCode,
  Smartphone,
  ChevronDown,
  CheckCircle,
  Droplets,
  Filter,
  Truck,
  Coins,
  GraduationCap,
  Database,
  Code2,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TAB_DATA, APP_BENEFITS, USER_REVIEWS, APP_NAME } from './data';
import { TabCategory, Review } from './types';
import AppSimulator from './components/AppSimulator';
import UXWorkspace from './components/UXWorkspace';
import TechArchitectureModal from './components/TechArchitectureModal';
import { LanguageSelector } from './components/LanguageSelector';
import { useTranslation } from './i18n';

export default function App() {
  const { t, tList, language } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabCategory>('residuos');
  const [activeUXSection, setActiveUXSection] = useState<string>('hero');
  const [reviews, setReviews] = useState<Review[]>(USER_REVIEWS);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRole, setNewReviewRole] = useState<'turista' | 'local'>('local');
  const [newReviewCleanSidewalk, setNewReviewCleanSidewalk] = useState(true);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  
  // Section refs for smooth scrolling with strategy highlights
  const heroRef = useRef<HTMLDivElement>(null);
  const painsRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);

  // Monitor screen scroll to update active strategy section in UX sidebar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 350;

      if (guideRef.current && scrollPosition >= guideRef.current.offsetTop) {
        setActiveUXSection('guide');
      } else if (socialRef.current && scrollPosition >= socialRef.current.offsetTop) {
        setActiveUXSection('social');
      } else if (benefitsRef.current && scrollPosition >= benefitsRef.current.offsetTop) {
        setActiveUXSection('benefits');
      } else if (ecosystemRef.current && scrollPosition >= ecosystemRef.current.offsetTop) {
        setActiveUXSection('ecosystem');
      } else if (painsRef.current && scrollPosition >= painsRef.current.offsetTop) {
        setActiveUXSection('pains');
      } else {
        setActiveUXSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (sectionId: string) => {
    setActiveUXSection(sectionId);
    let targetRef;
    if (sectionId === 'hero') targetRef = heroRef;
    if (sectionId === 'pains') targetRef = painsRef;
    if (sectionId === 'ecosystem') targetRef = ecosystemRef;
    if (sectionId === 'benefits') targetRef = benefitsRef;
    if (sectionId === 'social') targetRef = socialRef;
    if (sectionId === 'guide') targetRef = guideRef;

    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const startMockDownload = () => {
    setIsDownloadModalOpen(true);
    setIsDownloaded(false);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloaded(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const added: Review = {
      id: `rev-${Date.now()}`,
      name: newReviewName,
      role: newReviewRole,
      avatar: newReviewRole === 'turista' 
        ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=facearea&facepad=2&w=128&h=128&q=80"
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=facearea&facepad=2&w=128&h=128&q=80",
      comment: newReviewComment,
      rating: 5,
      location: newReviewRole === 'turista' ? "Curitiba - PR (Turista)" : "Mazagão - AP (Local)",
      date: t('common.now'),
      externalCleanlinessRating: newReviewCleanSidewalk ? 5 : 3,
      hasCleanSidewalkBadge: newReviewCleanSidewalk
    };

    setReviews([added, ...reviews]);
    setNewReviewName('');
    setNewReviewComment('');
  };

  // Localized Tab Content
  const tabFeatures = tList(`ecosystem.tabs.${activeTab}.features`);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-850 font-sans selection:bg-purple-900 selection:text-white scroll-smooth relative">
      
      {/* HEADER SECTION */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/85 backdrop-blur-md border-b border-stone-200/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-950 to-purple-800 flex items-center justify-center text-white shadow-md shadow-purple-900/10 border border-purple-900/10">
              <Sparkles className="w-5.5 h-5.5 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <span className="text-[10px] tracking-widest text-purple-900 font-extrabold uppercase block leading-none">{t('header.ecosystemTag')}</span>
              <h1 id="app-logo-title" className="text-xl font-black text-stone-900 tracking-tight leading-none mt-0.5">{APP_NAME}</h1>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-4 text-xs font-bold text-stone-600">
            <button onClick={() => handleScrollTo('pains')} className="hover:text-purple-950 transition-colors">{t('header.navPains')}</button>
            <button onClick={() => handleScrollTo('ecosystem')} className="hover:text-purple-950 transition-colors">{t('header.navEcosystem')}</button>
            <button onClick={() => handleScrollTo('benefits')} className="hover:text-purple-950 transition-colors">{t('header.navBenefits')}</button>
            <button onClick={() => handleScrollTo('social')} className="hover:text-purple-950 transition-colors">{t('header.navSocial')}</button>
            <button 
              onClick={() => setIsTechModalOpen(true)}
              className="bg-purple-950 text-purple-200 hover:bg-purple-900 hover:text-white px-3 py-1.5 rounded-full border border-purple-800 flex items-center gap-1.5 transition shadow-sm"
            >
              <Database className="w-3.5 h-3.5 text-amber-400" />
              {t('header.navDoc')}
            </button>
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Language Selector Dropdown */}
            <LanguageSelector variant="dropdown" />

            <button 
              onClick={() => setIsTechModalOpen(true)}
              className="hidden sm:inline-flex text-xs font-bold text-purple-950 bg-purple-100 hover:bg-purple-200 border border-purple-300 px-3 py-2 rounded-xl transition items-center gap-1.5"
            >
              <Code2 className="w-3.5 h-3.5 text-purple-900" />
              {t('common.viewDoc')}
            </button>

            <button 
              onClick={startMockDownload}
              className="bg-gradient-to-r from-purple-950 to-purple-800 hover:from-purple-900 hover:to-purple-700 text-white font-extrabold text-xs px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-lg shadow-purple-950/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-amber-300" /> 
              <span className="hidden xs:inline">{t('common.downloadApp')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* STRATEGIC WORKSPACE DRAWER - FLOATING INDICATOR */}
      <div className="bg-amber-500 text-stone-950 px-4 py-2 border-y border-amber-600/20 text-center font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 select-none z-30 relative">
        <Truck className="w-4 h-4 text-stone-950 animate-bounce shrink-0" />
        <span><strong>{t('topBanner.badge')}</strong> {t('topBanner.text')}</span>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20">

        {/* SECTION 1: HERO (CABEÇALHO) */}
        <section 
          id="hero" 
          ref={heroRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4 pb-8 items-center border-b border-stone-200/50"
        >
          {/* Landing page verbal hook */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-purple-100/60 border border-purple-200 text-purple-950 px-3.5 py-1.5 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              {t('hero.tag')}
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 leading-[1.08] tracking-tight">
              {t('hero.titlePrefix')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-950 via-purple-800 to-emerald-900">
                {t('hero.titleGradient')}
              </span> {t('hero.titleSuffix')}
            </h2>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl">
              {t('hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4 pt-1">
              <div className="flex flex-wrap gap-3">
                {/* App Store button */}
                <button 
                  onClick={startMockDownload}
                  className="bg-black text-white px-5 py-3 rounded-xl flex items-center gap-3 hover:bg-neutral-800 transition shadow-md border border-neutral-800"
                >
                  <Smartphone className="w-6 h-6 text-neutral-100 shrink-0" />
                  <div className="text-left">
                    <span className="text-[9px] block text-neutral-400 capitalize">{t('common.downloadOn')}</span>
                    <span className="text-xs font-extrabold block -mt-1 font-mono tracking-tight text-white">{t('common.appStore')}</span>
                  </div>
                </button>

                {/* Google Play button */}
                <button 
                  onClick={startMockDownload}
                  className="bg-black text-white px-5 py-3 rounded-xl flex items-center gap-3 hover:bg-neutral-800 transition shadow-md border border-neutral-800"
                >
                  <PlayStoreIcon />
                  <div className="text-left">
                    <span className="text-[9px] block text-neutral-400 capitalize">{t('common.availableOn')}</span>
                    <span className="text-xs font-extrabold block -mt-1 font-mono tracking-tight text-white">{t('common.googlePlay')}</span>
                  </div>
                </button>
              </div>

              <div className="flex items-center gap-2 text-stone-500 text-xs sm:border-l sm:border-stone-200 sm:pl-4">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="font-medium">
                  <strong>4.9/5★</strong> {t('hero.ratingText')}
                </p>
              </div>
            </div>

            {/* Brief tag representing features */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 bg-stone-100/60 rounded-2xl p-3 border border-stone-200/50 text-[10px] font-semibold text-stone-600">
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> {t('hero.badges.healthSurveillance')}
              </div>
              <div className="flex items-center gap-1.5 justify-center sm:justify-start text-blue-900 font-bold bg-blue-50/80 px-1.5 py-0.5 rounded-lg border border-blue-200/60">
                <Droplets className="w-3.5 h-3.5 text-cyan-600 fill-cyan-600 shrink-0" /> {t('hero.badges.mineralWater')}
              </div>
              <div className="flex items-center gap-1.5 justify-center sm:justify-start text-rose-900 font-bold bg-rose-50/80 px-1.5 py-0.5 rounded-lg border border-rose-200/60">
                <Truck className="w-3.5 h-3.5 text-rose-600 shrink-0" /> {t('hero.badges.bergueAlert')}
              </div>
              <div className="flex items-center gap-1.5 justify-center sm:justify-start text-amber-900 font-bold bg-amber-50/80 px-1.5 py-0.5 rounded-lg border border-amber-200/60">
                <Coins className="w-3.5 h-3.5 text-amber-600 shrink-0" /> {t('hero.badges.acaiCoins')}
              </div>
              <div className="flex items-center gap-1.5 justify-center sm:justify-start col-span-2 sm:col-span-1 text-purple-900 font-bold bg-purple-50/80 px-1.5 py-0.5 rounded-lg border border-purple-200/60">
                <GraduationCap className="w-3.5 h-3.5 text-purple-700 shrink-0" /> {t('hero.badges.sebraeSeal')}
              </div>
            </div>
          </div>

          {/* Interactive Smartphone App simulator - Visual representation */}
          <div id="app-simulator-mockup" className="lg:col-span-5 flex justify-center transition-all duration-300">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-purple-800 to-emerald-700 rounded-[52px] blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <AppSimulator />
            </div>
          </div>
        </section>


        {/* SECTION 2: A DOR DO USUÁRIO & DO BATEDOR (SEGMENTADA) */}
        <section 
          id="pains" 
          ref={painsRef}
          className="py-6 border-b border-stone-200/50 space-y-10"
        >
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-extrabold text-purple-950 bg-purple-100/55 px-3.5 py-1.5 rounded-full">
              {t('pains.tag')}
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
              {t('pains.title')}
            </h3>
            <p className="text-stone-600 text-sm sm:text-base">
              {t('pains.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD 1: O CONSUMIDOR & ÁGUA PURA */}
            <div className="bg-white p-7 rounded-3xl shadow-sm border border-stone-200 relative overflow-hidden flex flex-col justify-between group hover:border-purple-800 hover:shadow-md transition-all duration-300">
              <div className="space-y-3">
                <div className="w-11 h-11 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-900">
                  <Droplets className="w-6 h-6 shrink-0" />
                </div>
                <div>
                  <span className="inline-block bg-blue-100 text-blue-950 font-extrabold px-2.5 py-1 rounded text-[10px] uppercase mb-1">
                    {t('pains.cards.consumer.tag')}
                  </span>
                  <h4 className="text-lg font-extrabold text-stone-950">{t('pains.cards.consumer.title')}</h4>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  {t('pains.cards.consumer.description')}
                </p>
              </div>

              <div className="mt-5 border-t border-stone-100 pt-3 flex items-center justify-between">
                <span className="text-stone-500 text-[11px] font-semibold">{t('pains.cards.consumer.actionLabel')}</span>
                <button 
                  onClick={() => handleScrollTo('hero')}
                  className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-blue-900 group-hover:text-white flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CARD 2: O BATEDOR & ESPAÇO FÍSICO / CHORUME */}
            <div className="bg-white p-7 rounded-3xl shadow-sm border border-stone-200 relative overflow-hidden flex flex-col justify-between group hover:border-rose-800 hover:shadow-md transition-all duration-300">
              <div className="space-y-3">
                <div className="w-11 h-11 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-900">
                  <AlertTriangle className="w-6 h-6 shrink-0" />
                </div>
                <div>
                  <span className="inline-block bg-rose-100 text-rose-950 font-extrabold px-2.5 py-1 rounded text-[10px] uppercase mb-1">
                    {t('pains.cards.batedor.tag')}
                  </span>
                  <h4 className="text-lg font-extrabold text-stone-950">{t('pains.cards.batedor.title')}</h4>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  {t('pains.cards.batedor.description')}
                </p>
              </div>

              <div className="mt-5 border-t border-stone-100 pt-3 flex items-center justify-between">
                <span className="text-stone-500 text-[11px] font-semibold">{t('pains.cards.batedor.actionLabel')}</span>
                <button 
                  onClick={() => handleScrollTo('ecosystem')}
                  className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-rose-900 group-hover:text-white flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CARD 3: CUSTO DE INSUMOS & GAMIFICAÇÃO */}
            <div className="bg-white p-7 rounded-3xl shadow-sm border border-stone-200 relative overflow-hidden flex flex-col justify-between group hover:border-amber-800 hover:shadow-md transition-all duration-300">
              <div className="space-y-3">
                <div className="w-11 h-11 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-900">
                  <Coins className="w-6 h-6 shrink-0" />
                </div>
                <div>
                  <span className="inline-block bg-amber-100 text-amber-950 font-extrabold px-2.5 py-1 rounded text-[10px] uppercase mb-1">
                    {t('pains.cards.supplies.tag')}
                  </span>
                  <h4 className="text-lg font-extrabold text-stone-950">{t('pains.cards.supplies.title')}</h4>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  {t('pains.cards.supplies.description')}
                </p>
              </div>

              <div className="mt-5 border-t border-stone-100 pt-3 flex items-center justify-between">
                <span className="text-stone-500 text-[11px] font-semibold">{t('pains.cards.supplies.actionLabel')}</span>
                <button 
                  onClick={() => handleScrollTo('benefits')}
                  className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-amber-900 group-hover:text-white flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Value contrast panel */}
          <div className="bg-gradient-to-r from-stone-900 to-stone-950 text-stone-100 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row justify-between items-center gap-6 border border-stone-850 shadow-lg">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-rose-400">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs uppercase font-bold tracking-wider">{t('pains.contrastBox.tag')}</span>
              </div>
              <h4 className="text-lg font-bold text-white">{t('pains.contrastBox.title')}</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                {t('pains.contrastBox.description')}
              </p>
            </div>
            
            <div className="flex items-center gap-4 border-l border-stone-800 pl-0 lg:pl-8 py-2 shrink-0">
              <div className="text-center">
                <span className="text-2xl font-black text-cyan-400 block font-mono">{t('pains.contrastBox.stat1Number')}</span>
                <span className="text-[10px] text-stone-400 uppercase font-semibold">{t('pains.contrastBox.stat1Label')}</span>
              </div>
              <div className="text-center">
                <span className="text-2xl font-black text-rose-400 block font-mono">{t('pains.contrastBox.stat2Number')}</span>
                <span className="text-[10px] text-stone-400 uppercase font-semibold">{t('pains.contrastBox.stat2Label')}</span>
              </div>
              <div className="text-center">
                <span className="text-2xl font-black text-amber-400 block font-mono">{t('pains.contrastBox.stat3Number')}</span>
                <span className="text-[10px] text-stone-400 uppercase font-semibold">{t('pains.contrastBox.stat3Label')}</span>
              </div>
            </div>
          </div>
        </section>


        {/* SECTION 3: SEÇÃO INTERATIVA DE 3 ABAS (O ECOSSISTEMA) */}
        <section 
          id="ecosystem" 
          ref={ecosystemRef}
          className="py-6 border-b border-stone-200/50 space-y-8"
        >
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase font-extrabold text-emerald-900 bg-emerald-100/60 px-3.5 py-1.5 rounded-full">
              {t('ecosystem.tag')}
            </span>
            <h3 className="text-3xl font-black text-stone-900 tracking-tight">{t('ecosystem.title')}</h3>
            <p className="text-stone-500 text-sm">
              {t('ecosystem.subtitle')}
            </p>
          </div>

          {/* Tab Switcher Headers */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-stone-200 pb-2">
            {(['produtores', 'batideiras', 'residuos'] as TabCategory[]).map((tabKey) => {
              const IconComponent = tabKey === 'produtores' ? Leaf : tabKey === 'batideiras' ? ShieldCheck : Truck;
              const isSelected = activeTab === tabKey;

              return (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all ${
                    isSelected 
                      ? 'bg-purple-950 text-white shadow-md shadow-purple-950/10' 
                      : 'bg-stone-100 hover:bg-stone-200/80 text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <IconComponent className="w-4 h-4 shrink-0" />
                  {t(`ecosystem.tabs.${tabKey}.tabTitle`)}
                </button>
              );
            })}
          </div>

          {/* Tab Screen Content */}
          <div className="bg-white rounded-3xl border border-stone-205 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1.5">
                <span className="inline-block bg-emerald-100 text-emerald-950 text-[10px] uppercase font-mono font-bold px-3 py-1 rounded-full">
                  {t(`ecosystem.tabs.${activeTab}.badge`)}
                </span>
                <h4 className="text-2xl font-extrabold text-stone-900 leading-snug">{t(`ecosystem.tabs.${activeTab}.title`)}</h4>
                <p className="text-stone-700 text-xs sm:text-sm font-semibold">{t(`ecosystem.tabs.${activeTab}.subtitle`)}</p>
              </div>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {t(`ecosystem.tabs.${activeTab}.description`)}
              </p>

              {/* Bullet features */}
              <div className="space-y-2.5">
                {tabFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-stone-700 text-xs sm:text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Simulated Tab CTA and trigger simulator navigation */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    const target = document.getElementById('app-simulator-mockup');
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      target.classList.add('ring-purple-700', 'animate-pulse');
                      setTimeout(() => target.classList.remove('ring-purple-700', 'animate-pulse'), 2500);
                    }
                  }}
                  className="bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition shadow flex items-center gap-2"
                >
                  {t(`ecosystem.tabs.${activeTab}.ctaText`)} <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsTechModalOpen(true)}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs px-4 py-3 rounded-xl border border-stone-300 transition flex items-center gap-2"
                >
                  <Database className="w-3.5 h-3.5 text-purple-900" />
                  {t('common.viewTableDDL')}
                </button>
              </div>
            </div>

            {/* Micro infographics for Tab */}
            <div className="lg:col-span-5 bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-6 text-center space-y-4">
              <p className="text-[10px] text-stone-400 font-extrabold uppercase tracking-wider">{t('ecosystem.metricCardTitle')}</p>
              
              <div className="space-y-1 py-4">
                <span className="text-5xl font-black text-purple-950 font-mono tracking-tight block">
                  {t(`ecosystem.tabs.${activeTab}.metricValue`)}
                </span>
                <span className="text-xs font-bold text-stone-700 block">
                  {t(`ecosystem.tabs.${activeTab}.metricLabel`)}
                </span>
                <span className="text-[11px] text-stone-400 block">
                  {t(`ecosystem.tabs.${activeTab}.metricSub`)}
                </span>
              </div>

              <div className="bg-white rounded-xl border border-stone-150 p-3 text-left text-xs space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <strong className="text-stone-800">{t('ecosystem.slaTitle')}</strong>
                </div>
                <p className="text-[10px] text-stone-500 leading-relaxed">
                  {t('ecosystem.slaDescription')}
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* SECTION 4: FACILIDADES & RECURSOS TANGÍVEIS */}
        <section 
          id="benefits" 
          ref={benefitsRef}
          className="py-6 border-b border-stone-200/50 space-y-10"
        >
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase font-extrabold text-purple-950 bg-stone-100 border border-stone-200 px-3.5 py-1.5 rounded-full">
              {t('benefits.tag')}
            </span>
            <h3 className="text-3xl font-black text-stone-900 tracking-tight">{t('benefits.title')}</h3>
            <p className="text-stone-505 text-sm">
              {t('benefits.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(['agua', 'bergue', 'coins', 'sebrae', 'auditoria', 'ifood'] as const).map((benefitId) => {
              const IconComp = benefitId === 'agua' ? Droplets : benefitId === 'bergue' ? Truck : benefitId === 'coins' ? Coins : benefitId === 'sebrae' ? GraduationCap : benefitId === 'auditoria' ? Sparkles : ShoppingBag;
              const colorBg = benefitId === 'agua' 
                ? 'bg-blue-50 text-blue-800' 
                : benefitId === 'bergue' 
                  ? 'bg-rose-50 text-rose-700'
                  : benefitId === 'coins' 
                    ? 'bg-amber-50 text-amber-800'
                    : benefitId === 'sebrae'
                      ? 'bg-purple-50 text-purple-800'
                      : benefitId === 'auditoria'
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'bg-stone-50 text-stone-800';

              return (
                <div 
                  key={benefitId} 
                  className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:scale-[1.02] hover:shadow-md transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorBg}`}>
                      <IconComp className="w-5.5 h-5.5 shrink-0" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-purple-800 block mb-0.5">
                        {t(`benefits.items.${benefitId}.tag`)}
                      </span>
                      <h4 className="font-extrabold text-stone-900 text-sm">{t(`benefits.items.${benefitId}.title`)}</h4>
                    </div>
                    <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                      {t(`benefits.items.${benefitId}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* SECTION 5: PROVA SOCIAL & AUDITORIA DE CALÇADA */}
        <section 
          id="social" 
          ref={socialRef}
          className="py-6 border-b border-stone-200/50 space-y-10"
        >
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase font-extrabold text-amber-955 bg-amber-100/60 px-3.5 py-1.5 rounded-full">
              {t('reviews.tag')}
            </span>
            <h3 className="text-3xl font-black text-stone-900 tracking-tight">{t('reviews.title')}</h3>
            <p className="text-stone-500 text-xs sm:text-sm">
              {t('reviews.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((rev) => (
              <div 
                key={rev.id} 
                className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <img 
                        src={rev.avatar} 
                        alt={rev.name} 
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-full object-cover border border-purple-900/10" 
                      />
                      <div>
                        <h4 className="font-extrabold text-stone-900 text-xs sm:text-sm flex items-center gap-1.5">
                          {rev.name}
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        </h4>
                        <span className="text-[10px] text-stone-400 font-medium">
                          {rev.location}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[9px] uppercase font-extrabold px-2.5 py-1 rounded-full ${
                      rev.role === 'turista' ? 'bg-orange-100 text-orange-950' : 'bg-purple-100 text-purple-950'
                    }`}>
                      {rev.role === 'turista' ? t('reviews.roles.tourist') : t('reviews.roles.local')}
                    </span>
                  </div>

                  {/* Stars & Calçada Clean Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-amber-400 gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {rev.hasCleanSidewalkBadge && (
                      <span className="inline-flex items-center gap-1 text-[8px] font-extrabold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                        <Sparkles className="w-2.5 h-2.5 text-emerald-700" /> {t('reviews.cleanSidewalkBadge')}
                      </span>
                    )}
                  </div>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="text-[10px] text-stone-400 border-t border-stone-100 pt-3 flex items-center justify-between">
                  <span>{t('reviews.deviceCertified')}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive simulator: leave review form */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-210 shadow-sm max-w-xl mx-auto space-y-4">
            <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
              <Smile className="text-purple-900 w-5 h-5" /> {t('reviews.formTitle')}
            </h4>
            <p className="text-stone-500 text-xs">
              {t('reviews.formSubtitle')}
            </p>

            <form onSubmit={handleCreateReview} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-stone-500 uppercase font-bold block mb-1">{t('reviews.nameLabel')}</label>
                  <input
                    type="text"
                    required
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    placeholder={t('reviews.namePlaceholder')}
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-purple-900 outline-none text-stone-850"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-stone-500 uppercase font-bold block mb-1">{t('reviews.roleLabel')}</label>
                  <select
                    value={newReviewRole}
                    onChange={(e) => setNewReviewRole(e.target.value as 'turista' | 'local')}
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-purple-900 outline-none text-stone-850"
                  >
                    <option value="local">{t('reviews.roleOptionLocal')}</option>
                    <option value="turista">{t('reviews.roleOptionTourist')}</option>
                  </select>
                </div>
              </div>

              {/* Clean Sidewalk & Odor Check */}
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-950 text-xs block">{t('reviews.checkboxTitle')}</span>
                  <span className="text-[10px] text-emerald-800">{t('reviews.checkboxSubtitle')}</span>
                </div>
                <input
                  type="checkbox"
                  checked={newReviewCleanSidewalk}
                  onChange={(e) => setNewReviewCleanSidewalk(e.target.checked)}
                  className="w-5 h-5 accent-emerald-700 rounded cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[10px] text-stone-500 uppercase font-bold block mb-1">{t('reviews.commentLabel')}</label>
                <textarea
                  required
                  rows={2}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder={t('reviews.commentPlaceholder')}
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-purple-900 outline-none text-stone-850"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-950 to-purple-800 text-white font-bold py-2.5 rounded-xl text-xs hover:shadow transition"
              >
                {t('reviews.submitButton')}
              </button>
            </form>
          </div>
        </section>


        {/* ADVANCED RAIO-X WORKSPACE CONTAINER */}
        <section className="py-2">
          <UXWorkspace onScrollToSection={handleScrollTo} activeSectionIndex={activeUXSection} />
        </section>


        {/* SECTION 6: STYLE GUIDE & VISUAL DOCUMENTATION */}
        <section 
          id="guide" 
          ref={guideRef}
          className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-150 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-850 shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-stone-900 text-base">{t('styleGuide.title')}</h4>
                <p className="text-xs text-stone-400">{t('styleGuide.subtitle')}</p>
              </div>
            </div>

            <button
              onClick={() => setIsTechModalOpen(true)}
              className="flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-amber-400 text-xs font-mono font-bold px-3 py-2 rounded-xl transition self-start sm:self-auto"
            >
              <Database className="w-3.5 h-3.5" />
              {t('common.seeSQLDDL')}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
            
            {/* Color swatches */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-150 space-y-4">
              <h5 className="font-bold text-stone-900 uppercase">{t('styleGuide.paletteTitle')}</h5>
              <p className="text-stone-500 text-[11px]">{t('styleGuide.paletteDesc')}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#3B0D2C] ring-1 ring-stone-950/10 shrink-0"></div>
                  <div>
                    <span className="font-bold text-stone-950 block">{t('styleGuide.color1Name')}</span>
                    <span className="text-[10px] text-stone-400 block">{t('styleGuide.color1Desc')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#113B25] ring-1 ring-stone-950/10 shrink-0"></div>
                  <div>
                    <span className="font-bold text-stone-950 block">{t('styleGuide.color2Name')}</span>
                    <span className="text-[10px] text-stone-400 block">{t('styleGuide.color2Desc')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#F59E0B] ring-1 ring-stone-950/10 shrink-0"></div>
                  <div>
                    <span className="font-bold text-stone-950 block">{t('styleGuide.color3Name')}</span>
                    <span className="text-[10px] text-stone-400 block">{t('styleGuide.color3Desc')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Readability & Layout principles */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-150 space-y-4">
              <h5 className="font-bold text-stone-900 uppercase">{t('styleGuide.scannabilityTitle')}</h5>
              <p className="text-stone-500 text-[11px]">{t('styleGuide.scannabilityDesc')}</p>
              
              <ul className="space-y-2 list-disc list-inside text-stone-600 font-medium">
                {tList('styleGuide.scannabilityPoints').map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>

            {/* Tone of Voice rules */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-150 space-y-4">
              <h5 className="font-bold text-stone-900 uppercase">{t('styleGuide.toneTitle')}</h5>
              <p className="text-stone-500 text-[11px]">{t('styleGuide.toneDesc')}</p>
              
              <ul className="space-y-2 list-none text-stone-600 font-medium">
                <li className="pb-1.5 border-b border-stone-200">
                  <span className="text-purple-900 font-extrabold block">● {t('styleGuide.tonePoints.0.title')}</span>
                  {t('styleGuide.tonePoints.0.desc')}
                </li>
                <li className="pb-1.5 border-b border-stone-200">
                  <span className="text-purple-900 font-extrabold block">● {t('styleGuide.tonePoints.1.title')}</span>
                  {t('styleGuide.tonePoints.1.desc')}
                </li>
                <li>
                  <span className="text-purple-900 font-extrabold block">● {t('styleGuide.tonePoints.2.title')}</span>
                  {t('styleGuide.tonePoints.2.desc')}
                </li>
              </ul>
            </div>

          </div>
        </section>


        {/* FINAL CTA PANEL (RODAPÉ) */}
        <section className="bg-gradient-to-br from-purple-950 via-purple-900 to-emerald-950 text-white rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl"></div>
          
          <div className="max-w-xl mx-auto space-y-6 relative">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto text-amber-300 backdrop-blur-md">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>

            <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
              {t('finalCta.title')}
            </h3>
            
            <p className="text-purple-100 opacity-90 text-sm sm:text-base leading-relaxed">
              {t('finalCta.description')}
            </p>

            {/* App buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button 
                onClick={startMockDownload}
                className="bg-white text-stone-950 hover:bg-purple-100 font-extrabold px-6 py-3 rounded-xl shadow transition text-xs flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-purple-900" /> {t('finalCta.appStoreButton')}
              </button>
              
              <button 
                onClick={startMockDownload}
                className="bg-purple-900/40 hover:bg-purple-900/60 text-white font-extrabold px-6 py-3 rounded-xl border border-purple-800/60 shadow transition text-xs flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-amber-300" /> {t('finalCta.androidButton')}
              </button>
            </div>

            <div className="text-[10px] text-purple-200/70 pt-2 font-mono">
              {t('finalCta.compatibility')}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 py-12 mt-12 border-t border-stone-800 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex justify-center items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-purple-950 flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </div>
            <strong className="text-white text-sm">{APP_NAME} Ecosystem</strong>
          </div>

          <p className="max-w-md mx-auto leading-relaxed">
            {t('footer.description')}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 text-stone-500 font-semibold border-t border-stone-850 pt-6">
            <p>{t('footer.copyright')}</p>
            <span>•</span>
            <button onClick={() => setIsTechModalOpen(true)} className="text-amber-400 hover:underline">
              {t('footer.docLink')}
            </button>
            <span>•</span>
            <div className="inline-block">
              <LanguageSelector variant="compact" />
            </div>
          </div>
        </div>
      </footer>

      {/* TECHNICAL ARCHITECTURE MODAL */}
      <TechArchitectureModal
        isOpen={isTechModalOpen}
        onClose={() => setIsTechModalOpen(false)}
      />

      {/* DOWNLOAD INTERACTIVE PROGRESS DIALOG/MODAL */}
      <AnimatePresence>
        {isDownloadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-stone-850 rounded-[28px] p-6 max-w-sm w-full border border-stone-200 shadow-2xl relative overflow-hidden space-y-5"
            >
              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <h4 className="font-extrabold text-stone-900 text-sm">{t('downloadModal.title')}</h4>
                <button 
                  onClick={() => setIsDownloadModalOpen(false)}
                  className="text-stone-400 hover:text-stone-600 text-sm font-bold bg-stone-100 w-6 h-6 rounded-full flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              {!isDownloaded ? (
                <div className="space-y-4 text-center py-4">
                  <div className="w-14 h-14 bg-purple-50 text-purple-900 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm">{t('downloadModal.inProgressDesc')}</h5>
                    <p className="text-[11px] text-stone-400 mt-1">iOS & Android</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden border border-stone-200">
                      <div 
                        className="bg-gradient-to-r from-purple-900 to-purple-700 h-full transition-all duration-250"
                        style={{ width: `${downloadProgress}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] font-mono text-purple-900 font-extrabold">{downloadProgress}%</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-center py-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-emerald-900">{t('downloadModal.completedTitle')}</h5>
                    <p className="text-[11px] text-stone-500 mt-1">{t('downloadModal.completedDesc')}</p>
                  </div>

                  {/* QR code simulation for downloads */}
                  <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl flex items-center justify-center gap-3 max-w-[240px] mx-auto text-left">
                    <QrCode className="w-12 h-12 text-stone-800 shrink-0" />
                    <div>
                      <p className="font-bold text-[10px]">QR Code Mobile</p>
                      <p className="text-[9px] text-stone-500">{t('downloadModal.openApp')}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setIsDownloadModalOpen(false);
                      handleScrollTo('hero');
                    }}
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-2 rounded-xl text-xs transition"
                  >
                    {t('downloadModal.openApp')}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Custom simple Play Store Icon to avoid unrequested imports
function PlayStoreIcon() {
  return (
    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.1,1.4C4.8,1.7,4.6,2.3,4.6,3v18c0,0.7,0.2,1.3,0.5,1.6L5.2,22.7L15,12.9v-0.2L5.2,1.3L5.1,1.4 L5.1,1.4z" fill="#00e5ff"/>
      <path d="M18.2,16.1l-3.2-3.2v-0.2l3.2-3.2l3.8,2.2c1.1,0.6,1.1,1.7,0,2.3L18.2,16.1z" fill="#ffeb3b"/>
      <path d="M15,12.7L5.2,22.5c0.3,0.3,0.9,0.4,1.5,0.1L20.5,14L15,12.7z" fill="#ff2d55"/>
      <path d="M15,12.3L20.5,10L6.7,1.4c-0.6-0.3-1.2-0.2-1.5,0.1L15,12.3z" fill="#4caf50"/>
    </svg>
  );
}
