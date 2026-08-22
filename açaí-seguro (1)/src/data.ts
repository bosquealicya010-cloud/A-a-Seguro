import { Review, Benefit, TabContent, UXCopyNote, MarketplaceRewardItem, SebraeCourseModule, DatabaseTableDoc, UXMicrointeractionDoc } from './types';

export const APP_NAME = "Açaí Seguro";

export const TAB_DATA: TabContent[] = [
  {
    id: "produtores",
    tabTitle: "Produtores do Fruto",
    badge: "B2B & Rastreabilidade",
    title: "Conexão Direta com a Origem do Sabor",
    subtitle: "Para quem valoriza o manejo artesanal e o cultivo ético do melhor fruto.",
    description: "Com o Açaí Seguro, conectamos grandes e pequenos batedores diretamente às cooperativas ribeirinhas recomendadas. Encontre fornecedores que respeitam o ciclo natural da floresta, garantindo matéria-prima de máxima pureza, sem misturas e com o melhor preço de saca da região.",
    features: [
      "Mapeamento de cooperativas ribeirinhas certificadas",
      "Cotação em tempo real do preço médio da saca de açaí",
      "Selo de Manejo Sustentável emitido direto no perfil",
      "Canal de negociação direta via WhatsApp ou Pix"
    ],
    metricLabel: "Cooperativas Ativas",
    metricValue: "450+",
    metricSub: "na Amazônia legalizada",
    ctaText: "Apoiar Produtores Locais"
  },
  {
    id: "batideiras",
    tabTitle: "Batideiras Legalizadas",
    badge: "Saúde, Água Limpa & Qualidade",
    title: "O Ponto Inicial do Verdadeiro Açaí",
    subtitle: "Chega de açaí com água duvidosa e gelo. Encontre o puríssimo açaí artesanal da esquina.",
    description: "Mapeamos todas as batideiras credenciadas e fiscalizadas pelos órgãos de vigilância sanitária. Acompanhe os horários em que o açaí é batido na hora, escolha a espessura de sua preferência (Grosso, Médio ou Fino) e identifique com clareza quais estabelecimentos utilizam Água Mineral de galão lacrado ou Sistema de Filtragem Bacteriológica certificado.",
    features: [
      "Identificador de Água: Filtre por Água Mineral Selada ou Filtro Bacteriológico",
      "Filtro por espessura: Grosso (Especial), Médio ou Fino",
      "Alerta de 'Batido Agora': Receba notificação quando seu ponto favorito ligar a máquina",
      "Selos de Vigilância Sanitária e Laudo Hídrico validados digitalmente",
      "Auditoria Comunitária de Calçada Limpa: clientes avaliam higiene externa"
    ],
    metricLabel: "Pontos Auditados",
    metricValue: "1.280+",
    metricSub: "com água purificada/mineral",
    ctaText: "Encontrar Açaí Confiável"
  },
  {
    id: "residuos",
    tabTitle: "Descarte de Resíduos (B2B & Bioenergia)",
    badge: "Logística Reversa & Açaí Coins",
    title: "Alerta de Bergue Cheio & Gestão Inteligente",
    subtitle: "Logística reversa acelerada em 1 clique: calçada limpa, sem chorume e recompensas reais.",
    description: "Para batedores com espaço limitado, o acúmulo de caroço gera chorume, odores e atrai insetos na calçada. O Açaí Seguro introduz o botão de emergência 'Alerta de Bergue Cheio', despachando a frota parceira de biocombustível em minutos. Cada bergue coletado via QR Code gera 'Açaí Coins' convertíveis em cloro ativo, equipamentos e filtros de água!",
    features: [
      "Botão de 1 Clique 'Alerta de Bergue Cheio': coleta urgente via empresa de biocombustível",
      "Cronômetro de Coleta em Tempo Real com rastreio da van/caminhão coletor",
      "Gamificação 'Açaí Coins': Acumule moedas verdes por cada bergue pesado e validado",
      "Marketplace de Insumos & Equipamentos: troque moedas por cloro, luvas e filtros UV",
      "Trilhas Sebrae Integradas: pílulas de vídeo que dão bônus em moedas e selo público"
    ],
    metricLabel: "Caroços em Bioenergia",
    metricValue: "185 Ton",
    metricSub: "coletados e bonificados este mês",
    ctaText: "Acessar Painel do Batedor"
  }
];

