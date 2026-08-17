# Roadmap Fase - Backend CMS TPQ Al-Hasanah

**Tujuan Keseluruhan**: Pengurus TPQ bisa login ke `/admin`, mengedit seluruh konten situs (profil, visi-misi, matpel, asatidz, kegiatan, doa) lewat form berbahasa Indonesia + upload foto, dan perubahan langsung tampil di situs publik. Data pendaftaran tidak lagi bisa diakses publik.

**Catatan Sesi 2026-07-31**: Halaman publik `Doa & Amalan` (`/doaDanAmalan`) dibuat dengan selector doa interaktif, menggunakan data dari Prisma seed. Komponen `DoaSection` direstore ke versi lengkap. `npm run build` lolos.

**Catatan Sesi 2026-08-09**: Rute rename dari `/doadanamaian` (typo) ke `/doaDanAmalan`. Lihat detail Fase 3 dan `agent-docs/memory.md` sesi 6.

---

## Status Fase

| # | Fase | Status | Tanggal Selesai |
|---|---|---|---|
| 1 | Auth + tutup kebocoran data | ✅ SELESAI | 2026-07-30 |
| 2 | Fondasi Prisma | ✅ SELESAI | 2026-07-31 |
| 3 | Alihkan pembacaan ke Prisma | ✅ SELESAI | 2026-08-09 |
| 4 | Alihkan penulisan | ✅ SELESAI | 2026-08-09 |
| 5 | Shell admin + primitive | ✅ SELESAI | 2026-08-15 |
| 6 | CMS singleton | ✅ SELESAI | 2026-08-17 |
| 7 | CMS koleksi | ⏳ Sedang | - |
| 8 | Upload gambar | ⏳ Belum | - |
| 9 | Pemantapan | ⏳ Belum | - |

---

## Detail Fase

### ✅ Fase 1 — Auth + tutup kebocoran data (SELESAI)

**Masalah**: `/admin` dan `GET /api/registrations` tanpa autentikasi — nama & nomor WhatsApp semua pendaftar bisa diakses siapa saja yang tahu URL-nya.

**File dibuat**:
- `src/lib/auth.ts` — HMAC-SHA256 via Web Crypto. `SESSION_COOKIE`, `SESSION_DURATION_MS` (8 jam), `signSession`, `createSessionToken`, `verifySession`.
- `src/middleware.ts` — matcher `/admin`, `/admin/:path*`, `/api/admin/:path*`, `/api/registrations`. Halaman → redirect `/admin/login?next=...`. API → JSON 401.
- `src/lib/session.ts` — `isAuthenticated()` & `requireSession()` untuk Server Action/route.
- `src/app/admin/login/page.tsx` — form password satu field, tema gelap, label Indonesia.
- `src/app/api/admin/login/route.ts` — `runtime = 'nodejs'`, bandingkan SHA-256 via `crypto.timingSafeEqual`, delay 300ms pada kegagalan.
- `src/app/api/admin/logout/route.ts` — `POST`, hapus cookie.
- `.env.example` & `.env.local` untuk kredensial.

**File diubah**:
- `src/app/admin/page.tsx` — tombol "Keluar" + `handleLogout`.
- `.gitignore` — `!.env.example`, `prisma/*.db`, `public/uploads/*` (+`!.gitkeep`), `data/*.bak`.

**Verifikasi**: ✅ curl end-to-end (401, redirect, login/logout, cookies), `npm run build` lolos (16 rute + Middleware 27 kB).

---

### ✅ Fase 2 — Fondasi Prisma (SELESAI)

**File dibuat**:
- `prisma/schema.prisma` — 7 models, Prisma 6-compatible, field array sebagai JSON TEXT.
- `prisma/seed-data.ts` + `prisma/seed.ts` — idempotent seed dari `data/db.json`.
- `src/lib/prisma.ts` — singleton client dengan `globalThis` cache.

**File diubah**:
- `package.json` — `db:push`, `db:seed`, `db:studio` scripts.

**Hasil**: Migrasi data berhasil: 1 Profile, 1 VisiMisi, 6 Subject, 4 Asatidz, 6 Activity, 4 Doa, 1 Registration (id:1001).

