import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Award, 
  ShieldCheck, 
  ShoppingBag, 
  Star, 
  Sparkles, 
  Navigation, 
  Heart, 
  ChevronRight, 
  Recycle, 
  Info, 
  CheckCircle, 
  Droplets, 
  Filter, 
  Check, 
  Truck, 
  Coins, 
  GraduationCap, 
  AlertTriangle, 
  Clock, 
  QrCode, 
  Flame, 
  UserCheck,
  Building2,
  RefreshCw,
  Gift
} from 'lucide-react';
import { Point, WaterType, MarketplaceRewardItem, SebraeCourseModule } from '../types';
import { MARKETPLACE_REWARDS, SEBRAE_MODULES } from '../data';

const AC_POINTS: Point[] = [
  { 
    id: '1', 
    name: 'Açaí do Seu Jorge', 
    type: 'Batideira Legalizada', 
    rating: 4.9, 
    reviews: 142, 
    distance: '350m', 
    price: 'R$ 18/kg', 
    color: 'bg-amber-500', 
    lat: 30, 
    lng: 45, 
    thickness: 'Grosso',
    waterType: 'mineral',
    waterSource: 'Água Mineral Selada (Galão 20L)',
    waterSealDate: 'Válido até 10/2026',
    sebraeCertified: true,
    sidewalkCleanScore: 5.0,
    hasCleanSidewalkBonus: true,
    bergueStatus: 'normal'
  },
  { 
    id: '2', 
    name: 'Açaí Ribeirinho', 
    type: 'Cooperativa Sustentável', 
    rating: 4.8, 
    reviews: 98, 
    distance: '1.2 km', 
    price: 'R$ 16/kg', 
    color: 'bg-emerald-500', 
    lat: 70, 
    lng: 25, 
    thickness: 'Grosso',
    waterType: 'filtrada',
    waterSource: 'Filtro Bacteriológico UV 3 Estágios',
    waterSealDate: 'Válido até 09/2026',
    sebraeCertified: true,
    sidewalkCleanScore: 4.9,
    hasCleanSidewalkBonus: true,
    bergueStatus: 'normal'
  },
  { 
    id: '3', 
    name: 'Sabor da Terra', 
    type: 'Artesanal Puro', 
    rating: 4.7, 
    reviews: 204, 
    distance: '800m', 
    price: 'R$ 15/kg', 
    color: 'bg-purple-600', 
    lat: 55, 
    lng: 75, 
    thickness: 'Médio',
    waterType: 'mineral',
    waterSource: 'Água Mineral da Fonte Auditada',
    waterSealDate: 'Válido até 11/2026',
    sebraeCertified: false,
    sidewalkCleanScore: 4.2,
    hasCleanSidewalkBonus: false,
    bergueStatus: 'normal'
  },
  { 
    id: '4', 
    name: 'Ponto do Açaí Belém', 
    type: 'Batedor Tradicional', 
    rating: 4.9, 
    reviews: 318, 
    distance: '500m', 
    price: 'R$ 19/kg', 
    color: 'bg-blue-600', 
    lat: 25, 
    lng: 80, 
    thickness: 'Grosso',
    waterType: 'filtrada',
    waterSource: 'Microfiltração com Carvão Ativado',
    waterSealDate: 'Válido até 12/2026',
    sebraeCertified: true,
    sidewalkCleanScore: 4.8,
    hasCleanSidewalkBonus: true,
    bergueStatus: 'normal'
  }
];