export const APP_BENEFITS: Benefit[] = [
  {
    id: "agua",
    title: "Selo de Água Mineral / Filtrada",
    description: "Identifique na hora no mapa as batedeiras que utilizam galões de água mineral lacrados ou sistemas de filtragem bacteriológica 3 estágios auditados.",
    iconName: "Droplets",
    tag: "Saúde & Pureza"
  },
  {
    id: "bergue",
    title: "Logística Reversa 'Bergue Cheio'",
    description: "Batedores acionam coleta de caroços com 1 toque. Parceria com empresas de biocombustível para remoção imediata, evitando odor e chorume.",
    iconName: "Truck",
    tag: "Calçada Limpa"
  },
  {
    id: "coins",
    title: "Moeda Verde (Açaí Coins)",
    description: "Cada bergue reciclado gera Açaí Coins. Converta em descontos para cloro ativo, toucas, luvas ou subsídios para filtros e tanques de branqueamento.",
    iconName: "Coins",
    tag: "Economia Circular"
  },
  {
    id: "sebrae",
    title: "Capacitação SEBRAE & Selo Oficial",
    description: "Microcursos práticos sobre higiene alimentar e gestão de resíduos. Ao concluir, o batedor ganha moedas extras e selo de destaque no mapa.",
    iconName: "GraduationCap",
    tag: "Certificação"
  },
  {
    id: "auditoria",
    title: "Auditoria Comunitária de Calçadas",
    description: "Clientes avaliam a organização e higiene externa do ponto. Calçada limpa e sem sacos garante multiplicador 1.5x no ranking semanal!",
    iconName: "Sparkles",
    tag: "Multiplicador 1.5x"
  },
  {
    id: "ifood",
    title: "Integração Direta iFood & Pix",
    description: "Encontrou o açaí perfeito no mapa? Faça o pedido instantaneamente com um clique através das nossas integrações integradas.",
    iconName: "ShoppingBag",
    tag: "Praticidade"
  }
];

export const MARKETPLACE_REWARDS: MarketplaceRewardItem[] = [
  {
    id: "reward-1",
    title: "Kit Cloro Ativo Concentrado + 100 Toucas",
    category: "insumos",
    costCoins: 200,
    originalPrice: "R$ 68,00",
    discountLabel: "100% Grátis com Moedas",
    iconName: "Sparkles",
    description: "Galão de 5L de hipoclorito grau alimentício para sanitização do fruto e bancadas + 100 toucas descartáveis.",
    available: true,
    partnerName: "Distribuidora Higiene Pará"
  },
  {
    id: "reward-2",
    title: "Caixa com 200 Luvas Vinil Esterilizadas",
    category: "insumos",
    costCoins: 150,
    originalPrice: "R$ 45,00",
    discountLabel: "100% Grátis com Moedas",
    iconName: "ShieldCheck",
    description: "Luvas atóxicas sem pó, ideais para manipulação contínua do açaí grosso com alta aderência.",
    available: true,
    partnerName: "Norte Hospitalar"
  },
  {
    id: "reward-3",
    title: "Subsídio de 40% em Filtro Bacteriológico 3 Estágios",
    category: "equipamentos",
    costCoins: 450,
    originalPrice: "R$ 890,00",
    discountLabel: "R$ 356 OFF via Subsídio",
    iconName: "Droplets",
    description: "Sistema industrial de microfiltração com lâmpada UV e carvão ativado. Garante laudo de água limpa imediato no app.",
    available: true,
    partnerName: "Purifica Amazônia Tech"
  },
  {
    id: "reward-4",
    title: "Subsídio de R$ 500 em Tanque de Branqueamento Inox",
    category: "equipamentos",
    costCoins: 750,
    originalPrice: "R$ 1.800,00",
    discountLabel: "R$ 500 OFF no Equipamento",
    iconName: "Flame",
    description: "Tanque elétrico termocontrolado em aço inox 304 com termômetro digital para choque térmico 80°C/10s (Chagas Zero).",
    available: true,
    partnerName: "Metalúrgica Açaí Forte"
  },
  {
    id: "reward-5",
    title: "Destaque Ouro no Mapa B2C (30 Dias)",
    category: "destaque",
    costCoins: 300,
    originalPrice: "R$ 120,00/mês",
    discountLabel: "Isenção de Taxa 100%",
    iconName: "Award",
    description: "Seu ponto exibido no topo da busca de turistas e moradores, com pin dourado 'Batedor Destaque Sustentável'.",
    available: true,
    partnerName: "Açaí Seguro Platform"
  }
];

