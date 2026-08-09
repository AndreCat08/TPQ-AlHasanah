import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import DoaSection from '@/components/DoaSection';
import { getProfile, getSampleDoas } from '@/lib/db';

export const revalidate = 0;

export default async function DoaDanAmalanPage() {
  const profile = await getProfile();
  const sampleDoas = await getSampleDoas();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 font-sans antialiased selection:bg-emerald-600 selection:text-white">
      <Navbar profile={profile} />
      <main>
        <DoaSection doas={sampleDoas} />
      </main>
      <Footer profile={profile} />
      <FloatingWhatsApp profile={profile} />
    </div>
  );
}
