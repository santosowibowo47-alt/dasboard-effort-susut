import React from 'react';
import {
  Zap,
  RefreshCw,
  Sun,
  Moon,
  Building2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Radio,
} from 'lucide-react';
import { DashboardTab, SyncStatus } from '../types/lm';

interface HeaderProps {
  units: string[];
  selectedUnit: string;
  onSelectUnit: (unit: string) => void;
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  syncStatus: SyncStatus;
  onManualRefresh: () => void;
  refreshInterval: number;
  onChangeInterval: (seconds: number) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  units,
  selectedUnit,
  onSelectUnit,
  activeTab,
  onSelectTab,
  syncStatus,
  onManualRefresh,
  refreshInterval,
  onChangeInterval,
  isDark,
  onToggleTheme,
}) => {
  const tabs: { id: DashboardTab; label: string; icon: string }[] = [
    { id: 'summary', label: 'Ringkasan Eksekutif', icon: '📊' },
    { id: 'non-technical', label: 'Non-Teknis (P2TL & Billing)', icon: '⚡' },
    { id: 'technical', label: 'Teknis (Effort & LM 1-4)', icon: '🛠️' },
    { id: 'matrix', label: 'Matriks & Rincian UP3', icon: '📋' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-lg">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between py-3.5 gap-4">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3.5">
            <img
              src="/assets/aistudio/image_76d0a89d.png"
              alt="PLN Logo"
              className="h-10 sm:h-11 w-auto object-contain shrink-0 drop-shadow rounded"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wider text-sky-400 uppercase">
                  PT PLN (Persero) UID Jawa Timur
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-[11px] font-medium text-slate-400">
                  Losses Management
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Dashboard Performa LM Harian
              </h1>
            </div>
          </div>

          {/* Controls: Unit Filter, Refresh, Sync State & Theme */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Unit Selector Filter */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg px-2.5 py-1.5 transition-colors">
              <Building2 className="w-4 h-4 text-sky-400 shrink-0" />
              <label htmlFor="unit-select" className="text-xs text-slate-400 sr-only">
                Filter Unit
              </label>
              <select
                id="unit-select"
                value={selectedUnit}
                onChange={(e) => onSelectUnit(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-100 focus:outline-none cursor-pointer pr-1"
              >
                <option value="ALL" className="bg-slate-900 text-slate-100">
                  🌐 Seluruh UID JATIM (Konsolidasi)
                </option>
                <optgroup label="Daftar 16 UP3 Jawa Timur" className="bg-slate-900 text-slate-200">
                  {units
                    .filter((u) => u !== 'UID JATIM')
                    .map((unit) => (
                      <option key={unit} value={unit} className="bg-slate-900 text-slate-100">
                        📍 UP3 {unit}
                      </option>
                    ))}
                </optgroup>
              </select>
            </div>

            {/* Auto-Refresh Cadence */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 rounded-lg px-2 py-1.5 text-xs text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={refreshInterval}
                onChange={(e) => onChangeInterval(Number(e.target.value))}
                className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
                title="Interval Auto Refresh"
              >
                <option value={0} className="bg-slate-900">Auto: Mati</option>
                <option value={30} className="bg-slate-900">Auto: 30 dtk</option>
                <option value={60} className="bg-slate-900">Auto: 1 mnt</option>
                <option value={300} className="bg-slate-900">Auto: 5 mnt</option>
              </select>
            </div>

            {/* Manual Sync Trigger */}
            <button
              onClick={onManualRefresh}
              disabled={syncStatus.state === 'loading'}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white rounded-lg shadow-sm transition-all disabled:opacity-60 whitespace-nowrap cursor-pointer"
              title="Sinkronkan data dengan spreadsheet sekarang"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${syncStatus.state === 'loading' ? 'animate-spin' : ''}`}
              />
              <span className="hidden sm:inline">Sinkronkan</span>
            </button>

            {/* Sync Status Badge */}
            <div
              className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border ${
                syncStatus.source === 'live'
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              }`}
              title={
                syncStatus.source === 'live'
                  ? 'Tersinkron langsung dengan Google Spreadsheet'
                  : 'Menggunakan data snapshot terverifikasi'
              }
            >
              <Radio
                className={`w-3 h-3 ${
                  syncStatus.source === 'live' ? 'text-emerald-400 animate-pulse' : 'text-amber-400'
                }`}
              />
              <span className="font-mono text-[11px] tabular-nums">
                {syncStatus.lastUpdated || 'Baru'}
              </span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg border border-slate-700/80 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
              title={isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-400" />}
            </button>
          </div>
        </div>

        {/* Tab Navigation Row */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 border-t border-slate-800/80 scrollbar-none text-xs sm:text-sm">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/25 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
