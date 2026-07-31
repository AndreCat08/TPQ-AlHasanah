import { DBStructure } from "@/lib/db";

export const INITIAL_DATA: DBStructure = {
    profile: {
      name: "TPQ Al-Hasanah",
      tagline: "Membentuk Generasi Qur\'ani yang Berakhlaqul Karimah, Cerdas, dan Mandiri",
      phone: "6281234567890",
      email: "info@tpqalhasanah.sch.id",
      address: "Jl. Masjid Al-Hasanah No. 45, Kecamatan Bojongsoang, Bandung, Jawa Barat",
      established: "2010",
      stats: [
        { label: "Santri Aktif", count: "180+" },
        { label: "Asatidz & Ustadzah", count: "12" },
        { label: "Alumni Tersebar", count: "450+" },
        { label: "Tahun Pengabdian", count: "14+" }
      ]
    },
  
    visiMisi: {
      visi: "Menjadi lembaga pendidikan Al-Qur\'an terdepan yang melahirkan generasi Rabbani, hafal Al-Qur\'an, berakhlak mulia, dan siap memimpin masa depan.",
      misi: [
        "Menyelenggarakan pembelajaran Al-Qur\'an yang efektif, menyenangkan, dan berstandar tajwid shahih.",
        "Menanamkan adab, nilai-nilai moral Islam, dan akhlakul karimah dalam kehidupan sehari-hari.",
        "Mengembangkan hafalan surah-surah pendek & juz \'amma secara terstruktur.",
        "Membangun sinergi harmonis antara Ustadz, orang tua, dan masyarakat sekitar."
      ]
    },
  
    subjects: [
      {
        id: 1,
        title: "Bimbingan Iqra & Tahsin",
        category: "Dasar & Menengah",
        icon: "📖",
        desc: "Metode baca Al-Qur\'an bertahap dengan pengucapan makhraj huruf yang tepat sejak dini.",
        topics: ["Pengenalan Hijaiyah", "Makhraj & Sifat Huruf", "Kelancaran Membaca"]
      },
      {
        id: 2,
        title: "Tajwid & Gharib",
        category: "Tingkat Lanjut",
        icon: "✨",
        desc: "Pendalaman hukum-hukum bacaan Al-Qur\'an untuk membaca secara benar dan indah sesuai kaidah.",
        topics: ["Hukum Nun & Mim Mati", "Mad & Waqaf", "Bacaan Gharib & Musykilat"]
      },
      {
        id: 3,
        title: "Tahfidz Al-Qur\'an",
        category: "Semua Tingkat",
        icon: "🌟",
        desc: "Program bimbingan hafalan Juz 30 (Juz \'Amma) dan surah-surah pilihan disertai muraja\'ah rutin.",
        topics: ["Target Hafalan Harian", "Setoran Hafalan", "Muraja\'ah Bersama"]
      },
      {
        id: 4,
        title: "Aqidah & Akhlak",
        category: "Karakter",
        icon: "💚",
        desc: "Pembentukan karakter islami, ketauhidan, adab kepada orang tua, guru, dan teman.",
        topics: ["Rukun Iman & Islam", "Adab Harian", "Kisah Nabi & Sahabat"]
      },
      {
        id: 5,
        title: "Praktik Ibadah & Doa",
        category: "Praktikum",
        icon: "🤲",
        desc: "Latihan wudhu, gerakan & bacaan shalat fardhu/sunnah, serta hafalan doa-doa harian.",
        topics: ["Praktik Wudhu & Shalat", "Hafalan Doa Harian", "Hadits-Hadits Pilihan"]
      },
      {
        id: 6,
        title: "Bahasa Arab & Kaligrafi",
        category: "Pengembangan",
        icon: "✏️",
        desc: "Pengenalan kosa kata bahasa Arab dasar serta seni menulis indah (khat) huruf hijaiyah.",
        topics: ["Kosa Kata Harian", "Seni Khat Naskhi", "Percakapan Sederhana"]
      }
    ],
  
    asatidz: [
      {
        id: 1,
        name: "Ustadz H. Ahmad Syauqi, S.Pd.I",
        role: "Kepala TPQ & Pengajar Tahfidz",
        bio: "Pengalaman 12+ tahun mendidik santri dalam hafalan dan tajwid. Pemegang sanad riwayat Hafs.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
        quote: "Mendidik dengan hati, membentuk karakter Rabbani."
      },
      {
        id: 2,
        name: "Ustadzah Nurul Hidayah, S.Ag",
        role: "Koordinator Kurikulum & Iqra",
        bio: "Spesialis metode pembelajaran interaktif anak usia dini dengan pendekatan ramah anak.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
        quote: "Membaca Al-Qur\'an jadi mudah dan menyenangkan."
      },
      {
        id: 3,
        name: "Ustadz Muhammad Ridwan, Lc",
        role: "Pengajar Tajwid & Bahasa Arab",
        bio: "Lulusan Universitas Islam, berpengalaman mengajar ilmu tajwid dan kaidah kosa kata Arab.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
        quote: "Menyelami indahnya Al-Qur\'an lewat tajwid yang benar."
      },
      {
        id: 4,
        name: "Ustadzah Siti Fatimah, S.Pd",
        role: "Pengajar Aqidah & Akhlak",
        bio: "Aktif membimbing santri putri dalam pendalaman adab, doa harian, dan ibadah praktis.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
        quote: "Akhlak mulia adalah mahkota utama setiap santri."
      }
    ],
  
    activities: [
      {
        id: 1,
        title: "Wisuda Khataman & Imtihan",
        category: "Khataman",
        date: "15 Mei 2026",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
        description: "Momen bahagia santri yang telah menyelesaikan hafalan Juz 30 dan kelulusan Iqra 6."
      },
      {
        id: 2,
        title: "Lomba Festival Anak Sholeh",
        category: "Prestasi",
        date: "10 April 2026",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
        description: "Ajang unjuk kebolehan santri dalam lomba tartil, azan, hafalan doa, dan kaligrafi."
      },
      {
        id: 3,
        title: "Praktik Shalat Berjamaah",
        category: "Pembelajaran",
        date: "Rutin Mingguan",
        image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80&w=600",
        description: "Bimbingan tatacara shalat fardhu dan sunnah berjamaah secara langsung di masjid."
      },
      {
        id: 4,
        title: "Rihlah & Outbound Edukasi",
        category: "Outbound",
        date: "20 Februari 2026",
        image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&q=80&w=600",
        description: "Kegiatan tadabbur alam dan permainan ketangkasan untuk mempererat kebersamaan santri."
      },
      {
        id: 5,
        title: "Peringatan Hari Besar Islam",
        category: "Acara",
        date: "1 Muharram 1448 H",
        image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=600",
        description: "Pawai obor santri dan kajian keislaman menyambut Tahun Baru Hijriyah."
      },
      {
        id: 6,
        title: "Bagi Sembako & Santunan",
        category: "Sosial",
        date: "Ramadhan 2026",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600",
        description: "Program bakti sosial santri membagikan takjil dan paket sembako kepada warga membutuhkan."
      }
    ],
  
    sampleDoas: [
      {
        id: 1,
        title: "Doa Sebelum Belajar",
        arabic: "رَضِيتُ بِاللَّهِ رَبًّا وَبِالإِسْلاَمِ دِينًا وَبِمُحَمَّدٍ نَبِيًّا وَرَسُولاً ، رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا",
        latin: "Radhitu billahi rabba, wa bil islami dina, wa bi Muhammadin nabiyya wa rasula. Rabbi zidni \'ilman warzuqni fahma.",
        meaning: "Aku ridha Allah sebagai Tuhanku, Islam sebagai agamaku, dan Nabi Muhammad sebagai Nabi dan Rasulku. Ya Allah, tambahkanlah kepadaku ilmu dan berikanlah aku karunia pemahaman."
      },
      {
        id: 2,
        title: "Doa Kedua Orang Tua",
        arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        latin: "Rabbighfir lii wa liwaalidayya warhamhumaa kamaa rabbayaanii shaghiiraa.",
        meaning: "Ya Allah, ampunilah aku dan kedua orang tuaku, dan sayangilah mereka sebagaimana mereka menyayangiku di waktu kecil."
      },
      {
        id: 3,
        title: "Doa Masuk Masjid",
        arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        latin: "Allahummaftah lii abwaaba rahmatik.",
        meaning: "Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu."
      },
      {
        id: 4,
        title: "Doa Sapu Jagad (Kebaikan Dunia & Akhirat)",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        latin: "Rabbana aatina fiddunya hasanah wa fil aakhirati hasanah wa qinaa \'adzaban naar.",
        meaning: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat dan lindungilah kami dari azab neraka."
      }
    ],
  
    registrations: [
      {
        id: "REG-1001",
        name: "Bapak Haryanto",
        phone: "081234567890",
        program: "Iqra & Tahsin (Anak Usia Dini / SD)",
        message: "Ingin mendaftarkan putra kami usia 6 tahun.",
        createdAt: "2026-07-28T10:30:00Z"
      }
    ]
  };
