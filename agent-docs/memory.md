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

### ⏳ Sisa fase (belum dikerjakan)

| # | Fase | Inti pekerjaan | Risiko |
|---|---|---|---|
| 3 | Alihkan pembacaan ke Prisma | Tulis ulang `db.ts` → getter **async** yang map baris Prisma ke interface existing (parse JSON, buang `order`/`updatedAt`). Tambah `await` di `src/app/page.tsx:25-30` + 7 route GET. **Interface & seluruh `src/components/` tidak berubah.** | ⚠️ **Paling berisiko** — menyentuh semua jalur baca. Bandingkan homepage sebelum/sesudah dengan teliti |
| 4 | Alihkan penulisan | `addRegistration` async, uji `POST /api/contact`, badge ID → `REG-{id}`. Setelah lolos: arsipkan `data/db.json` → `data/db.json.bak`, `git rm --cached data/db.json`, hapus `INITIAL_DATA`/`ensureDB`/`writeDB` dari `db.ts` | Sedang |
| 5 | Shell admin + primitive | `src/app/admin/layout.tsx` dengan sidebar, komponen di `src/components/admin/`, pindahkan viewer pendaftaran ke `/admin/pendaftaran`, dashboard baru di `/admin`. | Rendah |
| 6 | CMS singleton | `src/lib/validation.ts` (zod, pesan error Indonesia), `/admin/profil` + `/admin/visi-misi` via Server Action. **Fase pertama yang menghasilkan CMS betulan yang bisa dipakai** | Rendah |
| 7 | CMS koleksi | `CollectionEditor`, lalu `/admin/doa` → `/admin/mata-pelajaran` → `/admin/asatidz` → `/admin/kegiatan` (mulai dari termudah). CRUD + reorder | Sedang |
| 8 | Upload gambar | `POST /api/admin/upload` → `public/uploads/`. Nama file `${slug}-Date.now()}.${ext}` dengan ekstensi dari **whitelist MIME** (bukan dari nama file — path traversal). Maks 2 MB, MIME jpeg/png/webp | Rendah |
| 9 | Pemantapan | Hapus pendaftaran, export CSV, update `agent-docs/*` + `CLAUDE.md` + `project-context.md` | Rendah |

**Gate verifikasi**: tidak ada test framework, dan `npm run lint` rusak (tidak ada config ESLint). **Gate verifikasi = `npm run build` + pemeriksaan manual di browser.** Per fase:

1. **Auth (fase 1):** ✅ `npm run dev`, buka `/admin` dalam incognito → redirect ke `/admin/login`. `curl http://localhost:3000/api/registrations` → 401, bukan data. Login dengan password benar → masuk. Password salah → pesan error. Logout → cookie hilang, `/admin` redirect lagi. Restart server → cookie masih valid (HMAC stateless).
2. **Prisma (fase 2):** ✅ `npx prisma studio` → cek 6 subject, 4 asatidz, 6 activity, 4 doa, 1 profile, 1 visiMisi, **dan seluruh pendaftaran dari `data/db.json` ikut termigrasi**. Jalankan `npm run db:seed` dua kali → tidak ada duplikat (idempoten).
3. **Baca (fase 3):** screenshot homepage sebelum migrasi, bandingkan sesudah — setiap section (hero stats, visi-misi, 6 kartu matpel dengan topics-nya, doa dengan teks Arab, filter kategori kegiatan, kartu asatidz) harus identik. Cek juga tiap `GET /api/*` masih mengembalikan envelope yang sama.
4. **Tulis (fase 4):** submit form kontak di homepage → cek muncul di `/admin/pendaftaran` dan di Prisma Studio. Cek link WhatsApp di admin masih benar.
5. **CMS (fase 6–7):** untuk setiap screen — ubah satu field, simpan, muat ulang homepage di tab lain, konfirmasi berubah. Uji validasi dengan mengosongkan field wajib (harus muncul pesan Indonesia, bukan crash). Uji create + delete + reorder. Cek teks Arab pada form doa tersimpan utuh (RTL/Unicode).
6. **Upload (fase 8):** upload JPG → preview muncul, file ada di `public/uploads/`, homepage merender foto baru. Coba upload PDF → ditolak dengan pesan Indonesia. Coba file >2MB → ditolak. Pastikan asatidz yang masih pakai URL Unsplash tetap tampil.
7. **Terakhir:** `npm run build` harus lolos, lalu `npm run start` dan ulangi pemeriksaan homepage + login pada build produksi (perilaku cookie `secure` berbeda di prod).

