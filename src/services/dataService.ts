import snapshotJson from '../data/snapshot.json';
import { UP3Record } from '../types/lm';

const GOOGLE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1WpOQqG31i_6NjQqoNJZsPC8jxpQKuVrhkZep-NLhM6U/gviz/tq?tqx=out:csv&sheet=rekap%20action%20UP3';

function cleanNum(val: string | undefined): number {
  if (!val) return 0;
  let str = val.trim();
  if (str === '-' || str === '') return 0;
  str = str.replace('%', '').trim();
  str = str.replace(/\./g, '').replace(/,/g, '.');
  const num = parseFloat(str);
  return isNaN(num) ? 0 : num;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

export function parseCsvToRecords(csvText: string): UP3Record[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const records: UP3Record[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);
    const unit = (row[1] || '').trim();
    if (!unit) continue;

    const record: UP3Record = {
      unit,
      isUidJatim: unit === 'UID JATIM',
      p2tlRutin: {
        target: cleanNum(row[2]),
        real: cleanNum(row[3]),
        pct: cleanNum(row[4]),
      },
      p2tlExtra: {
        target: cleanNum(row[5]),
        real: cleanNum(row[6]),
        pct: cleanNum(row[7]),
      },
      p2tlOpen: {
        target: cleanNum(row[8]),
        real: cleanNum(row[9]),
        pct: cleanNum(row[10]),
      },
      subTotalP2tl: {
        target: cleanNum(row[11]),
        real: cleanNum(row[12]),
        pct: cleanNum(row[13]),
      },
      pengawasanMultiguna: {
        target: cleanNum(row[14]),
        real: cleanNum(row[15]),
        pct: cleanNum(row[16]),
      },
      kompensasiUjlLpb: {
        target: cleanNum(row[17]),
        real: cleanNum(row[18]),
        pct: cleanNum(row[19]),
      },
      amrisasi: {
        targetVol: cleanNum(row[20]),
        targetKwh: cleanNum(row[21]),
        realVol: cleanNum(row[22]),
        realKwh: cleanNum(row[23]),
        pctVol: cleanNum(row[24]),
        pctKwh: cleanNum(row[25]),
      },
      gantiMeter1Ph: {
        targetVol: cleanNum(row[26]),
        targetKwh: cleanNum(row[27]),
        realVol: cleanNum(row[28]),
        realKwh: cleanNum(row[29]),
        pctVol: cleanNum(row[30]),
        pctKwh: cleanNum(row[31]),
      },
      gantiMeter3Ph: {
        targetVol: cleanNum(row[32]),
        targetKwh: cleanNum(row[33]),
        realVol: cleanNum(row[34]),
        realKwh: cleanNum(row[35]),
        pctVol: cleanNum(row[36]),
        pctKwh: cleanNum(row[37]),
      },
      subTotalGantiMeter: {
        targetVol: cleanNum(row[38]),
        targetKwh: cleanNum(row[39]),
        realVol: cleanNum(row[40]),
        realKwh: cleanNum(row[41]),
        pctVol: cleanNum(row[42]),
        pctKwh: cleanNum(row[43]),
      },
      penyelesaian720Jn: {
        targetVol: cleanNum(row[44]),
        targetKwh: cleanNum(row[45]),
        realVol: cleanNum(row[46]),
        realKwh: cleanNum(row[47]),
        pctVol: cleanNum(row[48]),
        pctKwh: cleanNum(row[49]),
      },
      peningkatanTokenPb: {
        targetVol: cleanNum(row[50]),
        targetKwh: cleanNum(row[51]),
        realVol: cleanNum(row[52]),
        realKwh: cleanNum(row[53]),
        pctVol: cleanNum(row[54]),
        pctKwh: cleanNum(row[55]),
      },
      optimalisasiBilling: {
        target: cleanNum(row[56]),
        real: cleanNum(row[57]),
        pct: cleanNum(row[58]),
      },
      pengembalianSaldoLpb: {
        target: cleanNum(row[59]),
        real: cleanNum(row[60]),
        pct: cleanNum(row[61]),
      },
      totalTargetKwh: cleanNum(row[62]),
      totalRealKwh: cleanNum(row[63]),
      totalPencapaianPct: cleanNum(row[64]),

      penyulangBaru: {
        targetVol: cleanNum(row[67]),
        targetKwh: cleanNum(row[68]),
        realVol: cleanNum(row[69]),
        realKwh: cleanNum(row[70]),
      },
      rekonfigurasi: {
        targetVol: cleanNum(row[71]),
        targetKwh: cleanNum(row[72]),
        realVol: cleanNum(row[73]),
        realKwh: cleanNum(row[74]),
      },
      rekonfigPenyulangBaru: {
        targetVol: cleanNum(row[75]),
        targetKwh: cleanNum(row[76]),
        realVol: cleanNum(row[77]),
        realKwh: cleanNum(row[78]),
        pctVol: cleanNum(row[79]),
        pctKwh: cleanNum(row[80]),
      },
      lm1Jtm: {
        targetVol: cleanNum(row[81]),
        targetKwh: cleanNum(row[82]),
        realVol: cleanNum(row[83]),
        realKwh: cleanNum(row[84]),
        pctVol: cleanNum(row[85]),
        pctKwh: cleanNum(row[86]),
      },
      lm2Phbtr: {
        targetVol: cleanNum(row[87]),
        targetKwh: cleanNum(row[88]),
        realVol: cleanNum(row[89]),
        realKwh: cleanNum(row[90]),
        pctVol: cleanNum(row[91]),
        pctKwh: cleanNum(row[92]),
      },
      lm3Jtr: {
        targetVol: cleanNum(row[93]),
        targetKwh: cleanNum(row[94]),
        realVol: cleanNum(row[95]),
        realKwh: cleanNum(row[96]),
        pctVol: cleanNum(row[97]),
        pctKwh: cleanNum(row[98]),
      },
      lm4Sr: {
        targetVol: cleanNum(row[99]),
        targetKwh: cleanNum(row[100]),
        realVol: cleanNum(row[101]),
        realKwh: cleanNum(row[102]),
        pctVol: cleanNum(row[103]),
        pctKwh: cleanNum(row[104]),
      },
      effortTeknis: {
        totalTargetKwh: cleanNum(row[105]),
        totalRealKwh: cleanNum(row[106]),
        pct: cleanNum(row[107]),
      },
    };
    records.push(record);
  }

  return records;
}

