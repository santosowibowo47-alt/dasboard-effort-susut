import React from 'react';
import {
  Target,
  Zap,
  Trophy,
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Award,
  ShieldAlert,
  BarChart2,
  Users,
  CheckSquare,
} from 'lucide-react';
import { UP3Record } from '../../types/lm';
import { ActivityGaugeCard, ActivityDataExtractor } from '../ActivityGaugeCard';
import { formatKwh, formatNumber, formatPct } from '../../services/dataService';

interface NonTechnicalTabProps {
  records: UP3Record[];
  currentRecord: UP3Record;
  selectedUnit: string;
  onSelectUnit: (unit: string) => void;
  onOpenDetailModal: (unit: UP3Record) => void;
}

export const NonTechnicalTab: React.FC<NonTechnicalTabProps> = ({
  records,
  currentRecord,
  selectedUnit,
  onSelectUnit,
  onOpenDetailModal,
}) => {
  const up3Only = records.filter((r) => !r.isUidJatim);
  const uidJatim =
    records.find((r) => r.isUidJatim) || records[records.length - 1];

  // 9 Activities requested by the user
  const activities: ActivityDataExtractor[] = [
    {
      code: 'LM 5',
      title: 'SUB TOTAL kWh P2TL',
      shortCode: 'P2TL',
      themeColor: {
        border: 'border-blue-600/80',
        text: 'text-blue-400',
        headerBg: 'bg-blue-600',
        gaugeTrack: 'text-blue-950/70',
        gaugeFill: 'text-blue-400',
        glow: 'shadow-blue-950/50',
      },
      getData: (r) => ({
        target: r.subTotalP2tl.target,
        real: r.subTotalP2tl.real,
        pct: r.subTotalP2tl.pct,
      }),
    },
    {
      code: 'LM 6',
      title: 'PENGAWASAN MULTI GUNA',
      shortCode: 'MG',
      themeColor: {
        border: 'border-emerald-600/80',
        text: 'text-emerald-400',
        headerBg: 'bg-emerald-600',
        gaugeTrack: 'text-emerald-950/70',
        gaugeFill: 'text-emerald-400',
        glow: 'shadow-emerald-950/50',
      },
      getData: (r) => ({
        target: r.pengawasanMultiguna.target,
        real: r.pengawasanMultiguna.real,
        pct: r.pengawasanMultiguna.pct,
      }),
    },
    {
      code: 'LM 7',
      title: 'KOMPENSASI UJL LPB',
      shortCode: 'UJL',
      themeColor: {
        border: 'border-amber-600/80',
        text: 'text-amber-400',
        headerBg: 'bg-amber-600',
        gaugeTrack: 'text-amber-950/70',
        gaugeFill: 'text-amber-400',
        glow: 'shadow-amber-950/50',
      },
      getData: (r) => ({
        target: r.kompensasiUjlLpb.target,
        real: r.kompensasiUjlLpb.real,
        pct: r.kompensasiUjlLpb.pct,
      }),
    },
    {
      code: 'LM 8',
      title: 'AMR-ISASI',
      shortCode: 'AMR',
      themeColor: {
        border: 'border-rose-600/80',
        text: 'text-rose-400',
        headerBg: 'bg-rose-600',
        gaugeTrack: 'text-rose-950/70',
        gaugeFill: 'text-rose-400',
        glow: 'shadow-rose-950/50',
      },
      getData: (r) => ({
        target: r.amrisasi.targetKwh,
        real: r.amrisasi.realKwh,
        pct: r.amrisasi.pctKwh,
      }),
    },
    {
      code: 'LM 9',
      title: 'GANTI METER RUSAK',
      shortCode: 'MTR',
      themeColor: {
        border: 'border-cyan-600/80',
        text: 'text-cyan-400',
        headerBg: 'bg-cyan-600',
        gaugeTrack: 'text-cyan-950/70',
        gaugeFill: 'text-cyan-400',
        glow: 'shadow-cyan-950/50',
      },
      getData: (r) => ({
        target: r.subTotalGantiMeter.targetKwh,
        real: r.subTotalGantiMeter.realKwh,
        pct: r.subTotalGantiMeter.pctKwh,
      }),
    },
    {
      code: 'LM 10',
      title: 'PENYELESAIAN 720 JN',
      shortCode: '720JN',
      themeColor: {
        border: 'border-purple-600/80',
        text: 'text-purple-400',
        headerBg: 'bg-purple-600',
        gaugeTrack: 'text-purple-950/70',
        gaugeFill: 'text-purple-400',
        glow: 'shadow-purple-950/50',
      },
      getData: (r) => ({
        target: r.penyelesaian720Jn.targetKwh,
        real: r.penyelesaian720Jn.realKwh,
        pct: r.penyelesaian720Jn.pctKwh,
      }),
    },
    {
      code: 'LM 11',
      title: 'PENINGKATAN TOKEN PB',
      shortCode: 'TKPB',
      themeColor: {
        border: 'border-pink-600/80',
        text: 'text-pink-400',
        headerBg: 'bg-pink-600',
        gaugeTrack: 'text-pink-950/70',
        gaugeFill: 'text-pink-400',
        glow: 'shadow-pink-950/50',
      },
      getData: (r) => ({
        target: r.peningkatanTokenPb.targetKwh,
        real: r.peningkatanTokenPb.realKwh,
        pct: r.peningkatanTokenPb.pctKwh,
      }),
    },
    {
      code: 'LM 12',
      title: 'OPTIMALISASI BILLING',
      shortCode: 'BILL',
      themeColor: {
        border: 'border-teal-500/80',
        text: 'text-teal-400',
        headerBg: 'bg-teal-600',
        gaugeTrack: 'text-teal-950/70',
        gaugeFill: 'text-teal-400',
        glow: 'shadow-teal-950/50',
      },
      getData: (r) => ({
        target: r.optimalisasiBilling.target,
        real: r.optimalisasiBilling.real,
        pct: r.optimalisasiBilling.pct,
      }),
    },
    {
      code: 'LM 13',
      title: 'PENGEMBALIAN SALDO LPB',
      shortCode: 'LPB',
      themeColor: {
        border: 'border-yellow-600/80',
        text: 'text-yellow-400',
        headerBg: 'bg-yellow-600',
        gaugeTrack: 'text-yellow-950/70',
        gaugeFill: 'text-yellow-400',
        glow: 'shadow-yellow-950/50',
      },
      getData: (r) => ({
        target: r.pengembalianSaldoLpb.target,
        real: r.pengembalianSaldoLpb.real,
        pct: r.pengembalianSaldoLpb.pct,
      }),
    },
  ];

  // Calculate Average Capaian across 16 UP3
  const avgCapaian =
    up3Only.length > 0
      ? up3Only.reduce((acc, u) => acc + u.totalPencapaianPct, 0) / up3Only.length
      : 52.17;

  // Total Realisasi kWh (Gain)
  const totalGainKwh = uidJatim.totalRealKwh || 4_824_701;

  // Ranked UP3 list
  const rankedUp3 = [...up3Only].sort(
    (a, b) => b.totalPencapaianPct - a.totalPencapaianPct
  );
  const bestUp3 = rankedUp3[0] || { unit: 'GRESIK', totalPencapaianPct: 17 };
  const top3Up3 = rankedUp3.slice(0, 3);
  const lowestUp3 = rankedUp3[rankedUp3.length - 1] || {
    unit: 'SITUBONDO',
    totalPencapaianPct: 7,
  };

  // Indicators count
  const countHijau = up3Only.filter((u) => u.totalPencapaianPct >= 100).length;
  const countKuning = up3Only.filter(
    (u) => u.totalPencapaianPct >= 95 && u.totalPencapaianPct < 100
  ).length;
  const countMerah = up3Only.filter((u) => u.totalPencapaianPct < 95).length;
  const countBelumAda = up3Only.filter((u) => u.totalRealKwh === 0).length;

  // Top Contributors Gain kWh
  const topGainContributors = [...up3Only]
    .sort((a, b) => b.totalRealKwh - a.totalRealKwh)
    .slice(0, 3);

  // Top 5 P2TL performers
  const topP2tl = [...up3Only]
    .sort((a, b) => b.subTotalP2tl.real - a.subTotalP2tl.real)
    .slice(0, 5);

  const maxP2tlReal = Math.max(...topP2tl.map((p) => p.subTotalP2tl.real), 1);

  return (
    <div className="space-y-6">
      {/* 1. HEADER BANNER: EFFORT P2TL DAN BILLING */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-gradient-to-r from-slate-950 via-[#0A1733] to-slate-950 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-xs font-bold tracking-wider text-sky-400 uppercase">
                PT PLN (Persero) UID Jawa Timur
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1 uppercase">
              Effort P2TL dan Billing
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Monitoring performa harian 9 kegiatan non-teknis seluruh 16 UP3 Jawa Timur
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="px-3.5 py-1.5 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-300 font-mono text-xs font-bold tabular-nums">
              16 UP3 Terpantau
            </div>
          </div>
        </div>
      </div>

      {/* 2. EXECUTIVE KPI HEADER STRIP (6 BOXES) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Box 1: Rata-Rata Capaian LM */}
        <div className="rounded-xl border border-sky-800/80 bg-slate-900/90 p-3 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-sky-400 uppercase tracking-wider">
              <Target className="w-3.5 h-3.5" />
              <span>Rata-Rata Capaian</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">
              LM Susut Non Teknis
            </p>
          </div>
          <div className="my-2 text-center">
            <div className="text-2xl font-black font-mono text-sky-400 tabular-nums">
              {formatPct(avgCapaian)}
            </div>
          </div>
          <div className="flex items-center justify-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>ON TRACK</span>
          </div>
        </div>

        {/* Box 2: Estimasi Gain kWh */}
        <div className="rounded-xl border border-amber-800/80 bg-slate-900/90 p-3 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Estimasi Gain</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">
              Realisasi Terselamatkan
            </p>
          </div>
          <div className="my-2 text-center">
            <div className="text-lg sm:text-xl font-black font-mono text-amber-400 tabular-nums">
              {formatNumber(totalGainKwh)}
            </div>
            <div className="text-[10px] font-bold text-amber-300">kWh</div>
          </div>
          <div className="text-center text-[10px] font-semibold text-slate-400">
            POTENSI PEROLEHAN
          </div>
        </div>

        {/* Box 3: Ringkasan Indikator */}
        <div className="rounded-xl border border-slate-700/80 bg-slate-900/90 p-3 shadow-md flex flex-col justify-between">
          <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
            Ringkasan Indikator
          </div>
          <div className="grid grid-cols-2 gap-1.5 my-1.5">
            <div className="rounded bg-emerald-950/60 border border-emerald-500/40 p-1 text-center">
              <div className="text-[9px] font-bold text-emerald-400">HIJAU</div>
              <div className="text-xs font-mono font-bold text-white tabular-nums">
                {countHijau}
              </div>
            </div>
            <div className="rounded bg-amber-950/60 border border-amber-500/40 p-1 text-center">
              <div className="text-[9px] font-bold text-amber-400">KUNING</div>
              <div className="text-xs font-mono font-bold text-white tabular-nums">
                {countKuning}
              </div>
            </div>
            <div className="rounded bg-rose-950/60 border border-rose-500/40 p-1 text-center">
              <div className="text-[9px] font-bold text-rose-400">MERAH</div>
              <div className="text-xs font-mono font-bold text-white tabular-nums">
                {countMerah}
              </div>
            </div>
            <div className="rounded bg-slate-800/60 border border-slate-600/40 p-1 text-center">
              <div className="text-[9px] font-bold text-slate-400">BELUM ADA</div>
              <div className="text-xs font-mono font-bold text-white tabular-nums">
                {countBelumAda}
              </div>
            </div>
          </div>
          <div className="text-[9px] text-slate-400 text-center">
            Kategori 16 UP3
          </div>
        </div>

        {/* Box 4: UP3 Terbaik */}
        <div className="rounded-xl border border-emerald-800/80 bg-slate-900/90 p-3 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              <span>UP3 Terbaik</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">
              Rata-rata Capaian LM
            </p>
          </div>
          <div className="my-2 text-center">
            <div className="text-xs font-bold text-white truncate">
              {bestUp3.unit}
            </div>
            <div className="text-xl font-black font-mono text-emerald-400 tabular-nums">
              {formatPct(bestUp3.totalPencapaianPct)}
            </div>
          </div>
          <div className="text-center text-[10px] font-medium text-emerald-300/80">
            Peringkat #1
          </div>
        </div>

        {/* Box 5: Top 3 UP3 */}
        <div className="rounded-xl border border-blue-800/80 bg-slate-900/90 p-3 shadow-md flex flex-col justify-between">
          <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
            Top 3 UP3 (Capaian)
          </div>
          <div className="space-y-1 my-1.5 text-[10px]">
            {top3Up3.map((u, i) => (
              <div
                key={u.unit}
                className="flex items-center justify-between font-mono"
              >
                <span className="text-slate-300 truncate">
                  {i + 1}. {u.unit}
                </span>
                <span className="font-bold text-sky-400 tabular-nums ml-1">
                  {formatPct(u.totalPencapaianPct)}
                </span>
              </div>
            ))}
          </div>
          <div className="text-[9px] text-slate-400 text-center">
            UID Jawa Timur
          </div>
        </div>

        {/* Box 6: UP3 Terendah */}
        <div className="rounded-xl border border-rose-800/80 bg-slate-900/90 p-3 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-rose-400 uppercase tracking-wider">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>UP3 Terendah</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">
              Perlu Akselerasi
            </p>
          </div>
          <div className="my-2 text-center">
            <div className="text-xs font-bold text-white truncate">
              {lowestUp3.unit}
            </div>
            <div className="text-xl font-black font-mono text-rose-400 tabular-nums">
              {formatPct(lowestUp3.totalPencapaianPct)}
            </div>
          </div>
          <div className="text-center text-[10px] font-medium text-rose-300/80">
            Perlu Intervensi
          </div>
        </div>
      </div>

      {/* 3. GRID 9 KEGIATAN NON-TEKNIS BESERTA SELURUH UP3-NYA */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              9 Kegiatan LM Susut Non-Teknis — 16 UP3 Jawa Timur
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Gulir tabel di setiap kartu untuk melihat ke-16 UP3
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

      {/* 4. FOCUS & NEXT ACTION SECTION */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/95 p-4 sm:p-5 shadow-md">
        <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase mb-3">
          <CheckSquare className="w-4 h-4" />
          <span>FOCUS &amp; NEXT ACTION</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <span className="w-6 h-6 rounded-md bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <p className="text-slate-200 text-xs leading-relaxed">
              Rata-rata capaian LM mencapai{' '}
              <strong className="text-sky-400 font-mono">
                {formatPct(avgCapaian)}
              </strong>
              . Pertahankan capaian target kWh terselamatkan.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <span className="w-6 h-6 rounded-md bg-sky-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              2
            </span>
            <p className="text-slate-200 text-xs leading-relaxed">
              Fokus percepatan pada{' '}
              <strong className="text-rose-400 font-mono">
                {countMerah} UP3
              </strong>{' '}
              dengan capaian di bawah 95%.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <span className="w-6 h-6 rounded-md bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <p className="text-slate-200 text-xs leading-relaxed">
              Akselerasi penggantian meter rusak &amp; penertiban 720 JN sesuai target.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <span className="w-6 h-6 rounded-md bg-purple-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              4
            </span>
            <p className="text-slate-200 text-xs leading-relaxed">
              Monitoring harian dan validasi data secara konsisten antar ULP.
            </p>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM LEGEND & TIMESTAMP FOOTER BAR */}
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
