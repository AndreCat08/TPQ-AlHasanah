'use server';

import { createDoa, updateDoa, deleteDoa, reorderDoas, type SampleDoaItem } from '@/lib/db';
import { doaSchema, type CollectionFormState } from '@/lib/validation';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/session';

export async function saveDoaAction(
  item: Partial<SampleDoaItem>
): Promise<CollectionFormState> {
  await requireSession();
  
  const validationResult = doaSchema.safeParse(item);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    if (item.id) {
      await updateDoa(item.id, validationResult.data);
    } else {
      await createDoa(validationResult.data);
    }
    revalidatePath('/');
    revalidatePath('/doaDanAmalan');
    return { success: true };
  } catch (error) {
    console.error('Failed to save doa:', error);
    return {
      errors: { _form: ['Gagal menyimpan data.'] },
    };
  }
}

export async function deleteDoaAction(id: number) {
  await requireSession();
  await deleteDoa(id);
  revalidatePath('/');
  revalidatePath('/doaDanAmalan');
  return { success: true };
}

export async function reorderDoasAction(orderedIds: number[]) {
  await requireSession();
  await reorderDoas(orderedIds);
  revalidatePath('/');
  revalidatePath('/doaDanAmalan');
  return { success: true };
}
