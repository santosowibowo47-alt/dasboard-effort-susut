import React from 'react';
import {
  TrendingUp,
  Target,
  Zap,
  Wrench,
  Gauge,
  ShieldAlert,
  Layers,
} from 'lucide-react';
import { UP3Record } from '../types/lm';
import { formatKwh, formatNumber, formatPct, getPctColor } from '../services/dataService';

interface KpiCardsProps {
  currentRecord: UP3Record;
  isAllUnits: boolean;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ currentRecord, isAllUnits }) => {
  const overallPct = currentRecord.totalPencapaianPct;
  const pctStyle = getPctColor(overallPct);

  // Technical achievement percentage
  const techPct = currentRecord.effortTeknis.pct || 0;
  const techStyle = getPctColor(techPct);

  // P2TL achievement
  const p2tlPct = currentRecord.subTotalP2tl.pct || 0;
  const p2tlStyle = getPctColor(p2tlPct);

  // Ganti meter volume
  const meterVolReal = currentRecord.subTotalGantiMeter.realVol;
  const meterVolTarget = currentRecord.subTotalGantiMeter.targetVol;
  const meterVolPct = currentRecord.subTotalGantiMeter.pctVol;

  return (
    <div className="space-y-3">
      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* KPI 1: Total Realisasi kWh */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Total Realisasi LM Non-Teknis
              </p>
              <h3 className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white mt-1 tabular-nums">
                {formatKwh(currentRecord.totalRealKwh)}
              </h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200/50 dark:border-sky-800/50 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Target:</span>
            <span className="font-mono font-medium text-slate-700 dark:text-slate-300 tabular-nums">
              {formatKwh(currentRecord.totalTargetKwh)}
            </span>
          </div>
        </div>

        {/* KPI 2: Tingkat Pencapaian (%) */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Pencapaian Non-Teknis
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className={`text-2xl font-bold font-mono tracking-tight tabular-nums ${pctStyle.text}`}>
                  {formatPct(overallPct)}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">dari target</span>
              </div>
            </div>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${pctStyle.bg} ${pctStyle.text} border ${pctStyle.border}`}>
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/60">
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  overallPct >= 100
                    ? 'bg-emerald-500'
                    : overallPct >= 50
                    ? 'bg-sky-500'
                    : overallPct >= 15
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(100, Math.max(2, overallPct))}%` }}
              />
            </div>
          </div>
        </div>

        {/* KPI 3: Sub Total P2TL */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Perolehan P2TL (Rutin+Extra+Open)
              </p>
              <h3 className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white mt-1 tabular-nums">
                {formatKwh(currentRecord.subTotalP2tl.real)}
              </h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200/50 dark:border-amber-800/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Pencapaian:</span>
            <span className={`font-mono font-semibold tabular-nums ${p2tlStyle.text}`}>
              {formatPct(p2tlPct)} ({formatKwh(currentRecord.subTotalP2tl.target)} target)
            </span>
          </div>
        </div>

        {/* KPI 4: Effort Teknis (LM 1-4) */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Effort Teknis (LM 1-4 & Jaringan)
              </p>
              <h3 className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white mt-1 tabular-nums">
                {currentRecord.effortTeknis.totalRealKwh > 0
                  ? formatKwh(currentRecord.effortTeknis.totalRealKwh)
                  : `${formatNumber(currentRecord.effortTeknis.totalTargetKwh)} kWh Target`}
              </h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/50 dark:border-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Target kWh:</span>
            <span className="font-mono font-medium text-slate-700 dark:text-slate-300 tabular-nums">
              {formatNumber(currentRecord.effortTeknis.totalTargetKwh)} kWh ({formatPct(techPct)})
            </span>
          </div>
        </div>
      </div>

      {/* Secondary Quick Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        <div className="bg-slate-50 dark:bg-slate-900/60 rounded-lg p-2.5 border border-slate-200 dark:border-slate-800 text-xs">
          <div className="text-slate-500 dark:text-slate-400">Ganti Meter Rusak (Fisik)</div>
          <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5 tabular-nums">
            {formatNumber(meterVolReal)} / {formatNumber(meterVolTarget)} bh{' '}
            <span className="text-sky-500 font-semibold">({formatPct(meterVolPct)})</span>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/60 rounded-lg p-2.5 border border-slate-200 dark:border-slate-800 text-xs">
          <div className="text-slate-500 dark:text-slate-400">AMR-isasi (Realisasi)</div>
          <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5 tabular-nums">
            {formatNumber(currentRecord.amrisasi.realVol)} titik{' '}
            <span className="text-slate-500 dark:text-slate-400 font-normal">
              ({formatKwh(currentRecord.amrisasi.realKwh)})
            </span>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/60 rounded-lg p-2.5 border border-slate-200 dark:border-slate-800 text-xs">
          <div className="text-slate-500 dark:text-slate-400">Optimalisasi Billing</div>
          <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5 tabular-nums">
            {formatKwh(currentRecord.optimalisasiBilling.real)}{' '}
            <span className="text-emerald-500 font-semibold">
              ({formatPct(currentRecord.optimalisasiBilling.pct)})
            </span>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/60 rounded-lg p-2.5 border border-slate-200 dark:border-slate-800 text-xs">
          <div className="text-slate-500 dark:text-slate-400">Token PB Terserap</div>
          <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5 tabular-nums">
            {formatNumber(currentRecord.peningkatanTokenPb.realVol)} transaksi{' '}
            <span className="text-sky-500 font-semibold">
              ({formatPct(currentRecord.peningkatanTokenPb.pctKwh)})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
