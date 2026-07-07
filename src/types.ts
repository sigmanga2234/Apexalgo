export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  style: 'Scalping' | 'Intraday' | 'Swing';
  fundedStatus: string;
  profitRatio: string;
  growthPct: number;
  quote: string;
  date: string;
  beforeEquity: number[];
  afterEquity: number[];
}

export interface CurriculumStep {
  id: number;
  title: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Mastery';
  description: string;
  highlights: string[];
}

export interface LiveTrade {
  id: string;
  pair: string;
  type: 'BUY' | 'SELL';
  entry: number;
  tp: number;
  sl: number;
  pips: number;
  status: 'PENDING' | 'ACTIVE' | 'HIT_TP' | 'HIT_SL';
  timestamp: string;
}
