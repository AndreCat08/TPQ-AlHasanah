'use server';

import { updateProfile, type ProfileData } from '@/lib/db';
import { profileSchema, type ProfileFormState } from '@/lib/validation';

export async function updateProfileAction(
  _prevState: ProfileFormState | null,
  formData: FormData
): Promise<ProfileFormState> {
  // Parse form data
  const formDataObj: Record<string, string> = {};
  formData.forEach((value, key) => {
    formDataObj[key] = value.toString();
  });
  
  // Convert stats from JSON string to array
  let stats: { label: string; count: string }[] = [];
  if (formDataObj.stats) {
    try {
      stats = JSON.parse(formDataObj.stats);
      // Validate that it's an array of objects with label and count
      if (!Array.isArray(stats) || !stats.every(item => 
          typeof item === 'object' && 
          item !== null && 
          typeof (item as any).label === 'string' && 
          typeof (item as any).count === 'string')) {
        stats = [];
      }
    } catch (e) {
      stats = [];
    }
  }
  
  // Prepare validated data
  const validatedData = {
    name: formDataObj.name,
    tagline: formDataObj.tagline,
    phone: formDataObj.phone,
    email: formDataObj.email,
    address: formDataObj.address,
    established: formDataObj.established,
    stats: stats
  };
  
  // Validate with zod
  const validationResult = profileSchema.safeParse(validatedData);
  
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }
  
  // Update profile in database
  try {
    await updateProfile(validationResult.data as ProfileData);
    return { success: true };
  } catch (error) {
    console.error('Failed to update profile:', error);
    return {
      errors: { _form: ['Gagal menyimpan perubahan. Coba lagi nanti.'] },
    };
  }
}