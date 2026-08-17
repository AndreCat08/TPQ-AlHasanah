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
