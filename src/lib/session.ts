import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySession } from '@/lib/auth';

export async function isAuthenticated(): Promise<boolean> {
  return verifySession(cookies().get(SESSION_COOKIE)?.value);
}

export async function requireSession(): Promise<void> {
  if (!(await isAuthenticated())) {
    throw new Error('Tidak terautentikasi');
  }
}
