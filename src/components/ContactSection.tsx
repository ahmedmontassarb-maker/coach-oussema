import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, MessageCircle, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Props {
  selectedProgramTitle?: string;
}

export const ContactSection: React.FC<Props> = ({ selectedProgramTitle }) => {
  const { config, addMessage } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: selectedProgramTitle || 'Perte de Gras & Définition Athlétique',
    preferredFormat: 'Présentiel & Studio Privé',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // If selectedProgramTitle changes from parent, update goal
  React.useEffect(() => {
    if (selectedProgramTitle) {
      setFormData((prev) => ({ ...prev, goal: selectedProgramTitle }));
    }
  }, [selectedProgramTitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    addMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      goal: formData.goal,
      preferredFormat: formData.preferredFormat,
      message: formData.message || 'Demande de premier bilan offert.',
    });

    setIsSubmitted(true);
  };

  const whatsappDirectUrl = `https://wa.me/${config.whatsappRaw}?text=${encodeURIComponent(
    `Bonjour Oussema, je m'appelle ${formData.name || 'un prospect'}. Mon objectif est : ${formData.goal}. Pouvons-nous fixer un premier appel ?`
  )}`;

  return (
    <section id="contact" className="py-24 bg-neutral-950/75 backdrop-blur-sm border-t border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2">
                <span>Passer à l'Action</span>
                <span aria-hidden="true">·</span>
                <span>Premier Bilan Offert</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mb-6">
                Prêt à Construire le Physique que Vous Méritez ?
              </h2>

              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Remplissez le formulaire pour planifier votre consultation initiale confidentielle. Nous ferons le point sur votre point de départ, vos contraintes et la stratégie la plus efficiente.
              </p>

              {/* Verified Contact Details Cards */}
              <div className="space-y-4">
                <a
                  href={`https://wa.me/${config.whatsappRaw}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-emerald-500/50 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-emerald-950/70 text-emerald-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block">WhatsApp direct Coach</span>
                    <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {config.whatsappNumber}
                    </span>
                  </div>
                </a>

                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-pink-500/50 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-pink-950/70 text-pink-400 group-hover:scale-105 transition-transform">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block">Instagram officiel</span>
                    <span className="text-sm font-bold text-white group-hover:text-pink-400 transition-colors">
                      @oussamatalb1
                    </span>
                  </div>
                </a>

                <a
                  href={config.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-blue-500/50 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-blue-950/70 text-blue-400 group-hover:scale-105 transition-transform">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block">Facebook officiel</span>
                    <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                      Oussama Taleb
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
                  <div className="p-3 rounded-lg bg-amber-400/10 text-amber-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block">Rayon d'intervention</span>
                    <span className="text-sm font-semibold text-neutral-200">
                      {config.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 text-xs text-neutral-500">
              Réponse garantie sous 24 heures ouvrées. Données protégées.
            </div>
          </div>

          {/* Right Column: Interactive Consultation Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-2xl relative">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-400 mb-2">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                    Demande de Bilan Reçue !
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Merci {formData.name}, votre demande a bien été transmise à Oussema Taleb. Vous serez contacté très rapidement pour confirmer votre créneau.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Accélérer sur WhatsApp</span>
                    </a>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          goal: 'Perte de Gras & Définition Athlétique',
                          preferredFormat: 'Présentiel & Studio Privé',
                          message: '',
                        });
                      }}
                      className="px-6 py-3 text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-800 rounded-lg transition-colors"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-neutral-800 pb-4 mb-4">
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                      Demander un Bilan Personnalisé
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Sans engagement financier préalable. Échange direct avec votre coach.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Alexandre Martin"
                        className="w-full px-3.5 py-2.5 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Téléphone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Ex: +33 6 12 34 56 78"
                        className="w-full px-3.5 py-2.5 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Adresse Email (optionnel)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alexandre@exemple.fr"
                      className="w-full px-3.5 py-2.5 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Objectif Prioritaire
                      </label>
                      <select
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="Perte de Gras & Définition Athlétique">Perte de Gras & Définition</option>
                        <option value="Hypertrophie & Prise de Masse">Hypertrophie & Prise de Masse</option>
                        <option value="Coaching Privé VIP Domicile">Coaching Privé VIP Domicile</option>
                        <option value="Préparation Physique & Puissance">Préparation Physique Athlétique</option>
                        <option value="Remise en Forme & Posture / Dos">Remise en Forme & Posture</option>
                        <option value="Nutrition & Micronutrition">Nutrition & Micronutrition</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Format Souhaité
                      </label>
                      <select
                        value={formData.preferredFormat}
                        onChange={(e) => setFormData({ ...formData, preferredFormat: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="Présentiel & Studio Privé">Présentiel & Studio Privé</option>
                        <option value="Coaching à Domicile VIP">Coaching à Domicile VIP</option>
                        <option value="Suivi en Ligne / Hybride">Suivi en Ligne / Hybride</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Vos disponibilités ou précisions
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Indiquez vos créneaux préférés (matin, midi, soir) et toute information utile..."
                      className="w-full px-3.5 py-2.5 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 resize-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>Envoyer Ma Demande de Bilan</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
