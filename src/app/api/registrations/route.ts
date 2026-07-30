import { NextResponse } from 'next/server';
import { getRegistrations } from '@/lib/db';

export async function GET() {
  try {
    const registrations = getRegistrations();
    return NextResponse.json({ success: true, data: registrations });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data pendaftaran' },
      { status: 500 }
    );
  }
}
