import { NextResponse } from 'next/server';
import { getSubjects } from '@/lib/db';

export async function GET() {
  try {
    const subjects = await getSubjects();
    return NextResponse.json({ success: true, data: subjects });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal mengambil data mata pelajaran' }, { status: 500 });
  }
}
