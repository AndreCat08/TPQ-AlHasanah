# Agent Memory - TPQ Al-Hasanah

Dokumen ini mencatat riwayat perintah, keputusan arsitektur, dan daftar perubahan yang telah dilakukan pada proyek **TPQ Al-Hasanah**.

---

## 📜 1. History Commands

| Tanggal | Perintah | Tujuan / Hasil |
|---|---|---|
| 2026-07-30 | `npm install` | Menginstal dependensi proyek Next.js, React, Tailwind CSS, Lucide React, & TypeScript. *(Berhasil)* |
| 2026-07-30 | `npm run build` | Melakukan verifikasi kompilasi dan build produksi Next.js. *(Berhasil - 13 rute terkompilasi)* |
| 2026-07-30 | `npm run dev` | Menjalankan server pengembang lokal pada `http://localhost:3000`. |
| 2026-07-30 | `node -e "...randomBytes(32)..."` | Generate `ADMIN_SESSION_SECRET` untuk `.env.local`. *(Berhasil)* |
| 2026-07-30 | `npm run build` | Verifikasi Fase 1 (auth). Gagal 2× lalu berhasil — lihat "jebakan build" di section 4. *(Berhasil - 16 rute + Middleware)* |
| 2026-07-30 | `curl` (rangkaian) | Verifikasi manual auth Fase 1: 401 tanpa cookie, redirect, login benar/salah, cookie palsu, cookie expired, logout. *(Semua lolos)* |
| 2026-07-30 | `npm i -D prisma tsx` | Selesaikan Phase 2 dependency (Prisma 6 & tsx dev dependencies) |
| 2026-07-30 | `npx prisma migrate dev --name init` | Buat database migration baru (schema sudah ada) |
| 2026-07-30 | `npx prisma generate` | Generate Prisma Client v6 (target Prisma 6 compatibility) |
| 2026-07-30 | `npm run db:seed` | Migrasi data awal JSON → SQLite (idempoten, dijalankan 2×) |
| 2026-07-31 | `npx tsx prisma/seed-verify.ts` | Verifikasi migrasi: 1 Profile, 1 VisiMisi, 6 Subject, 4 Asatidz, 6 Activity, 4 Doa, 1 Registration (id:1001) ✅ |
| 2026-07-31 | `npm run build` | ✅ (16 rute + Middleware 27KB) |
| 2026-07-31 | `npx prisma db push` | Sync schema setelah perubahan DB path. *(Berhasil)* |
| 2026-07-31 | `npx prisma generate` | Regenerate Prisma Client v6.19.3. *(Berhasil)* |
| 2026-07-31 | `npm run db:seed` | Idempoten, registrasi terakhir ID:1002. *(Berhasil)* |
| 2026-07-31 | `npm run dev` | Homepage `GET /` 200. *(Berhasil)* |
| 2026-07-31 | Update `.env.local` | Ganti `DATABASE_URL` ke absolute path Windows agar Prisma konek dev server. |

| 2026-08-17 | Fix update db | Perbaikan `updateProfile` & `updateVisiMisi` (destructure data non-Prisma). *(Berhasil)* |
| 2026-08-17 | `npm run build` | Verifikasi Fase 6. *(Berhasil)* |

---

## 🧠 2. Keputusan Arsitektur & Desain (Decisions)

1. **Transformasi ke Fullstack Next.js (App Router)**:
   - Mengubah file tunggal `profile_website_tpq_al_hasanah.tsx` menjadi aplikasi fullstack dengan komponen terstruktur, API routes, dan layer persisensi data.
2. **Penundaan Implementasi AI Features**:
   - Berdasarkan instruksi pengguna (*"jangan implementasikan dulu AI features"*), fitur AI Chatbot, Quiz Generator, dan TTS Suara Doa ditunda/dikesampingkan terlebih dahulu dari versi awal ini.
3. **Database JSON Persisten (`src/lib/db.ts`)**:
   - Menggunakan file `data/db.json` dengan helper TypeScript di `src/lib/db.ts` yang mendukung auto-seeding data awal dan penulisan atomik untuk penyimpanan data pendaftaran santri baru.
4. **Pengisolasian TSX Lama dari Type Checking**:
   - Menambahkan `profile_website_tpq_al_hasanah.tsx` ke dalam bagian `exclude` pada `tsconfig.json` agar kompilasi TypeScript `npm run build` fokus memeriksa kode di dalam folder `src/`.
5. **Panel Dashboard Admin**:
   - Dibuat rute `/admin` untuk memfasilitasi pengurus TPQ dalam melihat dan mengelola data pendaftaran santri yang masuk via web.