export const SEBRAE_MODULES: SebraeCourseModule[] = [
  {
    id: "seb-1",
    title: "Higienização & Branqueamento Térmico (Chagas Zero)",
    duration: "4 min",
    category: "Sanitário",
    coinsReward: 75,
    completed: true,
    description: "Aprenda a calibrar o choque térmico a 80°C por 10 segundos seguido de água fria tratada para matar o Trypanosoma cruzi.",
    instructor: "Dra. Elenice Silva (SEBRAE / UFPA)"
  },
  {
    id: "seb-2",
    title: "Gestão do Bergue: Calçada Limpa & Sem Chorume",
    duration: "5 min",
    category: "Resíduos",
    coinsReward: 60,
    completed: false,
    description: "Drenagem correta da umidade do caroço, amarração hermética do bergue e acionamento no timing certo pelo app.",
    instructor: "Eng. Paulo Mendonça (SEBRAE Sustentabilidade)"
  },
  {
    id: "seb-3",
    title: "Água Pura: Galões Minerais vs. Filtros Bacteriológicos",
    duration: "3 min",
    category: "Controle Hídrico",
    coinsReward: 50,
    completed: false,
    description: "Como obter e renovar laudos hídricos, cuidados com mangueiras atóxicas e troca preventiva de velas filtrantes.",
    instructor: "Biol. Carlos Guimarães (SEBRAE / Vigilância Sanitária)"
  },
  {
    id: "seb-4",
    title: "Precificação Inteligente & Atendimento a Turistas",
    duration: "6 min",
    category: "Gestão Financeira",
    coinsReward: 80,
    completed: false,
    description: "Calcule o custo exato da saca, energia e insumos para lucrar mais vendendo o açaí grosso com valor agregado.",
    instructor: "Consultora Márcia Prado (SEBRAE Negócios)"
  }
];

export const USER_REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Thiago Vasconcelos",
    role: "turista",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=facearea&facepad=2&w=128&h=128&q=80",
    comment: "Eu viajei para Belém e estava com receio de higiene e água no açaí. Pelo app vi que o ponto do Jorge usa água mineral selada e tem a calçada impecável, sem aquele amontoado de sacos com moscas. Experiência fantástica!",
    rating: 5,
    location: "São Paulo - SP (Viajante)",
    date: "A duas semanas",
    externalCleanlinessRating: 5,
    hasCleanSidewalkBadge: true
  },
  {
    id: "rev-2",
    name: "Mariana Alencar",
    role: "local",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=facearea&facepad=2&w=128&h=128&q=80",
    comment: "Moro no Umarizal. O novo sistema do Açaí Seguro revolucionou a nossa rua: as batedeiras agora chamam a coleta de bergue pelo app antes de entulhar a calçada. O bairro está limpo, sem odor de fermentação e o açaí é nota 10!",
    rating: 5,
    location: "Belém - PA (Moradora Local)",
    date: "Há 3 dias",
    externalCleanlinessRating: 5,
    hasCleanSidewalkBadge: true
  }
];

