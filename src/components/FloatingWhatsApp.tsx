import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FloatingWhatsApp: React.FC = () => {
  const { config } = useApp();

  const msg = encodeURIComponent(
    `Bonjour Oussema Taleb, je vous contacte depuis votre site internet pour échanger sur vos disponibilités de coaching privé.`
  );

  return (
    <aside
      aria-label="Contact direct WhatsApp"
      className="fixed bottom-6 right-6 z-30 flex items-center group"
    >
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-lg bg-neutral-900/90 backdrop-blur-md text-xs font-semibold text-neutral-200 border border-neutral-800 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Échanger directement avec Oussema
      </span>

      <a
        href={`https://wa.me/${config.whatsappRaw}?text=${msg}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Contacter le coach Oussema Taleb sur WhatsApp"
        className="relative flex items-center justify-center w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400/30 blur-sm pointer-events-none" />
        <MessageCircle className="w-6 h-6 relative z-10 text-white" />
      </a>
    </aside>
  );
};
