import React from 'react';
import { X, CheckCircle2, Target, Calendar, ArrowRight, MessageCircle } from 'lucide-react';
import { ProgramItem } from '../types';
import { AnimatedProgramIcon } from './AnimatedProgramIcon';
import { useApp } from '../context/AppContext';

interface Props {
  program: ProgramItem | null;
  onClose: () => void;
  onSelectProgramForBooking: (programTitle: string) => void;
}

export const ProgramDetailModal: React.FC<Props> = ({
  program,
  onClose,
  onSelectProgramForBooking,
}) => {
  const { config } = useApp();

  if (!program) return null;

  const handleBooking = () => {
    onSelectProgramForBooking(program.title);
    onClose();
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const directWhatsAppMsg = encodeURIComponent(
    `Bonjour Oussema, je suis intéressé(e) par votre programme "${program.title}". Pouvons-nous échanger sur la mise en place ?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 shrink-0">
            <AnimatedProgramIcon iconName={program.iconName} size={32} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <span>{program.category}</span>
              {program.badge && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-neutral-400">{program.badge}</span>
                </>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
              {program.title}
            </h3>
          </div>
        </div>

        {/* Short & Detailed Description */}
        <div className="space-y-4 text-sm text-neutral-300 leading-relaxed border-b border-neutral-800 pb-6 mb-6">
          <p className="text-base text-neutral-200 font-medium">
            {program.shortDesc}
          </p>
          <p className="text-neutral-400">
            {program.detailedDesc}
          </p>
        </div>

        {/* Key Highlights */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
            Inclus dans ce protocole sur-mesure
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {program.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience & Format */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 mb-6 text-xs">
          <div>
            <span className="text-neutral-500 font-medium block mb-1">Pour qui :</span>
            <p className="text-neutral-300">{program.targetAudience}</p>
          </div>
          <div>
            <span className="text-neutral-500 font-medium block mb-1">Format de coaching :</span>
            <p className="text-amber-400 font-semibold">{program.format}</p>
          </div>
        </div>

        {/* Modal CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleBooking}
            className="flex-1 py-3 px-5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>Choisir ce programme</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`https://wa.me/${config.whatsappRaw}?text=${directWhatsAppMsg}`}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-5 text-xs font-semibold tracking-wider text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Échanger sur WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
