/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { FullPageVideoBackground } from './components/FullPageVideoBackground';
import { HeroSection } from './components/HeroSection';
import { ProgramsSection } from './components/ProgramsSection';
import { MethodSection } from './components/MethodSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminModal } from './components/AdminModal';

function CoachApp() {
  const [selectedProgramTitle, setSelectedProgramTitle] = useState<string>('');

  const handleSelectProgram = (title: string) => {
    setSelectedProgramTitle(title);
  };

  return (
    <div className="relative min-h-screen text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      {/* 100% Full-Page Background Video (Always Playing in High Quality, Muted, No Pause, No Controls) */}
      <FullPageVideoBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections with Translucent Atmospheric Layering */}
      <main className="flex-1 relative z-10">
        <HeroSection />
        <ProgramsSection onSelectProgramForBooking={handleSelectProgram} />
        <MethodSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection selectedProgramTitle={selectedProgramTitle} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Elements */}
      <FloatingWhatsApp />
      <AdminModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <CoachApp />
    </AppProvider>
  );
}