export const fallbackSnapshotRecords: UP3Record[] = snapshotJson as UP3Record[];

export async function fetchLatestLMData(): Promise<{
  records: UP3Record[];
  source: 'live' | 'snapshot';
  updatedAt: string;
}> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(GOOGLE_SHEET_URL, {
      signal: controller.signal,
      headers: {
        Accept: 'text/csv',
      },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const csvText = await response.text();
    if (!csvText || csvText.length < 500) {
      throw new Error('Data sheet kosong atau tidak valid');
    }

    const records = parseCsvToRecords(csvText);
    if (records.length >= 10) {
      return {
        records,
        source: 'live',
        updatedAt: new Date().toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      };
    } else {
      throw new Error('Baris data tidak lengkap');
    }
  } catch (err) {
    console.warn('Gagal memuat live spreadsheet, beralih ke snapshot lokal:', err);
    return {
      records: fallbackSnapshotRecords,
      source: 'snapshot',
      updatedAt: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };
  }
}

// Format utilities
export function formatNumber(num: number): string {
  if (num === 0) return '0';
  return Math.round(num).toLocaleString('id-ID');
}

export function formatDecNumber(num: number, decimals = 2): string {
  if (num === 0) return '0';
  return num.toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatKwh(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 2 })} Juta kWh`;
  }
  return `${formatNumber(num)} kWh`;
}

export function formatPct(num: number): string {
  return `${num.toLocaleString('id-ID', { maximumFractionDigits: 1 })}%`;
}

export function getPctColor(pct: number): {
  text: string;
  bg: string;
  border: string;
  badge: string;
} {
  if (pct >= 100) {
    return {
      text: 'text-emerald-500 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800',
      badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    };
  } else if (pct >= 50) {
    return {
      text: 'text-sky-500 dark:text-sky-400',
      bg: 'bg-sky-50 dark:bg-sky-950/40',
      border: 'border-sky-200 dark:border-sky-800',
      badge: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20',
    };
  } else if (pct >= 15) {
    return {
      text: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-800',
      badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
    };
  } else {
    return {
      text: 'text-rose-500 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      border: 'border-rose-200 dark:border-rose-800',
      badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
    };
  }
}