export const UX_COPY_STRATEGIES: UXCopyNote[] = [
  {
    sectionId: "hero",
    title: "Cabeçalho (Hero Section) e Proposta de Valor",
    copyStrategy: {
      formula: "AIDA (Atenção, Interesse, Desejo, Ação)",
      description: "Despertamos Atenção imediata unindo a paixão cultural do açaí puro à garantia de água tratada, logística de bergue e certificação SEBRAE.",
      mentalTriggers: ["Especificidade", "Pertença Cultural", "Facilidade Prática", "Higiene Auditada"]
    },
    uxStrategy: {
      principle: "Gancho Visual e Foco Triplo",
      description: "O lado esquerdo concentra a proposta de valor com tipografia impactante. O lado direito exibe um smartphone interativo que permite alternar entre o Modo Consumidor (B2C) e o Painel do Batedor (B2B).",
      visualTricks: ["Gradiente Açaí Premium", "CTA em Amarelo Ouro de alta conversão", "Toggle B2C / B2B integrado"]
    }
  },
  {
    sectionId: "pains",
    title: "Segmentação das Dores (Consumidor & Batedor)",
    copyStrategy: {
      formula: "PAS (Problema, Agitação, Solução)",
      description: "Agita o medo de açaí aguado e contaminação pelo lado do cliente, e a sobrecarga de espaço físico e sacos de caroço fedendo na calçada pelo lado do batedor.",
      mentalTriggers: ["Autoridade Sanitária", "Alívio Operacional", "Aversão à Perda"]
    },
    uxStrategy: {
      principle: "Design de Cartão Simétrico com Foco de Contraste",
      description: "Cards com hover dinâmico e métricas comparativas: de um lado o turista/morador exigindo água limpa e calçada cheirosa; do outro o batedor precisando de recolhimento rápido de resíduos.",
      visualTricks: ["Cards com hover dinâmico", "Contorno roxo-açaí sutil", "Selos de Água e Bergue"]
    }
  },
  {
    sectionId: "ecosystem",
    title: "Seção Interativa de 3 Abas (O Ecossistema Completo)",
    copyStrategy: {
      formula: "Prova de Autoridade e Responsabilidade Circular",
      description: "Demonstra o ciclo virtuoso: o fruto sai do produtor ribeirinho, é batido com água purificada na batedeira legalizada, e o resíduo do caroço é retirado em 1 clique para virar biocombustível, gerando Açaí Coins.",
      mentalTriggers: ["Economia Circular", "Apoio ao Microempreendedor", "Transparência"]
    },
    uxStrategy: {
      principle: "Bento Grid Interativo & Contadores Dinâmicos",
      description: "Abas com métricas de impacto que atualizam dados em tempo real, além de botões direcionados aos dois públicos.",
      visualTricks: ["Layout bento modular", "Transições suaves de aba", "Números gigantes para impacto social"]
    }
  },
  {
    sectionId: "gamification",
    title: "Gamificação B2B: Açaí Coins & Marketplace",
    copyStrategy: {
      formula: "Incentivo Comportamental Tangível",
      description: "Resolve a dor dos batedores que precisam de apoio financeiro real. Cada bergue vira moeda verde para retirar cloro, luvas ou descontos em tanques inox.",
      mentalTriggers: ["Recompensa Imediata", "Reciprocidade", "Economia Real de Custos"]
    },
    uxStrategy: {
      principle: "Carteira Digital com Feedback Visual de Sucesso",
      description: "Cards de recompensas com tags '100% Grátis com Moedas' e botões de resgate instantâneo que simulam emissão de vouchers com código de barras.",
      visualTricks: ["Cores de moeda dourada/verde", "Badges de desconto contrastantes", "Microanimação de saldo"]
    }
  },
  {
    sectionId: "architecture",
    title: "Documentação Técnica & Arquitetura de Software",
    copyStrategy: {
      formula: "Rigor de Engenharia & Transparência Arquitetural",
      description: "Especificação completa de esquemas de banco de dados (DDL), fluxos de mensageria Webhook de logística reversa e protocolos de autenticação criptográfica via QR Code.",
      mentalTriggers: ["Autoridade Técnica", "Escalabilidade", "Prontidão para Produção"]
    },
    uxStrategy: {
      principle: "Visualizador Interativo de Esquemas & Tabelas SQL",
      description: "Tabelas interativas com alternância entre visão funcional de negócio e código SQL DDL executável com sintaxe destacada.",
      visualTricks: ["Tabs de tabelas", "Editor de código escuro", "Dicionário de dados organizado"]
    }
  }
];