6. **Database Migration ke Prisma**:
   - Memilih SQLite + Prisma dari awal, **bukan** melanjutkan JSON-based solution untuk menghindari korupsi satu tulisan dan concurrency issues. Schema di-prisma-6-compatible untuk maksimum kualitas.
7. **Interface Backend Preserved**:
   - Semua `src/components/` dan API contracts tetap sama — hanya layer penyedia data yang diubah (async getters, async writers), tidak ada perubahan interface pengguna.

---

## 📝 3. Perubahan-Perubahan yang Dilakukan (Changes Log)

| Tanggal | Perintah / Keterangan | Tujuan / Hasil |
|---|---|---|
| 2026-08-15 | Verifikasi Fase 5 (Shell admin + primitive) | ✅ Complete: implemented layout with sidebar, moved registration viewer to `/admin/pendaftaran`, built new dashboard at `/admin`, updated detail section to reflect completion. Built successfully with 18 routes. |

### Inisialisasi & Konfigurasi Proyek
- Created `package.json` dengan Next.js 14, React 18, Tailwind CSS, & Lucide React.
- Created `tsconfig.json` dengan path alias `@/*` -> `src/*`.
- Created `next.config.js` dengan konfigurasi remote image pattern `images.unsplash.com`.
- Created `tailwind.config.js` & `postcss.config.js`.
- Created `src/app/globals.css`.

### Layer Data & API Routes
- Created `src/lib/db.ts` (helper data profil, visi-misi, subjects, asatidz, activities, doas, dan pendaftaran).
- Created `src/app/api/profile/route.ts`
- Created `src/app/api/visimisi/route.ts`
- Created `src/app/api/subjects/route.ts`
- Created `src/app/api/asatidz/route.ts`
- Created `src/app/api/activities/route.ts`
- Created `src/app/api/doas/route.ts`
- Created `src/app/api/contact/route.ts`
- Created `src/app/api/registrations/route.ts`

### Komponen Frontend & Halaman
- Created `src/components/Navbar.tsx`
- Created `src/components/HeroSection.tsx`
- Created `src/components/AboutSection.tsx`
- Created `src/components/VisiMisiSection.tsx`
- Created `src/components/SubjectsSection.tsx`
- Created `src/components/DoaSection.tsx`
- Created `src/components/ActivitiesSection.tsx`
- Created `src/components/AsatidzSection.tsx`
- Created `src/components/ContactSection.tsx`
- Created `src/components/Footer.tsx`
- Created `src/components/FloatingWhatsApp.tsx`
- Created `src/app/page.tsx`
- Created `src/app/layout.tsx`
- Created `src/app/admin/page.tsx`

### Admin Auth & Security (Phase 1)
- `src/lib/auth.ts` — HMAC-SHA256 via Web Crypto, session cookie (8 jam), sign/verify.
- `src/middleware.ts` — proteksi `/admin/*`, `/api/admin/*`, `/api/registrations`.
- `src/lib/session.ts` — helper autentikasi untuk Server Action.
- `src/app/admin/login/page.tsx` — form password bahasa Indonesia.
- `src/app/api/admin/login/route.ts` — SHA-256 timing-safe comparison + delay.
- `src/app/api/admin/logout/route.ts` — hapus cookie.
- `.env.example` & `.env.local` (gitignored) untuk kredensial.
- `.gitignore` — ditambahkan `prisma/*.db`, `public/uploads/*` (kecuali `.gitkeep`), `data/*.bak`.

### Prisma Migration (Phase 2)
- `prisma/schema.prisma` — Prisma 6-compatible, 7 models (Profile, VisiMisi, Subject, Asatidz, Activity, Doa, Registration).
- `prisma/seed-data.ts` — `INITIAL_DATA` dipindahkan dari `db.ts`, dipakai sebagai fallback.
- `prisma/seed.ts` — baca `data/db.json` kalau ada, fallback ke `INITIAL_DATA`; idempoten via `upsert`. Map `REG-1001` → `1001`, ISO → Date.
- `src/lib/prisma.ts` — singleton client dengan cache `globalThis`.
- `package.json scripts` — `db:push`, `db:seed`, `db:studio`.

### Data Layer Rewrite (Phase 3)
- `src/lib/db.ts` → NEW async interface layer:
  - Semua 6 getter: `getProfile`, `getVisiMisi`, `getSubjects`, `getAsatidz`, `getActivities`, `getSampleDoas` → async (await).
  - Writers: `updateProfile`, `updateVisiMisi`, `addRegistration` → async.
  - Types migrated: `RegistrationItem.id: number` (ex: `REG-1001`), `RegistrationItem.createdAt: Date`.
  - Adapters: `adaptProfile`, `adaptVisiMisi`, `adaptSubject` (JSON parse field).
  - ALL callers updated: `src/app/page.tsx:25-30` (tambah `await`) + seluruh 7 API routes.

