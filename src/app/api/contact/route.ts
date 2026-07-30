import { NextResponse } from 'next/server';
import { addRegistration } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, program, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: 'Nama dan nomor WhatsApp wajib diisi' },
        { status: 400 }
      );
    }

    const registration = addRegistration(
      name,
      phone,
      program || 'Iqra & Tahsin',
      message || ''
    );

    return NextResponse.json({
      success: true,
      message: 'Pendaftaran berhasil dikirim!',
      data: registration
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat memproses formulir' },
      { status: 500 }
    );
  }
}
