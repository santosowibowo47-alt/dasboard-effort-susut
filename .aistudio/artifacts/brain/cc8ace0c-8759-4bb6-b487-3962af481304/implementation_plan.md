# Rencana Implementasi: Format WIG Session pada Tab Teknis (Effort & LM 1-4)

Pembaruan tampilan pada tab **Teknis (Effort & LM 1-4)** dengan mengadopsi format kartu speedometer arc gauge dan tabel leaderboard 16 UP3 persis seperti pada tab Non-Teknis, mencakup 5 pilar kegiatan teknis utama.

## User Review & Critical Decisions

> [!IMPORTANT]
> Berdasarkan konfirmasi pada Tahap 1:

- **5 Kartu Kegiatan Teknis**:
  1. `Konfigurasi Penyulang` (Penyulang Baru & Rekonfigurasi Saluran)
  2. `LM 1 - Reconnecting JTM` (Jaringan Tegangan Menengah)
  3. `LM 2 - Reconnecting PHBTR` (Perangkat Hubung Bagi Tegangan Rendah)
  4. `LM 3 - Reconnecting JTR` (Jaringan Tegangan Rendah)
  5. `LM 4 - Reconnecting SR` (Sambungan Rumah Pelanggan)
- **Format Kartu Sesuai Tab Non-Teknis**:
  - Header bergaris neon tematik dengan kode dan nama kegiatan.
  - Semicircular Speedometer Arc Gauge (busur setengah lingkaran bersegmen) dengan persentase capaian konsolidasi UID Jatim di tengahnya.
  - Tabel leaderboard bergaris warna tematik (`Unit Pelaksana`, `T`, `R`, `% ▼`) yang memuat seluruh 16 UP3 terurut otomatis berdasarkan capaian tertinggi ke terendah.
- **Prioritas Metrik**:
  - Mengutamakan perolehan energi terselamatkan (kWh) secara default, dengan tombol toggle praktis untuk beralih ke volume fisik pekerjaan (titik/sirkit).
- **Tata Letak & Navigasi**:
  - Tampilan langsung berfokus pada bar kontrol metrik, 5 kartu kegiatan teknis dalam grid responsif, dan panel bawah `FOCUS & NEXT ACTION` operasional teknis serta legenda warna standar PLN.

---

## 1. Overview & Core Concept

Mewujudkan keselarasan desain (*design consistency*) antara tab Non-Teknis dan tab Teknis. Dengan format kartu busur dan tabel peringkat 16 UP3 yang seragam, pengguna dapat dengan cepat dan intuitif menganalisis progres pekerjaan fisik lapangan (reconnecting jumper/konektor kendor) serta efisiensi energi yang berhasil diselamatkan pada setiap segmen jaringan distribusi tenaga listrik.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Pendaratan Tab Teknis**: Begitu pengguna mengklik tab *Teknis (Effort & LM 1-4)*, antarmuka langsung menyajikan bar kontrol pemilihan mode metrik (Energi kWh vs Volume Titik).
2. **Eksplorasi 5 Kartu Kegiatan**:
   - `Konfigurasi Penyulang`: Warna Sky Blue (`#0284C7`)
   - `LM 1 - Reconnecting JTM`: Warna Emerald Green (`#059669`)
   - `LM 2 - Reconnecting PHBTR`: Warna Amber Orange (`#D97706`)
   - `LM 3 - Reconnecting JTR`: Warna Teal Cyan (`#0D9488`)
   - `LM 4 - Reconnecting SR`: Warna Purple Violet (`#7C3AED`)
3. **Peringkat 16 UP3**: Tabel di dalam tiap kartu menampilkan peringkat 1 sampai 16 lengkap dengan tombol aksi untuk melihat profil UP3 secara mendalam.
4. **Panel Tindak Lanjut Bawah**: 4 langkah strategis percepatan teknis jaringan (penyeimbangan beban trafo distribusi, inspeksi thermal konektor sambungan, optimalisasi manuver penyulang, dan percepatan input laporan harian).

---

## 3. Technical Architecture & Component Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                     TechnicalTab.tsx                        │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Top Control Bar                                       │  │
│  │ - Identitas "EFFORT TEKNIS & LM 1-4"                  │  │
│  │ - Switcher Metrik: [Energi (kWh) | Volume (Titik)]   │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Grid 5 Kartu Kegiatan Teknis                          │  │
│  │ 1. Konfigurasi Penyulang (Feeder)                     │  │
│  │ 2. LM 1 - Reconnecting JTM                            │  │
│  │ 3. LM 2 - Reconnecting PHBTR                          │  │
│  │ 4. LM 3 - Reconnecting JTR                            │  │
│  │ 5. LM 4 - Reconnecting SR                             │  │
│  │ [Semicircle Gauge + 16 UP3 Leaderboard Table x 5]     │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Panel Bawah:                                          │  │
│  │ - FOCUS & NEXT ACTION (4 Checklist Operasional)       │  │
│  │ - Legenda Warna & Waktu Pembaruan Terakhir            │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Next Steps

Setelah rencana disetujui:
1. Memperbarui `src/components/tabs/TechnicalTab.tsx` dengan memetakan 5 kegiatan teknis ke komponen kartu speedometer arc gauge dan leaderboard 16 UP3.
2. Memperbarui pemanggilan props di `src/App.tsx` agar data lengkap 16 UP3 tersalurkan ke `TechnicalTab`.
3. Menjalankan verifikasi kompilasi dan linting.
