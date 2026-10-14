import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, ShieldCheck, Dumbbell, Award, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { config } = useApp();

  const whatsappMessage = encodeURIComponent(
    `Bonjour Oussema, j'ai découvert votre site et je souhaite discuter d'un coaching privé adapté à mes objectifs.`
  );

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-12">
      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto flex flex-col items-center text-center relative z-10">
        {/* Subtle athletic kicker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-4 bg-neutral-950/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-neutral-800/80 shadow-lg"
        >
          <span>Coaching Privé & Performance</span>
          <span aria-hidden="true">·</span>
          <span>Paris & En Ligne</span>
        </motion.div>

        {/* Main Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white max-w-4xl leading-[1.08] [text-wrap:balance] drop-shadow-md"
        >
          {config.heroHeadline}
        </motion.h1>

        {/* Subtitle / Value proposition (Without prices) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl font-normal leading-relaxed drop-shadow"
        >
          {config.heroSubtitle}
        </motion.p>

        {/* Primary Call to Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xl hover:shadow-amber-400/25 transition-all text-center"
          >
            Réserver Mon Bilan Offert
          </a>

          <a
            href={`https://wa.me/${config.whatsappRaw}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-medium tracking-wide text-white bg-neutral-950/80 hover:bg-neutral-900 border border-neutral-700/80 hover:border-emerald-500/60 rounded-lg backdrop-blur-md transition-all flex items-center justify-center gap-2 group shadow-lg"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Discuter sur WhatsApp</span>
          </a>
        </motion.div>
      </div>

      {/* Athletic Trust & Impact KPI Strip (Below hero split) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white tabular-nums">8+ Ans</p>
              <p className="text-xs text-neutral-400">D'expérience terrain</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">100%</p>
              <p className="text-xs text-neutral-400">Sur-mesure & individuel</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">Biomécanique</p>
              <p className="text-xs text-neutral-400">& Nutrition de précision</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">Suivi 7j/7</p>
              <p className="text-xs text-neutral-400">Accompagnement continu</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
