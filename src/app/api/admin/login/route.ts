import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { SESSION_COOKIE, SESSION_DURATION_MS, createSessionToken } from '@/lib/auth';

export const runtime = 'nodejs';

function matchesAdminPassword(candidate: string, expected: string): boolean {
  const a = crypto.createHash('sha256').update(candidate).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json(
        { success: false, message: 'Server belum dikonfigurasi. Hubungi pengelola.' },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => null);
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!password || !matchesAdminPassword(password, adminPassword)) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return NextResponse.json(
        { success: false, message: 'Password salah' },
        { status: 401 }
      );
    }

    const { token } = await createSessionToken();

    const response = NextResponse.json({
      success: true,
      message: 'Berhasil masuk',
    });

    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: SESSION_DURATION_MS / 1000,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat proses masuk' },
      { status: 500 }
    );
  }
}
