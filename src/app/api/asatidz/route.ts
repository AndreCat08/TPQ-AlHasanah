import { NextResponse } from 'next/server';
import { getAsatidz } from '@/lib/db';

export async function GET() {
  try {
    const asatidz = await getAsatidz();
    return NextResponse.json({ success: true, data: asatidz });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal mengambil data asatidz' }, { status: 500 });
  }
}
