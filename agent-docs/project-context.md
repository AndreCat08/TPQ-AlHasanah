# Project Context - TPQ Al-Hasanah Website

## 📌 Deskripsi Singkat
Aplikasi web fullstack untuk **TPQ Al-Hasanah** (Taman Pendidikan Al-Qur'an), dirancang untuk menyajikan profil lembaga, visi & misi, kurikulum mata pelajaran, pengajar (asatidz), galeri kegiatan, doa harian, formulir pendaftaran santri baru, serta panel manajemen admin.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data & Persistensi**: File-based JSON Database Engine (`src/lib/db.ts` -> `data/db.json`)
- **Runtime / Package Manager**: Node.js & npm

---

## 📐 Arsitektur Sistem

Aplikasi ini menggunakan arsitektur **Fullstack Next.js App Router**:

1. **Frontend / UI Layer**:
   - Berada di `src/components/` dan `src/app/`.
   - Menggunakan Server Components untuk pembacaan data dinamis dan Client Components (`'use client'`) untuk interaktivitas (efek scroll, modal gallery, formulir pendaftaran).
2. **Backend API Layer**:
   - Terletak di `src/app/api/`.
   - Menyediakan REST API endpoint untuk melayani data JSON (profil, visi-misi, matpel, asatidz, kegiatan, doa) dan penanganan submission formulir pendaftaran (`POST /api/contact`).
3. **Data & Persistence Layer**:
   - Diimplementasikan pada `src/lib/db.ts`.
   - Membaca dan menulis ke file JSON lokal `data/db.json` secara atomik dengan fitur auto-seeding jika file data belum ada.
4. **Admin Panel Layer**:
   - Terletak di `src/app/admin/page.tsx`.
   - Panel dashboard admin untuk melihat dan memfilter data pendaftaran santri baru yang masuk secara real-time.

---

## 📂 Struktur Project

```
TPQ-AlHasanah/
├── AGENTS.md                   # Panduan & aturan eksekusi agen AI
├── README.md                   # Dokumentasi umum repositori
├── package.json                # Dependensi & script proyek
├── tsconfig.json               # Konfigurasi TypeScript
├── next.config.js              # Konfigurasi Next.js & remote images
├── tailwind.config.js          # Konfigurasi Tailwind CSS
├── postcss.config.js           # Konfigurasi PostCSS
├── data/
│   └── db.json                 # File persisensi data JSON
├── agent-docs/
│   ├── project-context.md      # Konteks proyek, arsitektur, & tech stack
│   └── memory.md               # Catatan riwayat perintah, keputusan, & perubahan
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout utama & metadata
│   │   ├── page.tsx            # Halaman beranda utama (Home)
│   │   ├── globals.css         # Styling global & Tailwind directives
│   │   ├── admin/
│   │   │   └── page.tsx        # Dashboard admin pendaftaran
│   │   └── api/                # Endpoint REST API Next.js
│   │       ├── profile/route.ts
│   │       ├── visimisi/route.ts
│   │       ├── subjects/route.ts
│   │       ├── asatidz/route.ts
│   │       ├── activities/route.ts
│   │       ├── doas/route.ts
│   │       ├── contact/route.ts
│   │       └── registrations/route.ts
│   ├── components/             # Komponen UI Modular
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── VisiMisiSection.tsx
│   │   ├── SubjectsSection.tsx
│   │   ├── DoaSection.tsx
│   │   ├── ActivitiesSection.tsx
│   │   ├── AsatidzSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   └── FloatingWhatsApp.tsx
│   └── lib/
│       └── db.ts               # Engine database & helper persisensi
```
