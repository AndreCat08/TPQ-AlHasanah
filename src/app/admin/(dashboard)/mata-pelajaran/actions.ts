'use server';

import { createSubject, updateSubject, deleteSubject, reorderSubjects, type SubjectItem } from '@/lib/db';
import { subjectSchema, type CollectionFormState } from '@/lib/validation';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/session';

export async function saveSubjectAction(
  item: Partial<SubjectItem>
): Promise<CollectionFormState> {
  await requireSession();
  
  const validationResult = subjectSchema.safeParse(item);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    if (item.id) {
      await updateSubject(item.id, validationResult.data);
    } else {
      await createSubject(validationResult.data);
    }
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to save subject:', error);
    return {
      errors: { _form: ['Gagal menyimpan data.'] },
    };
  }
}

export async function deleteSubjectAction(id: number) {
  await requireSession();
  await deleteSubject(id);
  revalidatePath('/');
  return { success: true };
}

export async function reorderSubjectsAction(orderedIds: number[]) {
  await requireSession();
  await reorderSubjects(orderedIds);
  revalidatePath('/');
  return { success: true };
}
