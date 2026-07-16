import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDailyGospel } from '../hooks/useDailyGospel';
import { useHeroData } from '../hooks/useHeroData';

import GospelReadingModal from '../components/home/GospelReadingModal';
import HeroSection from '../components/home/HeroSection';
import MassScheduleSection from '../components/home/MassScheduleSection';
import SaintsMarquee from '../components/home/SaintsMarquee';
import AboutSnippetSection from '../components/home/AboutSnippetSection';
import StatsSection from '../components/home/StatsSection';
import EventsSection from '../components/home/EventsSection';
import DonationSection from '../components/home/DonationSection';
import GospelOfDaySection from '../components/home/GospelOfDaySection';

export default function Home() {
  const navigate = useNavigate();

  // Scroll reveal for non-hero sections
  useEffect(() => {
    const sections = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sections.forEach(s => io.observe(s));
    return () => sections.forEach(s => io.unobserve(s));
  }, []);

  const handleNav = (to) => {
    navigate(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Today's Gospel reading, pulled from the universal Roman lectionary cycle
  const gospel = useDailyGospel();

  // Hero content (welcome copy + background image) from GET /api/church/hero/
  const { hero, loading: heroLoading } = useHeroData();

  // Controls the "Read More" reading dialog — isolated to the hero card
  const [isGospelModalOpen, setIsGospelModalOpen] = useState(false);

  return (
<<<<<<< HEAD
    <div className="home-page">
=======
    <>
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
      <HeroSection
        hero={hero}
        loading={heroLoading}
        gospel={gospel}
        onNavigate={handleNav}
        onOpenGospelModal={() => setIsGospelModalOpen(true)}
      />

      {isGospelModalOpen && (
        <GospelReadingModal gospel={gospel} onClose={() => setIsGospelModalOpen(false)} />
      )}

      <MassScheduleSection />

      <SaintsMarquee />

      <AboutSnippetSection onNavigate={handleNav} />

      <StatsSection />

      <EventsSection onNavigate={handleNav} />

      <DonationSection onNavigate={handleNav} />

      <GospelOfDaySection onNavigate={handleNav} />
<<<<<<< HEAD
    </div>
=======
    </>
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
  );
}
