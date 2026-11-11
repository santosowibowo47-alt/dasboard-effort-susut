import React, { useState } from 'react';
import {
  Search,
  Download,
  ArrowUpDown,
  Filter,
  Eye,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { UP3Record } from '../../types/lm';
import { formatKwh, formatNumber, formatPct, getPctColor } from '../../services/dataService';

interface MatrixTabProps {
  records: UP3Record[];
  selectedUnit: string;
  onSelectUnit: (unit: string) => void;
  onOpenDetailModal: (unit: UP3Record) => void;
}

type SortField =
  | 'unit'
  | 'totalTargetKwh'
  | 'totalRealKwh'
  | 'totalPencapaianPct'
  | 'p2tlReal'
  | 'meterReal'
  | 'billingReal'
  | 'effortTeknis';

type FilterTier = 'all' | 'high' | 'mid' | 'low';

export const MatrixTab: React.FC<MatrixTabProps> = ({
  records,
  selectedUnit,
  onSelectUnit,
  onOpenDetailModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<FilterTier>('all');
  const [sortField, setSortField] = useState<SortField>('totalPencapaianPct');
  const [sortAsc, setSortAsc] = useState(false);

  // Filter records
  const filtered = records.filter((r) => {
    // Search
    const matchesSearch = r.unit.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    // Filter tier
    if (tierFilter === 'all') return true;
    if (tierFilter === 'high') return r.totalPencapaianPct >= 15;
    if (tierFilter === 'mid')
      return r.totalPencapaianPct >= 10 && r.totalPencapaianPct < 15;
    if (tierFilter === 'low') return r.totalPencapaianPct < 10;
    return true;
  });

  // Sort records (keep UID JATIM at the bottom or top depending on sorting, but let's sort cleanly)
  const sorted = [...filtered].sort((a, b) => {
    let aVal: number | string = 0;
    let bVal: number | string = 0;

    switch (sortField) {
      case 'unit':
        aVal = a.unit;
        bVal = b.unit;
        break;
      case 'totalTargetKwh':
        aVal = a.totalTargetKwh;
        bVal = b.totalTargetKwh;
        break;
      case 'totalRealKwh':
        aVal = a.totalRealKwh;
        bVal = b.totalRealKwh;
        break;
      case 'totalPencapaianPct':
        aVal = a.totalPencapaianPct;
        bVal = b.totalPencapaianPct;
        break;
      case 'p2tlReal':
        aVal = a.subTotalP2tl.real;
        bVal = b.subTotalP2tl.real;
        break;
      case 'meterReal':
        aVal = a.subTotalGantiMeter.realKwh;
        bVal = b.subTotalGantiMeter.realKwh;
        break;
      case 'billingReal':
        aVal = a.optimalisasiBilling.real;
        bVal = b.optimalisasiBilling.real;
        break;
      case 'effortTeknis':
        aVal = a.effortTeknis.totalTargetKwh;
        bVal = b.effortTeknis.totalTargetKwh;
        break;
    }

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortAsc ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Unit UP3',
      'Target Total (kWh)',
      'Realisasi Total (kWh)',
      'Pencapaian (%)',
      'P2TL Realisasi (kWh)',
      'Ganti Meter Rusak (kWh)',
      'AMR-isasi (kWh)',
      'Token PB (kWh)',
      'Optimalisasi Billing (kWh)',
      'Effort Teknis Target (kWh)',
    ];

    const rows = sorted.map((r) => [
      `"${r.unit}"`,
      r.totalTargetKwh,
      r.totalRealKwh,
      `${r.totalPencapaianPct}%`,
      r.subTotalP2tl.real,
      r.subTotalGantiMeter.realKwh,
      r.amrisasi.realKwh,
      r.peningkatanTokenPb.realKwh,
      r.optimalisasiBilling.real,
      r.effortTeknis.totalTargetKwh,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Rekap_Performa_LM_UID_Jatim_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Control Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari UP3 (contoh: Surabaya, Malang, Madura)..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Tier filter & Export buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Tier Filters */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
            <span className="text-slate-500 dark:text-slate-400 px-2 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Status:
            </span>
            <button
              onClick={() => setTierFilter('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                tierFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Semua ({records.length})
            </button>
            <button
              onClick={() => setTierFilter('high')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                tierFilter === 'high'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              &ge; 15%
            </button>
            <button
              onClick={() => setTierFilter('mid')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                tierFilter === 'mid'
                  ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              10-14%
            </button>
            <button
              onClick={() => setTierFilter('low')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                tierFilter === 'low'
                  ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              &lt; 10%
            </button>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-sm cursor-pointer"
            title="Download Rekap CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* Table Data Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th
                  onClick={() => handleSort('unit')}
                  className="py-3 px-4 cursor-pointer hover:text-sky-600 dark:hover:text-sky-400"
                >
                  <div className="flex items-center gap-1">
                    <span>Unit Kerja</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('totalTargetKwh')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-sky-600 dark:hover:text-sky-400"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Target Total (kWh)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('totalRealKwh')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-sky-600 dark:hover:text-sky-400"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Realisasi Total (kWh)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('totalPencapaianPct')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-sky-600 dark:hover:text-sky-400"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Pencapaian (%)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('p2tlReal')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-sky-600 dark:hover:text-sky-400"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>P2TL Real (kWh)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('meterReal')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-sky-600 dark:hover:text-sky-400"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Ganti Meter (kWh)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('billingReal')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-sky-600 dark:hover:text-sky-400"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Billing Real (kWh)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('effortTeknis')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-sky-600 dark:hover:text-sky-400"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Effort Teknis (kWh)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {sorted.map((r) => {
                const isSelected = selectedUnit === r.unit;
                const isUid = r.isUidJatim;
                const pctColor = getPctColor(r.totalPencapaianPct);

                return (
                  <tr
                    key={r.unit}
                    className={`transition-colors ${
                      isUid
                        ? 'bg-slate-100/90 dark:bg-slate-800/80 font-bold'
                        : isSelected
                        ? 'bg-sky-50 dark:bg-sky-950/30'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {isUid ? (
                          <span className="font-bold text-sky-600 dark:text-sky-400">
                            🌐 UID JATIM (TOTAL)
                          </span>
                        ) : (
                          <button
                            onClick={() => onSelectUnit(r.unit)}
                            className="font-semibold text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 cursor-pointer text-left"
                          >
                            UP3 {r.unit}
                          </button>
                        )}
                        {isSelected && !isUid && (
                          <span className="text-[10px] font-semibold bg-sky-500 text-white px-1.5 py-0.2 rounded">
                            Aktif
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                      {formatNumber(r.totalTargetKwh)}
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-semibold tabular-nums text-slate-900 dark:text-white">
                      {formatNumber(r.totalRealKwh)}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-block font-mono font-bold tabular-nums px-2 py-0.5 rounded text-xs ${pctColor.badge}`}
                      >
                        {formatPct(r.totalPencapaianPct)}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300">
                      {formatNumber(r.subTotalP2tl.real)}
                    </td>

                    <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300">
                      {formatNumber(r.subTotalGantiMeter.realKwh)}
                    </td>

                    <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300">
                      {formatNumber(r.optimalisasiBilling.real)}
                    </td>

                    <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300">
                      {formatNumber(r.effortTeknis.totalTargetKwh)}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onOpenDetailModal(r)}
                        className="p-1.5 text-slate-400 hover:text-sky-500 dark:hover:text-sky-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 rounded-lg transition-colors cursor-pointer"
                        title={`Lihat Rincian ${r.unit}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