export const DATABASE_TABLES_DOC: DatabaseTableDoc[] = [
  {
    tableName: "estabelecimentos_batedores",
    description: "Cadastro master dos estabelecimentos de batimento artesanal de açaí, selos e parâmetros sanitários.",
    businessImpact: "Garante rastreabilidade sanitária, fonte hídrica, localização geográfica e saldo de moedas do batedor.",
    primaryKey: "id UUID",
    columns: [
      { name: "id", type: "UUID", constraints: "PRIMARY KEY DEFAULT gen_random_uuid()", description: "Identificador único do estabelecimento" },
      { name: "nome_fantasia", type: "VARCHAR(120)", constraints: "NOT NULL", description: "Nome comercial do ponto (ex: Açaí do Seu Jorge)" },
      { name: "cnpj_ou_cpf", type: "VARCHAR(20)", constraints: "UNIQUE NOT NULL", description: "Documento fiscal do batedor artesanal" },
      { name: "tipo_agua", type: "VARCHAR(20)", constraints: "CHECK (tipo_agua IN ('mineral', 'filtrada')) NOT NULL", description: "Fonte hídrica: galão mineral ou filtro bacteriológico" },
      { name: "laudo_hidrico_validade", type: "DATE", constraints: "NOT NULL", description: "Data de expiração do laudo bacteriológico da água" },
      { name: "sebrae_capacitado", type: "BOOLEAN", constraints: "DEFAULT FALSE", description: "Flag ativa se o batedor concluiu a trilha SEBRAE" },
      { name: "saldo_acai_coins", type: "INTEGER", constraints: "DEFAULT 0 CHECK (saldo_acai_coins >= 0)", description: "Saldo corrente de moedas verdes da carteira" },
      { name: "latitude", type: "DECIMAL(10,8)", constraints: "NOT NULL", description: "Coordenada geográfica para mapa e despacho de frota" },
      { name: "longitude", type: "DECIMAL(11,8)", constraints: "NOT NULL", description: "Coordenada geográfica para mapa e despacho de frota" },
      { name: "status_bergue_atual", type: "VARCHAR(30)", constraints: "DEFAULT 'normal'", description: "Status: normal, quase_cheio, coleta_a_caminho, coletado" }
    ],
    sampleSql: `-- Criação da tabela master de batedores
CREATE TABLE estabelecimentos_batedores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome_fantasia VARCHAR(120) NOT NULL,
    cnpj_ou_cpf VARCHAR(20) UNIQUE NOT NULL,
    tipo_agua VARCHAR(20) CHECK (tipo_agua IN ('mineral', 'filtrada')) NOT NULL,
    laudo_hidrico_validade DATE NOT NULL,
    sebrae_capacitado BOOLEAN DEFAULT FALSE,
    saldo_acai_coins INTEGER DEFAULT 0 CHECK (saldo_acai_coins >= 0),
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    status_bergue_atual VARCHAR(30) DEFAULT 'normal',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_batedores_geo ON estabelecimentos_batedores(latitude, longitude);`
  },
  {
    tableName: "solicitacoes_coleta_bergue",
    description: "Registro transacional das solicitações de logística reversa emitidas no botão 'Alerta de Bergue Cheio'.",
    businessImpact: "Aciona Webhook para a frota de biocombustível, gerencia SLA de coleta para evitar chorume e calcula Açaí Coins.",
    primaryKey: "id UUID",
    columns: [
      { name: "id", type: "UUID", constraints: "PRIMARY KEY DEFAULT gen_random_uuid()", description: "Identificador único da coleta" },
      { name: "batedor_id", type: "UUID", constraints: "REFERENCES estabelecimentos_batedores(id)", description: "Batedor solicitante da coleta" },
      { name: "empresa_biocombustivel_id", type: "VARCHAR(60)", constraints: "NOT NULL", description: "Parceiro logístico (ex: AmazonBio, EcoBiomassa)" },
      { name: "status", type: "VARCHAR(30)", constraints: "CHECK (status IN ('solicitado', 'despachado', 'a_caminho', 'concluido', 'cancelado'))", description: "Estado atual do ciclo de coleta" },
      { name: "quantidade_bergues", type: "INTEGER", constraints: "DEFAULT 1 CHECK (quantidade_bergues > 0)", description: "Número de sacos de alta capacidade a recolher" },
      { name: "tempo_estimado_minutos", type: "INTEGER", constraints: "DEFAULT 25", description: "Tempo de chegada em minutos (SLA do motorista)" },
      { name: "placa_veiculo_coletor", type: "VARCHAR(10)", constraints: "NULL", description: "Placa da van/caminhão atribuído" },
      { name: "qr_token_validacao", type: "VARCHAR(128)", constraints: "NOT NULL", description: "Token criptográfico HMAC para validação mútua no local" },
      { name: "moedas_creditadas", type: "INTEGER", constraints: "DEFAULT 0", description: "Quantidade de Açaí Coins geradas após pesagem" },
      { name: "peso_kg_aferido", type: "DECIMAL(8,2)", constraints: "NULL", description: "Peso exato dos caroços na balança do caminhão" },
      { name: "concluido_em", type: "TIMESTAMP WITH TIME ZONE", constraints: "NULL", description: "Timestamp exato da leitura do QR Code" }
    ],
    sampleSql: `-- Tabela de Logística Reversa de Resíduos
CREATE TABLE solicitacoes_coleta_bergue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batedor_id UUID NOT NULL REFERENCES estabelecimentos_batedores(id) ON DELETE CASCADE,
    empresa_biocombustivel_id VARCHAR(60) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'solicitado',
    quantidade_bergues INTEGER DEFAULT 1,
    tempo_estimado_minutos INTEGER DEFAULT 25,
    placa_veiculo_coletor VARCHAR(10),
    qr_token_validacao VARCHAR(128) NOT NULL,
    moedas_creditadas INTEGER DEFAULT 0,
    peso_kg_aferido DECIMAL(8,2),
    solicitado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    concluido_em TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_coleta_batedor_status ON solicitacoes_coleta_bergue(batedor_id, status);`
  },
  {
    tableName: "transacoes_acai_coins",
    description: "Ledger financeiro auditável de crédito e débito da Moeda Verde (Açaí Coins).",
    businessImpact: "Mantém a integridade do saldo, vincula bônus de resíduos, certificações SEBRAE e resgates no marketplace.",
    primaryKey: "id UUID",
    columns: [
      { name: "id", type: "UUID", constraints: "PRIMARY KEY DEFAULT gen_random_uuid()", description: "Hash único da transação" },
      { name: "batedor_id", type: "UUID", constraints: "REFERENCES estabelecimentos_batedores(id)", description: "Batedor titular da carteira" },
      { name: "tipo", type: "VARCHAR(30)", constraints: "CHECK (tipo IN ('credito_bergue', 'credito_sebrae', 'debito_resgate_marketplace'))", description: "Origem ou destino do valor" },
      { name: "quantidade_coins", type: "INTEGER", constraints: "NOT NULL", description: "Valor transacionado em moedas (positivo ou negativo)" },
      { name: "saldo_resultante", type: "INTEGER", constraints: "NOT NULL", description: "Snapshot do saldo da carteira pós-operação" },
      { name: "referencia_origem_id", type: "VARCHAR(80)", constraints: "NOT NULL", description: "ID da coleta de bergue, módulo Sebrae ou item resgatado" },
      { name: "descricao_amigavel", type: "VARCHAR(255)", constraints: "NOT NULL", description: "Texto claro para extrato bancário do batedor" }
    ],
    sampleSql: `-- Ledger de Moeda Verde (Açaí Coins)
CREATE TABLE transacoes_acai_coins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batedor_id UUID NOT NULL REFERENCES estabelecimentos_batedores(id),
    tipo VARCHAR(30) NOT NULL,
    quantidade_coins INTEGER NOT NULL,
    saldo_resultante INTEGER NOT NULL,
    referencia_origem_id VARCHAR(80) NOT NULL,
    descricao_amigavel VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`
  },
  {
    tableName: "resgates_marketplace_b2b",
    description: "Controle de resgates de insumos de higiene, subsídios de filtros/tanques e isenção de taxas.",
    businessImpact: "Permite a entrega física ou aplicação de subsídios com fornecedores credenciados na Amazônia.",
    primaryKey: "id UUID",
    columns: [
      { name: "id", type: "UUID", constraints: "PRIMARY KEY DEFAULT gen_random_uuid()", description: "ID do resgate" },
      { name: "batedor_id", type: "UUID", constraints: "REFERENCES estabelecimentos_batedores(id)", description: "Beneficiário" },
      { name: "item_id", type: "VARCHAR(50)", constraints: "NOT NULL", description: "Identificador do produto no catálogo" },
      { name: "custo_coins", type: "INTEGER", constraints: "NOT NULL", description: "Quantidade de moedas debitadas" },
      { name: "voucher_codigo", type: "VARCHAR(30)", constraints: "UNIQUE NOT NULL", description: "Código alfanumérico para retirada na distribuidora parceira" },
      { name: "status", type: "VARCHAR(20)", constraints: "DEFAULT 'ativo' CHECK (status IN ('ativo', 'utilizado', 'expirado'))", description: "Estado do voucher" }
    ],
    sampleSql: `-- Resgates no Marketplace B2B
CREATE TABLE resgates_marketplace_b2b (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batedor_id UUID NOT NULL REFERENCES estabelecimentos_batedores(id),
    item_id VARCHAR(50) NOT NULL,
    custo_coins INTEGER NOT NULL,
    voucher_codigo VARCHAR(30) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'ativo',
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resgatado_em TIMESTAMP WITH TIME ZONE
);`
  },
  {
    tableName: "avaliacoes_higiene_externa_b2c",
    description: "Auditoria colaborativa feita por clientes (moradores e turistas) sobre a limpeza da calçada e odor.",
    businessImpact: "Alimenta o multiplicador de 1.5x no ranking semanal e incentiva o batedor a manter o bergue recolhido.",
    primaryKey: "id UUID",
    columns: [
      { name: "id", type: "UUID", constraints: "PRIMARY KEY DEFAULT gen_random_uuid()", description: "ID da avaliação" },
      { name: "batedor_id", type: "UUID", constraints: "REFERENCES estabelecimentos_batedores(id)", description: "Batedor avaliado" },
      { name: "usuario_tipo", type: "VARCHAR(20)", constraints: "CHECK (usuario_tipo IN ('local', 'turista'))", description: "Perfil do cliente" },
      { name: "calcada_limpa_nota", type: "INTEGER", constraints: "CHECK (calcada_limpa_nota BETWEEN 1 AND 5)", description: "Nota de ausência de chorume e organização externa" },
      { name: "sem_odor_perceptivel", type: "BOOLEAN", constraints: "NOT NULL", description: "Confirmação de ausência de cheiro de fermentação" },
      { name: "peso_voto", type: "DECIMAL(3,1)", constraints: "DEFAULT 1.0", description: "Peso do voto (ex: moradores locais peso 2.0)" }
    ],
    sampleSql: `-- Auditoria Comunitária de Higiene Externa
CREATE TABLE avaliacoes_higiene_externa_b2c (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batedor_id UUID NOT NULL REFERENCES estabelecimentos_batedores(id),
    usuario_tipo VARCHAR(20) NOT NULL,
    calcada_limpa_nota INTEGER NOT NULL CHECK (calcada_limpa_nota BETWEEN 1 AND 5),
    sem_odor_perceptivel BOOLEAN NOT NULL,
    peso_voto DECIMAL(3,1) DEFAULT 1.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`
  }
];

