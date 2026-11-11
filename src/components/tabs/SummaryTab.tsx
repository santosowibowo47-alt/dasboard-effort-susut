import React, { useState } from 'react';
import { Award, AlertCircle, TrendingUp, CheckCircle, Flame, Table as TableIcon, BarChart3 } from 'lucide-react';
import { UP3Record } from '../../types/lm';
import { InteractiveBarChart } from '../charts/InteractiveBarChart';
import { ActionBreakdownChart } from '../charts/ActionBreakdownChart';
import { SpreadsheetSourceTable } from '../SpreadsheetSourceTable';
import { formatKwh, formatNumber, formatPct, getPctColor } from '../../services/dataService';

interface SummaryTabProps {
  records: UP3Record[];
  currentRecord: UP3Record;
  selectedUnit: string;
  onSelectUnit: (unit: string) => void;
  onOpenDetailModal: (unit: UP3Record) => void;
}

export const SummaryTab: React.FC<SummaryTabProps> = ({
  records,
  currentRecord,
  selectedUnit,
  onSelectUnit,
  onOpenDetailModal,
}) => {
  const [viewFormat, setViewFormat] = useState<'table' | 'charts'>('table');
  const up3Only = records.filter((r) => !r.isUidJatim);

  // Sorted by achievement
  const ranked = [...up3Only].sort((a, b) => b.totalPencapaianPct - a.totalPencapaianPct);
  const top3 = ranked.slice(0, 3);
  const needsAttention = ranked.filter((r) => r.totalPencapaianPct < 10);

  return (
    <div className="space-y-5">
      {/* Highlights & Alerts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top 3 Performers */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-4 border border-slate-700/80 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold flex items-center gap-2 text-amber-300">
              <Award className="w-4 h-4 text-amber-400" />
              Top 3 UP3 Terbaik (Pencapaian %)
            </h4>
            <span className="text-[11px] text-slate-400">Peringkat UID Jatim</span>
          </div>
          <div className="space-y-2">
            {top3.map((unit, idx) => (
              <div
                key={unit.unit}
                onClick={() => onSelectUnit(unit.unit)}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 transition-colors cursor-pointer border border-slate-700/50"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center font-mono font-bold text-xs ${
                      idx === 0
                        ? 'bg-amber-400 text-amber-950'
                        : idx === 1
                        ? 'bg-slate-300 text-slate-900'
                        : 'bg-amber-700 text-white'
                    }`}
                  >
                    #{idx + 1}
                  </span>
                  <div>
                    <div className="font-semibold text-xs text-white">UP3 {unit.unit}</div>
                    <div className="text-[11px] text-slate-400">
                      Real: {formatNumber(unit.totalRealKwh)} kWh
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-sm text-emerald-400 tabular-nums">
                    {formatPct(unit.totalPencapaianPct)}
                  </span>
                  <div className="text-[10px] text-slate-400">dari target</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Attention / Low Performer Warning */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              Monitoring Unit Perlu Akselerasi (&lt;10%)
            </h4>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {needsAttention.length} Unit Terindikasi
            </span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {needsAttention.map((unit) => (
              <div
                key={unit.unit}
                onClick={() => onSelectUnit(unit.unit)}
                className="flex items-center justify-between p-2 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-100/60 dark:hover:bg-rose-950/40 transition-colors cursor-pointer border border-rose-200/60 dark:border-rose-900/40 text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    UP3 {unit.unit}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Target: {formatKwh(unit.totalTargetKwh)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                    {formatPct(unit.totalPencapaianPct)}
                  </span>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    Real: {formatNumber(unit.totalRealKwh)} kWh
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View Switcher: Spreadsheet Source Table (Default) vs Interactive Charts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-sky-500" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Tampilan Rekap Data Utama 16 UP3:
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs self-start sm:self-auto">
          <button
            onClick={() => setViewFormat('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              viewFormat === 'table'
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Tabel Spreadsheet Sumber</span>
          </button>
          <button
            onClick={() => setViewFormat('charts')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              viewFormat === 'charts'
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Grafik Komparasi</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewFormat === 'table' ? (
        <SpreadsheetSourceTable
          records={records}
          selectedUnit={selectedUnit}
          onSelectUnit={onSelectUnit}
          onOpenDetailModal={onOpenDetailModal}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <InteractiveBarChart
              records={records}
              selectedUnit={selectedUnit}
              onSelectUnit={onSelectUnit}
              onOpenDetailModal={onOpenDetailModal}
            />
          </div>
          <div className="lg:col-span-1">
            <ActionBreakdownChart currentRecord={currentRecord} />
          </div>
        </div>
      )}
    </div>
  );
};

