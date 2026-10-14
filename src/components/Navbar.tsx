import React, { useState, useEffect } from 'react';
import { Lock, Menu, X, MessageSquare, Instagram, Facebook, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { config, openAdmin, messages, isAdminLoggedIn } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const unreadMessagesCount = messages.filter((m) => m.status === 'nouveau').length;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-neutral-950/80 via-neutral-950/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase whitespace-nowrap shrink-0 group flex items-center gap-2"
        >
          <span className="text-amber-400 group-hover:text-amber-300 transition-colors">■</span>
          <span className="font-heading tracking-tight">{config.coachName}</span>
        </a>

        {/* Zone 2: Navigation Links (single-line, clean typography) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <a
            href="#programmes"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Programmes
          </a>
          <a
            href="#methode"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            La Méthode
          </a>
          <a
            href="#apropos"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Le Coach
          </a>
          <a
            href="#temoignages"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Témoignages
          </a>
          <a
            href="#contact"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Primary Action & Discrete Admin Access */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Discrete Admin trigger icon (as requested: "une partie admin petiite cone en haut") */}
          <button
            onClick={openAdmin}
            aria-label="Accès Administration Coach"
            title={isAdminLoggedIn ? "Panneau d'administration (Connecté)" : "Espace privé Coach"}
            className="relative p-2 text-neutral-400 hover:text-amber-400 transition-colors rounded-lg hover:bg-neutral-900 border border-transparent hover:border-neutral-800"
          >
            <Lock className="w-4 h-4" />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-neutral-950">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            Bilan Offert
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu de navigation"
            className="md:hidden p-2 text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/95 border-b border-neutral-800 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium">
            <a
              href="#programmes"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-amber-400 py-1"
            >
              Programmes de Coaching
            </a>
            <a
              href="#methode"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-amber-400 py-1"
            >
              La Méthode & Approche
            </a>
            <a
              href="#apropos"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-amber-400 py-1"
            >
              À Propos d'Oussema
            </a>
            <a
              href="#temoignages"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-amber-400 py-1"
            >
              Témoignages Clients
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-amber-400 py-1"
            >
              Prendre Contact
            </a>
          </nav>

          <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-amber-400 rounded-lg"
            >
              Réserver Mon Bilan Offert
            </a>
            <div className="flex items-center justify-center gap-5 pt-2 text-neutral-400">
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:text-amber-400"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={config.facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="hover:text-amber-400"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${config.whatsappRaw}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="hover:text-amber-400"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
