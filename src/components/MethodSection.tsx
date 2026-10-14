import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, LineChart, Apple, Smartphone, ArrowRight } from 'lucide-react';

export const MethodSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Bilan Morpho-Anatomique & Tests de Mobilité',
      description:
        'Avant tout mouvement, nous analysons votre posture, vos leviers articulaires et vos antécédents. Cela nous permet de sélectionner les exercices parfaitement adaptés à votre squelette sans risque de blessure.',
      icon: ShieldCheck,
    },
    {
      num: '02',
      title: 'Programmation Basée sur la Surcharge Progressive',
      description:
        'Chaque série, répétition et tempo est planifié avec rigueur. Nous appliquons des principes scientifiques pour stimuler l’hypertrophie ou la perte adipeuse sans surmenage du système nerveux central.',
      icon: LineChart,
    },
    {
      num: '03',
      title: 'Nutrition Fonctionnelle & Énergie Optimale',
      description:
        'Pas de régimes privatifs intenables. Nous créons un plan alimentaire adapté à votre vie sociale et professionnelle pour des résultats pérennes, avec apports caloriques et macronutriments ajustés.',
      icon: Apple,
    },
    {
      num: '04',
      title: 'Suivi Continu & Ajustements en Temps Réel',
      description:
        'Un débriefing hebdomadaire avec analyse de vos métriques (poids, mensurations, forme physique et sommeil). Oussema reste disponible 7j/7 pour vous corriger en vidéo et adapter votre séance.',
      icon: Smartphone,
    },
  ];

  return (
    <section id="methode" className="py-24 bg-neutral-900/40 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2">
            <span>Rigueur & Efficacité</span>
            <span aria-hidden="true">·</span>
            <span>4 Piliers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            La Méthode d'Entraînement Oussema Taleb
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Une approche globale qui concilie performance athlétique, longévité articulaire et plaisir de pratiquer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative p-6 rounded-2xl bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-amber-400 font-heading">
                      {step.num}
                    </span>
                    <div className="p-2 rounded-lg bg-neutral-900 text-neutral-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white uppercase tracking-tight mb-3">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
