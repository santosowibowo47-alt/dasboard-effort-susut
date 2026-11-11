import React, { useState } from 'react';
import {
  Download,
  Search,
  Sliders,
  Building2,
  Table as TableIcon,
  Eye,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { UP3Record } from '../types/lm';
import { formatNumber, formatPct, getPctColor } from '../services/dataService';

interface SpreadsheetSourceTableProps {
  records: UP3Record[];
  selectedUnit: string;
  onSelectUnit: (unit: string) => void;
  onOpenDetailModal: (unit: UP3Record) => void;
}

export const SpreadsheetSourceTable: React.FC<SpreadsheetSourceTableProps> = ({
  records,
  selectedUnit,
  onSelectUnit,
  onOpenDetailModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCompact, setIsCompact] = useState(true);

  // Filter records
  const filteredRecords = records.filter((r) =>
    r.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cellClass = `${
    isCompact ? 'py-1.5 px-2 text-[11px]' : 'py-2 px-3 text-xs'
  } border-b border-r border-slate-200 dark:border-slate-800 font-mono tabular-nums text-right whitespace-nowrap`;

  const headerCellClass =
    'py-2 px-2 text-center text-[10px] sm:text-[11px] font-bold border-b border-r border-slate-300 dark:border-slate-700 whitespace-nowrap uppercase tracking-wider';

  // Format cell value: if 0 or falsy, show "-" like the spreadsheet
  const renderVal = (num: number, isPercent = false) => {
    if (num === 0 || isNaN(num)) return <span className="text-slate-400 dark:text-slate-600">-</span>;
    if (isPercent) {
      const color = getPctColor(num);
      return (
        <span className={`font-semibold ${color.text}`}>
          {num.toLocaleString('id-ID', { maximumFractionDigits: 1 })}%
        </span>
      );
    }
    return Math.round(num).toLocaleString('id-ID');
  };

  const exportFullCsv = () => {
    const csvRows: string[] = [];

    // Header level 1
    csvRows.push(
      [
        'Unit UP3',
        'P2TL Rutin Target',
        'P2TL Rutin Real',
        'P2TL Rutin %',
        'P2TL Extra Target',
        'P2TL Extra Real',
        'P2TL Extra %',
        'P2TL Open Target',
        'P2TL Open Real',
        'P2TL Open %',
        'Sub Total P2TL Target',
        'Sub Total P2TL Real',
        'Sub Total P2TL %',
        'Pengawasan Multiguna Target',
        'Pengawasan Multiguna Real',
        'Pengawasan Multiguna %',
        'Kompensasi UJL Target',
        'Kompensasi UJL Real',
        'Kompensasi UJL %',
        'AMR Target Vol',
        'AMR Target kWh',
        'AMR Real Vol',
        'AMR Real kWh',
        'AMR % Vol',
        'AMR % kWh',
        'Meter 1Ph Target Vol',
        'Meter 1Ph Target kWh',
        'Meter 1Ph Real Vol',
        'Meter 1Ph Real kWh',
        'Meter 1Ph % Vol',
        'Meter 1Ph % kWh',
        'Meter 3Ph Target Vol',
        'Meter 3Ph Target kWh',
        'Meter 3Ph Real Vol',
        'Meter 3Ph Real kWh',
        'Meter 3Ph % Vol',
        'Meter 3Ph % kWh',
        'Sub Total Meter Target Vol',
        'Sub Total Meter Target kWh',
        'Sub Total Meter Real Vol',
        'Sub Total Meter Real kWh',
        'Sub Total Meter % Vol',
        'Sub Total Meter % kWh',
        '720 JN Target Vol',
        '720 JN Target kWh',
        '720 JN Real Vol',
        '720 JN Real kWh',
        '720 JN % Vol',
        '720 JN % kWh',
        'Token PB Target Vol',
        'Token PB Target kWh',
        'Token PB Real Vol',
        'Token PB Real kWh',
        'Token PB % Vol',
        'Token PB % kWh',
        'Optimalisasi Billing Target',
        'Optimalisasi Billing Real',
        'Optimalisasi Billing %',
        'Saldo LPB Target',
        'Saldo LPB Real',
        'Saldo LPB %',
        'TOTAL TARGET (kWh)',
        'TOTAL REALISASI (kWh)',
        'TOTAL PENCAPAIAN (%)',
        'LM 1 JTM Target Vol',
        'LM 1 JTM Target kWh',
        'LM 1 JTM Real Vol',
        'LM 1 JTM Real kWh',
        'LM 1 JTM % Vol',
        'LM 1 JTM % kWh',
        'LM 2 PHBTR Target Vol',
        'LM 2 PHBTR Target kWh',
        'LM 2 PHBTR Real Vol',
        'LM 2 PHBTR Real kWh',
        'LM 2 PHBTR % Vol',
        'LM 2 PHBTR % kWh',
        'LM 3 JTR Target Vol',
        'LM 3 JTR Target kWh',
        'LM 3 JTR Real Vol',
        'LM 3 JTR Real kWh',
        'LM 3 JTR % Vol',
        'LM 3 JTR % kWh',
        'LM 4 SR Target Vol',
        'LM 4 SR Target kWh',
        'LM 4 SR Real Vol',
        'LM 4 SR Real kWh',
        'LM 4 SR % Vol',
        'LM 4 SR % kWh',
        'Effort Teknis Total Target (kWh)',
        'Effort Teknis Total Realisasi (kWh)',
        'Effort Teknis %',
      ].join(',')
    );

    // Data rows
    records.forEach((r) => {
      csvRows.push(
        [
          `"${r.unit}"`,
          r.p2tlRutin.target,
          r.p2tlRutin.real,
          `${r.p2tlRutin.pct}%`,
          r.p2tlExtra.target,
          r.p2tlExtra.real,
          `${r.p2tlExtra.pct}%`,
          r.p2tlOpen.target,
          r.p2tlOpen.real,
          `${r.p2tlOpen.pct}%`,
          r.subTotalP2tl.target,
          r.subTotalP2tl.real,
          `${r.subTotalP2tl.pct}%`,
          r.pengawasanMultiguna.target,
          r.pengawasanMultiguna.real,
          `${r.pengawasanMultiguna.pct}%`,
          r.kompensasiUjlLpb.target,
          r.kompensasiUjlLpb.real,
          `${r.kompensasiUjlLpb.pct}%`,
          r.amrisasi.targetVol,
          r.amrisasi.targetKwh,
          r.amrisasi.realVol,
          r.amrisasi.realKwh,
          `${r.amrisasi.pctVol}%`,
          `${r.amrisasi.pctKwh}%`,
          r.gantiMeter1Ph.targetVol,
          r.gantiMeter1Ph.targetKwh,
          r.gantiMeter1Ph.realVol,
          r.gantiMeter1Ph.realKwh,
          `${r.gantiMeter1Ph.pctVol}%`,
          `${r.gantiMeter1Ph.pctKwh}%`,
          r.gantiMeter3Ph.targetVol,
          r.gantiMeter3Ph.targetKwh,
          r.gantiMeter3Ph.realVol,
          r.gantiMeter3Ph.realKwh,
          `${r.gantiMeter3Ph.pctVol}%`,
          `${r.gantiMeter3Ph.pctKwh}%`,
          r.subTotalGantiMeter.targetVol,
          r.subTotalGantiMeter.targetKwh,
          r.subTotalGantiMeter.realVol,
          r.subTotalGantiMeter.realKwh,
          `${r.subTotalGantiMeter.pctVol}%`,
          `${r.subTotalGantiMeter.pctKwh}%`,
          r.penyelesaian720Jn.targetVol,
          r.penyelesaian720Jn.targetKwh,
          r.penyelesaian720Jn.realVol,
          r.penyelesaian720Jn.realKwh,
          `${r.penyelesaian720Jn.pctVol}%`,
          `${r.penyelesaian720Jn.pctKwh}%`,
          r.peningkatanTokenPb.targetVol,
          r.peningkatanTokenPb.targetKwh,
          r.peningkatanTokenPb.realVol,
          r.peningkatanTokenPb.realKwh,
          `${r.peningkatanTokenPb.pctVol}%`,
          `${r.peningkatanTokenPb.pctKwh}%`,
          r.optimalisasiBilling.target,
          r.optimalisasiBilling.real,
          `${r.optimalisasiBilling.pct}%`,
          r.pengembalianSaldoLpb.target,
          r.pengembalianSaldoLpb.real,
          `${r.pengembalianSaldoLpb.pct}%`,
          r.totalTargetKwh,
          r.totalRealKwh,
          `${r.totalPencapaianPct}%`,
          r.lm1Jtm.targetVol,
          r.lm1Jtm.targetKwh,
          r.lm1Jtm.realVol,
          r.lm1Jtm.realKwh,
          `${r.lm1Jtm.pctVol}%`,
          `${r.lm1Jtm.pctKwh}%`,
          r.lm2Phbtr.targetVol,
          r.lm2Phbtr.targetKwh,
          r.lm2Phbtr.realVol,
          r.lm2Phbtr.realKwh,
          `${r.lm2Phbtr.pctVol}%`,
          `${r.lm2Phbtr.pctKwh}%`,
          r.lm3Jtr.targetVol,
          r.lm3Jtr.targetKwh,
          r.lm3Jtr.realVol,
          r.lm3Jtr.realKwh,
          `${r.lm3Jtr.pctVol}%`,
          `${r.lm3Jtr.pctKwh}%`,
          r.lm4Sr.targetVol,
          r.lm4Sr.targetKwh,
          r.lm4Sr.realVol,
          r.lm4Sr.realKwh,
          `${r.lm4Sr.pctVol}%`,
          `${r.lm4Sr.pctKwh}%`,
          r.effortTeknis.totalTargetKwh,
          r.effortTeknis.totalRealKwh,
          `${r.effortTeknis.pct}%`,
        ].join(',')
      );
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute(
      'download',
      `Rekap_Action_UP3_Lengkap_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden flex flex-col">
      {/* Table Toolbar */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold">
            <TableIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Tabel Spreadsheet Sumber — Rekap Action UP3
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Format kolom persis sesuai sumber Google Sheets (16 UP3 + UID Jatim)
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari UP3..."
              className="pl-8 pr-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 w-36 sm:w-44"
            />
          </div>

          {/* Density Toggle */}
          <button
            onClick={() => setIsCompact(!isCompact)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Ubah kerapatan tabel"
          >
            {isCompact ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
            <span>{isCompact ? 'Renggang' : 'Kompak'}</span>
          </button>

          {/* Export Full CSV */}
          <button
            onClick={exportFullCsv}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-sm cursor-pointer"
            title="Download CSV lengkap semua kolom"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* Scrollable Table Viewport with Sticky First Column & Header */}
      <div className="overflow-x-auto max-h-[700px] overflow-y-auto scrollbar-thin">
        <table className="w-full text-left border-collapse border-separate border-spacing-0">
          <thead className="sticky top-0 z-30 shadow-sm text-white">
            {/* TIER 1: CATEGORY HEADERS */}
            <tr className="text-[11px] font-bold">
              {/* Sticky Corner Column: Unit */}
              <th
                rowSpan={2}
                className="sticky left-0 z-40 bg-slate-900 dark:bg-slate-950 text-sky-400 px-4 py-2 border-b-2 border-r-2 border-slate-700 shadow-[4px_0_10px_rgba(0,0,0,0.15)] min-w-[170px]"
              >
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-sky-400" />
                  <span>UNIT UP3</span>
                </div>
              </th>

              {/* P2TL Category */}
              <th
                colSpan={12}
                className="bg-blue-900/90 text-blue-100 border-b border-r border-blue-700 text-center py-1.5 px-2"
              >
                Peningkatan Perolehan P2TL
              </th>

              {/* Multiguna & Kompensasi UJL */}
              <th
                colSpan={3}
                className="bg-teal-900/90 text-teal-100 border-b border-r border-teal-700 text-center py-1.5 px-2"
              >
                Pengawasan Multiguna
              </th>
              <th
                colSpan={3}
                className="bg-teal-900/90 text-teal-100 border-b border-r border-teal-700 text-center py-1.5 px-2"
              >
                Kompensasi UJL LPB
              </th>

              {/* AMR-isasi */}
              <th
                colSpan={6}
                className="bg-indigo-900/90 text-indigo-100 border-b border-r border-indigo-700 text-center py-1.5 px-2"
              >
                AMR-isasi
              </th>

              {/* Ganti Meter Rusak */}
              <th
                colSpan={18}
                className="bg-amber-900/90 text-amber-100 border-b border-r border-amber-700 text-center py-1.5 px-2"
              >
                Ganti Meter Rusak (1 Ph, 3 Ph & Sub Total)
              </th>

              {/* Penyelesaian 720 JN */}
              <th
                colSpan={6}
                className="bg-purple-900/90 text-purple-100 border-b border-r border-purple-700 text-center py-1.5 px-2"
              >
                Penyelesaian 720 JN
              </th>

              {/* Peningkatan Token PB */}
              <th
                colSpan={6}
                className="bg-pink-900/90 text-pink-100 border-b border-r border-pink-700 text-center py-1.5 px-2"
              >
                Peningkatan Token PB
              </th>

              {/* Optimalisasi Billing & Saldo LPB */}
              <th
                colSpan={3}
                className="bg-emerald-900/90 text-emerald-100 border-b border-r border-emerald-700 text-center py-1.5 px-2"
              >
                Optimalisasi Billing
              </th>
              <th
                colSpan={3}
                className="bg-emerald-900/90 text-emerald-100 border-b border-r border-emerald-700 text-center py-1.5 px-2"
              >
                Pengembalian Saldo LPB Dimuka
              </th>

              {/* TOTAL NON-TEKNIS */}
              <th
                colSpan={3}
                className="bg-amber-600 text-slate-950 font-black border-b border-r border-amber-700 text-center py-1.5 px-2"
              >
                TOTAL KESELURUHAN NON-TEKNIS
              </th>

              {/* TEKNIS: LM 1 - LM 4 */}
              <th
                colSpan={6}
                className="bg-sky-800 text-sky-100 border-b border-r border-sky-600 text-center py-1.5 px-2"
              >
                LM 1 - Reconnecting JTM
              </th>
              <th
                colSpan={6}
                className="bg-amber-800 text-amber-100 border-b border-r border-amber-600 text-center py-1.5 px-2"
              >
                LM 2 - Reconnecting PHBTR
              </th>
              <th
                colSpan={6}
                className="bg-emerald-800 text-emerald-100 border-b border-r border-emerald-600 text-center py-1.5 px-2"
              >
                LM 3 - Reconnecting JTR
              </th>
              <th
                colSpan={6}
                className="bg-purple-800 text-purple-100 border-b border-r border-purple-600 text-center py-1.5 px-2"
              >
                LM 4 - Reconnecting SR
              </th>

              {/* Effort Teknis */}
              <th
                colSpan={3}
                className="bg-slate-900 text-emerald-400 font-bold border-b border-r border-slate-700 text-center py-1.5 px-2"
              >
                Effort Teknis
              </th>
            </tr>

            {/* TIER 2: SUB-HEADERS (METRIC COLUMNS) */}
            <tr className="bg-slate-800 dark:bg-slate-900 text-slate-200">
              {/* P2TL Rutin */}
              <th className={headerCellClass}>Rutin Target</th>
              <th className={headerCellClass}>Rutin Real</th>
              <th className={headerCellClass}>Rutin %</th>
              {/* P2TL Extra */}
              <th className={headerCellClass}>Extra Target</th>
              <th className={headerCellClass}>Extra Real</th>
              <th className={headerCellClass}>Extra %</th>
              {/* P2TL Open */}
              <th className={headerCellClass}>Open Target</th>
              <th className={headerCellClass}>Open Real</th>
              <th className={headerCellClass}>Open %</th>
              {/* Sub Total P2TL */}
              <th className={`${headerCellClass} bg-blue-950/70 text-sky-300 font-bold`}>Sub Target</th>
              <th className={`${headerCellClass} bg-blue-950/70 text-sky-300 font-bold`}>Sub Real</th>
              <th className={`${headerCellClass} bg-blue-950/70 text-sky-300 font-bold`}>Sub %</th>

              {/* Multiguna */}
              <th className={headerCellClass}>Target</th>
              <th className={headerCellClass}>Real</th>
              <th className={headerCellClass}>%</th>

              {/* Kompensasi UJL */}
              <th className={headerCellClass}>Target</th>
              <th className={headerCellClass}>Real</th>
              <th className={headerCellClass}>%</th>

              {/* AMR */}
              <th className={headerCellClass}>Tgt Vol</th>
              <th className={headerCellClass}>Tgt kWh</th>
              <th className={headerCellClass}>Real Vol</th>
              <th className={headerCellClass}>Real kWh</th>
              <th className={headerCellClass}>% Vol</th>
              <th className={headerCellClass}>% kWh</th>

              {/* Meter 1Ph */}
              <th className={headerCellClass}>1Ph Tgt Vol</th>
              <th className={headerCellClass}>1Ph Tgt kWh</th>
              <th className={headerCellClass}>1Ph Real Vol</th>
              <th className={headerCellClass}>1Ph Real kWh</th>
              <th className={headerCellClass}>1Ph % Vol</th>
              <th className={headerCellClass}>1Ph % kWh</th>

              {/* Meter 3Ph */}
              <th className={headerCellClass}>3Ph Tgt Vol</th>
              <th className={headerCellClass}>3Ph Tgt kWh</th>
              <th className={headerCellClass}>3Ph Real Vol</th>
              <th className={headerCellClass}>3Ph Real kWh</th>
              <th className={headerCellClass}>3Ph % Vol</th>
              <th className={headerCellClass}>3Ph % kWh</th>

              {/* Sub Total Meter */}
              <th className={`${headerCellClass} bg-amber-950/70 text-amber-300`}>Mtr Tgt Vol</th>
              <th className={`${headerCellClass} bg-amber-950/70 text-amber-300`}>Mtr Tgt kWh</th>
              <th className={`${headerCellClass} bg-amber-950/70 text-amber-300`}>Mtr Real Vol</th>
              <th className={`${headerCellClass} bg-amber-950/70 text-amber-300`}>Mtr Real kWh</th>
              <th className={`${headerCellClass} bg-amber-950/70 text-amber-300`}>Mtr % Vol</th>
              <th className={`${headerCellClass} bg-amber-950/70 text-amber-300`}>Mtr % kWh</th>

              {/* 720 JN */}
              <th className={headerCellClass}>Tgt Vol</th>
              <th className={headerCellClass}>Tgt kWh</th>
              <th className={headerCellClass}>Real Vol</th>
              <th className={headerCellClass}>Real kWh</th>
              <th className={headerCellClass}>% Vol</th>
              <th className={headerCellClass}>% kWh</th>

              {/* Token PB */}
              <th className={headerCellClass}>Tgt Vol</th>
              <th className={headerCellClass}>Tgt kWh</th>
              <th className={headerCellClass}>Real Vol</th>
              <th className={headerCellClass}>Real kWh</th>
              <th className={headerCellClass}>% Vol</th>
              <th className={headerCellClass}>% kWh</th>

              {/* Billing */}
              <th className={headerCellClass}>Target</th>
              <th className={headerCellClass}>Real</th>
              <th className={headerCellClass}>%</th>

              {/* Saldo LPB */}
              <th className={headerCellClass}>Target</th>
              <th className={headerCellClass}>Real</th>
              <th className={headerCellClass}>%</th>

              {/* TOTAL NON-TEKNIS */}
              <th className={`${headerCellClass} bg-amber-500/20 text-amber-400 font-black`}>Target (kWh)</th>
              <th className={`${headerCellClass} bg-amber-500/20 text-amber-400 font-black`}>Real (kWh)</th>
              <th className={`${headerCellClass} bg-amber-500/20 text-amber-400 font-black`}>Pencapaian (%)</th>

              {/* LM 1 JTM */}
              <th className={headerCellClass}>Tgt Vol</th>
              <th className={headerCellClass}>Tgt kWh</th>
              <th className={headerCellClass}>Real Vol</th>
              <th className={headerCellClass}>Real kWh</th>
              <th className={headerCellClass}>% Vol</th>
              <th className={headerCellClass}>% kWh</th>

              {/* LM 2 PHBTR */}
              <th className={headerCellClass}>Tgt Vol</th>
              <th className={headerCellClass}>Tgt kWh</th>
              <th className={headerCellClass}>Real Vol</th>
              <th className={headerCellClass}>Real kWh</th>
              <th className={headerCellClass}>% Vol</th>
              <th className={headerCellClass}>% kWh</th>

              {/* LM 3 JTR */}
              <th className={headerCellClass}>Tgt Vol</th>
              <th className={headerCellClass}>Tgt kWh</th>
              <th className={headerCellClass}>Real Vol</th>
              <th className={headerCellClass}>Real kWh</th>
              <th className={headerCellClass}>% Vol</th>
              <th className={headerCellClass}>% kWh</th>

              {/* LM 4 SR */}
              <th className={headerCellClass}>Tgt Vol</th>
              <th className={headerCellClass}>Tgt kWh</th>
              <th className={headerCellClass}>Real Vol</th>
              <th className={headerCellClass}>Real kWh</th>
              <th className={headerCellClass}>% Vol</th>
              <th className={headerCellClass}>% kWh</th>

              {/* Effort Teknis */}
              <th className={`${headerCellClass} bg-emerald-950/70 text-emerald-300 font-bold`}>Target (kWh)</th>
              <th className={`${headerCellClass} bg-emerald-950/70 text-emerald-300 font-bold`}>Real (kWh)</th>
              <th className={`${headerCellClass} bg-emerald-950/70 text-emerald-300 font-bold`}>Pencapaian (%)</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredRecords.map((r, rowIdx) => {
              const isSelected = selectedUnit === r.unit;
              const isUid = r.isUidJatim;

              return (
                <tr
                  key={r.unit}
                  className={`group transition-colors ${
                    isUid
                      ? 'bg-amber-500/10 dark:bg-amber-950/30 font-bold'
                      : isSelected
                      ? 'bg-sky-50 dark:bg-sky-950/40'
                      : rowIdx % 2 === 0
                      ? 'bg-white dark:bg-slate-900'
                      : 'bg-slate-50/70 dark:bg-slate-800/40'
                  } hover:bg-sky-100/50 dark:hover:bg-sky-900/30`}
                >
                  {/* Sticky First Column: Unit UP3 Name */}
                  <td
                    className={`sticky left-0 z-20 px-3 py-1.5 border-b-2 border-r-2 border-slate-300 dark:border-slate-700 shadow-[4px_0_8px_rgba(0,0,0,0.08)] whitespace-nowrap ${
                      isUid
                        ? 'bg-amber-100 dark:bg-amber-950/80 font-black text-amber-900 dark:text-amber-300'
                        : isSelected
                        ? 'bg-sky-100 dark:bg-sky-900/90 font-bold text-sky-800 dark:text-sky-200'
                        : 'bg-white dark:bg-slate-900 group-hover:bg-sky-50 dark:group-hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 min-w-[150px]">
                      <button
                        onClick={() => onSelectUnit(r.unit)}
                        className="font-bold text-xs hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer text-left truncate"
                      >
                        {isUid ? '🌐 UID JATIM (TOTAL)' : `UP3 ${r.unit}`}
                      </button>

                      <button
                        onClick={() => onOpenDetailModal(r)}
                        className="opacity-60 hover:opacity-100 text-slate-400 hover:text-sky-500 p-0.5 rounded cursor-pointer"
                        title="Lihat Detail Unit"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* P2TL Rutin */}
                  <td className={cellClass}>{renderVal(r.p2tlRutin.target)}</td>
                  <td className={cellClass}>{renderVal(r.p2tlRutin.real)}</td>
                  <td className={cellClass}>{renderVal(r.p2tlRutin.pct, true)}</td>

                  {/* P2TL Extra */}
                  <td className={cellClass}>{renderVal(r.p2tlExtra.target)}</td>
                  <td className={cellClass}>{renderVal(r.p2tlExtra.real)}</td>
                  <td className={cellClass}>{renderVal(r.p2tlExtra.pct, true)}</td>

                  {/* P2TL Open */}
                  <td className={cellClass}>{renderVal(r.p2tlOpen.target)}</td>
                  <td className={cellClass}>{renderVal(r.p2tlOpen.real)}</td>
                  <td className={cellClass}>{renderVal(r.p2tlOpen.pct, true)}</td>

                  {/* Sub Total P2TL */}
                  <td className={`${cellClass} font-bold text-blue-700 dark:text-blue-300 bg-blue-50/40 dark:bg-blue-950/20`}>
                    {renderVal(r.subTotalP2tl.target)}
                  </td>
                  <td className={`${cellClass} font-bold text-blue-700 dark:text-blue-300 bg-blue-50/40 dark:bg-blue-950/20`}>
                    {renderVal(r.subTotalP2tl.real)}
                  </td>
                  <td className={`${cellClass} font-bold bg-blue-50/40 dark:bg-blue-950/20`}>
                    {renderVal(r.subTotalP2tl.pct, true)}
                  </td>

                  {/* Pengawasan Multiguna */}
                  <td className={cellClass}>{renderVal(r.pengawasanMultiguna.target)}</td>
                  <td className={cellClass}>{renderVal(r.pengawasanMultiguna.real)}</td>
                  <td className={cellClass}>{renderVal(r.pengawasanMultiguna.pct, true)}</td>

                  {/* Kompensasi UJL LPB */}
                  <td className={cellClass}>{renderVal(r.kompensasiUjlLpb.target)}</td>
                  <td className={cellClass}>{renderVal(r.kompensasiUjlLpb.real)}</td>
                  <td className={cellClass}>{renderVal(r.kompensasiUjlLpb.pct, true)}</td>

                  {/* AMR-isasi */}
                  <td className={cellClass}>{renderVal(r.amrisasi.targetVol)}</td>
                  <td className={cellClass}>{renderVal(r.amrisasi.targetKwh)}</td>
                  <td className={cellClass}>{renderVal(r.amrisasi.realVol)}</td>
                  <td className={cellClass}>{renderVal(r.amrisasi.realKwh)}</td>
                  <td className={cellClass}>{renderVal(r.amrisasi.pctVol, true)}</td>
                  <td className={cellClass}>{renderVal(r.amrisasi.pctKwh, true)}</td>

                  {/* Meter 1Ph */}
                  <td className={cellClass}>{renderVal(r.gantiMeter1Ph.targetVol)}</td>
                  <td className={cellClass}>{renderVal(r.gantiMeter1Ph.targetKwh)}</td>
                  <td className={cellClass}>{renderVal(r.gantiMeter1Ph.realVol)}</td>
                  <td className={cellClass}>{renderVal(r.gantiMeter1Ph.realKwh)}</td>
                  <td className={cellClass}>{renderVal(r.gantiMeter1Ph.pctVol, true)}</td>
                  <td className={cellClass}>{renderVal(r.gantiMeter1Ph.pctKwh, true)}</td>

                  {/* Meter 3Ph */}
                  <td className={cellClass}>{renderVal(r.gantiMeter3Ph.targetVol)}</td>
                  <td className={cellClass}>{renderVal(r.gantiMeter3Ph.targetKwh)}</td>
                  <td className={cellClass}>{renderVal(r.gantiMeter3Ph.realVol)}</td>
                  <td className={cellClass}>{renderVal(r.gantiMeter3Ph.realKwh)}</td>
                  <td className={cellClass}>{renderVal(r.gantiMeter3Ph.pctVol, true)}</td>
                  <td className={cellClass}>{renderVal(r.gantiMeter3Ph.pctKwh, true)}</td>

                  {/* Sub Total Meter */}
                  <td className={`${cellClass} font-bold text-amber-700 dark:text-amber-300 bg-amber-50/40 dark:bg-amber-950/20`}>
                    {renderVal(r.subTotalGantiMeter.targetVol)}
                  </td>
                  <td className={`${cellClass} font-bold text-amber-700 dark:text-amber-300 bg-amber-50/40 dark:bg-amber-950/20`}>
                    {renderVal(r.subTotalGantiMeter.targetKwh)}
                  </td>
                  <td className={`${cellClass} font-bold text-amber-700 dark:text-amber-300 bg-amber-50/40 dark:bg-amber-950/20`}>
                    {renderVal(r.subTotalGantiMeter.realVol)}
                  </td>
                  <td className={`${cellClass} font-bold text-amber-700 dark:text-amber-300 bg-amber-50/40 dark:bg-amber-950/20`}>
                    {renderVal(r.subTotalGantiMeter.realKwh)}
                  </td>
                  <td className={`${cellClass} font-bold bg-amber-50/40 dark:bg-amber-950/20`}>
                    {renderVal(r.subTotalGantiMeter.pctVol, true)}
                  </td>
                  <td className={`${cellClass} font-bold bg-amber-50/40 dark:bg-amber-950/20`}>
                    {renderVal(r.subTotalGantiMeter.pctKwh, true)}
                  </td>

                  {/* 720 JN */}
                  <td className={cellClass}>{renderVal(r.penyelesaian720Jn.targetVol)}</td>
                  <td className={cellClass}>{renderVal(r.penyelesaian720Jn.targetKwh)}</td>
                  <td className={cellClass}>{renderVal(r.penyelesaian720Jn.realVol)}</td>
                  <td className={cellClass}>{renderVal(r.penyelesaian720Jn.realKwh)}</td>
                  <td className={cellClass}>{renderVal(r.penyelesaian720Jn.pctVol, true)}</td>
                  <td className={cellClass}>{renderVal(r.penyelesaian720Jn.pctKwh, true)}</td>

                  {/* Token PB */}
                  <td className={cellClass}>{renderVal(r.peningkatanTokenPb.targetVol)}</td>
                  <td className={cellClass}>{renderVal(r.peningkatanTokenPb.targetKwh)}</td>
                  <td className={cellClass}>{renderVal(r.peningkatanTokenPb.realVol)}</td>
                  <td className={cellClass}>{renderVal(r.peningkatanTokenPb.realKwh)}</td>
                  <td className={cellClass}>{renderVal(r.peningkatanTokenPb.pctVol, true)}</td>
                  <td className={cellClass}>{renderVal(r.peningkatanTokenPb.pctKwh, true)}</td>

                  {/* Billing */}
                  <td className={cellClass}>{renderVal(r.optimalisasiBilling.target)}</td>
                  <td className={cellClass}>{renderVal(r.optimalisasiBilling.real)}</td>
                  <td className={cellClass}>{renderVal(r.optimalisasiBilling.pct, true)}</td>

                  {/* Saldo LPB */}
                  <td className={cellClass}>{renderVal(r.pengembalianSaldoLpb.target)}</td>
                  <td className={cellClass}>{renderVal(r.pengembalianSaldoLpb.real)}</td>
                  <td className={cellClass}>{renderVal(r.pengembalianSaldoLpb.pct, true)}</td>

                  {/* TOTAL NON-TEKNIS */}
                  <td className={`${cellClass} font-black bg-amber-100/60 dark:bg-amber-950/40 text-slate-900 dark:text-slate-100`}>
                    {renderVal(r.totalTargetKwh)}
                  </td>
                  <td className={`${cellClass} font-black bg-amber-100/60 dark:bg-amber-950/40 text-sky-700 dark:text-sky-300`}>
                    {renderVal(r.totalRealKwh)}
                  </td>
                  <td className={`${cellClass} font-black bg-amber-100/60 dark:bg-amber-950/40`}>
                    {renderVal(r.totalPencapaianPct, true)}
                  </td>

                  {/* LM 1 JTM */}
                  <td className={cellClass}>{renderVal(r.lm1Jtm.targetVol)}</td>
                  <td className={cellClass}>{renderVal(r.lm1Jtm.targetKwh)}</td>
                  <td className={cellClass}>{renderVal(r.lm1Jtm.realVol)}</td>
                  <td className={cellClass}>{renderVal(r.lm1Jtm.realKwh)}</td>
                  <td className={cellClass}>{renderVal(r.lm1Jtm.pctVol, true)}</td>
                  <td className={cellClass}>{renderVal(r.lm1Jtm.pctKwh, true)}</td>

                  {/* LM 2 PHBTR */}
                  <td className={cellClass}>{renderVal(r.lm2Phbtr.targetVol)}</td>
                  <td className={cellClass}>{renderVal(r.lm2Phbtr.targetKwh)}</td>
                  <td className={cellClass}>{renderVal(r.lm2Phbtr.realVol)}</td>
                  <td className={cellClass}>{renderVal(r.lm2Phbtr.realKwh)}</td>
                  <td className={cellClass}>{renderVal(r.lm2Phbtr.pctVol, true)}</td>
                  <td className={cellClass}>{renderVal(r.lm2Phbtr.pctKwh, true)}</td>

                  {/* LM 3 JTR */}
                  <td className={cellClass}>{renderVal(r.lm3Jtr.targetVol)}</td>
                  <td className={cellClass}>{renderVal(r.lm3Jtr.targetKwh)}</td>
                  <td className={cellClass}>{renderVal(r.lm3Jtr.realVol)}</td>
                  <td className={cellClass}>{renderVal(r.lm3Jtr.realKwh)}</td>
                  <td className={cellClass}>{renderVal(r.lm3Jtr.pctVol, true)}</td>
                  <td className={cellClass}>{renderVal(r.lm3Jtr.pctKwh, true)}</td>

                  {/* LM 4 SR */}
                  <td className={cellClass}>{renderVal(r.lm4Sr.targetVol)}</td>
                  <td className={cellClass}>{renderVal(r.lm4Sr.targetKwh)}</td>
                  <td className={cellClass}>{renderVal(r.lm4Sr.realVol)}</td>
                  <td className={cellClass}>{renderVal(r.lm4Sr.realKwh)}</td>
                  <td className={cellClass}>{renderVal(r.lm4Sr.pctVol, true)}</td>
                  <td className={cellClass}>{renderVal(r.lm4Sr.pctKwh, true)}</td>

                  {/* Effort Teknis */}
                  <td className={`${cellClass} font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50/40 dark:bg-emerald-950/20`}>
                    {renderVal(r.effortTeknis.totalTargetKwh)}
                  </td>
                  <td className={`${cellClass} font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50/40 dark:bg-emerald-950/20`}>
                    {renderVal(r.effortTeknis.totalRealKwh)}
                  </td>
                  <td className={`${cellClass} font-bold bg-emerald-50/40 dark:bg-emerald-950/20`}>
                    {renderVal(r.effortTeknis.pct, true)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
