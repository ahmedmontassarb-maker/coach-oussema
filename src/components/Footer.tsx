import React from 'react';
import { Instagram, Facebook, Phone, Lock, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { config, openAdmin } = useApp();

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          <div>
            <a
              href="#"
              className="text-xl font-black tracking-wider text-white uppercase flex items-center gap-2"
            >
              <span className="text-amber-400">■</span>
              <span className="font-heading">{config.coachName}</span>
            </a>
            <p className="text-xs text-neutral-400 mt-1">
              {config.title} · {config.location}
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Oussema Taleb"
              className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-pink-400 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href={config.facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook de Oussema Taleb"
              className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-blue-400 transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>

            <a
              href={`https://wa.me/${config.whatsappRaw}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp de Oussema Taleb"
              className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-emerald-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} {config.coachName}. Tous droits réservés.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={openAdmin}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Espace Coach</span>
            </button>
            <span className="text-neutral-700">·</span>
            <span>Performance & Biomécanique</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