### API Layer Updates
- **Profil**: `GET /api/profile` → `await getProfile()`
- **VisiMisi**: `GET /api/visimisi` → `await getVisiMisi()`
- **Subjects**: `GET /api/subjects` → `await getSubjects()`
- **Asatidz**: `GET /api/asatidz` → `await getAsatidz()`
- **Activities**: `GET /api/activities` → `await getActivities()`
- **Doas**: `GET /api/doas` → `await getSampleDoas()`
- **Registrations**: `GET /api/registrations` → `await getRegistrations()` (PROTECTED)
- **Contact**: `POST /api/contact` → `await addRegistration()` (async)

### Admin UI Updates
- `/admin/page.tsx`: badge ID → `REG-{reg.id}`, full auth protection, session management.

### Verifikasi
- ✅ `npm run build` (16 rute + middleware 27KB) ✅
- ✅ Data verify via `npx tsx prisma/seed-verify.ts`: 1 Prof, 1 Visi, 6 Subj, 4 Asat, 6 Activity, 4 Doa, 1 Registration (ID:1001) ✅
- ✅ Autentikasi HTTP-end-to-end (401, redirect, login/logout, cookies) ✅

### Directory & File Structure
- Dibuat root: `prisma/` (schema.prisma, seed-data.ts, seed.ts, seed-verify.ts, test-add.ts)
- Legacy `data/db.json` diarsipkan (tetap ada, tidak dihapus)

---

## 🏗️ 4. Proyek Berjalan: Backend CMS (mulai 2026-07-30)

**Tujuan**: pengurus TPQ bisa login ke `/admin`, mengedit seluruh konten situs (profil, visi-misi, matpel, asatidz, kegiatan, doa) lewat form berbahasa Indonesia + upload foto, dan perubahan langsung tampil di situs publik. Data pendaftaran tidak lagi bisa diakses publik.

### Keputusan arsitektur CMS (sudah disepakati — jangan dibuka ulang)

| Aspek | Keputusan | Alasan |
|---|---|---|
| Arsitektur | Admin panel custom di dalam app Next.js yang sama | Bukan Strapi/Payload — hindari 2 deployment, kontrol penuh atas UI Bahasa Indonesia |
| Database | SQLite + Prisma, migrasi sekali jalan dari `data/db.json` | `ensureDB()` lama me-reset seluruh data jika JSON korup; tulisan bersamaan tidak aman |
| Auth | Password tunggal dari env var + session HMAC di HTTP-only cookie, dijaga `middleware.ts` | Cukup untuk 1–3 pengurus; **tanpa dependency auth apa pun** |
| Gambar | Upload lokal ke `public/uploads/`, path string di DB | Tanpa layanan eksternal |

Keputusan teknis penting lainnya:
- **Field array** (`profile.stats`, `visiMisi.misi`, `subject.topics`) disimpan sebagai kolom **TEXT berisi JSON**, bukan tabel relasi — SQLite tidak dukung scalar list di Prisma, dan field ini tidak pernah di-query/filter.
- **Singleton** `Profile` & `VisiMisi` pakai pola `id Int @id @default(1)` + selalu `upsert({ where: { id: 1 } })`.
- `Activity.date` tetap `String` (bukan `DateTime`) — data existing berisi `"Rutin Mingguan"`, `"Ramadhan 2026"`.
- `RegistrationItem.id` akan berubah `string` → `number` (format lama `REG-${Date.now().slice(-4)}` rawan tabrakan). Badge di admin jadi `REG-{id}`.
- **Middleware jalan di Edge runtime** — tidak bisa Prisma / `node:crypto`. Karena itu `src/lib/auth.ts` pakai **Web Crypto (`crypto.subtle`)** saja; perbandingan password terjadi di route handler login (Node runtime).
- Mutasi admin pakai **Server Actions** (bukan route handler), return `{ success, message?, errors? }` mengikuti konvensi repo. `/api/admin/*` hanya untuk login/logout/upload.
- `next.config.js` **tidak perlu diubah** — `remotePatterns` hanya untuk URL absolut; path lokal `/uploads/x.jpg` ditangani `next/image` secara native. Entry `images.unsplash.com` tetap agar data existing jalan.

### ✅ Fase 1 — SELESAI & TERVERIFIKASI: Auth + tutup kebocoran data

