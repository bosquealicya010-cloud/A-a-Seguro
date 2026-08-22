import { useState } from 'react';
import { UX_COPY_STRATEGIES } from '../data';
import { UXCopyNote } from '../types';
import { HelpCircle, Star, Sparkles, BookOpen, ChevronRight, CheckCircle2, Cpu, Eye, FileText, Database, ArrowRightLeft } from 'lucide-react';
import TechArchitectureModal from './TechArchitectureModal';

interface UXWorkspaceProps {
  onScrollToSection: (id: string) => void;
  activeSectionIndex: string;
}

export default function UXWorkspace({ onScrollToSection, activeSectionIndex }: UXWorkspaceProps) {
  const [selectedStrategy, setSelectedStrategy] = useState<UXCopyNote>(UX_COPY_STRATEGIES[0]);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);

  const handleSelect = (strategy: UXCopyNote) => {
    setSelectedStrategy(strategy);
    onScrollToSection(strategy.sectionId);
  };

  return (
    <>
      <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 shadow-2xl border border-stone-800 relative overflow-hidden">
        {/* Decorative gradient light */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 border-b border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-950 rounded-xl flex items-center justify-center text-purple-400 shrink-0 border border-purple-800/80">
              <Cpu className="w-5 h-5 animate-spin-slow text-amber-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-100 text-md flex items-center gap-1.5 uppercase tracking-wide">
                Workspace de Product Management, UX/UI & Copy <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
              </h3>
              <p className="text-xs text-stone-400 leading-snug">Roteiro estratégico, dores reais dos batedores e arquitetura técnica</p>
            </div>
          </div>

          <button
            onClick={() => setIsTechModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white text-xs font-black px-4 py-2 rounded-xl shadow-lg transition transform active:scale-95 shrink-0"
          >
            <Database className="w-4 h-4 text-amber-300" />
            Ver Arquitetura & DDL SQL
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
          
          {/* Navigation panel */}
          <div className="lg:col-span-5 space-y-2">
            <p className="text-[10px] uppercase font-bold text-stone-500 tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Selecionar Seção para Examinar
            </p>
            <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
              {UX_COPY_STRATEGIES.map((strategy) => {
                const isActive = selectedStrategy.sectionId === strategy.sectionId;
                const isSectionActiveOnScroll = activeSectionIndex === strategy.sectionId;

                return (
                  <button
                    key={strategy.sectionId}
                    onClick={() => handleSelect(strategy)}
                    className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all group ${
                      isActive 
                        ? 'bg-gradient-to-r from-purple-950 to-stone-850 border border-purple-800/60 shadow text-white' 
                        : 'bg-stone-950/60 hover:bg-stone-850/80 border border-stone-900 text-stone-300'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <span className="text-[9px] uppercase font-extrabold text-purple-400">
                        #{strategy.sectionId}
                      </span>
                      <h4 className="font-semibold text-xs leading-tight group-hover:text-amber-300 transition-colors">
                        {strategy.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {isSectionActiveOnScroll && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      )}
                      <ChevronRight className={`w-4 h-4 text-stone-500 transition-transform ${isActive ? 'translate-x-1 text-purple-400' : ''}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Strategic Analysis card */}
          <div className="lg:col-span-7 bg-stone-955 p-5 rounded-2xl border border-stone-800 space-y-4">
            <div className="flex justify-between items-start border-b border-stone-800 pb-3">
              <div>
                <span className="text-[10px] bg-purple-900/50 text-purple-300 border border-purple-800/40 px-2 py-0.5 rounded-full font-mono font-bold">
                  Seção Selecionada: {selectedStrategy.sectionId.toUpperCase()}
                </span>
                <h4 className="font-extrabold text-white text-sm mt-1">{selectedStrategy.title}</h4>
              </div>
            </div>

            {/* Copywriting strategies block */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> ESTRUTURA DE COPY (MENSAGEM):
              </h5>
              <div className="bg-stone-950/80 p-3 rounded-xl border border-stone-850/60 text-xs">
                <p className="text-purple-300 font-extrabold text-[11px] mb-1">
                  Fórmula de Conversão: {selectedStrategy.copyStrategy.formula}
                </p>
                <p className="text-stone-300 leading-relaxed text-[11.5px]">
                  {selectedStrategy.copyStrategy.description}
                </p>
                
                <div className="mt-2.5 flex flex-wrap gap-1 items-center">
                  <span className="text-[10px] text-stone-400 font-bold mr-1">Gatilhos Ativos:</span>
                  {selectedStrategy.copyStrategy.mentalTriggers.map((trig, idx) => (
                    <span key={idx} className="bg-stone-850 text-stone-200 px-1.5 py-0.5 rounded text-[10px] border border-stone-800">
                      {trig}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* UX Strategies block */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> ROTEIRO DE DESIGN (UX/UI):
              </h5>
              <div className="bg-stone-950/80 p-3 rounded-xl border border-stone-850/60 text-xs">
                <p className="text-emerald-300 font-extrabold text-[11px] mb-1">
                  Princípio Comportamental: {selectedStrategy.uxStrategy.principle}
                </p>
                <p className="text-stone-300 leading-relaxed text-[11.5px]">
                  {selectedStrategy.uxStrategy.description}
                </p>

                <div className="mt-2.5 flex flex-wrap gap-1 items-center">
                  <span className="text-[10px] text-stone-400 font-bold mr-1">Táticas de Escaneabilidade:</span>
                  {selectedStrategy.uxStrategy.visualTricks.map((trick, idx) => (
                    <span key={idx} className="bg-emerald-950/30 text-emerald-200 px-1.5 py-0.5 rounded text-[10px] border border-emerald-900/30">
                      {trick}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => onScrollToSection(selectedStrategy.sectionId)}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
              >
                Focar na Seção na Landing Page
              </button>
              <button
                onClick={() => setIsTechModalOpen(true)}
                className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Database className="w-3.5 h-3.5 text-purple-400" />
                DDL SQL
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Modal instance */}
      <TechArchitectureModal
        isOpen={isTechModalOpen}
        onClose={() => setIsTechModalOpen(false)}
      />
    </>
  );
}
