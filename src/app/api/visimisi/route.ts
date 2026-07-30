import { NextResponse } from 'next/server';
import { getVisiMisi } from '@/lib/db';

export async function GET() {
  try {
    const visiMisi = getVisiMisi();
    return NextResponse.json({ success: true, data: visiMisi });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal mengambil data visi misi' }, { status: 500 });
  }
}
