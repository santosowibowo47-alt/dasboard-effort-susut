const fs = require('fs');

const csv = fs.readFileSync('rekap_action_up3.csv', 'utf-8');

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i+1] === '"') {
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

function cleanNum(val) {
  if (!val) return 0;
  let str = val.trim();
  if (str === '-' || str === '') return 0;
  str = str.replace('%', '').trim();
  str = str.replace(/\./g, '').replace(/,/g, '.');
  const num = parseFloat(str);
  return isNaN(num) ? 0 : num;
}

const lines = csv.split(/\r?\n/).filter(l => l.trim().length > 0);

const records = [];
for (let i = 1; i < lines.length; i++) {
  const row = parseCSVLine(lines[i]);
  const unit = (row[1] || '').trim();
  if (!unit) continue;

  const record = {
    unit: unit,
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
    }
  };
  records.push(record);
}

fs.writeFileSync('src/data/snapshot.json', JSON.stringify(records, null, 2));
console.log('Successfully generated src/data/snapshot.json with', records.length, 'records');
