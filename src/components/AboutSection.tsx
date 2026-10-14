import React from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle, Instagram, Facebook, MessageCircle, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutSection: React.FC = () => {
  const { config } = useApp();

  const certifications = [
    'BPJEPS Métiers de la Forme & Haltérophilie',
    'Diplômé en Préparation Physique & Biomécanique',
    'Certification Nutrition du Sportif & Micronutrition',
    'Spécialisation Réathlétisation & Prévention des Blessures',
  ];

  return (
    <section id="apropos" className="py-24 bg-neutral-950/75 backdrop-blur-sm border-t border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
              <img
                src={config.coachPhotoUrl || "/src/assets/images/coach_oussema_portrait_1791994505734.jpg"}
                alt="Oussema Taleb Coach Sportif Privé"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-neutral-900/80 backdrop-blur-md border border-neutral-800">
                <p className="text-base font-bold text-white uppercase tracking-tight">
                  {config.coachName}
                </p>
                <p className="text-xs text-amber-400 font-medium">
                  {config.title}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{config.location}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details & Bio Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2">
              <span>Votre Coach Privé</span>
              <span aria-hidden="true">·</span>
              <span>Exigence & Passion</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mb-6">
              "Votre potentiel physique ne dépend pas de la chance, mais de la méthode."
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {config.bioText}
            </p>

            {/* Certifications and credentials */}
            <div className="space-y-3 mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Qualifications & Certifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links & direct contacts */}
            <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center gap-4">
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 hover:text-amber-400 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>Instagram @oussamatalb1</span>
              </a>

              <a
                href={config.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 hover:text-amber-400 transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-500" />
                <span>Facebook Oussama Taleb</span>
              </a>

              <a
                href={`https://wa.me/${config.whatsappRaw}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/80 text-xs font-semibold text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp : {config.whatsappNumber}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
