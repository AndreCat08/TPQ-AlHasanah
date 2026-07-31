import { NextResponse } from 'next/server';
import { getProfile } from '@/lib/db';

export async function GET() {
  try {
    const profile = await getProfile();
    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal mengambil data profil' }, { status: 500 });
  }
}
