import { SiteConfig, ProgramItem, TestimonialItem, ContactMessage, VideoPreset } from '../types';

export const VIDEO_PRESETS: VideoPreset[] = [
  {
    id: 'workout-power',
    name: 'Musculation & Force Pure (Haute Définition)',
    url: '/videos/hero_workout.mp4',
    description: 'Entraînement intense de musculation et levage en studio athlétique.',
  },
  {
    id: 'workout-conditioning',
    name: 'Conditioning & Cardio Explosif',
    url: '/videos/hero_workout_2.mp4',
    description: 'Séance de condition physique, endurance et maîtrise corporelle.',
  },
  {
    id: 'barbell-training',
    name: 'Haltérophilie & Barres Olympiques',
    url: 'https://videos.pexels.com/video-files/855828/855828-hd_1920_1080_30fps.mp4',
    description: 'Squat, soulevé de terre et force athlétique maximale.',
  },
  {
    id: 'functional-movement',
    name: 'Mouvements Fonctionnels & Posture',
    url: 'https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4',
    description: 'Biomécanique, gainage profond et mobilité articulaire.',
  },
];

export const INITIAL_CONFIG: SiteConfig = {
  coachName: 'Oussema Taleb',
  title: 'Coach Sportif Privé & Préparateur Physique',
  experienceYears: 8,
  heroHeadline: 'DÉPASSEZ VOS LIMITES. FORGEZ VOTRE MEILLEURE VERSION.',
  heroSubtitle: 'Accompagnement d’élite sur-mesure combinant biomécanique, intensité et nutrition de précision. Sans compromis, axé à 100% sur vos résultats.',
  heroVideoUrl: '/videos/hero_workout.mp4',
  heroVideoPoster: '/src/assets/images/gym_hero_cinematic_1791994505068.jpg',
  videoOverlayDarkness: 35,
  instagramUrl: 'https://www.instagram.com/oussamatalb1/',
  facebookUrl: 'https://web.facebook.com/oussama.taleb.543179',
  whatsappNumber: '+33 6 70 84 27 89',
  whatsappRaw: '33670842789',
  email: 'oussemataleb.coaching@gmail.com',
  location: 'Paris & Île-de-France · Coaching en Ligne International',
  bioText: 'Coach certifié et préparateur physique passionné, j’accompagne sportifs de haut niveau, entrepreneurs et particuliers exigeants vers l’accomplissement de leur transformation physique. Chaque programme est méticuleusement calibré selon votre profil anatomique, vos contraintes d’emploi du temps et vos ambitions.',
  coachPhotoUrl: '/src/assets/images/coach_oussema_portrait_1791994505734.jpg',
};


