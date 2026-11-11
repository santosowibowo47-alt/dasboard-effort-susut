import React, { useEffect } from 'react';
import {
  X,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Wrench,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { UP3Record } from '../types/lm';
import { formatKwh, formatNumber, formatPct, getPctColor } from '../services/dataService';

interface UnitDetailModalProps {
  unitRecord: UP3Record | null;
  onClose: () => void;
  onSelectUnit: (unit: string) => void;
}

export const UnitDetailModal: React.FC<UnitDetailModalProps> = ({
  unitRecord,
  onClose,
  onSelectUnit,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!unitRecord) return null;

  const pct = unitRecord.totalPencapaianPct;
  const pctStyle = getPctColor(pct);

  const handleApplyFilter = () => {
    onSelectUnit(unitRecord.unit);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider text-sky-500 uppercase">
                Profil Performa LM UP3
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                UP3 {unitRecord.unit}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Top Score Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400">Total Realisasi kWh</span>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                {formatKwh(unitRecord.totalRealKwh)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400">Target Total kWh</span>
              <div className="text-2xl font-bold font-mono text-slate-700 dark:text-slate-300 mt-1 tabular-nums">
                {formatKwh(unitRecord.totalTargetKwh)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400">Persentase Pencapaian</span>
              <div className={`text-2xl font-bold font-mono mt-1 tabular-nums ${pctStyle.text}`}>
                {formatPct(pct)}
              </div>
            </div>
          </div>

          {/* Non-Teknis Breakdown */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <ShieldAlert className="w-4 h-4 text-sky-500" />
              Rincian Aksi Non-Teknis
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-500 dark:text-slate-400">P2TL Rutin</div>
                <div className="font-mono font-bold text-slate-900 dark:text-white mt-0.5 tabular-nums">
                  {formatKwh(unitRecord.p2tlRutin.real)}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Target: {formatKwh(unitRecord.p2tlRutin.target)} ({formatPct(unitRecord.p2tlRutin.pct)})
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-500 dark:text-slate-400">P2TL Extra</div>
                <div className="font-mono font-bold text-slate-900 dark:text-white mt-0.5 tabular-nums">
                  {formatKwh(unitRecord.p2tlExtra.real)}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Target: {formatKwh(unitRecord.p2tlExtra.target)} ({formatPct(unitRecord.p2tlExtra.pct)})
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-500 dark:text-slate-400">Sub Total P2TL</div>
                <div className="font-mono font-bold text-amber-600 dark:text-amber-400 mt-0.5 tabular-nums">
                  {formatKwh(unitRecord.subTotalP2tl.real)}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Pencapaian: {formatPct(unitRecord.subTotalP2tl.pct)}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-500 dark:text-slate-400">Ganti Meter Rusak 1 Ph</div>
                <div className="font-mono font-bold text-slate-900 dark:text-white mt-0.5 tabular-nums">
                  {formatNumber(unitRecord.gantiMeter1Ph.realVol)} bh ({formatKwh(unitRecord.gantiMeter1Ph.realKwh)})
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Pencapaian: {formatPct(unitRecord.gantiMeter1Ph.pctVol)}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-500 dark:text-slate-400">AMR-isasi</div>
                <div className="font-mono font-bold text-slate-900 dark:text-white mt-0.5 tabular-nums">
                  {formatNumber(unitRecord.amrisasi.realVol)} titik ({formatKwh(unitRecord.amrisasi.realKwh)})
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Pencapaian: {formatPct(unitRecord.amrisasi.pctVol)}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-500 dark:text-slate-400">Optimalisasi Billing</div>
                <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 tabular-nums">
                  {formatKwh(unitRecord.optimalisasiBilling.real)}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Pencapaian: {formatPct(unitRecord.optimalisasiBilling.pct)}
                </div>
              </div>
            </div>
          </div>

          {/* Teknis Breakdown */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Wrench className="w-4 h-4 text-emerald-500" />
              Rincian Aksi Teknis (LM 1-4)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-sky-500">LM 1 - JTM</span>
                <div className="font-mono font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
                  {formatNumber(unitRecord.lm1Jtm.realVol)} titik
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Target: {unitRecord.lm1Jtm.targetVol} titik
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-amber-500">LM 2 - PHBTR</span>
                <div className="font-mono font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
                  {formatNumber(unitRecord.lm2Phbtr.realVol)} titik
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Target: {unitRecord.lm2Phbtr.targetVol} titik
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-emerald-500">LM 3 - JTR</span>
                <div className="font-mono font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
                  {formatNumber(unitRecord.lm3Jtr.realVol)} titik
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Target: {unitRecord.lm3Jtr.targetVol} titik
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-purple-500">LM 4 - SR</span>
                <div className="font-mono font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
                  {formatNumber(unitRecord.lm4Sr.realVol)} titik
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Target: {unitRecord.lm4Sr.targetVol} titik
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            Tutup
          </button>

          <button
            onClick={handleApplyFilter}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <span>Terapkan Sebagai Filter Utama</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
