'use server';

import { createActivity, updateActivity, deleteActivity, reorderActivities, type ActivityItem } from '@/lib/db';
import { activitySchema, type CollectionFormState } from '@/lib/validation';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/session';

export async function saveActivityAction(
  item: Partial<ActivityItem>
): Promise<CollectionFormState> {
  await requireSession();
  
  const validatedData = {
    ...item,
    // Clear opposite field based on isRoutine
    ...(item.isRoutine ? { activityDate: undefined } : { routineNotes: undefined }),
  };
  
  const validationResult = activitySchema.safeParse(validatedData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    if (item.id) {
      await updateActivity(item.id, {
        ...validationResult.data,
        activityDate: validationResult.data.activityDate ? new Date(validationResult.data.activityDate) : null,
        routineNotes: validationResult.data.routineNotes || null,
      } as any);
    } else {
      await createActivity({
        ...validationResult.data,
        activityDate: validationResult.data.activityDate ? new Date(validationResult.data.activityDate) : null,
        routineNotes: validationResult.data.routineNotes || null,
      } as any);
    }
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to save activity:', error);
    return {
      errors: { _form: ['Gagal menyimpan data.'] },
    };
  }
}

export async function deleteActivityAction(id: number) {
  await requireSession();
  await deleteActivity(id);
  revalidatePath('/');
  return { success: true };
}

export async function reorderActivitiesAction(orderedIds: number[]) {
  await requireSession();
  await reorderActivities(orderedIds);
  revalidatePath('/');
  return { success: true };
}
