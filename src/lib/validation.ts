import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, 'Nama harus diisi'),
  tagline: z.string().min(1, 'Tagline harus diisi'),
  phone: z.string().min(1, 'No. telepon harus diisi'),
  email: z.string().email('Format email tidak valid'),
  address: z.string().min(1, 'Alamat harus diisi'),
  established: z.string().min(1, 'Tahun berdiri harus diisi'),
  stats: z.array(z.object({
    label: z.string().min(1, 'Label statistik harus diisi'),
    count: z.string().min(1, 'Jumlah harus diisi'),
  })).min(1, 'Minimal satu statistik'),
});

export const visiMisiSchema = z.object({
  visi: z.string().min(1, 'Visi harus diisi'),
  misi: z.array(z.string()).min(1, 'Minimal satu misi'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type VisiMisiFormData = z.infer<typeof visiMisiSchema>;

export type ProfileFormState = 
  | { success: true; errors?: never }
  | { success?: false; errors: Record<string, string[] | undefined> };

export type VisiMisiFormState = 
  | { success: true; errors?: never }
  | { success?: false; errors: Record<string, string[] | undefined> };

export const subjectSchema = z.object({
  title: z.string().min(1, 'Nama mata pelajaran harus diisi'),
  category: z.string().min(1, 'Kategori harus diisi'),
  icon: z.string().min(1, 'Ikon harus diisi'),
  desc: z.string().min(1, 'Deskripsi harus diisi'),
  topics: z.array(z.string()).min(1, 'Minimal satu topik'),
});

export const asatidzSchema = z.object({
  name: z.string().min(1, 'Nama harus diisi'),
  role: z.string().min(1, 'Jabatan harus diisi'),
  bio: z.string().min(1, 'Bio harus diisi'),
  image: z.string().min(1, 'URL gambar harus diisi'),
  quote: z.string().min(1, 'Kutipan harus diisi'),
});

export const activitySchema = z.object({
  title: z.string().min(1, 'Judul kegiatan harus diisi'),
  category: z.string().min(1, 'Kategori harus diisi'),
  routineNotes: z.string().min(1, 'Catatan rutin harus diisi').optional(),
  activityDate: z.string().datetime().optional(), // ISO string from DatePicker
  isRoutine: z.boolean(),
  image: z.string().min(1, 'URL gambar harus diisi'),
  description: z.string().min(1, 'Deskripsi harus diisi'),
}).refine(data => {
  if (!data.isRoutine && !data.activityDate) {
    return false; // Must have activityDate if not routine
  }
  if (data.isRoutine && !data.routineNotes) {
    return false; // Must have routineNotes if routine
  }
  return true;
}, {
  message: 'Isi Tanggal Kegiatan atau Catatan Rutin',
  path: ['activityDate'], // Attach error to activityDate field if it fails
}).refine(data => {
  // If not routine, routineNotes should be undefined
  if (!data.isRoutine && data.routineNotes) {
    return false;
  }
  // If routine, activityDate should be undefined
  if (data.isRoutine && data.activityDate) {
    return false;
  }
  return true;
}, {
  message: 'Pilih salah satu: Tanggal Kegiatan atau Rutin',
  path: ['isRoutine'], // Attach error to isRoutine field
});

export const doaSchema = z.object({
  title: z.string().min(1, 'Judul doa harus diisi'),
  arabic: z.string().min(1, 'Teks Arab harus diisi'),
  latin: z.string().min(1, 'Teks Latin harus diisi'),
  meaning: z.string().min(1, 'Arti harus diisi'),
});

export type SubjectFormData = z.infer<typeof subjectSchema>;
export type AsatidzFormData = z.infer<typeof asatidzSchema>;
export type ActivityFormData = z.infer<typeof activitySchema>;
export type DoaFormData = z.infer<typeof doaSchema>;

export type CollectionFormState = 
  | { success: true; errors?: never }
  | { success?: false; errors: Record<string, string[] | undefined> };
