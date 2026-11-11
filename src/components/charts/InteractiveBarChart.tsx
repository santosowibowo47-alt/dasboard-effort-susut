import React, { useState } from 'react';
import { ArrowUpDown, Award, Eye } from 'lucide-react';
import { UP3Record } from '../../types/lm';
import { formatKwh, formatNumber, formatPct, getPctColor } from '../../services/dataService';

interface InteractiveBarChartProps {
  records: UP3Record[];
  selectedUnit: string;
  onSelectUnit: (unit: string) => void;
  onOpenDetailModal: (unit: UP3Record) => void;
}

type SortMetric = 'pct' | 'realKwh' | 'targetKwh';

export const InteractiveBarChart: React.FC<InteractiveBarChartProps> = ({
  records,
  selectedUnit,
  onSelectUnit,
  onOpenDetailModal,
}) => {
  const [sortMetric, setSortMetric] = useState<SortMetric>('pct');
  const [hoveredRecord, setHoveredRecord] = useState<UP3Record | null>(null);

  // Filter out UID JATIM from UP3 list for clean comparison
  const up3List = records.filter((r) => !r.isUidJatim);

  // Sorted list
  const sortedRecords = [...up3List].sort((a, b) => {
    if (sortMetric === 'pct') {
      return b.totalPencapaianPct - a.totalPencapaianPct;
    }
    if (sortMetric === 'realKwh') {
      return b.totalRealKwh - a.totalRealKwh;
    }
    return b.totalTargetKwh - a.totalTargetKwh;
  });

  const maxPct = Math.max(...sortedRecords.map((r) => r.totalPencapaianPct), 25);
  const maxReal = Math.max(...sortedRecords.map((r) => r.totalRealKwh), 1_000_000);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Leaderboard & Komparasi 16 UP3
            </h3>
            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-mono">
              16 Unit
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Klik batang grafik untuk memfilter dashboard atau melihat rincian unit
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg text-xs">
          <span className="text-slate-500 dark:text-slate-400 px-2 flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3" /> Urutkan:
          </span>
          <button
            onClick={() => setSortMetric('pct')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              sortMetric === 'pct'
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Pencapaian (%)
          </button>
          <button
            onClick={() => setSortMetric('realKwh')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              sortMetric === 'realKwh'
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Realisasi (kWh)
          </button>
          <button
            onClick={() => setSortMetric('targetKwh')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              sortMetric === 'targetKwh'
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Target (kWh)
          </button>
        </div>
      </div>

      {/* Visual Chart Bars */}
      <div className="space-y-2.5">
        {sortedRecords.map((record, index) => {
          const isSelected = selectedUnit === record.unit;
          const isHovered = hoveredRecord?.unit === record.unit;
          const pct = record.totalPencapaianPct;
          const pctColor = getPctColor(pct);

          // Bar width percentage calculation
          const barWidth =
            sortMetric === 'pct'
              ? Math.min(100, Math.max(3, (pct / maxPct) * 100))
              : Math.min(100, Math.max(3, (record.totalRealKwh / maxReal) * 100));

          return (
            <div
              key={record.unit}
              onMouseEnter={() => setHoveredRecord(record)}
              onMouseLeave={() => setHoveredRecord(null)}
              className={`group p-2 rounded-lg transition-all border ${
                isSelected
                  ? 'bg-sky-50/80 dark:bg-sky-950/40 border-sky-400 dark:border-sky-600 shadow-sm'
                  : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center justify-between gap-3 text-xs mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  {/* Rank badge */}
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-[10px] shrink-0 tabular-nums ${
                      index === 0
                        ? 'bg-amber-400 text-amber-950 shadow-sm'
                        : index === 1
                        ? 'bg-slate-300 dark:bg-slate-600 text-slate-800 dark:text-slate-100'
                        : index === 2
                        ? 'bg-amber-600/60 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {index + 1}
                  </span>

                  {/* Unit Name button */}
                  <button
                    onClick={() => onSelectUnit(record.unit)}
                    className="font-bold text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors truncate text-left cursor-pointer"
                  >
                    UP3 {record.unit}
                  </button>

                  {index === 0 && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded">
                      <Award className="w-3 h-3" /> Top 1
                    </span>
                  )}
                </div>

                {/* Values & Action Link */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-slate-500 dark:text-slate-400 mr-1.5 hidden md:inline">
                      Real: {formatNumber(record.totalRealKwh)} kWh
                    </span>
                    <span className={`font-mono font-bold tabular-nums ${pctColor.text}`}>
                      {formatPct(pct)}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenDetailModal(record)}
                    className="p-1 text-slate-400 hover:text-sky-500 dark:hover:text-sky-300 rounded hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors cursor-pointer"
                    title="Lihat Rincian Lengkap UP3"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div
                onClick={() => onSelectUnit(record.unit)}
                className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 relative overflow-hidden cursor-pointer"
              >
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    pct >= 100
                      ? 'bg-emerald-500'
                      : pct >= 50
                      ? 'bg-sky-500'
                      : pct >= 15
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>

              {/* Hover detail stats */}
              {(isHovered || isSelected) && (
                <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <div>
                    Target Total: <span className="font-mono text-slate-700 dark:text-slate-300 font-medium">{formatKwh(record.totalTargetKwh)}</span>
                  </div>
                  <div>
                    P2TL Realisasi: <span className="font-mono text-amber-600 dark:text-amber-400 font-medium">{formatKwh(record.subTotalP2tl.real)}</span>
                  </div>
                  <div>
                    Effort Teknis: <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">{formatKwh(record.effortTeknis.totalTargetKwh)}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
