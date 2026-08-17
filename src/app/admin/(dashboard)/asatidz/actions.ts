'use server';

import { createAsatidz, updateAsatidz, deleteAsatidz, reorderAsatidz, type AsatidzItem } from '@/lib/db';
import { asatidzSchema, type CollectionFormState } from '@/lib/validation';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/session';

export async function saveAsatidzAction(
  item: Partial<AsatidzItem>
): Promise<CollectionFormState> {
  await requireSession();
  
  const validationResult = asatidzSchema.safeParse(item);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    if (item.id) {
      await updateAsatidz(item.id, validationResult.data);
    } else {
      await createAsatidz(validationResult.data);
    }
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to save asatidz:', error);
    return {
      errors: { _form: ['Gagal menyimpan data.'] },
    };
  }
}

export async function deleteAsatidzAction(id: number) {
  await requireSession();
  await deleteAsatidz(id);
  revalidatePath('/');
  return { success: true };
}

export async function reorderAsatidzAction(orderedIds: number[]) {
  await requireSession();
  await reorderAsatidz(orderedIds);
  revalidatePath('/');
  return { success: true };
}