**Verifikasi**: ✅ `npx prisma studio`, `npm run db:seed` (idempoten), `npm run build` lolos.

---

### ✅ Fase 3 — Alihkan pembacaan ke Prisma (SELESAI, dengan koreksi 2026-08-09)

**Inti pekerjaan**: Tulis ulang `db.ts` → getter **async** yang map baris Prisma ke interface existing (parse JSON, buang `order`/`updatedAt`). Tambah `await` di `src/app/page.tsx:25-30` + 7 route GET. **Interface & seluruh `src/components/` tidak berubah.**

**Koreksi 2026-08-09**: Verifikasi ulang menemukan `getAsatidz`/`getActivities`/`getSampleDoas` mengembalikan baris Prisma mentah tanpa adapter, dan `adaptProfile`/`adaptVisiMisi`/`adaptSubject` men-spread field mentah sebelum menambah field hasil parse — akibatnya `order`, `updatedAt`, dan `statsJson`/`misiJson`/`topicsJson` bocor ke tiap `GET /api/*`. Diperbaiki dengan membuat kelima adapter (`adaptProfile`, `adaptVisiMisi`, `adaptSubject`, `adaptAsatidz`, `adaptActivity`, `adaptSampleDoa`) mengonstruksi objek secara eksplisit sesuai interface, bukan spread. Ikut diperbaiki: `src/app/doadanamaian/page.tsx` (peninggalan sesi 2026-07-31) yang punya signature page tidak valid (prop `doas` alih-alih page props standar) sehingga menggagalkan `npm run build` — ditulis ulang jadi async Server Component yang fetch `getProfile`/`getSampleDoas` sendiri dan merender `DoaSection` yang sudah ada, mengikuti pola `page.tsx` homepage.

**Risiko**: ⚠️ **Paling berisiko** — menyentuh semua jalur baca. Bandingkan homepage sebelum/sesudah dengan teliti.

**Verifikasi**: ✅ `npm run build` lolos (17 rute). Dicek lewat curl bahwa `GET /api/{subjects,asatidz,activities,doas,profile,visimisi}` sudah tidak lagi memuat `order`/`updatedAt`/field `*Json` mentah. `GET /doaDanAmalan` mengembalikan 200 (rute di-rename dari `/doadanamaian` ke `/doaDanAmalan` pada sesi ini). Perbandingan visual homepage section-per-section terhadap versi sebelum migrasi belum dilakukan (tidak ada screenshot baseline tersimpan) — cek manual di browser masih disarankan sebelum lanjut ke Fase 5+.

---

### ✅ Fase 4 — Alihkan penulisan (SELESAI)

**Inti pekerjaan**: `addRegistration` async, uji `POST /api/contact`, badge ID → `REG-{id}`. Setelah lolos: arsipkan `data/db.json` → `data/db.json.bak`, `git rm --cached data/db.json`, hapus `INITIAL_DATA`/`ensureDB`/`writeDB` dari `db.ts`.

**Verifikasi 2026-08-09**: `addRegistration` sudah async lewat `prisma.registration.create` sejak penulisan ulang `db.ts` (Fase 3); tidak ada field bocor karena model `Registration` di schema persis sama dengan interface `RegistrationItem`. Diuji end-to-end: `POST /api/contact` dengan data dummy → berhasil, muncul di `GET /api/registrations` (setelah login admin), lalu data dummy dihapus lagi lewat script Prisma agar tidak mengotori DB dev. Badge `REG-{reg.id}` dan link WhatsApp (`wa.me/{phone}`) sudah benar di `src/app/admin/page.tsx`. `INITIAL_DATA`/`ensureDB`/`writeDB` sudah tidak ada di `db.ts`. Langkah arsip dituntaskan: `data/db.json` → `data/db.json.bak` (via `mv`), `git rm --cached data/db.json`, dan `data/db.json` ditambahkan ke `.gitignore`. `npm run build` lolos (17 rute) setelah untrack.

**Catatan minor (bukan blocker, untuk Fase 9)**: kartu "Status Sistem" di `src/app/admin/page.tsx` masih bertuliskan "Fullstack API & Database JSON" — copy basi, backend sekarang Prisma/SQLite.

