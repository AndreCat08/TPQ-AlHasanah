'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Menu, X, ChevronRight, Phone } from 'lucide-react';
import { ProfileData } from '@/lib/db';

interface NavbarProps {
  profile: ProfileData;
}

export default function Navbar({ profile }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['home', 'about', 'visimisi', 'matpel', 'doa', 'kegiatan', 'asatidz', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'about', label: 'Tentang Kami' },
    { id: 'visimisi', label: 'Visi & Misi' },
    { id: 'matpel', label: 'Mata Pelajaran' },
    { id: 'doa', label: 'Doa Harian' },
    { id: 'kegiatan', label: 'Kegiatan' },
    { id: 'asatidz', label: 'Pengajar' },
    { id: 'contact', label: 'Kontak' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-emerald-100'
          : 'bg-gradient-to-b from-slate-900/80 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo Brand */}
        <div
          onClick={() => scrollToSection('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-transform group-hover:scale-105 shadow-md ${
              isScrolled ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'
            }`}
          >
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span
              className={`text-xl font-extrabold tracking-tight block ${
                isScrolled ? 'text-emerald-950' : 'text-white'
              }`}
            >
              {profile.name}
            </span>
            <span
              className={`text-[10px] tracking-widest uppercase block -mt-1 font-medium ${
                isScrolled ? 'text-emerald-600' : 'text-emerald-200'
              }`}
            >
              Taman Pendidikan Al-Qur'an
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeSection === item.id
                  ? isScrolled
                    ? 'bg-emerald-50 text-emerald-700 font-bold'
                    : 'bg-white/20 text-white backdrop-blur-sm'
                  : isScrolled
                  ? 'text-slate-600 hover:text-emerald-700 hover:bg-slate-100'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Header Action Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <a
            href={`/admin`}
            className="inline-flex items-center space-x-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 px-3.5 py-2 rounded-lg font-bold text-xs border border-slate-600/50 transition-all"
          >
            <span>Panel Admin</span>
          </a>

          <a
            href={`https://wa.me/${profile.phone}?text=Assalamu'alaikum,%20saya%20ingin%20mendaftar/bertanya%20mengenai%20${encodeURIComponent(
              profile.name
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2 rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4" />
            <span>Daftar Santri</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg focus:outline-none ${
            isScrolled ? 'text-slate-800' : 'text-white'
          }`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-xl border-b border-slate-100 px-4 pt-3 pb-6 mt-3 space-y-2 text-slate-800">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold flex items-center justify-between ${
                activeSection === item.id
                  ? 'bg-emerald-50 text-emerald-800 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <a
              href="/admin"
              className="w-full inline-flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-xl font-bold"
            >
              <span>Panel Admin Pendaftaran</span>
            </a>

            <a
              href={`https://wa.me/${profile.phone}?text=Assalamu'alaikum,%20saya%20ingin%20mendaftar/bertanya%20mengenai%20${encodeURIComponent(
                profile.name
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold shadow-md"
            >
              <Phone className="w-5 h-5" />
              <span>Hubungi via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