export const UX_MICROINTERACTIONS_DATA: UXMicrointeractionDoc[] = [
  {
    featureName: "Botão 'Alerta de Bergue Cheio'",
    userRole: "Batedor (B2B)",
    trigger: "Toque simples no botão vermelho pulsante de emergência.",
    visualFeedback: "Botão faz transição instantânea com ripple circular, aciona spinner roxo e se transforma em card de 'Coleta Despachada' com placa do veículo e cronômetro em contagem regressiva.",
    hapticOrAudio: "Feedback tátil (Haptic Vibration forte de 150ms) confirmando o disparo imediato do Webhook.",
    businessOutcome: "Reduz o tempo de permanência do resíduo na calçada de 18 horas para menos de 45 minutos."
  },
  {
    featureName: "Cronômetro & Rastreamento da Frota de Biocombustível",
    userRole: "Batedor (B2B)",
    trigger: "Coleta em andamento.",
    visualFeedback: "Anel de progresso circular animado exibindo minutos restantes (ex: 18 min), status 'Caminhão a caminho' e barra de progresso verde progressiva.",
    hapticOrAudio: "Notificação sonora sutil de buzina suave quando o veículo estiver a menos de 5 minutos.",
    businessOutcome: "Alívio da ansiedade operacional do batedor com pouco espaço físico interno."
  },
  {
    featureName: "Leitura de QR Code e Bonificação Açaí Coins",
    userRole: "Batedor (B2B)",
    trigger: "Motorista da empresa de biocombustível escaneia o QR Code no app do batedor após carregar o bergue.",
    visualFeedback: "Explosão de partículas de folhas verdes e moedas douradas na tela (+150 Açaí Coins!), somando ao saldo da carteira digital com contador numérico animado.",
    hapticOrAudio: "Dupla vibração curta (sucesso) e som nítido de moedas tilintando.",
    businessOutcome: "Fidelização do batedor no descarte sustentável e incentivo à repetição do processo."
  },
  {
    featureName: "Resgate de Insumos & Subsídios no Marketplace",
    userRole: "Batedor (B2B)",
    trigger: "Toque em 'Resgatar' no card de Cloro Hospitalar ou Subsídio de Filtro.",
    visualFeedback: "Modal com confete ecológico, geração instantânea de Voucher com QR Code e Código Alfanumérico para retirada, e desconto automático do saldo.",
    hapticOrAudio: "Vibração de clique suave e som de carimbo de aprovação.",
    businessOutcome: "Injeção direta de economia operacional em produtos de higiene obrigatórios."
  },
  {
    featureName: "Avaliação B2C de 'Calçada Limpa & Sem Odor'",
    userRole: "Consumidor (B2C)",
    trigger: "Cliente finaliza pedido ou visualiza o ponto no mapa e toca no botão 'Auditar Calçada'.",
    visualFeedback: "Seleção rápida de 1 toque com ícones visuais (Vassoura/Calçada Brilhando + Nariz/Sem Odor). Ao confirmar, exibe badge '⚡ Multiplicador 1.5x aplicado ao batedor!'.",
    hapticOrAudio: "Feedback tátil leve.",
    businessOutcome: "Pressão social positiva para que batedores não acumulem resíduos na via pública."
  }
];
