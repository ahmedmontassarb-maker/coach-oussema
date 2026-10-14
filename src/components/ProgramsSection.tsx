import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProgramItem } from '../types';
import { AnimatedProgramIcon } from './AnimatedProgramIcon';
import { ProgramDetailModal } from './ProgramDetailModal';

interface Props {
  onSelectProgramForBooking: (programTitle: string) => void;
}

export const ProgramsSection: React.FC<Props> = ({ onSelectProgramForBooking }) => {
  const { programs } = useApp();
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const activePrograms = programs.filter((p) => p.active !== false);

  const categories = [
    { id: 'all', label: 'Tous les protocoles' },
    { id: 'Sèche & Métabolisme', label: 'Perte de poids / Sèche' },
    { id: 'Force & Volume', label: 'Prise de masse & Force' },
    { id: 'Exclusivité & Confort', label: 'Coaching VIP Privé' },
    { id: 'Athlétisme & Vitesse', label: 'Préparation physique' },
    { id: 'Santé & Vitalité', label: 'Posture & Santé' },
  ];

  const filteredPrograms =
    activeCategory === 'all'
      ? activePrograms
      : activePrograms.filter((p) => p.category === activeCategory);

  return (
    <section id="programmes" className="py-24 bg-neutral-950/75 backdrop-blur-sm border-t border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2">
              <span>Programmes Sur-Mesure</span>
              <span aria-hidden="true">·</span>
              <span>Sans Compromis</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Une Méthode Scientifique Adaptée à Vos Objectifs
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md leading-relaxed">
            Chaque athlète ou particulier bénéficie d'une programmation biomécanique individualisée. Aucune routine standardisée, que des protocoles calibrés.
          </p>
        </div>

        {/* Category Filters (Segmented control) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors border ${
                activeCategory === cat.id
                  ? 'bg-amber-400 text-neutral-950 border-amber-400'
                  : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((prog, index) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/90 hover:border-amber-400/40 transition-all duration-300"
            >
              <div>
                {/* Top card row: Animated Icon & Badge */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 group-hover:border-amber-400/30 transition-colors">
                    <AnimatedProgramIcon iconName={prog.iconName} size={28} />
                  </div>

                  <div className="flex items-center gap-2">
                    {prog.badge && (
                      <span className="text-[11px] font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {prog.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Category & Title */}
                <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
                  {prog.category}
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors mb-3">
                  {prog.title}
                </h3>

                {/* Short description */}
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {prog.shortDesc}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 border-t border-neutral-800/80 pt-4 mb-6">
                  {prog.highlights.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProgram(prog)}
                  className="text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>Détails & Protocole</span>
                  <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    onSelectProgramForBooking(prog.title);
                    const contactElem = document.getElementById('contact');
                    if (contactElem) {
                      contactElem.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors uppercase tracking-wider"
                >
                  Choisir
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Program Detail Modal */}
      <ProgramDetailModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onSelectProgramForBooking={onSelectProgramForBooking}
      />
    </section>
  );
};