export const INITIAL_PROGRAMS: ProgramItem[] = [
  {
    id: 'perte-de-poids',
    title: 'Perte de Gras & Définition Athlétique',
    category: 'Sèche & Métabolisme',
    shortDesc: 'Un protocole intensif combinant déficit calorique intelligent, stimulation métabolique et préservation maximale de la masse musculaire.',
    detailedDesc: 'Programme complet axé sur l’oxydation des graisses tenaces. Analyse corporelle initiale, plan nutritionnel personnalisé avec ajustements hebdomadaires, circuits métaboliques HIIT ciblés et renforcement postural.',
    iconName: 'Flame',
    highlights: [
      'Bilan morpho-anatomique complet',
      'Stratégie de déficit sans frustration',
      'Boost du métabolisme de base',
      'Suivi biométrique hebdomadaire'
    ],
    targetAudience: 'Personnes souhaitant perdre du ventre, dessiner leur silhouette ou sculpter leurs abdos.',
    format: 'Présentiel & En Ligne',
    badge: 'Populaire',
    active: true,
  },
  {
    id: 'prise-de-masse',
    title: 'Hypertrophie & Prise de Masse Maigre',
    category: 'Force & Volume',
    shortDesc: 'Développement musculaire optimisé par la surcharge progressive, la tension mécanique et une nutrition anabolique calibrée.',
    detailedDesc: 'Conçu pour briser vos paliers de stagnation. Programmation des cycles de force et d’hypertrophie, optimisation des temps sous tension, correction technique millimétrée de chaque mouvement.',
    iconName: 'Dumbbell',
    highlights: [
      'Planification de surcharge progressive',
      'Optimisation des macronutriments',
      'Correction biomécanique en vidéo',
      'Protocoles de récupération musculaire'
    ],
    targetAudience: 'Athlètes et pratiquants voulant prendre du volume musculaire sec sans gras superflu.',
    format: 'Présentiel & Studio Privé',
    badge: 'Performance',
    active: true,
  },
  {
    id: 'coaching-prive-vip',
    title: 'Coaching Privé VIP à Domicile & Studio',
    category: 'Exclusivité & Confort',
    shortDesc: 'Séances individuelles exclusives à votre domicile, en salle privée ou en extérieur avec matériel professionnel fourni.',
    detailedDesc: 'L’expérience ultime du coaching sur-mesure. Flexibilité horaire totale, correction posturale en temps réel, écoute active et motivation sans faille pour un confort de pratique maximal.',
    iconName: 'Trophy',
    highlights: [
      'Déplacement avec matériel haut de gamme',
      'Créneaux horaires flexibles et prioritaires',
      'Attention 100% dédiée à chaque répétition',
      'Discrétion et confidentialité garanties'
    ],
    targetAudience: 'Dirigeants, personnalités et personnes actives recherchant gain de temps et suivi d’exception.',
    format: 'Présentiel exclusif',
    badge: 'Haut de Gamme',
    active: true,
  },
  {
    id: 'preparation-physique',
    title: 'Préparation Physique & Puissance Sportive',
    category: 'Athlétisme & Vitesse',
    shortDesc: 'Amélioration de l’explosivité, de l’endurance de vitesse et de la résistance spécifique à votre discipline sportive.',
    detailedDesc: 'Préparation ciblée pour footballeurs, sports de combat, coureurs ou compétiteurs. Travail pliométrique, mobilité articulaire dynamique, prévention des blessures musculaires et tendineuses.',
    iconName: 'Zap',
    highlights: [
      'Tests de détente verticale et de sprint',
      'Conditioning anaérobie lactique',
      'Renforcement des chaînes posturales',
      'Prévention avancée des blessures'
    ],
    targetAudience: 'Sportifs de club, compétiteurs et athlètes visant l’excellence en compétition.',
    format: 'Hybride / Sur Terrain',
    badge: 'Compétition',
    active: true,
  },
  {
    id: 'remise-en-forme-posture',
    title: 'Remise en Forme, Mobilité & Santé du Dos',
    category: 'Santé & Vitalité',
    shortDesc: 'Retrouvez votre énergie quotidienne, soulagez les douleurs de sédentarité et renforcez votre gainage profond.',
    detailedDesc: 'Approche fonctionnelle douce et progressive. Re-programmation du schéma moteur, renforcement des muscles spinaux et du transverse, assouplissements pour libérer les tensions cervicales et lombaires.',
    iconName: 'HeartPulse',
    highlights: [
      'Dégagement des tensions articulaires',
      'Gainage profond et transverse',
      'Travail respiratoire et décompression',
      'Énergie et endurance quotidienne'
    ],
    targetAudience: 'Personnes sédentaires, reprise après arrêt prolongé ou douleurs chroniques de bureau.',
    format: 'Présentiel & En Ligne',
    badge: 'Santé',
    active: true,
  },
  {
    id: 'suivi-nutritionnel',
    title: 'Nutrition Sur-Mesure & Micronutrition',
    category: 'Diététique & Habitudes',
    shortDesc: 'Un plan alimentaire personnalisé basé sur vos goûts, votre métabolisme et votre rythme de vie, sans régimes drastiques.',
    detailedDesc: 'Aucune diète restrictive intenable. Nous construisons une stratégie nutritionnelle durable intégrant vos repas sociaux, la chrononutrition et la supplémentation ciblée pour maximiser votre énergie.',
    iconName: 'Apple',
    highlights: [
      'Calcul précis de vos besoins énergétiques',
      'Fiches recettes saines et savoureuses',
      'Gestion des sorties et repas extérieurs',
      'Ajustements continus selon vos progrès'
    ],
    targetAudience: 'Toute personne voulant optimiser son assiette pour des résultats pérennes et sains.',
    format: 'En Ligne & Débriefing hebdo',
    badge: 'Essentiel',
    active: true,
  },
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Karim B.',
    role: 'Chef d’entreprise, 34 ans',
    program: 'Perte de Gras & Définition',
    rating: 5,
    review: 'Oussema a complètement changé mon rapport au sport. Avec mes journées de 12 heures, je pensais impossible de perdre du poids. En 5 mois de suivi rigoureux, j’ai perdu 13 kilos tout en augmentant ma force et mon énergie mentale.',
    achievement: '-13 kg & silhouette athlétique',
    avatar: '/src/assets/images/client_transformation_1_1791994505646.jpg',
    date: 'Il y a 3 semaines',
    featured: true,
  },
  {
    id: 'test-2',
    name: 'Sophie M.',
    role: 'Architecte d’intérieur, 29 ans',
    program: 'Remise en Forme & Posture',
    rating: 5,
    review: 'Je souffrais de maux de dos chroniques dus à mon travail sédentaire. Le coaching d’Oussema est ultra précis sur la biomécanique. Aujourd’hui, zéro douleur, une posture redressée et un tonus musculaire que je n’avais jamais eu auparavant.',
    achievement: 'Zéro douleur dorsale & tonus retrouvé',
    avatar: '/src/assets/images/client_transformation_2_1791994506018.jpg',
    date: 'Il y a 1 mois',
    featured: true,
  },
  {
    id: 'test-3',
    name: 'Mehdi L.',
    role: 'Consultant Financier, 27 ans',
    program: 'Hypertrophie & Force',
    rating: 5,
    review: 'J’ai testé des dizaines d’applications et de programmes gratuits sans jamais prendre un gramme de muscle. Grâce à la programmation d’Oussema et son plan nutritionnel calibré, j’ai pris 6,5 kg de muscle sec en 6 mois. Un vrai pro exigeant et bienveillant.',
    achievement: '+6.5 kg de masse maigre',
    avatar: '/src/assets/images/coach_oussema_portrait_1791994505734.jpg',
    date: 'Il y a 2 mois',
    featured: true,
  },
];

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Yassine D.',
    email: 'yassine.d@gmail.com',
    phone: '+33 6 12 34 56 78',
    goal: 'Perte de poids et gain d’endurance',
    preferredFormat: 'Présentiel Paris',
    message: 'Bonjour Oussema, je souhaite démarrer un programme sérieux dès le mois prochain. J’ai environ 10 kg à perdre et je veux retrouver une vraie condition physique.',
    date: 'Aujourd’hui à 11:20',
    status: 'nouveau',
  },
  {
    id: 'msg-2',
    name: 'Élodie R.',
    email: 'elodie.reynaud@orange.fr',
    phone: '+33 7 89 01 23 45',
    goal: 'Remise en forme post-partum & renforcement',
    preferredFormat: 'Coaching VIP à Domicile',
    message: 'Bonjour coach, je recherche des séances à domicile deux fois par semaine en matinée. Pouvez-vous me recontacter pour faire le point sur vos disponibilités ?',
    date: 'Hier à 16:45',
    status: 'contacte',
  },
];