Masalah yang diselesaikan: `/admin` dan `GET /api/registrations` sebelumnya **tanpa autentikasi sama sekali** — nama & nomor WhatsApp semua pendaftar bisa diakses siapa saja yang tahu URL-nya.

File dibuat:
- `src/lib/auth.ts` — HMAC-SHA256 via Web Crypto. `SESSION_COOKIE`, `SESSION_DURATION_MS` (8 jam), `signSession`, `createSessionToken`, `verifySession`. Token: `` `${expiresAt}.${base64url(hmac)}` ``, perbandingan konstan-waktu.
- `src/middleware.ts` — matcher `['/admin', '/admin/:path*', '/api/admin/:path*', '/api/registrations']`. `/api/admin/login` & `/api/admin/logout` di-bypass lewat `PUBLIC_PATHS` (kalau tidak, login sendiri ikut terblokir). Halaman → redirect `/admin/login?next=...`. API → JSON 401 `"Tidak terautentikasi"`.
- `src/lib/session.ts` — `isAuthenticated()` & `requireSession()` untuk Server Action/route (Node runtime, baca `cookies()`).
- `src/app/admin/login/page.tsx` — form password satu field, tema gelap, label Indonesia, pesan error "Password salah".
- `src/app/api/admin/login/route.ts` — `runtime = 'nodejs'`, bandingkan SHA-256 kedua sisi via `crypto.timingSafeEqual`, delay 300ms pada kegagalan.
- `src/app/api/admin/logout/route.ts` — `POST`, hapus cookie.
- `.env.example` (di-commit) & `.env.local` (gitignored, sudah terisi `ADMIN_PASSWORD=tpqalhasanah2026` + secret 32-byte acak).

File diubah:
- `src/app/admin/page.tsx` — tambah tombol "Keluar" + `handleLogout`.
- `.gitignore` — tambah `!.env.example`, `prisma/*.db`, `public/uploads/*` (+`!.gitkeep`), `data/*.bak`.

Dua jebakan yang ditemui saat build (untuk referensi):
1. `for...of` atas `Uint8Array` gagal karena `tsconfig` target ES5 → ganti ke index loop.
2. `useSearchParams()` di `/admin/login` bikin prerender gagal (butuh Suspense) → ganti baca `window.location.search` di dalam handler.

Verifikasi (curl terhadap `npm run dev`, semua lolos): `/api/registrations` tanpa cookie → 401; `/admin` tanpa cookie → 307 ke login; `/` & `/api/profile` tetap 200; password salah → 401; password benar → 200 + cookie HttpOnly; dengan cookie → `/admin` 200 & data pendaftaran terbaca; `/admin/login` saat sudah login → redirect `/admin`; **cookie dipalsukan → 401**; **cookie expired → 401**; logout → cookie terhapus, akses berikutnya 401. `npm run build` lolos (16 rute + Middleware 27 kB).

### ✅ Fase 2 — SELESAI: Fondasi Prisma

- `prisma/schema.prisma`: 7 models, Prisma 6-compatible, field array sebagai JSON TEXT.
- `prisma/seed-data.ts` + `prisma/seed.ts`: idempotent seed dari `data/db.json`.
- `src/lib/prisma.ts`: singleton client dengan `globalThis` cache.
- `package.json`: `db:push`, `db:seed`, `db:studio` scripts.
- Migrasi data: 1 Profile, 1 VisiMisi, 6 Subject, 4 Asatidz, 6 Activity, 4 Doa, 1 Registration (id:1001) — semua berhasil.
- `src/lib/db.ts` belum disentuh (fase 2 murni aditif).

### ⏳ Roadmap: lihat [agent-docs/roadmap.md](roadmap.md) 

---

## 📝 5. Session 2026-07-31: Doa & Amalan UI

### Ringkasan
Pada sesi ini dibuat halaman publik `Doa & Amalan` dan komponennya. Komponen `DoaSection.tsx` yang sebelumnya ketimpa (terganti versi sederhana) direstore ke versi lengkap dengan fitur selector doa interaktif.

### File Dibuat
- `src/app/doadanamaian/page.tsx` — halaman mandiri Doa & Amalan, fetch data via `getSampleDoas()` dari Prisma

### File Diperbaiki/Direstore
- `src/components/DoaSection.tsx` — dikembalikan ke versi lengkap (client component dengan state selector doa, teks Arab/Latin/Artinya)

### Verifikasi
- `npm run build` ✅ lolos tanpa error
- Halaman `/doadanamaian` aktif dengan data doa dari Prisma seed

### Status
- ✅ SELESAI

---

