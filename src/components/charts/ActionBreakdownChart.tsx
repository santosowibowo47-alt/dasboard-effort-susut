import React, { useState } from 'react';
import { PieChart, Info, ShieldAlert, Cpu, Wrench, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';
import { UP3Record } from '../../types/lm';
import { formatKwh, formatNumber, formatPct } from '../../services/dataService';

interface ActionBreakdownChartProps {
  currentRecord: UP3Record;
}

interface ProgramSlice {
  id: string;
  name: string;
  category: 'Non-Teknis' | 'Teknis';
  realKwh: number;
  targetKwh: number;
  color: string;
  icon: React.ReactNode;
}

export const ActionBreakdownChart: React.FC<ActionBreakdownChartProps> = ({ currentRecord }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Program Breakdown Data
  const programs: ProgramSlice[] = [
    {
      id: 'p2tl',
      name: 'P2TL (Rutin, Extra, Open)',
      category: 'Non-Teknis',
      realKwh: currentRecord.subTotalP2tl.real,
      targetKwh: currentRecord.subTotalP2tl.target,
      color: '#0284C7', // Sky Blue
      icon: <ShieldAlert className="w-4 h-4 text-sky-500" />,
    },
    {
      id: 'billing',
      name: 'Optimalisasi Billing',
      category: 'Non-Teknis',
      realKwh: currentRecord.optimalisasiBilling.real,
      targetKwh: currentRecord.optimalisasiBilling.target,
      color: '#10B981', // Emerald
      icon: <FileText className="w-4 h-4 text-emerald-500" />,
    },
    {
      id: 'meter',
      name: 'Ganti Meter Rusak (1 & 3 Ph)',
      category: 'Non-Teknis',
      realKwh: currentRecord.subTotalGantiMeter.realKwh,
      targetKwh: currentRecord.subTotalGantiMeter.targetKwh,
      color: '#F59E0B', // Amber
      icon: <Cpu className="w-4 h-4 text-amber-500" />,
    },
    {
      id: 'amr',
      name: 'AMR-isasi',
      category: 'Non-Teknis',
      realKwh: currentRecord.amrisasi.realKwh,
      targetKwh: currentRecord.amrisasi.targetKwh,
      color: '#8B5CF6', // Violet
      icon: <RefreshCw className="w-4 h-4 text-violet-500" />,
    },
    {
      id: 'token',
      name: 'Peningkatan Token PB',
      category: 'Non-Teknis',
      realKwh: currentRecord.peningkatanTokenPb.realKwh,
      targetKwh: currentRecord.peningkatanTokenPb.targetKwh,
      color: '#EC4899', // Pink
      icon: <CheckCircle2 className="w-4 h-4 text-pink-500" />,
    },
    {
      id: 'multiguna',
      name: 'Multiguna & Kompensasi UJL',
      category: 'Non-Teknis',
      realKwh: currentRecord.pengawasanMultiguna.real + currentRecord.kompensasiUjlLpb.real,
      targetKwh: currentRecord.pengawasanMultiguna.target + currentRecord.kompensasiUjlLpb.target,
      color: '#06B6D4', // Cyan
      icon: <Info className="w-4 h-4 text-cyan-500" />,
    },
    {
      id: 'teknis',
      name: 'Effort Teknis (LM 1-4)',
      category: 'Teknis',
      realKwh: currentRecord.effortTeknis.totalRealKwh,
      targetKwh: currentRecord.effortTeknis.totalTargetKwh,
      color: '#F97316', // Orange
      icon: <Wrench className="w-4 h-4 text-orange-500" />,
    },
  ];

  const totalRealOverall = programs.reduce((acc, p) => acc + p.realKwh, 0) || 1;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PieChart className="w-4 h-4 text-sky-500" />
            Kontribusi Realisasi Energi per Program
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Proporsi kWh energi terselamatkan berdasarkan program kerja
          </p>
        </div>
      </div>

      {/* Segmented Bar Visualization */}
      <div className="h-5 w-full rounded-lg overflow-hidden flex bg-slate-100 dark:bg-slate-800 shadow-inner">
        {programs.map((p) => {
          const sharePct = (p.realKwh / totalRealOverall) * 100;
          if (sharePct <= 0.2) return null;
          const isHighlighted = activeItem === null || activeItem === p.id;
          return (
            <div
              key={p.id}
              onMouseEnter={() => setActiveItem(p.id)}
              onMouseLeave={() => setActiveItem(null)}
              className="h-full transition-all duration-300 cursor-pointer relative"
              style={{
                width: `${sharePct}%`,
                backgroundColor: p.color,
                opacity: isHighlighted ? 1 : 0.35,
              }}
              title={`${p.name}: ${formatKwh(p.realKwh)} (${formatPct(sharePct)})`}
            />
          );
        })}
      </div>

      {/* Program Legend Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
        {programs.map((p) => {
          const sharePct = (p.realKwh / totalRealOverall) * 100;
          const achievementPct = p.targetKwh > 0 ? (p.realKwh / p.targetKwh) * 100 : 0;
          const isSelected = activeItem === p.id;

          return (
            <div
              key={p.id}
              onMouseEnter={() => setActiveItem(p.id)}
              onMouseLeave={() => setActiveItem(null)}
              className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'border-sky-400 dark:border-sky-500 bg-sky-50/50 dark:bg-sky-950/30 shadow-sm'
                  : 'border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: p.color }}
                  />
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {p.name}
                  </span>
                </div>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300 shrink-0 tabular-nums">
                  {formatPct(sharePct)}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 pt-1.5 border-t border-slate-200/50 dark:border-slate-800/60">
                <span>Real: <strong className="font-mono text-slate-700 dark:text-slate-300">{formatKwh(p.realKwh)}</strong></span>
                <span>
                  Target: {formatKwh(p.targetKwh)} ({formatPct(achievementPct)})
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
