import React from 'react';
import { Eye } from 'lucide-react';
import { UP3Record } from '../types/lm';
import { formatNumber, formatPct, getPctColor } from '../services/dataService';

export interface ActivityDataExtractor {
  code: string;
  title: string;
  shortCode: string;
  themeColor: {
    border: string;
    text: string;
    headerBg: string;
    gaugeTrack: string;
    gaugeFill: string;
    glow: string;
  };
  getData: (r: UP3Record) => {
    target: number;
    real: number;
    pct: number;
  };
}

interface ActivityGaugeCardProps {
  activity: ActivityDataExtractor;
  records: UP3Record[];
  uidJatimRecord: UP3Record;
  selectedUnit: string;
  onSelectUnit: (unit: string) => void;
  onOpenDetailModal: (unit: UP3Record) => void;
}

export const ActivityGaugeCard: React.FC<ActivityGaugeCardProps> = ({
  activity,
  records,
  uidJatimRecord,
  selectedUnit,
  onSelectUnit,
  onOpenDetailModal,
}) => {
  // 16 UP3 only for the table
  const up3Only = records.filter((r) => !r.isUidJatim);

  // Extract data for all 16 UP3
  const rows = up3Only.map((r) => {
    const itemData = activity.getData(r);
    return {
      record: r,
      unit: r.unit,
      target: itemData.target,
      real: itemData.real,
      pct: itemData.pct,
    };
  });

  // Sort descending by achievement %
  const sortedRows = [...rows].sort((a, b) => b.pct - a.pct);

  // UID JATIM overall benchmark
  const uidData = activity.getData(uidJatimRecord);
  const benchmarkPct = uidData.pct || 0;

  // Arc math for semicircle gauge:
  // Circumference of half circle with radius 54 is PI * 54 ≈ 169.6
  const radius = 54;
  const strokeWidth = 12;
  const arcLength = Math.PI * radius; // ~169.6
  const fillPct = Math.min(100, Math.max(0, benchmarkPct));
  const strokeDashoffset = arcLength - (arcLength * fillPct) / 100;

  return (
    <div
      className={`rounded-xl border ${activity.themeColor.border} bg-slate-900/95 dark:bg-slate-950/95 shadow-lg overflow-hidden flex flex-col transition-all hover:shadow-xl ${activity.themeColor.glow}`}
    >
      {/* 1. Header Box */}
      <div className="px-3.5 py-2.5 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`font-mono text-xs font-black tracking-wider ${activity.themeColor.text}`}>
            {activity.code}
          </span>
          <span className="text-slate-600">·</span>
          <h4 className="text-xs font-bold text-white uppercase truncate tracking-wide">
            {activity.title}
          </h4>
        </div>
      </div>

      {/* 2. Semicircle Speedometer Arc Gauge */}
      <div className="pt-3 pb-1 px-4 flex flex-col items-center justify-center relative">
        <div className="relative w-44 h-24 flex items-center justify-center">
          <svg viewBox="0 0 140 80" className="w-full h-full overflow-visible">
            {/* Background Semicircle Arc */}
            <path
              d="M 16 70 A 54 54 0 0 1 124 70"
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className={activity.themeColor.gaugeTrack}
            />

            {/* Segment Divider Lines (5 segments) */}
            <path
              d="M 16 70 A 54 54 0 0 1 124 70"
              fill="none"
              stroke="#0B132B"
              strokeWidth={strokeWidth + 2}
              strokeDasharray="2 32"
              className="opacity-70"
            />

            {/* Active Progress Arc */}
            <path
              d="M 16 70 A 54 54 0 0 1 124 70"
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={arcLength}
              strokeDashoffset={strokeDashoffset}
              className={`transition-all duration-700 ease-out ${activity.themeColor.gaugeFill}`}
            />
          </svg>

          {/* Center Benchmark Percentage Text */}
          <div className="absolute bottom-1 inset-x-0 flex flex-col items-center justify-center text-center">
            <span
              className={`text-xl sm:text-2xl font-black font-mono tracking-tight tabular-nums ${activity.themeColor.text}`}
            >
              {benchmarkPct.toLocaleString('id-ID', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
              %
            </span>
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              Capaian Jatim
            </span>
          </div>
        </div>
      </div>

      {/* 3. Themed Table Header Bar */}
      <div
        className={`px-3 py-1.5 ${activity.themeColor.headerBg} text-white text-[11px] font-bold flex items-center justify-between tracking-wide shadow-sm`}
      >
        <span className="w-32 truncate">Unit Pelaksana</span>
        <div className="flex items-center gap-2 text-right">
          <span className="w-12">{activity.shortCode} T</span>
          <span className="w-12">{activity.shortCode} R</span>
          <span className="w-14 text-right">{activity.shortCode} % ▼</span>
        </div>
      </div>

      {/* 4. Leaderboard Table (All 16 UP3) */}
      <div className="flex-1 max-h-[220px] overflow-y-auto scrollbar-thin divide-y divide-slate-800/80 bg-slate-950/60 text-xs">
        {sortedRows.map((item, idx) => {
          const isSelected = selectedUnit === item.unit;
          const pctColor = getPctColor(item.pct);

          return (
            <div
              key={item.unit}
              onClick={() => onSelectUnit(item.unit)}
              className={`px-3 py-1.5 flex items-center justify-between transition-colors cursor-pointer group ${
                isSelected
                  ? 'bg-sky-500/20 font-bold border-l-2 border-sky-400'
                  : idx % 2 === 0
                  ? 'bg-slate-900/40 hover:bg-slate-800/60'
                  : 'bg-slate-900/80 hover:bg-slate-800/80'
              }`}
            >
              {/* Unit name & rank */}
              <div className="flex items-center gap-1.5 w-32 min-w-0">
                <span className="font-mono text-slate-500 text-[10px] w-4 shrink-0">
                  {idx + 1}.
                </span>
                <span
                  className={`truncate font-semibold text-[11px] group-hover:${activity.themeColor.text} ${
                    isSelected ? 'text-sky-400 font-bold' : 'text-slate-200'
                  }`}
                  title={item.unit}
                >
                  {item.unit}
                </span>
              </div>

              {/* Target, Realisasi, and Percentage */}
              <div className="flex items-center gap-2 text-right font-mono text-[11px] tabular-nums shrink-0">
                <span className="w-12 text-slate-400">{formatNumber(item.target)}</span>
                <span className="w-12 text-slate-200 font-medium">
                  {formatNumber(item.real)}
                </span>
                <span
                  className={`w-14 text-right font-bold ${
                    item.pct >= 100
                      ? 'text-emerald-400'
                      : item.pct >= 95
                      ? 'text-amber-400'
                      : item.pct > 0
                      ? 'text-rose-400'
                      : 'text-slate-500'
                  }`}
                >
                  {formatPct(item.pct)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
