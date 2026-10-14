import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, ProgramItem, TestimonialItem, ContactMessage } from '../types';
import { INITIAL_CONFIG, INITIAL_PROGRAMS, INITIAL_TESTIMONIALS, INITIAL_MESSAGES } from '../data/initialData';
import { saveMediaFile, getMediaUrl, removeMediaFile } from '../utils/mediaStorage';

interface AppContextType {
  config: SiteConfig;
  programs: ProgramItem[];
  testimonials: TestimonialItem[];
  messages: ContactMessage[];
  isAdminOpen: boolean;
  isAdminLoggedIn: boolean;
  openAdmin: () => void;
  closeAdmin: () => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  updateConfig: (patch: Partial<SiteConfig>) => void;
  uploadCustomVideo: (file: File) => Promise<string>;
  uploadCoachPhoto: (file: File) => Promise<string>;
  uploadHeroPoster: (file: File) => Promise<string>;
  resetCustomMedia: () => Promise<void>;
  addProgram: (program: Omit<ProgramItem, 'id'>) => void;
  updateProgram: (id: string, patch: Partial<ProgramItem>) => void;
  deleteProgram: (id: string) => void;
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, patch: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;
  addMessage: (msg: { name: string; email: string; phone: string; goal: string; preferredFormat: string; message: string }) => void;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => void;
  deleteMessage: (id: string) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CONFIG: 'ot_coach_config_v1',
  PROGRAMS: 'ot_coach_programs_v1',
  TESTIMONIALS: 'ot_coach_testimonials_v1',
  MESSAGES: 'ot_coach_messages_v1',
  ADMIN_SESSION: 'ot_coach_admin_logged_in',
};

// Admin password verification
const ADMIN_SECRET = 'admin123';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.heroVideoUrl || parsed.heroVideoUrl.includes('mixkit.co')) {
          parsed.heroVideoUrl = INITIAL_CONFIG.heroVideoUrl;
        }
        return { ...INITIAL_CONFIG, ...parsed };
      }
      return INITIAL_CONFIG;
    } catch {
      return INITIAL_CONFIG;
    }
  });

  const [programs, setPrograms] = useState<ProgramItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
      return saved ? JSON.parse(saved) : INITIAL_PROGRAMS;
    } catch {
      return INITIAL_PROGRAMS;
    }
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
  });

  // Load any previously uploaded local PC media files from IndexedDB
  useEffect(() => {
    async function loadPersistedMedia() {
      try {
        const savedVideo = await getMediaUrl('hero_video');
        const savedCoachPhoto = await getMediaUrl('coach_portrait');
        const savedPoster = await getMediaUrl('hero_poster');

        if (savedVideo || savedCoachPhoto || savedPoster) {
          setConfig((prev) => ({
            ...prev,
            heroVideoUrl: savedVideo || prev.heroVideoUrl,
            coachPhotoUrl: savedCoachPhoto || prev.coachPhotoUrl,
            heroVideoPoster: savedPoster || prev.heroVideoPoster,
          }));
        }
      } catch (err) {
        console.warn('Could not restore media from IndexedDB:', err);
      }
    }
    loadPersistedMedia();
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    } catch (e) {
      console.error(e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
    } catch (e) {
      console.error(e);
    }
  }, [programs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    } catch (e) {
      console.error(e);
    }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch (e) {
      console.error(e);
    }
  }, [messages]);

  const openAdmin = () => setIsAdminOpen(true);
  const closeAdmin = () => setIsAdminOpen(false);

  const loginAdmin = (password: string): boolean => {
    if (password === ADMIN_SECRET) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  };

  const updateConfig = (patch: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  };

  const uploadCustomVideo = async (file: File): Promise<string> => {
    const objectUrl = await saveMediaFile('hero_video', file);
    setConfig((prev) => ({
      ...prev,
      heroVideoUrl: objectUrl,
      customVideoFileName: file.name,
    }));
    return objectUrl;
  };

  const uploadCoachPhoto = async (file: File): Promise<string> => {
    const objectUrl = await saveMediaFile('coach_portrait', file);
    setConfig((prev) => ({
      ...prev,
      coachPhotoUrl: objectUrl,
    }));
    return objectUrl;
  };

  const uploadHeroPoster = async (file: File): Promise<string> => {
    const objectUrl = await saveMediaFile('hero_poster', file);
    setConfig((prev) => ({
      ...prev,
      heroVideoPoster: objectUrl,
    }));
    return objectUrl;
  };

  const resetCustomMedia = async () => {
    await removeMediaFile('hero_video');
    await removeMediaFile('coach_portrait');
    await removeMediaFile('hero_poster');
    setConfig((prev) => ({
      ...prev,
      heroVideoUrl: INITIAL_CONFIG.heroVideoUrl,
      heroVideoPoster: INITIAL_CONFIG.heroVideoPoster,
      coachPhotoUrl: INITIAL_CONFIG.coachPhotoUrl,
      customVideoFileName: undefined,
    }));
  };

  const addProgram = (item: Omit<ProgramItem, 'id'>) => {
    const newProg: ProgramItem = {
      ...item,
      id: `prog-${Date.now()}`,
    };
    setPrograms((prev) => [newProg, ...prev]);
  };

  const updateProgram = (id: string, patch: Partial<ProgramItem>) => {
    setPrograms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  };

  const deleteProgram = (id: string) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
  };

  const addTestimonial = (item: Omit<TestimonialItem, 'id'>) => {
    const newTest: TestimonialItem = {
      ...item,
      id: `test-${Date.now()}`,
    };
    setTestimonials((prev) => [newTest, ...prev]);
  };

  const updateTestimonial = (id: string, patch: Partial<TestimonialItem>) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t))
    );
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const addMessage = (msg: {
    name: string;
    email: string;
    phone: string;
    goal: string;
    preferredFormat: string;
    message: string;
  }) => {
    const now = new Date();
    const formattedDate = `Aujourd'hui à ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      ...msg,
      date: formattedDate,
      status: 'nouveau',
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  const updateMessageStatus = (id: string, status: ContactMessage['status']) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const resetAllData = () => {
    resetCustomMedia();
    setConfig(INITIAL_CONFIG);
    setPrograms(INITIAL_PROGRAMS);
    setTestimonials(INITIAL_TESTIMONIALS);
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.PROGRAMS);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
  };

  return (
    <AppContext.Provider
      value={{
        config,
        programs,
        testimonials,
        messages,
        isAdminOpen,
        isAdminLoggedIn,
        openAdmin,
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
        updateTestimonial,
        deleteTestimonial,
        addMessage,
        updateMessageStatus,
        deleteMessage,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
