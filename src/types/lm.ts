export interface TargetRealPct {
  target: number;
  real: number;
  pct: number;
}

export interface VolKwhMetrics {
  targetVol: number;
  targetKwh: number;
  realVol: number;
  realKwh: number;
  pctVol: number;
  pctKwh: number;
}

export interface VolKwhOnly {
  targetVol: number;
  targetKwh: number;
  realVol: number;
  realKwh: number;
}

export interface EffortTeknisMetrics {
  totalTargetKwh: number;
  totalRealKwh: number;
  pct: number;
}

export interface UP3Record {
  unit: string;
  isUidJatim: boolean;

  // Non-Teknis
  p2tlRutin: TargetRealPct;
  p2tlExtra: TargetRealPct;
  p2tlOpen: TargetRealPct;
  subTotalP2tl: TargetRealPct;
  pengawasanMultiguna: TargetRealPct;
  kompensasiUjlLpb: TargetRealPct;
  amrisasi: VolKwhMetrics;
  gantiMeter1Ph: VolKwhMetrics;
  gantiMeter3Ph: VolKwhMetrics;
  subTotalGantiMeter: VolKwhMetrics;
  penyelesaian720Jn: VolKwhMetrics;
  peningkatanTokenPb: VolKwhMetrics;
  optimalisasiBilling: TargetRealPct;
  pengembalianSaldoLpb: TargetRealPct;

  // Total Keseluruhan Non-Teknis
  totalTargetKwh: number;
  totalRealKwh: number;
  totalPencapaianPct: number;

  // Teknis
  penyulangBaru: VolKwhOnly;
  rekonfigurasi: VolKwhOnly;
  rekonfigPenyulangBaru: VolKwhMetrics;
  lm1Jtm: VolKwhMetrics;
  lm2Phbtr: VolKwhMetrics;
  lm3Jtr: VolKwhMetrics;
  lm4Sr: VolKwhMetrics;
  effortTeknis: EffortTeknisMetrics;
}

export type DashboardTab = 'summary' | 'non-technical' | 'technical' | 'matrix';

export interface SyncStatus {
  state: 'idle' | 'loading' | 'success' | 'error';
  lastUpdated: string | null;
  source: 'live' | 'snapshot';
  errorMessage?: string;
}
