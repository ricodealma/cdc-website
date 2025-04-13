'use client';
import BannerSection from './banner-section';
import SecaoCalendario from './calendario';
import ContactSection from './contact-section';
import { MissionSection } from './mission-section';
import { VideoSection } from './video-section';

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <BannerSection />
        <MissionSection id="mission" />
        <VideoSection />
        <SecaoCalendario id="calendar" />
        <ContactSection id="contact" />
      </main>
    </div>
  );
};

export default HomePage;
