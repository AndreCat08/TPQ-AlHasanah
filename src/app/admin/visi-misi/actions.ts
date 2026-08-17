'use server';

import { updateVisiMisi, type VisiMisiData } from '@/lib/db';
import { visiMisiSchema, type VisiMisiFormState } from '@/lib/validation';
import { revalidatePath } from 'next/cache';

export async function updateVisiMisiAction(
  _prevState: VisiMisiFormState | null,
  formData: FormData
): Promise<VisiMisiFormState> {
  const visi = formData.get('visi') as string;
  const misiJson = formData.get('misi') as string;
  
  let misi: string[] = [];
  try {
    misi = JSON.parse(misiJson);
  } catch (e) {
    misi = [];
  }

  const validatedData = {
    visi,
    misi
  };

  const validationResult = visiMisiSchema.safeParse(validatedData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    await updateVisiMisi(validationResult.data as VisiMisiData);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to update visi-misi:', error);
    return {
      errors: { _form: ['Gagal menyimpan perubahan.'] },
    };
  }
}