**Risiko**: Sedang.

---

### ✅ Fase 5 — Shell admin + primitive (SELESAI)

**Inti pekerjaan**: `src/app/admin/layout.tsx` dengan sidebar, komponen di `src/components/admin/`, pindahkan viewer pendaftaran ke `/admin/pendaftaran`, dashboard baru di `/admin`.

**File dibuat**:
- `src/app/admin/(dashboard)/layout.tsx` — sidebar gelap (Dashboard, Pendaftaran, Keluar). Dipakai route group `(dashboard)` sehingga sidebar hanya muncul di `/admin` & `/admin/pendaftaran`, `/admin/login` tetap tanpa sidebar.
- `src/components/admin/LogoutButton.tsx` — tombol keluar.
- `src/app/admin/(dashboard)/page.tsx` — dashboard baru: sapa nama profil, 4 kartu statistik (Pendaftar, Matpel, Asatidz, Kegiatan), tabel pendaftaran terbaru (5) dengan link WhatsApp `wa.me`, tautan "Lihat Semua" ke `/admin/pendaftaran`.
- `src/app/admin/(dashboard)/pendaftaran/page.tsx` — viewer pendaftaran penuh (pindahan dari `/admin` lama).

**File dihapus**: `src/app/admin/page.tsx` lama (digantikan `(dashboard)/page.tsx`).

**Verifikasi**: ✅ `npm run build` lolos (18 rute, naik dari 17 berkat rute baru `/admin/pendaftaran`). Middleware tetap melindungi `/admin/:path*` & `/api/admin/:path*` (Fase 1). Pemeriksaan manual login+sidebar di browser belum dilakukan — disarankan sebelum Fase 6.

**Catatan minor (untuk Fase 9)**: kartu "Status Sistem" lama sudah hilang bersama `/admin/page.tsx` tua, tidak ada sisa copy basi.

**Risiko**: Rendah.

---

### ⏳ Fase 6 — CMS singleton

**Inti pekerjaan**: `src/lib/validation.ts` (zod, pesan error Indonesia), `/admin/profil` + `/admin/visi-misi` via Server Action. **Fase pertama yang menghasilkan CMS betulan yang bisa dipakai**.

**Risiko**: Rendah.

**Verifikasi**: Ubah satu field, simpan, muat ulang homepage di tab lain, konfirmasi berubah. Uji validasi dengan mengosongkan field wajib (harus muncul pesan Indonesia, bukan crash).

---

### ⏳ Fase 7 — CMS koleksi

**Inti pekerjaan**: `CollectionEditor`, lalu `/admin/doa` → `/admin/mata-pelajaran` → `/admin/asatidz` → `/admin/kegiatan` (mulai dari termudah). CRUD + reorder.

**Risiko**: Sedang.

**Verifikasi**: Uji create + delete + reorder. Cek teks Arab pada form doa tersimpan utuh (RTL/Unicode).

---

### ⏳ Fase 8 — Upload gambar

**Inti pekerjaan**: `POST /api/admin/upload` → `public/uploads/`. Nama file `${slug}-Date.now()}.${ext}` dengan ekstensi dari **whitelist MIME** (bukan dari nama file — path traversal). Maks 2 MB, MIME jpeg/png/webp.

**Risiko**: Rendah.

**Verifikasi**: Upload JPG → preview muncul, file ada di `public/uploads/`, homepage merender foto baru. Coba upload PDF → ditolak dengan pesan Indonesia. Coba file >2MB → ditolak. Pastikan asatidz yang masih pakai URL Unsplash tetap tampil.

---

### ⏳ Fase 9 — Pemantapan

**Inti pekerjaan**: Hapus pendaftaran, export CSV, update `agent-docs/*` + `CLAUDE.md` + `project-context.md`.

**Risiko**: Rendah.

**Verifikasi**: `npm run build` harus lolos, lalu `npm run start` dan ulangi pemeriksaan homepage + login pada build produksi (perilaku cookie `secure` berbeda di prod).

---

## Gate Verifikasi Umum

Tidak ada test framework, dan `npm run lint` rusak (tidak ada config ESLint). 

**Gate verifikasi = `npm run build` + pemeriksaan manual di browser.**
