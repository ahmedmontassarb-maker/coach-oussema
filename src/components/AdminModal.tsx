import React, { useState, useRef } from 'react';
import {
  X,
  Lock,
  LogOut,
  Video,
  Dumbbell,
  MessageSquare,
  Star,
  Settings,
  Check,
  Trash2,
  Edit2,
  Plus,
  Phone,
  RefreshCw,
  Eye,
  EyeOff,
  Upload,
  Image as ImageIcon,
  HardDrive,
  FileVideo,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VIDEO_PRESETS } from '../data/initialData';
import { ProgramItem, IconType, TestimonialItem } from '../types';
import { AnimatedProgramIcon } from './AnimatedProgramIcon';
import { fileToDataUrl } from '../utils/mediaStorage';

export const AdminModal: React.FC = () => {
  const {
    config,
    programs,
    testimonials,
    messages,
    isAdminOpen,
    isAdminLoggedIn,
    closeAdmin,
    loginAdmin,
    logoutAdmin,
    updateConfig,
    uploadCustomVideo,
    uploadCoachPhoto,
    uploadHeroPoster,
    resetCustomMedia,
    addProgram,
    updateProgram,
    deleteProgram,
    addTestimonial,
    deleteTestimonial,
    updateMessageStatus,
    deleteMessage,
    resetAllData,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'video' | 'media' | 'programs' | 'messages' | 'testimonials' | 'coords'>('video');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveToast, setSaveToast] = useState('');

  // Video Tab State
  const [videoUrl, setVideoUrl] = useState(config.heroVideoUrl);
  const [videoDarkness, setVideoDarkness] = useState(config.videoOverlayDarkness || 65);
  const [heroHeadline, setHeroHeadline] = useState(config.heroHeadline);
  const [heroSubtitle, setHeroSubtitle] = useState(config.heroSubtitle);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [isUploadingCoachPhoto, setIsUploadingCoachPhoto] = useState(false);
  const [isUploadingPoster, setIsUploadingPoster] = useState(false);

  React.useEffect(() => {
    if (config.heroVideoUrl) {
      setVideoUrl(config.heroVideoUrl);
    }
  }, [config.heroVideoUrl]);

  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const coachPhotoInputRef = useRef<HTMLInputElement>(null);
  const posterInputRef = useRef<HTMLInputElement>(null);
  const testimonialPhotoInputRef = useRef<HTMLInputElement>(null);

  // Program Editor State
  const [editingProgram, setEditingProgram] = useState<ProgramItem | null>(null);
  const [isNewProgramOpen, setIsNewProgramOpen] = useState(false);
  const [newProgramData, setNewProgramData] = useState<Omit<ProgramItem, 'id'>>({
    title: '',
    category: 'Force & Volume',
    shortDesc: '',
    detailedDesc: '',
    iconName: 'Dumbbell',
    highlights: ['Bilan initial personnalisé', 'Suivi biomécanique', 'Programme nutritionnel'],
    targetAudience: 'Tout pratiquant motivé',
    format: 'Présentiel & En Ligne',
    badge: 'Nouveau',
    active: true,
  });

  // Testimonial State
  const [newTestimonial, setNewTestimonial] = useState<Omit<TestimonialItem, 'id'>>({
    name: '',
    role: '',
    program: 'Perte de Gras & Définition Athlétique',
    rating: 5,
    achievement: '',
    review: '',
    avatar: '/src/assets/images/client_transformation_1_1791994505646.jpg',
    date: 'Récemment',
    featured: true,
  });
  const [isNewTestimonialOpen, setIsNewTestimonialOpen] = useState(false);

  // Coordinates State
  const [coordsData, setCoordsData] = useState({
    instagramUrl: config.instagramUrl,
    facebookUrl: config.facebookUrl,
    whatsappNumber: config.whatsappNumber,
    whatsappRaw: config.whatsappRaw,
    location: config.location,
    bioText: config.bioText,
  });

  if (!isAdminOpen) return null;

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput);
    if (success) {
      setLoginError(false);
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  const handleSaveVideo = () => {
    updateConfig({
      heroVideoUrl: videoUrl,
      videoOverlayDarkness: Number(videoDarkness),
      heroHeadline,
      heroSubtitle,
    });
    triggerToast('Paramètres vidéo et en-tête enregistrés !');
  };

  const handleSelectPreset = (url: string) => {
    setVideoUrl(url);
    updateConfig({
      heroVideoUrl: url,
      customVideoFileName: undefined,
    });
    triggerToast('Vidéo présélectionnée appliquée au site !');
  };

  // Upload video from local PC
  const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingVideo(true);
      const url = await uploadCustomVideo(file);
      setVideoUrl(url);
      triggerToast(`Vidéo "${file.name}" importée depuis votre PC et active !`);
    } catch (err) {
      console.error(err);
      alert('Erreur lors du chargement de la vidéo depuis votre PC.');
    } finally {
      setIsUploadingVideo(false);
      if (videoFileInputRef.current) {
        videoFileInputRef.current.value = '';
      }
    }
  };

  // Upload Coach Photo from local PC
  const handleCoachPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingCoachPhoto(true);
      await uploadCoachPhoto(file);
      triggerToast(`Photo du Coach "${file.name}" importée avec succès !`);
    } catch (err) {
      console.error(err);
      alert('Erreur lors du chargement de la photo du coach.');
    } finally {
      setIsUploadingCoachPhoto(false);
      if (coachPhotoInputRef.current) {
        coachPhotoInputRef.current.value = '';
      }
    }
  };

  // Upload Poster / Fallback Hero Image from local PC
  const handlePosterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingPoster(true);
      await uploadHeroPoster(file);
      triggerToast(`Image de fond / poster "${file.name}" importée avec succès !`);
    } catch (err) {
      console.error(err);
      alert('Erreur lors du chargement de l’image de fond.');
    } finally {
      setIsUploadingPoster(false);
      if (posterInputRef.current) {
        posterInputRef.current.value = '';
      }
    }
  };

  // Upload Testimonial Avatar from PC
  const handleTestimonialPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await fileToDataUrl(file);
      setNewTestimonial((prev) => ({ ...prev, avatar: dataUrl }));
      triggerToast('Photo du client importée depuis votre PC !');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveCoords = () => {
    updateConfig(coordsData);
    triggerToast('Coordonnées et réseaux sociaux mis à jour !');
  };

  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgramData.title || !newProgramData.shortDesc) return;
    addProgram(newProgramData);
    setIsNewProgramOpen(false);
    setNewProgramData({
      title: '',
      category: 'Force & Volume',
      shortDesc: '',
      detailedDesc: '',
      iconName: 'Dumbbell',
      highlights: ['Bilan morpho-anatomique', 'Plan nutritionnel', 'Suivi hebdomadaire'],
      targetAudience: 'Athlètes et particuliers',
      format: 'Présentiel & En Ligne',
      badge: 'Nouveau',
      active: true,
    });
    triggerToast('Nouveau programme ajouté avec succès !');
  };

  const handleUpdateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram) return;
    updateProgram(editingProgram.id, editingProgram);
    setEditingProgram(null);
    triggerToast('Programme mis à jour avec succès !');
  };

  const handleCreateTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.review) return;
    addTestimonial(newTestimonial);
    setIsNewTestimonialOpen(false);
    triggerToast('Témoignage ajouté !');
  };

  const unreadMessagesCount = messages.filter((m) => m.status === 'nouveau').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Espace Administration · Coach {config.coachName}
              </h2>
              <p className="text-[11px] text-neutral-400">
                Gestion en temps réel de votre site et importation de fichiers depuis votre PC
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 flex items-center gap-1.5 transition-colors"
                title="Se déconnecter"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            )}
            <button
              onClick={closeAdmin}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Fermer le panneau d'administration"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback Toast */}
        {saveToast && (
          <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-6 py-2.5 text-xs font-semibold text-emerald-300 flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* Content Area: Login Screen vs Dashboard */}
        {!isAdminLoggedIn ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto text-center">
            <div className="p-4 rounded-full bg-neutral-800 text-amber-400 mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2">
              Accès Réservé au Coach
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Veuillez saisir votre mot de passe d'administration sécurisé pour accéder aux commandes en temps réel.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setLoginError(false);
                  }}
                  placeholder="Entrez votre mot de passe"
                  className={`w-full px-4 py-3 text-sm bg-neutral-950 border rounded-lg text-white placeholder-neutral-500 pr-10 focus:outline-none transition-colors ${
                    loginError
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-neutral-800 focus:border-amber-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-neutral-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {loginError && (
                <p className="text-xs text-red-400 text-left font-medium">
                  Mot de passe incorrect. Veuillez réessayer.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-lg"
              >
                Déverrouiller l'administration
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-neutral-950 border-r border-neutral-800 p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('video')}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-colors text-left ${
                  activeTab === 'video'
                    ? 'bg-amber-400 text-neutral-950'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Vidéo d'Accueil (PC & Web)</span>
              </button>

              <button
                onClick={() => setActiveTab('media')}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-colors text-left ${
                  activeTab === 'media'
                    ? 'bg-amber-400 text-neutral-950'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Photos & Images (PC)</span>
              </button>

              <button
                onClick={() => setActiveTab('programs')}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-colors text-left ${
                  activeTab === 'programs'
                    ? 'bg-amber-400 text-neutral-950'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Dumbbell className="w-4 h-4" />
                <span>Programmes ({programs.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between whitespace-nowrap transition-colors text-left ${
                  activeTab === 'messages'
                    ? 'bg-amber-400 text-neutral-950'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages Reçus</span>
                </div>
                {unreadMessagesCount > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    activeTab === 'messages' ? 'bg-neutral-950 text-amber-400' : 'bg-amber-500 text-neutral-950'
                  }`}>
                    {unreadMessagesCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('testimonials')}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-colors text-left ${
                  activeTab === 'testimonials'
                    ? 'bg-amber-400 text-neutral-950'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Star className="w-4 h-4" />
                <span>Témoignages ({testimonials.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('coords')}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-colors text-left ${
                  activeTab === 'coords'
                    ? 'bg-amber-400 text-neutral-950'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Coordonnées & Réseaux</span>
              </button>
            </div>

            {/* Main Tab Panel Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* TAB 1: Real-Time Background Video Customizer (PC File + Presets + Custom URL) */}
              {activeTab === 'video' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-tight flex items-center gap-2">
                      <FileVideo className="w-5 h-5 text-amber-400" />
                      <span>Changer la Vidéo d'Arrière-Plan (Depuis votre PC ou en ligne)</span>
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Téléchargez directement une vidéo MP4 depuis votre ordinateur ou choisissez parmi les vidéos d'entraînement haute définition.
                    </p>
                  </div>

                  {/* PC Video File Upload Box (Requested Feature) */}
                  <div className="p-5 rounded-2xl bg-amber-400/5 border-2 border-dashed border-amber-400/30 hover:border-amber-400/60 transition-colors">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400 shrink-0">
                          <Upload className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            Importer une vidéo depuis votre PC
                          </h4>
                          <p className="text-xs text-neutral-400">
                            Prend en charge les formats <span className="text-amber-400 font-mono">.mp4</span>, <span className="text-amber-400 font-mono">.webm</span>, <span className="text-amber-400 font-mono">.mov</span>. Sauvegardée en mémoire locale.
                          </p>
                          {config.customVideoFileName && (
                            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
                              <Check className="w-3.5 h-3.5" />
                              Fichier PC actif : {config.customVideoFileName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <input
                          ref={videoFileInputRef}
                          type="file"
                          accept="video/mp4,video/webm,video/quicktime,video/*"
                          onChange={handleVideoFileChange}
                          className="hidden"
                          id="pc-video-input"
                        />
                        <label
                          htmlFor="pc-video-input"
                          className={`w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md ${
                            isUploadingVideo ? 'opacity-50 pointer-events-none' : ''
                          }`}
                        >
                          <HardDrive className="w-4 h-4" />
                          <span>{isUploadingVideo ? 'Chargement...' : 'Parcourir mon PC'}</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Video Live Preview Box */}
                  <div className="relative aspect-video max-h-56 rounded-xl overflow-hidden bg-black border border-neutral-800 shadow-inner">
                    <video
                      key={videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      src={videoUrl}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-neutral-950 pointer-events-none"
                      style={{ opacity: videoDarkness / 100 }}
                    />
                    <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-semibold text-amber-400 border border-neutral-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Aperçu de la vidéo active</span>
                    </div>
                  </div>

                  {/* Curated Fitness Video Presets */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                      Ou Sélectionner une Vidéo Haute Définition Intégrée
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {VIDEO_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleSelectPreset(preset.url)}
                          className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            videoUrl === preset.url && !config.customVideoFileName
                              ? 'bg-neutral-800 border-amber-400 text-white'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-white">
                              {preset.name}
                            </span>
                            {videoUrl === preset.url && !config.customVideoFileName && (
                              <Check className="w-3.5 h-3.5 text-amber-400" />
                            )}
                          </div>
                          <p className="text-[11px] text-neutral-400">
                            {preset.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom URL Input */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                      Ou Saisir une URL Vidéo MP4 Web
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://exemple.com/video-coaching.mp4"
                        className="flex-1 px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={handleSaveVideo}
                        className="px-4 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap uppercase tracking-wider"
                      >
                        Appliquer
                      </button>
                    </div>
                  </div>

                  {/* Video Dark Overlay Slider */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                        Opacité du voile sombre (Contraste du texte)
                      </span>
                      <span className="text-xs font-bold text-amber-400 tabular-nums">
                        {videoDarkness}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="90"
                      value={videoDarkness}
                      onChange={(e) => setVideoDarkness(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  {/* Hero Headline & Subtitle */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                        Titre Principal de la Page d'Accueil
                      </label>
                      <input
                        type="text"
                        value={heroHeadline}
                        onChange={(e) => setHeroHeadline(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                        Sous-Titre de Présentation (Sans mention de prix)
                      </label>
                      <textarea
                        rows={2}
                        value={heroSubtitle}
                        onChange={(e) => setHeroSubtitle(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400 resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleSaveVideo}
                      className="w-full py-3 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Enregistrer les Changements Vidéo & En-tête</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: Media & Images from PC (Requested Feature) */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-tight flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-amber-400" />
                      <span>Changer les Images et Photos depuis votre PC</span>
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Sélectionnez vos propres photos depuis votre ordinateur pour remplacer l'image de profil du coach et le fond de la page.
                    </p>
                  </div>

                  {/* 1. Coach Portrait Photo from PC */}
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={config.coachPhotoUrl || '/src/assets/images/coach_oussema_portrait_1791994505734.jpg'}
                          alt="Photo actuelle du Coach Oussema"
                          referrerPolicy="no-referrer"
                          className="w-20 h-24 object-cover object-top rounded-xl border border-amber-400/40 shadow-lg"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            Photo de Profil du Coach Oussema
                          </h4>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            Affichée dans la section "À Propos" et la carte d'expertise.
                          </p>
                          <span className="text-[11px] text-amber-400 font-medium block mt-1">
                            Format idéal : Portrait (3:4 ou carré), JPG / PNG
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                        <input
                          ref={coachPhotoInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleCoachPhotoChange}
                          className="hidden"
                          id="pc-coach-photo"
                        />
                        <label
                          htmlFor="pc-coach-photo"
                          className={`w-full sm:w-auto px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-2 ${
                            isUploadingCoachPhoto ? 'opacity-50 pointer-events-none' : ''
                          }`}
                        >
                          <Upload className="w-4 h-4" />
                          <span>{isUploadingCoachPhoto ? 'Importation...' : 'Changer depuis mon PC'}</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => {
                            updateConfig({
                              coachPhotoUrl: '/src/assets/images/coach_oussema_portrait_1791994505734.jpg',
                            });
                            triggerToast('Photo de base restaurée');
                          }}
                          className="w-full sm:w-auto px-3 py-2.5 text-xs text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                        >
                          Rétablir
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 2. Hero Fallback / Poster Image from PC */}
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={config.heroVideoPoster}
                          alt="Poster actuel"
                          referrerPolicy="no-referrer"
                          className="w-28 h-20 object-cover rounded-xl border border-neutral-700 shadow-lg"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            Image de Fond / Poster de la Page d'Accueil
                          </h4>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            Image affichée pendant le chargement de la vidéo ou sur les appareils à économie d'énergie.
                          </p>
                          <span className="text-[11px] text-amber-400 font-medium block mt-1">
                            Format idéal : Paysage (16:9), JPG / PNG
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                        <input
                          ref={posterInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handlePosterChange}
                          className="hidden"
                          id="pc-poster-photo"
                        />
                        <label
                          htmlFor="pc-poster-photo"
                          className={`w-full sm:w-auto px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-2 ${
                            isUploadingPoster ? 'opacity-50 pointer-events-none' : ''
                          }`}
                        >
                          <Upload className="w-4 h-4" />
                          <span>{isUploadingPoster ? 'Importation...' : 'Changer depuis mon PC'}</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => {
                            updateConfig({
                              heroVideoPoster: '/src/assets/images/gym_hero_cinematic_1791994505068.jpg',
                            });
                            triggerToast('Image de fond de base restaurée');
                          }}
                          className="w-full sm:w-auto px-3 py-2.5 text-xs text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                        >
                          Rétablir
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Informational Guidance Box */}
                  <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800/80 text-xs text-neutral-400 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-neutral-200">
                        Stockage persistant direct sur votre navigateur :
                      </p>
                      <p className="mt-1 leading-relaxed">
                        Toutes les photos et vidéos chargées depuis votre PC sont conservées dans la base de données locale sécurisée de votre navigateur (IndexedDB). Vos personnalisations restent actives même après rechargement de la page.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Coaching Programs & Sports Activities */}
              {activeTab === 'programs' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white uppercase tracking-tight">
                        Activités & Programmes Sportifs
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">
                        Ajoutez, modifiez ou masquez vos formules de coaching privé et leurs icônes animées.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsNewProgramOpen(true)}
                      className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nouvelle Activité</span>
                    </button>
                  </div>

                  {/* List of Programs */}
                  <div className="space-y-3">
                    {programs.map((prog) => (
                      <div
                        key={prog.id}
                        className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                            <AnimatedProgramIcon iconName={prog.iconName} size={22} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white uppercase">
                                {prog.title}
                              </h4>
                              {prog.badge && (
                                <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                                  {prog.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-neutral-400 line-clamp-1">
                              {prog.shortDesc}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setEditingProgram(prog)}
                            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                            title="Modifier"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Supprimer le programme "${prog.title}" ?`)) {
                                deleteProgram(prog.id);
                                triggerToast('Programme supprimé');
                              }
                            }}
                            className="p-2 text-neutral-400 hover:text-red-400 rounded-lg hover:bg-neutral-800 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Modal to Add New Program */}
                  {isNewProgramOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
                      <div className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4">
                        <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                          <h4 className="text-sm font-bold text-white uppercase">
                            Ajouter un Programme Sportif
                          </h4>
                          <button
                            onClick={() => setIsNewProgramOpen(false)}
                            className="text-neutral-400 hover:text-white text-xs"
                          >
                            Fermer
                          </button>
                        </div>

                        <form onSubmit={handleCreateProgram} className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-neutral-300 mb-1">
                              Nom du programme *
                            </label>
                            <input
                              type="text"
                              required
                              value={newProgramData.title}
                              onChange={(e) =>
                                setNewProgramData({ ...newProgramData, title: e.target.value })
                              }
                              placeholder="Ex: Cardio HIIT & Abdos Express"
                              className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                                Catégorie
                              </label>
                              <input
                                type="text"
                                value={newProgramData.category}
                                onChange={(e) =>
                                  setNewProgramData({ ...newProgramData, category: e.target.value })
                                }
                                className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                                Icône Animée
                              </label>
                              <select
                                value={newProgramData.iconName}
                                onChange={(e) =>
                                  setNewProgramData({
                                    ...newProgramData,
                                    iconName: e.target.value as IconType,
                                  })
                                }
                                className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                              >
                                <option value="Flame">Flame (Brûleur de graisse)</option>
                                <option value="Dumbbell">Dumbbell (Musculation & Haltères)</option>
                                <option value="Zap">Zap (Explosivité & Vitesse)</option>
                                <option value="HeartPulse">HeartPulse (Santé & Cardiovasculaire)</option>
                                <option value="Trophy">Trophy (Excellence VIP)</option>
                                <option value="Target">Target (Objectif ciblé)</option>
                                <option value="Apple">Apple (Nutrition)</option>
                                <option value="Shield">Shield (Posture & Protection)</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-neutral-300 mb-1">
                              Description courte *
                            </label>
                            <textarea
                              rows={2}
                              required
                              value={newProgramData.shortDesc}
                              onChange={(e) =>
                                setNewProgramData({ ...newProgramData, shortDesc: e.target.value })
                              }
                              placeholder="Synthèse claire en 2 phrases..."
                              className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white resize-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                                Format
                              </label>
                              <input
                                type="text"
                                value={newProgramData.format}
                                onChange={(e) =>
                                  setNewProgramData({ ...newProgramData, format: e.target.value })
                                }
                                className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                                Badge distinctif
                              </label>
                              <input
                                type="text"
                                value={newProgramData.badge}
                                onChange={(e) =>
                                  setNewProgramData({ ...newProgramData, badge: e.target.value })
                                }
                                placeholder="Populaire / Exclusif"
                                className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => setIsNewProgramOpen(false)}
                              className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
                            >
                              Annuler
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 text-xs font-bold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300"
                            >
                              Ajouter au site
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Modal to Edit Program */}
                  {editingProgram && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
                      <div className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4">
                        <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                          <h4 className="text-sm font-bold text-white uppercase">
                            Modifier le Programme
                          </h4>
                          <button
                            onClick={() => setEditingProgram(null)}
                            className="text-neutral-400 hover:text-white text-xs"
                          >
                            Fermer
                          </button>
                        </div>

                        <form onSubmit={handleUpdateProgram} className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-neutral-300 mb-1">
                              Titre
                            </label>
                            <input
                              type="text"
                              value={editingProgram.title}
                              onChange={(e) =>
                                setEditingProgram({ ...editingProgram, title: e.target.value })
                              }
                              className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                                Catégorie
                              </label>
                              <input
                                type="text"
                                value={editingProgram.category}
                                onChange={(e) =>
                                  setEditingProgram({ ...editingProgram, category: e.target.value })
                                }
                                className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                                Icône Animée
                              </label>
                              <select
                                value={editingProgram.iconName}
                                onChange={(e) =>
                                  setEditingProgram({
                                    ...editingProgram,
                                    iconName: e.target.value as IconType,
                                  })
                                }
                                className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                              >
                                <option value="Flame">Flame</option>
                                <option value="Dumbbell">Dumbbell</option>
                                <option value="Zap">Zap</option>
                                <option value="HeartPulse">HeartPulse</option>
                                <option value="Trophy">Trophy</option>
                                <option value="Target">Target</option>
                                <option value="Apple">Apple</option>
                                <option value="Shield">Shield</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-neutral-300 mb-1">
                              Description courte
                            </label>
                            <textarea
                              rows={2}
                              value={editingProgram.shortDesc}
                              onChange={(e) =>
                                setEditingProgram({ ...editingProgram, shortDesc: e.target.value })
                              }
                              className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white resize-none"
                            />
                          </div>

                          <div className="flex justify-end gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => setEditingProgram(null)}
                              className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
                            >
                              Annuler
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 text-xs font-bold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300"
                            >
                              Enregistrer les modifications
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: Messages & Consultation Requests (Online inbox) */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-tight">
                      Boîte de Réception des Demandes en Ligne ({messages.length})
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Consultez toutes les demandes de bilan soumises sur votre site et répondez directement sur WhatsApp.
                    </p>
                  </div>

                  {messages.length === 0 ? (
                    <div className="py-12 text-center text-xs text-neutral-500 bg-neutral-950 rounded-xl border border-neutral-800">
                      Aucun message reçu pour le moment.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => {
                        const cleanPhone = msg.phone.replace(/[^0-9]/g, '');
                        const waReplyUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                          `Bonjour ${msg.name}, c'est Oussema Taleb. J'ai bien reçu votre demande de bilan pour "${msg.goal}". Quand seriez-vous disponible pour un court appel ?`
                        )}`;

                        return (
                          <div
                            key={msg.id}
                            className={`p-4 rounded-xl border transition-all ${
                              msg.status === 'nouveau'
                                ? 'bg-neutral-950 border-amber-400/50'
                                : 'bg-neutral-950/60 border-neutral-800/80 text-neutral-400'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-bold text-white">
                                    {msg.name}
                                  </h4>
                                  <span
                                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                                      msg.status === 'nouveau'
                                        ? 'bg-amber-400 text-neutral-950'
                                        : msg.status === 'contacte'
                                        ? 'bg-blue-500/20 text-blue-400'
                                        : 'bg-neutral-800 text-neutral-400'
                                    }`}
                                  >
                                    {msg.status === 'nouveau'
                                      ? 'Nouveau'
                                      : msg.status === 'contacte'
                                      ? 'Contacté'
                                      : 'Archivé'}
                                  </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mt-1">
                                  <span>Tél : {msg.phone}</span>
                                  {msg.email && (
                                    <>
                                      <span>·</span>
                                      <span>{msg.email}</span>
                                    </>
                                  )}
                                  <span>·</span>
                                  <span>{msg.date}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <a
                                  href={waReplyUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={() => updateMessageStatus(msg.id, 'contacte')}
                                  className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/40 flex items-center gap-1"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>WhatsApp</span>
                                </a>

                                <button
                                  onClick={() =>
                                    updateMessageStatus(
                                      msg.id,
                                      msg.status === 'archive' ? 'nouveau' : 'archive'
                                    )
                                  }
                                  className="px-2 py-1 text-xs text-neutral-400 hover:text-white rounded bg-neutral-900 border border-neutral-800"
                                >
                                  {msg.status === 'archive' ? 'Désarchiver' : 'Archiver'}
                                </button>

                                <button
                                  onClick={() => deleteMessage(msg.id)}
                                  className="p-1.5 text-neutral-500 hover:text-red-400 rounded hover:bg-neutral-900"
                                  title="Supprimer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <div className="text-xs bg-neutral-900/60 p-3 rounded-lg border border-neutral-800/60 space-y-1">
                              <p className="text-amber-400 font-medium">
                                Objectif : {msg.goal} ({msg.preferredFormat})
                              </p>
                              <p className="text-neutral-300">
                                Message : "{msg.message}"
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: Testimonials Manager (with PC avatar upload) */}
              {activeTab === 'testimonials' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white uppercase tracking-tight">
                        Témoignages & Avis Clients
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">
                        Gérez les avis affichés dans la section témoignages et importez les photos des transformations.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsNewTestimonialOpen(true)}
                      className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter un Témoignage</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {testimonials.map((test) => (
                      <div
                        key={test.id}
                        className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start justify-between gap-4"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={test.avatar}
                            alt={test.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover border border-amber-400/20 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white">
                                {test.name}
                              </h4>
                              <span className="text-xs text-amber-400 font-semibold">
                                ★ {test.rating}/5
                              </span>
                              <span className="text-[11px] text-emerald-400">
                                ({test.achievement})
                              </span>
                            </div>
                            <p className="text-xs text-neutral-400 mt-1 italic line-clamp-2">
                              "{test.review}"
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (confirm(`Supprimer le témoignage de ${test.name} ?`)) {
                              deleteTestimonial(test.id);
                              triggerToast('Témoignage supprimé');
                            }
                          }}
                          className="p-2 text-neutral-400 hover:text-red-400 rounded-lg hover:bg-neutral-800 transition-colors shrink-0"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Testimonial Modal */}
                  {isNewTestimonialOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
                      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4">
                        <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                          <h4 className="text-sm font-bold text-white uppercase">
                            Ajouter un Avis Client
                          </h4>
                          <button
                            onClick={() => setIsNewTestimonialOpen(false)}
                            className="text-neutral-400 hover:text-white text-xs"
                          >
                            Fermer
                          </button>
                        </div>

                        <form onSubmit={handleCreateTestimonial} className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-neutral-300 mb-1">
                              Nom du client *
                            </label>
                            <input
                              type="text"
                              required
                              value={newTestimonial.name}
                              onChange={(e) =>
                                setNewTestimonial({ ...newTestimonial, name: e.target.value })
                              }
                              placeholder="Ex: David C."
                              className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                                Profession / Profil
                              </label>
                              <input
                                type="text"
                                value={newTestimonial.role}
                                onChange={(e) =>
                                  setNewTestimonial({ ...newTestimonial, role: e.target.value })
                                }
                                placeholder="Ex: Avocat, 38 ans"
                                className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                                Résultat clé
                              </label>
                              <input
                                type="text"
                                value={newTestimonial.achievement}
                                onChange={(e) =>
                                  setNewTestimonial({
                                    ...newTestimonial,
                                    achievement: e.target.value,
                                  })
                                }
                                placeholder="Ex: -9 kg en 3 mois"
                                className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                              />
                            </div>
                          </div>

                          {/* Upload Client Photo from PC */}
                          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={newTestimonial.avatar}
                                alt="Aperçu avatar"
                                className="w-10 h-10 rounded-full object-cover border border-amber-400/40"
                              />
                              <div>
                                <span className="text-xs font-semibold text-white block">Photo du client</span>
                                <span className="text-[11px] text-neutral-400">Importer depuis votre PC</span>
                              </div>
                            </div>

                            <input
                              ref={testimonialPhotoInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleTestimonialPhotoChange}
                              className="hidden"
                              id="client-photo-pc"
                            />
                            <label
                              htmlFor="client-photo-pc"
                              className="px-3 py-1.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded cursor-pointer"
                            >
                              Parcourir PC
                            </label>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-neutral-300 mb-1">
                              Texte de l'avis *
                            </label>
                            <textarea
                              rows={3}
                              required
                              value={newTestimonial.review}
                              onChange={(e) =>
                                setNewTestimonial({ ...newTestimonial, review: e.target.value })
                              }
                              className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white resize-none"
                            />
                          </div>

                          <div className="flex justify-end gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => setIsNewTestimonialOpen(false)}
                              className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
                            >
                              Annuler
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 text-xs font-bold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300"
                            >
                              Publier
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: Coordinates & Socials */}
              {activeTab === 'coords' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-tight">
                      Coordonnées & Réseaux Sociaux
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Mettez à jour vos liens Instagram, Facebook et WhatsApp officiels.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                        Lien Instagram
                      </label>
                      <input
                        type="url"
                        value={coordsData.instagramUrl}
                        onChange={(e) =>
                          setCoordsData({ ...coordsData, instagramUrl: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                        Lien Facebook
                      </label>
                      <input
                        type="url"
                        value={coordsData.facebookUrl}
                        onChange={(e) =>
                          setCoordsData({ ...coordsData, facebookUrl: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                          Numéro WhatsApp (Format affiché)
                        </label>
                        <input
                          type="text"
                          value={coordsData.whatsappNumber}
                          onChange={(e) =>
                            setCoordsData({ ...coordsData, whatsappNumber: e.target.value })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                          Numéro WhatsApp (Format brut sans + ni espace)
                        </label>
                        <input
                          type="text"
                          value={coordsData.whatsappRaw}
                          onChange={(e) =>
                            setCoordsData({ ...coordsData, whatsappRaw: e.target.value })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                        Zone de déplacement & formats
                      </label>
                      <input
                        type="text"
                        value={coordsData.location}
                        onChange={(e) =>
                          setCoordsData({ ...coordsData, location: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                        Texte de présentation bio
                      </label>
                      <textarea
                        rows={3}
                        value={coordsData.bioText}
                        onChange={(e) =>
                          setCoordsData({ ...coordsData, bioText: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400 resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleSaveCoords}
                        className="w-full py-3 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Mettre à jour les coordonnées</span>
                      </button>
                    </div>

                    <div className="pt-6 border-t border-neutral-800 flex justify-between items-center">
                      <span className="text-xs text-neutral-500">
                        Réinitialiser toutes les données par défaut si nécessaire
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            confirm(
                              'Voulez-vous réinitialiser toutes les données aux valeurs de base ?'
                            )
                          ) {
                            resetAllData();
                            triggerToast('Données réinitialisées');
                          }
                        }}
                        className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 rounded border border-red-500/30 hover:border-red-500 flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Réinitialiser</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
