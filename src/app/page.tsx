import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import VisiMisiSection from '@/components/VisiMisiSection';
import SubjectsSection from '@/components/SubjectsSection';
import DoaSection from '@/components/DoaSection';
import ActivitiesSection from '@/components/ActivitiesSection';
import AsatidzSection from '@/components/AsatidzSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import {
  getProfile,
  getVisiMisi,
  getSubjects,
  getAsatidz,
  getActivities,
  getSampleDoas,
} from '@/lib/db';

export const revalidate = 0; // Dynamic server fetching

export default async function HomePage() {
  const profile = await getProfile();
  const visiMisi = await getVisiMisi();
  const subjects = await getSubjects();
  const asatidz = await getAsatidz();
  const activities = await getActivities();
  const sampleDoas = await getSampleDoas();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-emerald-600 selection:text-white">
      <Navbar profile={profile} />
      <main>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <VisiMisiSection visiMisi={visiMisi} />
        <SubjectsSection subjects={subjects} />
        <DoaSection doas={sampleDoas} />
        <ActivitiesSection activities={activities} />
        <AsatidzSection asatidz={asatidz} />
        <ContactSection profile={profile} />
      </main>
      <Footer profile={profile} />
      <FloatingWhatsApp profile={profile} />
    </div>
  );
}
