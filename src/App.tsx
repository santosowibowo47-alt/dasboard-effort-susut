import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { KpiCards } from './components/KpiCards';
import { SummaryTab } from './components/tabs/SummaryTab';
import { NonTechnicalTab } from './components/tabs/NonTechnicalTab';
import { TechnicalTab } from './components/tabs/TechnicalTab';
import { MatrixTab } from './components/tabs/MatrixTab';
import { UnitDetailModal } from './components/UnitDetailModal';
import { UP3Record, DashboardTab, SyncStatus } from './types/lm';
import {
  fetchLatestLMData,
  fallbackSnapshotRecords,
  formatKwh,
  formatNumber,
} from './services/dataService';
import { AlertCircle, RefreshCw, Radio, ExternalLink } from 'lucide-react';

export default function App() {
  const [records, setRecords] = useState<UP3Record[]>(fallbackSnapshotRecords);
  const [selectedUnit, setSelectedUnit] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<DashboardTab>('summary');
  const [refreshInterval, setRefreshInterval] = useState<number>(60);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [detailModalUnit, setDetailModalUnit] = useState<UP3Record | null>(null);

  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    state: 'idle',
    lastUpdated: new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    source: 'snapshot',
  });

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Data fetching logic
  const loadData = useCallback(async (isManual = false) => {
    setSyncStatus((prev) => ({
      ...prev,
      state: 'loading',
    }));

    try {
      const result = await fetchLatestLMData();
      setRecords(result.records);
      setSyncStatus({
        state: 'success',
        lastUpdated: result.updatedAt,
        source: result.source,
      });
    } catch (err) {
      console.error('Fetch error:', err);
      setSyncStatus((prev) => ({
        ...prev,
        state: 'error',
        errorMessage: 'Gagal memuat data live',
      }));
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Periodic Auto-Refresh
  useEffect(() => {
    if (refreshInterval <= 0) return;
    const intervalId = setInterval(() => {
      loadData();
    }, refreshInterval * 1000);

    return () => clearInterval(intervalId);
  }, [refreshInterval, loadData]);

  // Find currently active record (either UID JATIM or chosen UP3)
  const uidJatimRecord =
    records.find((r) => r.isUidJatim) || records[records.length - 1] || fallbackSnapshotRecords[16];

  const currentRecord =
    selectedUnit === 'ALL'
      ? uidJatimRecord
      : records.find((r) => r.unit === selectedUnit) || uidJatimRecord;

  const unitNames = records.map((r) => r.unit);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Header */}
      <Header
        units={unitNames}
        selectedUnit={selectedUnit}
        onSelectUnit={setSelectedUnit}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        syncStatus={syncStatus}
        onManualRefresh={() => loadData(true)}
        refreshInterval={refreshInterval}
        onChangeInterval={setRefreshInterval}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-6">
        {/* Global KPI Cards Strip (shown on Summary and Matrix tabs) */}
        {activeTab !== 'non-technical' && activeTab !== 'technical' && (
          <KpiCards
            currentRecord={currentRecord}
            isAllUnits={selectedUnit === 'ALL'}
          />
        )}

        {/* Active Tab View */}
        {activeTab === 'summary' && (
          <SummaryTab
            records={records}
            currentRecord={currentRecord}
            selectedUnit={selectedUnit}
            onSelectUnit={setSelectedUnit}
            onOpenDetailModal={setDetailModalUnit}
          />
        )}

        {activeTab === 'non-technical' && (
          <NonTechnicalTab
            records={records}
            currentRecord={currentRecord}
            selectedUnit={selectedUnit}
            onSelectUnit={setSelectedUnit}
            onOpenDetailModal={setDetailModalUnit}
          />
        )}

        {activeTab === 'technical' && (
          <TechnicalTab
            records={records}
            currentRecord={currentRecord}
            selectedUnit={selectedUnit}
            onSelectUnit={setSelectedUnit}
            onOpenDetailModal={setDetailModalUnit}
          />
        )}

        {activeTab === 'matrix' && (
          <MatrixTab
            records={records}
            selectedUnit={selectedUnit}
            onSelectUnit={setSelectedUnit}
            onOpenDetailModal={setDetailModalUnit}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              PT PLN (Persero) UID Jawa Timur
            </span>
            <span>·</span>
            <span>Bidang Transaksi Energi Listrik &amp; Losses Management</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://docs.google.com/spreadsheets/d/1WpOQqG31i_6NjQqoNJZsPC8jxpQKuVrhkZep-NLhM6U/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline"
            >
              <span>Sumber Data Google Spreadsheet</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <span className="font-mono tabular-nums">
              Update: {syncStatus.lastUpdated || '-'}
            </span>
          </div>
        </div>
      </footer>

      {/* Unit Detail Modal */}
      <UnitDetailModal
        unitRecord={detailModalUnit}
        onClose={() => setDetailModalUnit(null)}
        onSelectUnit={setSelectedUnit}
      />
    </div>
  );
}
