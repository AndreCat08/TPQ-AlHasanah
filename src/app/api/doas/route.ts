import { NextResponse } from 'next/server';
import { getSampleDoas } from '@/lib/db';

export async function GET() {
  try {
    const doas = await getSampleDoas();
    return NextResponse.json({ success: true, data: doas });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal mengambil data doa' }, { status: 500 });
  }
}
