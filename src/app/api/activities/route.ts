import { NextResponse } from 'next/server';
import { getActivities } from '@/lib/db';

export async function GET() {
  try {
    const activities = getActivities();
    return NextResponse.json({ success: true, data: activities });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal mengambil data kegiatan' }, { status: 500 });
  }
}