export default function AppSimulator() {
  // App Mode toggle
  const [appMode, setAppMode] = useState<'b2c' | 'b2b'>('b2c');

  // B2C Consumer State
  const [activeTabB2C, setActiveTabB2C] = useState<'mapa' | 'ranking' | 'auditoria'>('mapa');
  const [waterFilter, setWaterFilter] = useState<'todos' | 'mineral' | 'filtrada'>('todos');
  const [selectedPoint, setSelectedPoint] = useState<Point>(AC_POINTS[0]);
  const [likes, setLikes] = useState<Record<string, number>>({ '1': 142, '2': 98, '3': 204, '4': 318 });
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>({});
  const [auditedPoints, setAuditedPoints] = useState<Record<string, boolean>>({});

  // B2B Batedor State
  const [activeTabB2B, setActiveTabB2B] = useState<'bergue' | 'carteira' | 'marketplace' | 'sebrae'>('bergue');
  const [bergueAlertActive, setBergueAlertActive] = useState(false);
  const [countdownMinutes, setCountdownMinutes] = useState(18);
  const [countdownSeconds, setCountdownSeconds] = useState(45);
  const [acaiCoins, setAcaiCoins] = useState(850);
  const [showCoinCelebration, setShowCoinCelebration] = useState(false);
  const [redeemedRewards, setRedeemedRewards] = useState<Record<string, string>>({});
  const [sebraeModules, setSebraeModules] = useState<SebraeCourseModule[]>(SEBRAE_MODULES);
  const [isSebraeCertified, setIsSebraeCertified] = useState(true);

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (bergueAlertActive && (countdownMinutes > 0 || countdownSeconds > 0)) {
      interval = setInterval(() => {
        if (countdownSeconds > 0) {
          setCountdownSeconds(s => s - 1);
        } else if (countdownMinutes > 0) {
          setCountdownMinutes(m => m - 1);
          setCountdownSeconds(59);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [bergueAlertActive, countdownMinutes, countdownSeconds]);

  const filteredPoints = AC_POINTS.filter(pt => {
    if (waterFilter === 'todos') return true;
    return pt.waterType === waterFilter;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (userLikes[id]) {
      setLikes(prev => ({ ...prev, [id]: prev[id] - 1 }));
      setUserLikes(prev => ({ ...prev, [id]: false }));
    } else {
      setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
      setUserLikes(prev => ({ ...prev, [id]: true }));
    }
  };

  const handleAuditSidewalk = (pointId: string) => {
    setAuditedPoints(prev => ({ ...prev, [pointId]: true }));
    setTimeout(() => {
      alert("✅ Auditoria confirmada! Você avaliou este ponto com 'Calçada Limpa & Sem Odor'. Multiplicador de 1.5x aplicado ao batedor no ranking semanal!");
    }, 200);
  };

  const handleTriggerBergue = () => {
    setBergueAlertActive(true);
    setCountdownMinutes(18);
    setCountdownSeconds(30);
  };

  const handleCompletePickup = () => {
    setBergueAlertActive(false);
    setAcaiCoins(prev => prev + 150);
    setShowCoinCelebration(true);
    setTimeout(() => setShowCoinCelebration(false), 3500);
  };

  const handleRedeemReward = (reward: MarketplaceRewardItem) => {
    if (acaiCoins < reward.costCoins) {
      alert("Saldo insuficiente de Açaí Coins! Colete mais bergues de caroço ou assista às pílulas do Sebrae para acumular moedas.");
      return;
    }
    const voucherCode = `AC-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    setAcaiCoins(prev => prev - reward.costCoins);
    setRedeemedRewards(prev => ({ ...prev, [reward.id]: voucherCode }));
  };

  const handleCompleteSebrae = (moduleId: string, reward: number) => {
    setSebraeModules(prev =>
      prev.map(m => m.id === moduleId ? { ...m, completed: true } : m)
    );
    setAcaiCoins(prev => prev + reward);
    setIsSebraeCertified(true);
    setShowCoinCelebration(true);
    setTimeout(() => setShowCoinCelebration(false), 3000);
  };

  return (
    <div className="relative mx-auto w-full max-w-[340px] h-[690px] bg-stone-950 rounded-[44px] p-3 shadow-2xl border-4 border-stone-800 flex flex-col justify-between select-none">
      
      {/* Smartphone Speaker & Camera Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-stone-900 rounded-full flex items-center justify-center z-30">
        <div className="w-10 h-1 bg-stone-700 rounded-full"></div>
        <div className="w-2.5 h-2.5 bg-stone-950 rounded-full ml-3 border border-stone-800"></div>
      </div>

      {/* Screen Area */}
      <div className="w-full h-full bg-stone-50 rounded-[34px] overflow-hidden flex flex-col pt-5 relative text-stone-800 font-sans">
        
        {/* Top Status Bar & Role Switcher */}
        <div className="bg-gradient-to-r from-purple-950 to-stone-900 text-stone-100 px-3.5 py-2 shrink-0">
          <div className="flex justify-between items-center text-[10px] opacity-75 font-mono mb-1">
            <span>AçaíSeguro • 5G</span>
            <span>17:00</span>
          </div>

          {/* Profile Mode Switcher Pill */}
          <div className="flex items-center justify-between gap-1 bg-stone-900/90 p-1 rounded-xl border border-stone-700/60 mt-0.5">
            <button
              onClick={() => setAppMode('b2c')}
              className={`flex-1 py-1 rounded-lg text-[10px] font-extrabold flex items-center justify-center gap-1 transition ${
                appMode === 'b2c'
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3 h-3 text-amber-400" />
              Consumidor (B2C)
            </button>
            <button
              onClick={() => setAppMode('b2b')}
              className={`flex-1 py-1 rounded-lg text-[10px] font-extrabold flex items-center justify-center gap-1 transition ${
                appMode === 'b2b'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Truck className="w-3 h-3 text-emerald-300" />
              Batedor (B2B)
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* VIEW 1: CONSUMER (B2C) */}
        {/* ======================================================== */}
        {appMode === 'b2c' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* SUB-TABS B2C */}
            <div className="flex border-b border-stone-200 bg-white text-[10px] font-bold shrink-0">
              <button 
                onClick={() => setActiveTabB2C('mapa')} 
                className={`flex-1 py-1.5 flex items-center justify-center gap-1 border-b-2 ${activeTabB2C === 'mapa' ? 'border-purple-900 text-purple-950 font-extrabold bg-purple-50/50' : 'border-transparent text-stone-500'}`}
              >
                <MapPin className="w-3 h-3" /> Mapa Seguro
              </button>
              <button 
                onClick={() => setActiveTabB2C('ranking')} 
                className={`flex-1 py-1.5 flex items-center justify-center gap-1 border-b-2 ${activeTabB2C === 'ranking' ? 'border-purple-900 text-purple-950 font-extrabold bg-purple-50/50' : 'border-transparent text-stone-500'}`}
              >
                <Award className="w-3 h-3" /> Ranking 1.5x
              </button>
            </div>

            {/* TAB: MAPA SEGURO */}
            {activeTabB2C === 'mapa' && (
              <div className="flex-1 flex flex-col h-full bg-stone-100 overflow-hidden">
                
                {/* Water Source & Filter Chips */}
                <div className="bg-white border-b border-stone-200 px-2 py-1 flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0">
                  <span className="text-[8px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-0.5 mr-0.5">
                    <Filter className="w-2.5 h-2.5" /> Água:
                  </span>
                  <button
                    onClick={() => setWaterFilter('todos')}
                    className={`px-1.5 py-0.5 rounded-full text-[8px] font-bold transition whitespace-nowrap ${
                      waterFilter === 'todos' 
                        ? 'bg-purple-900 text-white' 
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    Todas
                  </button>
                  <button
                    onClick={() => setWaterFilter('mineral')}
                    className={`px-1.5 py-0.5 rounded-full text-[8px] font-bold flex items-center gap-0.5 transition whitespace-nowrap ${
                      waterFilter === 'mineral' 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}
                  >
                    <Droplets className="w-2.5 h-2.5 text-cyan-400 fill-cyan-400" />
                    Mineral
                  </button>
                  <button
                    onClick={() => setWaterFilter('filtrada')}
                    className={`px-1.5 py-0.5 rounded-full text-[8px] font-bold flex items-center gap-0.5 transition whitespace-nowrap ${
                      waterFilter === 'filtrada' 
                        ? 'bg-emerald-700 text-white shadow-sm' 
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                    Filtrada
                  </button>
                </div>

                {/* Map Area */}
                <div className="h-[120px] w-full bg-neutral-200 relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-neutral-200 opacity-80" style={{ 
                    backgroundImage: 'radial-gradient(#a3a3a3 1px, transparent 1px), linear-gradient(0deg, #d4d4d4 1px, transparent 1px), linear-gradient(90deg, #d4d4d4 1px, transparent 1px)',
                    backgroundSize: '20px 20px, 40px 40px, 40px 40px'
                  }}></div>
                  
                  <div className="absolute top-1.5 left-4 text-[7px] font-mono text-neutral-500 bg-white/80 px-1 rounded">Av. Nazaré</div>
                  <div className="absolute bottom-8 right-2 text-[7px] font-mono text-neutral-500 rotate-90 bg-white/80 px-1 rounded">Tv. 14 de Março</div>

                  {/* Hotspots */}
                  {filteredPoints.map((pt) => (
                    <button
                      key={pt.id}
                      onClick={() => setSelectedPoint(pt)}
                      className={`absolute p-0.5 rounded-full shadow transition-all duration-300 ${selectedPoint.id === pt.id ? 'scale-125 z-20 ring-2 ring-purple-900 ring-offset-1' : 'scale-100 hover:scale-110 z-10'}`}
                      style={{ top: `${pt.lat}%`, left: `${pt.lng}%` }}
                    >
                      <div className={`relative flex items-center justify-center w-5 h-5 rounded-full text-white ${selectedPoint.id === pt.id ? 'bg-purple-950' : pt.color}`}>
                        <MapPin className="w-3 h-3" />
                        <span className={`absolute -top-1 -right-1 flex h-2 w-2 items-center justify-center rounded-full text-[5px] border border-white ${pt.waterType === 'mineral' ? 'bg-cyan-500' : 'bg-emerald-500'}`}>
                          {pt.waterType === 'mineral' ? '💧' : '🛡️'}
                        </span>
                      </div>
                    </button>
                  ))}

                  <span className="absolute bottom-1 left-1.5 bg-black/60 text-[7px] text-white px-1.5 py-0.5 rounded-full flex items-center gap-1 pointer-events-none backdrop-blur-sm">
                    <Navigation className="w-2 h-2 text-amber-400 animate-pulse" /> {filteredPoints.length} pontos auditados
                  </span>
                </div>

                {/* Point Info & Auditing Card */}
                <div className="p-2 flex-1 flex flex-col justify-between bg-white border-t border-stone-200 overflow-y-auto">
                  <div className="space-y-1">
                    
                    {/* Badges & Name */}
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="inline-block bg-purple-100 text-purple-900 font-bold px-1 py-0.2 rounded text-[7.5px]">
                        {selectedPoint.type}
                      </span>
                      {selectedPoint.sebraeCertified && (
                        <span className="inline-flex items-center gap-0.5 bg-amber-100 text-amber-900 font-extrabold px-1 py-0.2 rounded text-[7.5px] border border-amber-300">
                          <GraduationCap className="w-2.5 h-2.5 text-amber-700" /> SEBRAE
                        </span>
                      )}
                      {selectedPoint.waterType === 'mineral' ? (
                        <span className="inline-flex items-center gap-0.5 bg-blue-100 text-blue-900 font-extrabold px-1 py-0.2 rounded text-[7.5px]">
                          <Droplets className="w-2 h-2 text-blue-600 fill-blue-600" /> Mineral
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 bg-emerald-100 text-emerald-900 font-extrabold px-1 py-0.2 rounded text-[7.5px]">
                          <ShieldCheck className="w-2 h-2 text-emerald-700" /> Filtrada
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-extrabold text-stone-900 text-xs flex items-center gap-1">
                          {selectedPoint.name}
                          <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                        </h4>
                        <div className="flex items-center gap-1 text-stone-500 text-[8px] mt-0.5">
                          <span className="flex items-center text-amber-500 font-bold">
                            <Star className="w-2 h-2 fill-amber-500 text-amber-500 mr-0.5" /> {selectedPoint.rating}
                          </span>
                          <span>•</span>
                          <span className="text-emerald-600 font-medium">{selectedPoint.distance}</span>
                          <span>•</span>
                          <span className="bg-purple-900 text-white px-1 rounded-sm text-[7px] font-bold">{selectedPoint.thickness}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-purple-950 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
                        {selectedPoint.price}
                      </span>
                    </div>

                    {/* Water source detail */}
                    <div className="bg-blue-50/80 p-1.5 rounded-lg border border-blue-100 text-[8px] space-y-0.5">
                      <p className="text-blue-950 font-bold flex items-center justify-between">
                        <span>Fonte: {selectedPoint.waterSource}</span>
                        <span className="text-emerald-700">{selectedPoint.waterSealDate}</span>
                      </p>
                    </div>

                    {/* Clean Sidewalk & Odor Audit Box (B2C Innovation) */}
                    <div className="bg-emerald-50/90 p-1.5 rounded-lg border border-emerald-200 text-[8px] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-emerald-950 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                          Higiene Externa & Calçada:
                        </span>
                        <span className="bg-emerald-200 text-emerald-900 font-bold px-1 rounded text-[7px]">
                          ⚡ 1.5x Multiplicador
                        </span>
                      </div>
                      <p className="text-emerald-900 text-[7.5px] leading-tight">
                        Sem acúmulo de caroço ou odor de chorume na calçada.
                      </p>
                      
                      <button
                        onClick={() => handleAuditSidewalk(selectedPoint.id)}
                        className={`w-full py-1 px-2 rounded-md font-bold text-[8px] flex items-center justify-center gap-1 transition ${
                          auditedPoints[selectedPoint.id]
                            ? 'bg-emerald-700 text-white'
                            : 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                        }`}
                      >
                        {auditedPoints[selectedPoint.id] ? (
                          <>
                            <CheckCircle className="w-2.5 h-2.5 text-white" /> Calçada Auditada (+1.5x aplicado)
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Auditar Calçada Limpa
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-1 pt-1">
                    <a
                      href="https://www.ifood.com.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-red-600 text-white font-bold py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 hover:bg-red-700 transition text-[9px]"
                    >
                      <ShoppingBag className="w-2.5 h-2.5" /> Peça pelo iFood
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: RANKING 1.5X */}
            {activeTabB2C === 'ranking' && (
              <div className="p-2.5 space-y-1.5 bg-stone-50 flex-1 overflow-y-auto">
                <div className="bg-purple-50 p-2 rounded-xl border border-purple-100/50">
                  <h5 className="font-extrabold text-stone-900 text-[10px] flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-500" /> Ranking Semanal Comunitário
                  </h5>
                  <p className="text-[8px] text-stone-500">
                    Batedores com calçada limpa e água certificada recebem bônus 1.5x
                  </p>
                </div>

                <div className="space-y-1">
                  {AC_POINTS.map((pt, idx) => (
                    <div
                      key={pt.id}
                      className="bg-white p-2 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between text-[9px]"
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-purple-950 text-white font-black text-[8px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <h6 className="font-bold text-stone-950 text-[9px] leading-tight flex items-center gap-1">
                            {pt.name}
                            {pt.sebraeCertified && <GraduationCap className="w-2.5 h-2.5 text-amber-600" />}
                          </h6>
                          <div className="flex items-center gap-1 text-[7.5px] text-stone-500">
                            <span className="font-bold text-blue-700">{pt.waterType === 'mineral' ? '💧 Mineral' : '🛡️ Filtrada'}</span>
                            <span>•</span>
                            <span className="text-emerald-700 font-bold bg-emerald-50 px-1 rounded">⚡ 1.5x Calçada</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[9px] font-bold text-amber-600 flex items-center">
                        <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500 mr-0.5" />
                        {pt.rating}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 p-1.5 rounded-lg text-[7.5px] text-blue-950 flex items-start gap-1">
                  <Info className="w-3 h-3 text-blue-600 shrink-0 mt-0.5" />
                  <span>Moradores avaliam limpeza da calçada, garantindo ruas livres de chorume em Belém.</span>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: BATEDOR ARTESANAL (B2B & LOGÍSTICA REVERSA) */}
        {/* ======================================================== */}
        {appMode === 'b2b' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-stone-100">
            
            {/* Header: Batedor Profile & Coins Wallet */}
            <div className="bg-stone-900 text-stone-100 px-3 py-1.5 flex items-center justify-between border-b border-stone-800 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-purple-800 flex items-center justify-center font-bold text-[9px] text-purple-200">
                  SJ
                </div>
                <div>
                  <h5 className="font-extrabold text-[9.5px] leading-tight text-white flex items-center gap-1">
                    Açaí do Seu Jorge
                    {isSebraeCertified && <GraduationCap className="w-2.5 h-2.5 text-amber-400" />}
                  </h5>
                  <span className="text-[7.5px] text-emerald-400 font-bold">Batedor Ativo • Belém/PA</span>
                </div>
              </div>

              {/* Coins Pill */}
              <div className="bg-amber-400/20 border border-amber-400/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Coins className="w-3 h-3 text-amber-400 animate-bounce" />
                <span className="font-black text-amber-400 text-[10px] font-mono">{acaiCoins} AC</span>
              </div>
            </div>

            {/* Coin Celebration Overlay */}
            {showCoinCelebration && (
              <div className="absolute inset-0 z-40 bg-purple-950/90 flex flex-col items-center justify-center text-white p-4 text-center animate-fade-in">
                <Sparkles className="w-10 h-10 text-amber-400 fill-amber-400 mb-2 animate-spin-slow" />
                <h4 className="text-base font-black text-amber-300">PARABÉNS! MOEDAS RECEBIDAS!</h4>
                <p className="text-xs text-stone-200 mt-1">
                  Você ganhou Açaí Coins na sua carteira digital.
                </p>
                <div className="bg-amber-400 text-stone-950 font-black text-sm px-4 py-1.5 rounded-full font-mono mt-3 shadow-lg">
                  + Moeda Verde Creditada!
                </div>
              </div>
            )}

            {/* B2B SUB-TABS */}
            <div className="flex border-b border-stone-200 bg-white text-[8.5px] font-extrabold shrink-0">
              <button 
                onClick={() => setActiveTabB2B('bergue')} 
                className={`flex-1 py-1.5 flex items-center justify-center gap-0.5 border-b-2 ${activeTabB2B === 'bergue' ? 'border-rose-600 text-rose-700 bg-rose-50/50' : 'border-transparent text-stone-500'}`}
              >
                <AlertTriangle className="w-2.5 h-2.5" /> 1. Bergue
              </button>
              <button 
                onClick={() => setActiveTabB2B('carteira')} 
                className={`flex-1 py-1.5 flex items-center justify-center gap-0.5 border-b-2 ${activeTabB2B === 'carteira' ? 'border-amber-600 text-amber-700 bg-amber-50/50' : 'border-transparent text-stone-500'}`}
              >
                <Coins className="w-2.5 h-2.5" /> 2. Moedas
              </button>
              <button 
                onClick={() => setActiveTabB2B('marketplace')} 
                className={`flex-1 py-1.5 flex items-center justify-center gap-0.5 border-b-2 ${activeTabB2B === 'marketplace' ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50' : 'border-transparent text-stone-500'}`}
              >
                <Gift className="w-2.5 h-2.5" /> 3. Trocas
              </button>
              <button 
                onClick={() => setActiveTabB2B('sebrae')} 
                className={`flex-1 py-1.5 flex items-center justify-center gap-0.5 border-b-2 ${activeTabB2B === 'sebrae' ? 'border-purple-600 text-purple-700 bg-purple-50/50' : 'border-transparent text-stone-500'}`}
              >
                <GraduationCap className="w-2.5 h-2.5" /> 4. SEBRAE
              </button>
            </div>

            {/* TAB B2B: BERGUE DE RESÍDUOS & CRONÔMETRO */}
            {activeTabB2B === 'bergue' && (
              <div className="p-2.5 flex-1 flex flex-col justify-between overflow-y-auto space-y-2">
                
                {/* Bergue Status Card */}
                <div className="bg-white p-2.5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                      <Recycle className="w-3 h-3 text-emerald-600" /> Saco Bergue Atual
                    </span>
                    <span className="text-[8px] bg-rose-100 text-rose-900 font-extrabold px-1.5 py-0.5 rounded-full">
                      85% Cheio (340 kg)
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden border border-stone-200">
                    <div className="bg-gradient-to-r from-amber-500 to-rose-600 h-full w-[85%] rounded-full animate-pulse"></div>
                  </div>

                  <p className="text-[8px] text-stone-500 leading-tight">
                    Evite acúmulo e chorume na calçada. Acione a coleta antes de lotar!
                  </p>
                </div>

                {/* State 1: Ready to Trigger Alert */}
                {!bergueAlertActive ? (
                  <div className="bg-gradient-to-br from-rose-500 to-rose-700 text-white p-3 rounded-2xl shadow-lg text-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mx-auto">
                      <AlertTriangle className="w-5 h-5 text-amber-200 animate-bounce" />
                    </div>
                    <div>
                      <h4 className="font-black text-xs uppercase tracking-wide">
                        ALERTA DE BERGUE CHEIO
                      </h4>
                      <p className="text-[8px] text-rose-100 mt-0.5">
                        Chama a empresa de biocombustível em 1 toque.
                      </p>
                    </div>

                    <button
                      onClick={handleTriggerBergue}
                      className="w-full bg-white hover:bg-stone-100 text-rose-900 font-black py-2 px-3 rounded-xl text-[10px] uppercase tracking-wider shadow-md transition transform active:scale-95"
                    >
                      🚨 Solicitar Coleta Rápida
                    </button>
                    
                    <span className="text-[7.5px] text-rose-200 block">
                      Gera +150 Açaí Coins após validação de pesagem
                    </span>
                  </div>
                ) : (
                  /* State 2: Active Dispatch with Countdown Timer */
                  <div className="bg-stone-900 text-white p-3 rounded-2xl shadow-lg border border-purple-800/60 space-y-2">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
                      <div className="flex items-center gap-1 text-emerald-400 font-bold text-[9px]">
                        <Truck className="w-3.5 h-3.5 animate-pulse" /> Caminhão a Caminho
                      </div>
                      <span className="text-[8px] bg-purple-900/80 text-purple-300 px-1.5 py-0.5 rounded font-mono">
                        EcoBiomassa Pará
                      </span>
                    </div>

                    {/* Circular Style Timer Box */}
                    <div className="bg-stone-950 p-2 rounded-xl text-center border border-stone-800">
                      <span className="text-[8px] text-stone-400 uppercase font-bold block mb-0.5">
                        Tempo Estimado de Chegada:
                      </span>
                      <div className="text-xl font-black text-amber-400 font-mono flex items-center justify-center gap-1">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>{String(countdownMinutes).padStart(2, '0')}:{String(countdownSeconds).padStart(2, '0')}</span>
                      </div>
                      <span className="text-[7.5px] text-stone-400 mt-0.5 block">
                        Veículo: <strong>Van Sprinter • Placa QEZ-4820</strong>
                      </span>
                    </div>

                    {/* QR Code Validation Button to complete simulated pickup */}
                    <button
                      onClick={handleCompletePickup}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-black py-2 px-2 rounded-xl text-[9px] flex items-center justify-center gap-1 shadow-md transition"
                    >
                      <QrCode className="w-3.5 h-3.5" /> Validar Coleta com Motorista (+150 Coins)
                    </button>
                  </div>
                )}

                {/* Micro Footnote */}
                <div className="bg-emerald-50 border border-emerald-200 p-1.5 rounded-xl text-[7.5px] text-emerald-950 flex items-start gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Os caroços recolhidos são transformados em vapor industrial e tijolos ecológicos na Amazônia.</span>
                </div>

              </div>
            )}

            {/* TAB B2B: CARTEIRA DE AÇAÍ COINS & EXTRATO */}
            {activeTabB2B === 'carteira' && (
              <div className="p-2.5 flex-1 flex flex-col justify-between overflow-y-auto space-y-2">
                
                {/* Balance Hero Card */}
                <div className="bg-gradient-to-br from-purple-950 to-stone-900 text-white p-3 rounded-2xl shadow border border-purple-800/50 text-center space-y-1">
                  <span className="text-[8.5px] text-purple-300 uppercase tracking-wider font-bold">
                    Saldo da Carteira Verde
                  </span>
                  <div className="text-2xl font-black text-amber-400 font-mono flex items-center justify-center gap-1">
                    <Coins className="w-6 h-6 text-amber-400" /> {acaiCoins} <span className="text-xs">AC</span>
                  </div>
                  <p className="text-[8px] text-stone-300">
                    Equivalente a R$ {(acaiCoins * 0.35).toFixed(2)} em insumos & descontos
                  </p>
                </div>

                {/* Ledger History */}
                <div className="space-y-1 flex-1">
                  <span className="text-[8.5px] font-bold text-stone-500 uppercase tracking-wider block">
                    Extrato de Transações Recentes
                  </span>

                  <div className="space-y-1">
                    <div className="bg-white p-1.5 rounded-xl border border-stone-200 flex items-center justify-between text-[8px]">
                      <div>
                        <p className="font-bold text-stone-900">Coleta Bergue 340kg</p>
                        <p className="text-[7px] text-stone-400">EcoBiomassa • QR Code Validado</p>
                      </div>
                      <span className="font-black text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded font-mono">+150 AC</span>
                    </div>

                    <div className="bg-white p-1.5 rounded-xl border border-stone-200 flex items-center justify-between text-[8px]">
                      <div>
                        <p className="font-bold text-stone-900">Módulo SEBRAE Higiene</p>
                        <p className="text-[7px] text-stone-400">Capacitação Chagas Zero</p>
                      </div>
                      <span className="font-black text-purple-700 bg-purple-50 px-1 py-0.5 rounded font-mono">+75 AC</span>
                    </div>

                    <div className="bg-white p-1.5 rounded-xl border border-stone-200 flex items-center justify-between text-[8px]">
                      <div>
                        <p className="font-bold text-stone-900">Resgate Cloro Ativo 5L</p>
                        <p className="text-[7px] text-stone-400">Distribuidora Higiene Pará</p>
                      </div>
                      <span className="font-black text-rose-700 bg-rose-50 px-1 py-0.5 rounded font-mono">-200 AC</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTabB2B('marketplace')}
                  className="w-full bg-purple-950 text-white font-bold py-1.5 rounded-xl text-[9px] flex items-center justify-center gap-1 hover:bg-purple-900 transition"
                >
                  <Gift className="w-3 h-3 text-amber-400" /> Ir ao Marketplace de Insumos
                </button>
              </div>
            )}

            {/* TAB B2B: MARKETPLACE DE RECOMPENSAS */}
            {activeTabB2B === 'marketplace' && (
              <div className="p-2 flex-1 flex flex-col overflow-y-auto space-y-1.5">
                <div className="bg-emerald-50 p-1.5 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <h6 className="font-extrabold text-emerald-950 text-[9px]">Marketplace Verde B2B</h6>
                    <p className="text-[7.5px] text-emerald-800">Troque suas moedas por recursos reais</p>
                  </div>
                  <span className="text-[8.5px] font-mono font-black text-emerald-900 bg-emerald-200/80 px-1.5 py-0.5 rounded-full">
                    {acaiCoins} AC
                  </span>
                </div>

                <div className="space-y-1.5 overflow-y-auto pr-0.5">
                  {MARKETPLACE_REWARDS.map((item) => {
                    const isRedeemed = !!redeemedRewards[item.id];
                    const canAfford = acaiCoins >= item.costCoins;

                    return (
                      <div
                        key={item.id}
                        className="bg-white p-2 rounded-xl border border-stone-200 shadow-sm space-y-1 text-[8px]"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[7px] bg-stone-100 text-stone-600 px-1 py-0.2 rounded font-bold uppercase">
                              {item.category}
                            </span>
                            <h6 className="font-bold text-stone-950 text-[8.5px] leading-tight mt-0.5">
                              {item.title}
                            </h6>
                          </div>
                          <span className="font-black text-amber-600 font-mono text-[9px] bg-amber-50 px-1 py-0.5 rounded border border-amber-200 shrink-0">
                            {item.costCoins} AC
                          </span>
                        </div>

                        <p className="text-stone-500 text-[7.5px] leading-tight">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                          <span className="text-emerald-700 font-bold text-[7.5px]">
                            {item.discountLabel}
                          </span>

                          {isRedeemed ? (
                            <span className="bg-emerald-100 text-emerald-900 font-mono font-bold px-1.5 py-0.5 rounded text-[7.5px]">
                              Voucher: {redeemedRewards[item.id]}
                            </span>
                          ) : (
                            <button
                              onClick={() => handleRedeemReward(item)}
                              disabled={!canAfford}
                              className={`px-2 py-0.5 rounded-md font-bold text-[7.5px] transition ${
                                canAfford
                                  ? 'bg-amber-400 hover:bg-amber-500 text-stone-950 shadow-sm'
                                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                              }`}
                            >
                              {canAfford ? 'Resgatar' : 'Faltam Moedas'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB B2B: TRILHAS DE CAPACITAÇÃO SEBRAE */}
            {activeTabB2B === 'sebrae' && (
              <div className="p-2 flex-1 flex flex-col overflow-y-auto space-y-1.5">
                
                {/* Sebrae Header Banner */}
                <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-2 rounded-xl border border-blue-800 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-[9px] flex items-center gap-1 text-amber-300">
                      <GraduationCap className="w-3 h-3" /> Parceria SEBRAE Pará
                    </span>
                    <span className="bg-amber-400 text-stone-950 text-[7px] font-black px-1.5 py-0.2 rounded-full uppercase">
                      Selo Ativo
                    </span>
                  </div>
                  <p className="text-[7.5px] text-blue-200">
                    Assista a pílulas de 4 min. Ganhe moedas e destaque de 'Batedor Capacitado' no mapa!
                  </p>
                </div>

                {/* Modules list */}
                <div className="space-y-1 overflow-y-auto pr-0.5">
                  {sebraeModules.map((mod) => (
                    <div
                      key={mod.id}
                      className="bg-white p-2 rounded-xl border border-stone-200 shadow-sm space-y-1 text-[8px]"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[7px] bg-blue-100 text-blue-900 font-bold px-1 rounded">
                            {mod.category} • {mod.duration}
                          </span>
                          <h6 className="font-bold text-stone-950 text-[8.5px] mt-0.5 leading-tight">
                            {mod.title}
                          </h6>
                        </div>
                        <span className="font-black text-amber-600 font-mono text-[8px] bg-amber-50 px-1 py-0.5 rounded shrink-0">
                          +{mod.coinsReward} AC
                        </span>
                      </div>

                      <p className="text-stone-500 text-[7.5px] leading-tight">
                        {mod.description}
                      </p>

                      <div className="flex items-center justify-between pt-0.5">
                        <span className="text-stone-400 text-[7px] truncate max-w-[140px]">
                          {mod.instructor}
                        </span>

                        {mod.completed ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-0.5 text-[7.5px] bg-emerald-50 px-1.5 py-0.5 rounded">
                            <CheckCircle className="w-2.5 h-2.5 text-emerald-600" /> Concluído
                          </span>
                        ) : (
                          <button
                            onClick={() => handleCompleteSebrae(mod.id, mod.coinsReward)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2 py-0.5 rounded text-[7.5px] transition"
                          >
                            Assistir Pílula
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        )}

        {/* Global Bottom Navigation within Smartphone */}
        <div className="bg-stone-900 text-stone-400 px-4 py-2 flex justify-around items-center text-[8.5px] border-t border-stone-800 shrink-0">
          <button 
            onClick={() => setAppMode('b2c')}
            className={`flex flex-col items-center gap-0.5 ${appMode === 'b2c' ? 'text-amber-400 font-bold' : 'hover:text-white'}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Consumidor</span>
          </button>
          <button 
            onClick={() => setAppMode('b2b')}
            className={`flex flex-col items-center gap-0.5 ${appMode === 'b2b' ? 'text-amber-400 font-bold' : 'hover:text-white'}`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Painel B2B</span>
          </button>
        </div>

      </div>

      {/* Smartphone Bottom Home Bar */}
      <div className="w-28 h-1 bg-stone-700 rounded-full mx-auto mt-2"></div>
    </div>
  );
}
