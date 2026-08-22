export interface Review {
  id: string;
  name: string;
  role: 'turista' | 'local';
  avatar: string;
  comment: string;
  rating: number;
  location: string;
  date: string;
  externalCleanlinessRating?: number;
  hasCleanSidewalkBadge?: boolean;
}

export type WaterType = 'mineral' | 'filtrada';

export interface Point {
  id: string;
  name: string;
  type: string;
  rating: number;
  reviews: number;
  distance: string;
  price: string;
  color: string;
  lat: number;
  lng: number;
  thickness: 'Grosso' | 'Médio' | 'Fino';
  waterType: WaterType;
  waterSource: string;
  waterSealDate: string;
  sebraeCertified: boolean;
  sidewalkCleanScore: number; // 0-5
  hasCleanSidewalkBonus: boolean;
  bergueStatus: 'normal' | 'quase_cheio' | 'coleta_a_caminho' | 'coletado';
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tag: string;
}

export type TabCategory = 'produtores' | 'batideiras' | 'residuos';

export interface TabContent {
  id: TabCategory;
  tabTitle: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  features: string[];
  metricLabel: string;
  metricValue: string;
  metricSub: string;
  ctaText: string;
}

export interface UXCopyNote {
  sectionId: string;
  title: string;
  copyStrategy: {
    formula: string;
    description: string;
    mentalTriggers: string[];
  };
  uxStrategy: {
    principle: string;
    description: string;
    visualTricks: string[];
  };
}

export interface BerguePickupRequest {
  id: string;
  batedorName: string;
  address: string;
  status: 'solicitado' | 'coleta_agendada' | 'caminhao_a_caminho' | 'concluido';
  requestedAt: string;
  estimatedArrivalMinutes: number;
  truckPlate: string;
  partnerCompany: string;
  bagCount: number;
  coinsReward: number;
}

export interface AcaiCoinTransaction {
  id: string;
  title: string;
  amount: number;
  type: 'earned_bergue' | 'earned_sebrae' | 'redeemed_item';
  date: string;
  partner: string;
}

export interface MarketplaceRewardItem {
  id: string;
  title: string;
  category: 'insumos' | 'equipamentos' | 'destaque';
  costCoins: number;
  originalPrice: string;
  discountLabel: string;
  iconName: string;
  description: string;
  available: boolean;
  partnerName: string;
}

export interface SebraeCourseModule {
  id: string;
  title: string;
  duration: string;
  category: string;
  coinsReward: number;
  completed: boolean;
  description: string;
  instructor: string;
}

export interface DatabaseTableDoc {
  tableName: string;
  description: string;
  businessImpact: string;
  primaryKey: string;
  columns: {
    name: string;
    type: string;
    constraints: string;
    description: string;
  }[];
  sampleSql: string;
}

export interface UXMicrointeractionDoc {
  featureName: string;
  userRole: 'Batedor (B2B)' | 'Consumidor (B2C)' | 'Parceiro Biocombustível';
  trigger: string;
  visualFeedback: string;
  hapticOrAudio: string;
  businessOutcome: string;
}
