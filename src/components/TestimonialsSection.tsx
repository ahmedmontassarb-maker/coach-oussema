import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Quote, Plus, CheckCircle2, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TestimonialsSection: React.FC = () => {
  const { testimonials, addTestimonial } = useApp();
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    program: 'Perte de Gras & Définition Athlétique',
    rating: 5,
    achievement: '',
    review: '',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.review) return;

    addTestimonial({
      name: formData.name,
      role: formData.role || 'Client Privé',
      program: formData.program,
      rating: formData.rating,
      achievement: formData.achievement || 'Objectif atteint avec succès',
      review: formData.review,
      avatar: '/src/assets/images/client_transformation_1_1791994505646.jpg',
      date: 'Récemment',
      featured: true,
    });

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitOpen(false);
      setFormData({
        name: '',
        role: '',
        program: 'Perte de Gras & Définition Athlétique',
        rating: 5,
        achievement: '',
        review: '',
      });
    }, 1800);
  };

  return (
    <section id="temoignages" className="py-24 bg-neutral-900/30 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2">
              <span>Résultats Concrets</span>
              <span aria-hidden="true">·</span>
              <span>100% Vérifiés</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Ce que Disent les Clients d'Oussema
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1 text-amber-400 text-sm">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
              <span className="ml-2 font-bold text-white tabular-nums">5.0 / 5</span>
              <span className="text-xs text-neutral-400">sur 45+ suivis</span>
            </div>

            <button
              onClick={() => setIsSubmitOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Laisser un avis</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative p-6 rounded-2xl bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 flex flex-col justify-between transition-colors shadow-lg"
            >
              <div>
                {/* Rating & Achievement badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                    {item.achievement}
                  </span>
                </div>

                {/* Review Quote */}
                <p className="text-neutral-300 text-sm leading-relaxed mb-6 italic">
                  "{item.review}"
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-neutral-800/70">
                <img
                  src={item.avatar}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-amber-400/30 shrink-0"
                />
                <div className="overflow-hidden">
                  <h4 className="text-sm font-bold text-white truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-neutral-400 truncate">
                    {item.role}
                  </p>
                  <p className="text-[11px] text-amber-400 font-medium truncate">
                    {item.program}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leave Testimonial Modal */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {submitSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-lg font-bold text-white uppercase">
                  Merci pour votre retour !
                </h3>
                <p className="text-xs text-neutral-400">
                  Votre témoignage a été ajouté avec succès.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                    Partager Votre Expérience
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsSubmitOpen(false)}
                    className="text-neutral-400 hover:text-white text-xs uppercase"
                  >
                    Fermer
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Votre Nom ou Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Thomas M."
                    className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Votre Activité / Âge
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Ex: Avocat, 36 ans"
                    className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Programme suivi
                    </label>
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Perte de Gras & Définition">Perte de Gras & Définition</option>
                      <option value="Hypertrophie & Masse">Hypertrophie & Masse</option>
                      <option value="Coaching VIP à Domicile">Coaching VIP à Domicile</option>
                      <option value="Préparation Physique">Préparation Physique</option>
                      <option value="Remise en Forme & Dos">Remise en Forme & Dos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Résultat marquant
                    </label>
                    <input
                      type="text"
                      value={formData.achievement}
                      onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                      placeholder="Ex: -8 kg en 3 mois"
                      className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Note
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-neutral-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Votre Avis Détaillé *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    placeholder="Décrivez votre expérience avec Oussema et les changements constatés..."
                    className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                  >
                    Publier l'avis
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
