'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { ProfileData } from '@/lib/db';

interface FloatingWhatsAppProps {
  profile: ProfileData;
}

export default function FloatingWhatsApp({ profile }: FloatingWhatsAppProps) {
  return (
    <a
      href={`https://wa.me/${profile.phone}?text=Assalamu'alaikum,%20saya%20ingin%20bertanya%20mengenai%20pendaftaran%20santri%20${encodeURIComponent(
        profile.name
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center space-x-2 transition-all transform hover:scale-110 active:scale-95 group"
    >
      <div className="relative">
        <MessageSquare className="w-7 h-7 fill-white" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
        </span>
      </div>
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-sm pl-0 group-hover:pl-2">
        Chat WhatsApp
      </span>
    </a>
  );
}
