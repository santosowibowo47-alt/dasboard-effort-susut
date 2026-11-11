import React, { useState } from 'react';
import {
  Wrench,
  Sliders,
  CheckSquare,
  Calendar,
  Layers,
} from 'lucide-react';
import { UP3Record } from '../../types/lm';
import { ActivityGaugeCard, ActivityDataExtractor } from '../ActivityGaugeCard';
import { formatPct } from '../../services/dataService';

interface TechnicalTabProps {
  records: UP3Record[];
  currentRecord: UP3Record;
  selectedUnit: string;
  onSelectUnit: (unit: string) => void;
  onOpenDetailModal: (unit: UP3Record) => void;
}

export const TechnicalTab: React.FC<TechnicalTabProps> = ({
  records,
  currentRecord,
  selectedUnit,
  onSelectUnit,
  onOpenDetailModal,
}) => {
  const [viewMode, setViewMode] = useState<'kwh' | 'vol'>('kwh');

  const up3Only = records.filter((r) => !r.isUidJatim);
  const uidJatim =
    records.find((r) => r.isUidJatim) || records[records.length - 1];

  // 5 Technical Activities requested by the user
  const activities: ActivityDataExtractor[] = [
    {
      code: 'KP',
      title: 'KONFIGURASI PENYULANG',
      shortCode: 'KP',
      themeColor: {
        border: 'border-sky-600/80',
        text: 'text-sky-400',
        headerBg: 'bg-sky-600',
        gaugeTrack: 'text-sky-950/70',
        gaugeFill: 'text-sky-400',
        glow: 'shadow-sky-950/50',
      },
      getData: (r) => ({
        target:
          viewMode === 'kwh'
            ? r.rekonfigPenyulangBaru.targetKwh
            : r.rekonfigPenyulangBaru.targetVol,
        real:
          viewMode === 'kwh'
            ? r.rekonfigPenyulangBaru.realKwh
            : r.rekonfigPenyulangBaru.realVol,
        pct:
          viewMode === 'kwh'
            ? r.rekonfigPenyulangBaru.pctKwh
            : r.rekonfigPenyulangBaru.pctVol,
      }),
    },
    {
      code: 'LM 1',
      title: 'RECONNECTING JTM',
      shortCode: 'JTM',
      themeColor: {
        border: 'border-emerald-600/80',
        text: 'text-emerald-400',
        headerBg: 'bg-emerald-600',
        gaugeTrack: 'text-emerald-950/70',
        gaugeFill: 'text-emerald-400',
        glow: 'shadow-emerald-950/50',
      },
      getData: (r) => ({
        target: viewMode === 'kwh' ? r.lm1Jtm.targetKwh : r.lm1Jtm.targetVol,
        real: viewMode === 'kwh' ? r.lm1Jtm.realKwh : r.lm1Jtm.realVol,
        pct: viewMode === 'kwh' ? r.lm1Jtm.pctKwh : r.lm1Jtm.pctVol,
      }),
    },
    {
      code: 'LM 2',
      title: 'RECONNECTING PHBTR',
      shortCode: 'PHBTR',
      themeColor: {
        border: 'border-amber-600/80',
        text: 'text-amber-400',
        headerBg: 'bg-amber-600',
        gaugeTrack: 'text-amber-950/70',
        gaugeFill: 'text-amber-400',
        glow: 'shadow-amber-950/50',
      },
      getData: (r) => ({
        target: viewMode === 'kwh' ? r.lm2Phbtr.targetKwh : r.lm2Phbtr.targetVol,
        real: viewMode === 'kwh' ? r.lm2Phbtr.realKwh : r.lm2Phbtr.realVol,
        pct: viewMode === 'kwh' ? r.lm2Phbtr.pctKwh : r.lm2Phbtr.pctVol,
      }),
    },
    {
      code: 'LM 3',
      title: 'RECONNECTING JTR',
      shortCode: 'JTR',
      themeColor: {
        border: 'border-cyan-600/80',
        text: 'text-cyan-400',
        headerBg: 'bg-cyan-600',
        gaugeTrack: 'text-cyan-950/70',
        gaugeFill: 'text-cyan-400',
        glow: 'shadow-cyan-950/50',
      },
      getData: (r) => ({
        target: viewMode === 'kwh' ? r.lm3Jtr.targetKwh : r.lm3Jtr.targetVol,
        real: viewMode === 'kwh' ? r.lm3Jtr.realKwh : r.lm3Jtr.realVol,
        pct: viewMode === 'kwh' ? r.lm3Jtr.pctKwh : r.lm3Jtr.pctVol,
      }),
    },
    {
      code: 'LM 4',
      title: 'RECONNECTING SR',
      shortCode: 'SR',
      themeColor: {
        border: 'border-purple-600/80',
        text: 'text-purple-400',
        headerBg: 'bg-purple-600',
        gaugeTrack: 'text-purple-950/70',
        gaugeFill: 'text-purple-400',
        glow: 'shadow-purple-950/50',
      },
      getData: (r) => ({
        target: viewMode === 'kwh' ? r.lm4Sr.targetKwh : r.lm4Sr.targetVol,
        real: viewMode === 'kwh' ? r.lm4Sr.realKwh : r.lm4Sr.realVol,
        pct: viewMode === 'kwh' ? r.lm4Sr.pctKwh : r.lm4Sr.pctVol,
      }),
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. TOP CONTROL BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Wrench className="w-4 h-4 text-emerald-400" />
              Effort Teknis &amp; LM 1-4
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Monitoring performa 5 kegiatan teknis jaringan distribusi seluruh 16 UP3 Jawa Timur
          </p>
        </div>

        {/* View Mode Toggle: Energi (kWh) vs Volume (Titik/Sirkit) */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs self-start sm:self-auto">
          <span className="text-slate-500 dark:text-slate-400 px-2 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5" /> Metrik:
          </span>
          <button
            onClick={() => setViewMode('kwh')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              viewMode === 'kwh'
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Energi (kWh)
          </button>
          <button
            onClick={() => setViewMode('vol')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              viewMode === 'vol'
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Volume (Titik / Sirkit)
          </button>
        </div>
      </div>

      {/* 2. GRID 5 KEGIATAN TEKNIS (FORMAT KARTU IDENTIK TAB NON-TEKNIS) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              5 Kegiatan LM Susut Teknis — 16 UP3 Jawa Timur
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Mode:{' '}
            <strong className="text-sky-400">
              {viewMode === 'kwh' ? 'Energi Terselamatkan (kWh)' : 'Volume Fisik (Titik/Sirkit)'}
            </strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((act) => (
            <ActivityGaugeCard
              key={act.code}
              activity={act}
              records={records}
              uidJatimRecord={uidJatim}
              selectedUnit={selectedUnit}
              onSelectUnit={onSelectUnit}
              onOpenDetailModal={onOpenDetailModal}
            />
          ))}
        </div>
      </div>

      {/* 3. FOCUS & NEXT ACTION SECTION */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/95 p-4 sm:p-5 shadow-md">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase mb-3">
          <CheckSquare className="w-4 h-4" />
          <span>FOCUS &amp; NEXT ACTION TEKNIS JARINGAN</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <span className="w-6 h-6 rounded-md bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <p className="text-slate-200 text-xs leading-relaxed">
              Percepatan eksekusi Reconnecting JTM &amp; PHBTR pada penyulang dengan beban tinggi.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <span className="w-6 h-6 rounded-md bg-sky-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              2
            </span>
            <p className="text-slate-200 text-xs leading-relaxed">
              Penyeimbangan beban trafo distribusi dan perbaikan konektor sambungan kendor.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <span className="w-6 h-6 rounded-md bg-amber-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <p className="text-slate-200 text-xs leading-relaxed">
              Optimalisasi konfigurasi penyulang baru untuk memecah beban jaringan kritis.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <span className="w-6 h-6 rounded-md bg-purple-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              4
            </span>
            <p className="text-slate-200 text-xs leading-relaxed">
              Validasi berkala volume fisik pekerjaan dan pemutakhiran data harian di aplikasi.
            </p>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM LEGEND & TIMESTAMP FOOTER BAR */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          <span className="font-bold text-slate-300">KETERANGAN WARNA:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Hijau &ge; 100%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Kuning &gt; 95% s.d &lt; 100%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Merah &lt; 95%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
            <span>Belum Ada</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <Calendar className="w-3.5 h-3.5 text-sky-400" />
          <span>Update Terakhir: {new Date().toLocaleDateString('id-ID')}</span>
        </div>
      </div>
    </div>
  );
};
