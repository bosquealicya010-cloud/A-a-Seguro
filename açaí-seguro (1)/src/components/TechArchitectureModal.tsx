import React, { useState } from 'react';
import { DatabaseTableDoc, UXMicrointeractionDoc } from '../types';
import { DATABASE_TABLES_DOC, UX_MICROINTERACTIONS_DATA } from '../data';
import { Database, Cpu, Layers, Sparkles, X, CheckCircle2, Code2, ArrowRightLeft, ShieldCheck, Zap, Coins, Truck, GraduationCap, Copy, Check } from 'lucide-react';

interface TechArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TechArchitectureModal({ isOpen, onClose }: TechArchitectureModalProps) {
  const [activeTab, setActiveTab] = useState<'banco' | 'arquitetura' | 'ux' | 'metricas'>('banco');
  const [selectedTable, setSelectedTable] = useState<DatabaseTableDoc>(DATABASE_TABLES_DOC[0]);
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(selectedTable.sampleSql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-5xl text-stone-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-950 border border-purple-800/80 flex items-center justify-center text-purple-400">
              <Cpu className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white tracking-wide">
                  Documentação Técnica & Arquitetura de Software
                </h3>
                <span className="text-[10px] bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded-full font-mono border border-purple-700/50">
                  v2.4 Pro
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Especificação de Banco de Dados, Webhooks de Logística Reversa, Gamificação e UX
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-850 hover:bg-stone-800 text-stone-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-800 bg-stone-950/60 px-6 gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('banco')}
            className={`py-3 px-4 font-bold text-xs border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'banco'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Database className="w-4 h-4" /> 1. Banco de Dados & DDL SQL
          </button>
          <button
            onClick={() => setActiveTab('arquitetura')}
            className={`py-3 px-4 font-bold text-xs border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'arquitetura'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <ArrowRightLeft className="w-4 h-4" /> 2. Fluxo de Logística Reversa (APIs)
          </button>
          <button
            onClick={() => setActiveTab('ux')}
            className={`py-3 px-4 font-bold text-xs border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'ux'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-4 h-4" /> 3. Microinterações & UX/UI
          </button>
          <button
            onClick={() => setActiveTab('metricas')}
            className={`py-3 px-4 font-bold text-xs border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'metricas'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Zap className="w-4 h-4" /> 4. KPIs & Matriz de Impacto
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: DATABASE & TABLES */}
          {activeTab === 'banco' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Tables list */}
              <div className="lg:col-span-4 space-y-2">
                <p className="text-[10px] uppercase font-mono font-bold text-stone-500 tracking-wider">
                  Tabelas Modeladas ({DATABASE_TABLES_DOC.length})
                </p>
                <div className="space-y-1.5">
                  {DATABASE_TABLES_DOC.map((tbl) => {
                    const isSel = selectedTable.tableName === tbl.tableName;
                    return (
                      <button
                        key={tbl.tableName}
                        onClick={() => setSelectedTable(tbl)}
                        className={`w-full text-left p-3 rounded-2xl border transition flex items-center justify-between ${
                          isSel
                            ? 'bg-purple-950/80 border-purple-700 text-white shadow-md'
                            : 'bg-stone-950/40 border-stone-800 text-stone-400 hover:bg-stone-850'
                        }`}
                      >
                        <div>
                          <p className="font-mono text-xs font-bold text-stone-200">
                            {tbl.tableName}
                          </p>
                          <p className="text-[10px] text-stone-400 truncate max-w-[200px]">
                            {tbl.description}
                          </p>
                        </div>
                        {isSel && <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></div>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected table details */}
              <div className="lg:col-span-8 bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-4">
                <div className="flex items-start justify-between border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-[10px] bg-purple-900/60 text-purple-300 font-mono px-2 py-0.5 rounded">
                      PRIMARY KEY: {selectedTable.primaryKey}
                    </span>
                    <h4 className="text-base font-black text-white font-mono mt-1">
                      {selectedTable.tableName}
                    </h4>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {selectedTable.description}
                    </p>
                  </div>
                  
                  <button
                    onClick={handleCopySql}
                    className="flex items-center gap-1 bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-1.5 rounded-xl text-xs font-mono transition"
                  >
                    {copiedSql ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copiar DDL
                      </>
                    )}
                  </button>
                </div>

                {/* Business impact card */}
                <div className="bg-emerald-950/30 border border-emerald-800/40 p-3 rounded-xl text-xs">
                  <span className="font-bold text-emerald-400 block mb-0.5">
                    Impacto nas Regras de Negócio & Operação:
                  </span>
                  <p className="text-stone-300 leading-relaxed">
                    {selectedTable.businessImpact}
                  </p>
                </div>

                {/* Columns table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-stone-900 text-stone-400 border-b border-stone-800">
                      <tr>
                        <th className="p-2">Coluna</th>
                        <th className="p-2">Tipo</th>
                        <th className="p-2">Restrições</th>
                        <th className="p-2">Finalidade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-850 text-stone-300">
                      {selectedTable.columns.map((col, idx) => (
                        <tr key={idx} className="hover:bg-stone-900/50">
                          <td className="p-2 text-amber-300 font-bold">{col.name}</td>
                          <td className="p-2 text-cyan-300">{col.type}</td>
                          <td className="p-2 text-stone-400 text-[11px]">{col.constraints}</td>
                          <td className="p-2 text-stone-300 text-[11px] font-sans">{col.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* DDL Code preview */}
                <div>
                  <p className="text-[10px] uppercase font-mono font-bold text-stone-500 mb-1">
                    Código SQL DDL (PostgreSQL / Supabase / Cloud SQL)
                  </p>
                  <pre className="bg-stone-900/90 p-3.5 rounded-xl border border-stone-800 text-stone-200 text-xs font-mono overflow-x-auto">
                    <code>{selectedTable.sampleSql}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REVERSE LOGISTICS ARCHITECTURE & APIS */}
          {activeTab === 'arquitetura' && (
            <div className="space-y-6">
              <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-4">
                <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                  <ArrowRightLeft className="w-5 h-5 text-amber-400" /> Fluxo Arquitetural do "Alerta de Bergue Cheio"
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  O ecossistema utiliza uma arquitetura orientada a eventos (*Event-Driven*) para garantir o despacho de caminhões de biocombustível em menos de 30 segundos após o clique do batedor.
                </p>

                {/* Steps sequence */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
                  <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800 space-y-1.5">
                    <div className="w-6 h-6 rounded-full bg-rose-950 text-rose-300 font-bold text-xs flex items-center justify-center border border-rose-800">
                      1
                    </div>
                    <h5 className="font-bold text-xs text-stone-100">Disparo do Alerta</h5>
                    <p className="text-[11px] text-stone-400">
                      Batedor clica em 'Alerta de Bergue Cheio'. App gera requisição assíncrona <code className="text-amber-400">POST /api/v1/coleta/bergue/alerta</code> com geo-hash.
                    </p>
                  </div>

                  <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800 space-y-1.5">
                    <div className="w-6 h-6 rounded-full bg-purple-950 text-purple-300 font-bold text-xs flex items-center justify-center border border-purple-800">
                      2
                    </div>
                    <h5 className="font-bold text-xs text-stone-100">Roteamento & Webhook</h5>
                    <p className="text-[11px] text-stone-400">
                      Motor de despacho calcula a van mais próxima da empresa de biocombustível parceira e calcula ETA (tempo estimado) com GPS.
                    </p>
                  </div>

                  <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800 space-y-1.5">
                    <div className="w-6 h-6 rounded-full bg-blue-950 text-blue-300 font-bold text-xs flex items-center justify-center border border-blue-800">
                      3
                    </div>
                    <h5 className="font-bold text-xs text-stone-100">Cronômetro Ativo</h5>
                    <p className="text-[11px] text-stone-400">
                      WebSocket no app do batedor recebe evento <code className="text-cyan-400">COLETA_DESPACHADA</code>, ativando timer visual decrescente e placa do caminhão.
                    </p>
                  </div>

                  <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800 space-y-1.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-800">
                      4
                    </div>
                    <h5 className="font-bold text-xs text-stone-100">Validação HMAC & Moedas</h5>
                    <p className="text-[11px] text-stone-400">
                      Motorista escaneia QR Code dinâmico na tela do batedor. O ledger credita +150 Açaí Coins e dispara evento de confete.
                    </p>
                  </div>
                </div>
              </div>

              {/* Endpoint Spec Sample */}
              <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-3">
                <span className="text-[10px] bg-amber-950 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-800">
                  OpenAPI / REST Payload Schema
                </span>
                <pre className="bg-stone-900 p-3.5 rounded-xl border border-stone-800 text-stone-300 text-xs font-mono overflow-x-auto">
{`// POST /api/v1/coleta/bergue/alerta
{
  "batedor_id": "8f3b2071-3312-4c28-98e6-12c8b09d0124",
  "quantidade_bergues": 1,
  "volume_estimado_kg": 380.0,
  "localizacao": {
    "latitude": -1.455833,
    "longitude": -48.490278,
    "endereco_referencia": "Tv. 14 de Março, 1420 - Umarizal, Belém/PA"
  },
  "prioridade_urgencia": "ALTA_RISCO_CHORUME"
}

// Resposta 202 Accepted
{
  "coleta_id": "col_77a9b0c2",
  "status": "DESPACHADO",
  "empresa_parceira": "EcoBiomassa Pará",
  "veiculo_placa": "QEZ-4820",
  "tempo_estimado_minutos": 18,
  "qr_auth_token": "hmac_sha256_90fbc9821a7..."
}`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: UX & MICROINTERACTIONS */}
          {activeTab === 'ux' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-300">
                Padrões de microinteração desenvolvidos para transformar a fricção da gestão de resíduos em orgulho ecológico e recompensa financeira:
              </p>

              <div className="space-y-3">
                {UX_MICROINTERACTIONS_DATA.map((ux, idx) => (
                  <div key={idx} className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-extrabold text-sm text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" /> {ux.featureName}
                      </h5>
                      <span className="text-[10px] bg-purple-950 text-purple-300 font-bold px-2 py-0.5 rounded-full border border-purple-800">
                        {ux.userRole}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                      <div className="bg-stone-900/60 p-2.5 rounded-xl border border-stone-850">
                        <span className="text-[10px] font-bold text-stone-500 uppercase block mb-0.5">Gatilho / Ação:</span>
                        <p className="text-stone-300">{ux.trigger}</p>
                      </div>
                      <div className="bg-stone-900/60 p-2.5 rounded-xl border border-stone-850">
                        <span className="text-[10px] font-bold text-amber-400 uppercase block mb-0.5">Feedback Visual & Tátil:</span>
                        <p className="text-stone-300">{ux.visualFeedback} <span className="text-stone-400 block mt-1">({ux.hapticOrAudio})</span></p>
                      </div>
                      <div className="bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-900/40">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase block mb-0.5">Resultado de Negócio:</span>
                        <p className="text-emerald-200">{ux.businessOutcome}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: KPIS & IMPACT */}
          {activeTab === 'metricas' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 text-center">
                  <span className="text-3xl font-black text-amber-400 font-mono block">45 min</span>
                  <span className="text-xs text-stone-300 font-bold block mt-1">Tempo Médio de Coleta</span>
                  <span className="text-[10px] text-stone-500">Redução de 96% frente aos 18h tradicionais</span>
                </div>
                <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 text-center">
                  <span className="text-3xl font-black text-emerald-400 font-mono block">100%</span>
                  <span className="text-xs text-stone-300 font-bold block mt-1">Conversão em Moeda Verde</span>
                  <span className="text-[10px] text-stone-500">Insumos e filtros resgatados sem dinheiro</span>
                </div>
                <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 text-center">
                  <span className="text-3xl font-black text-cyan-400 font-mono block">1.5x</span>
                  <span className="text-xs text-stone-300 font-bold block mt-1">Multiplicador no Ranking</span>
                  <span className="text-[10px] text-stone-500">Bônus de visibilidade para calçadas limpas</span>
                </div>
              </div>

              <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-3">
                <h5 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Alinhamento Triplo de Stakeholders
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-stone-900 p-3 rounded-xl border border-stone-800">
                    <span className="font-bold text-amber-300 block mb-1">Para o Batedor:</span>
                    Economia de custos operacionais (cloro/luvas grátis), calçada limpa e selo oficial SEBRAE para vender mais.
                  </div>
                  <div className="bg-stone-900 p-3 rounded-xl border border-stone-800">
                    <span className="font-bold text-cyan-300 block mb-1">Para o Consumidor:</span>
                    Garantia de higiene de ponta a ponta: água filtrada/mineral e ausência de moscas/mau cheiro na fachada.
                  </div>
                  <div className="bg-stone-900 p-3 rounded-xl border border-stone-800">
                    <span className="font-bold text-emerald-300 block mb-1">Para a Cidade & Indústria:</span>
                    Matéria-prima contínua de biomassa para bioenergia e fim do descarte irregular de caroços nos canais.
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-800 bg-stone-950 flex items-center justify-between text-xs text-stone-400">
          <span>Açaí Seguro Architecture Framework</span>
          <button
            onClick={onClose}
            className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-4 py-2 rounded-xl transition"
          >
            Fechar Especificação
          </button>
        </div>

      </div>
    </div>
  );
}