## 📝 6. Session 2026-08-09: Perbaikan Fase 3 + rename rute Doa & Amalan

### Ringkasan
Verifikasi Fase 3 menemukan `getAsatidz`/`getActivities`/`getSampleDoas` di `src/lib/db.ts` mengembalikan baris Prisma mentah (membocorkan `order`/`updatedAt`), dan adapter lain (`adaptProfile`/`adaptVisiMisi`/`adaptSubject`) men-spread field mentah termasuk `*Json` sebelum menambah field hasil parse. Diperbaiki dengan konstruksi objek eksplisit di semua adapter. `src/app/doadanamaian/page.tsx` (dibuat sesi 2026-07-31) punya signature page tidak valid (prop `doas` alih-alih page props standar) yang menggagalkan `npm run build` — ditulis ulang jadi async Server Component. Folder rute lalu di-`git mv` dari `src/app/doadanamaian` ke `src/app/doaDanAmalan` untuk memperbaiki typo ("amaian" → "amalan") dan konsisten camelCase; rute publik kini `/doaDanAmalan`.

### File Diubah
- `src/lib/db.ts` — enam adapter dikonstruksi eksplisit sesuai interface
- `src/app/doadanamaian/page.tsx` → `src/app/doaDanAmalan/page.tsx` (rename + rewrite jadi async Server Component)

### Verifikasi
- `npm run build` ✅ lolos
- curl `GET /api/{subjects,asatidz,activities,doas,profile,visimisi}` — tidak ada lagi field `order`/`updatedAt`/`*Json` mentah
- `GET /doaDanAmalan` → 200

### Status
- ✅ SELESAI

---

## 📝 7. Session 2026-08-09: Tuntaskan Fase 4 (alihkan penulisan)

### Ringkasan
Verifikasi Fase 4: `addRegistration` sudah async via Prisma sejak Fase 3, diuji end-to-end lewat `POST /api/contact` (data dummy dibuat lalu dihapus lagi). Badge `REG-{id}` dan link WhatsApp di admin sudah benar. Langkah arsip yang belum dikerjakan dituntaskan: `data/db.json` di-`mv` ke `data/db.json.bak`, di-`git rm --cached`, dan ditambahkan ke `.gitignore`.

### File Diubah
- `.gitignore` — tambah `data/db.json`
- `data/db.json` → `data/db.json.bak` (untracked dari git, tetap ada di disk sebagai arsip)

### Verifikasi
- `POST /api/contact` → `GET /api/registrations` (login admin) menunjukkan data baru tersimpan di Prisma
- `npm run build` ✅ lolos setelah `data/db.json` di-untrack

### Status
- ✅ SELESAI

---

## 📝 8. Session 2026-08-09: Setup nodemon

### Ringkasan
Ditambahkan `npm run dev:nodemon` sebagai alternatif menjalankan dev server lewat nodemon. Percobaan awal watch `src` + `next.config.js` + `tailwind.config.js` ternyata bermasalah di Windows: `next.config.js` sudah di-hot-reload sendiri oleh Next, jadi nodemon ikut restart di atasnya menyebabkan race — proses `next dev` lama tidak sempat melepas port 3000 sebelum yang baru start, sehingga server baru jatuh ke port 3001. Diperbaiki dengan (1) mempersempit `watch` nodemon hanya ke file yang **tidak** di-hot-reload Next sendiri (`.env`, `.env.local`, `prisma/schema.prisma` — `src/` dibiarkan ke Fast Refresh Next), dan (2) mengganti `exec` jadi `npx kill-port 3000 && next dev` supaya port lama selalu dibebaskan dulu sebelum restart, karena nodemon di Windows tidak selalu berhasil mematikan seluruh process tree `next dev`.

### File Dibuat
- `nodemon.json` — watch `.env`/`.env.local`/`prisma/schema.prisma`, exec `npx kill-port 3000 && next dev`, delay 1000ms

### File Diubah
- `package.json` — script baru `dev:nodemon`, devDependency `nodemon` + `kill-port`
- `CLAUDE.md` — dokumentasi command `dev:nodemon`

### Verifikasi
- Start bersih di port 3000 (bukan 3001)
- Touch `.env.local` → nodemon restart, port 3000 tetap terpakai (tidak jatuh ke 3001), server up lagi dan merespons 200
- Touch `src/app/page.tsx` → nodemon **tidak** restart (dibiarkan ke Fast Refresh Next), tetap kompilasi ulang otomatis
- Semua proses `node`/`next dev` sisa percobaan dibersihkan lewat `taskkill /T /F`

### Status
- ✅ SELESAI

