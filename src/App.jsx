import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Education from './components/Education.jsx';
import Honors from './components/Honors.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { profile } from './data/profile.js';

export default function App() {
  const [lang, setLang] = useState('zh');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.16 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-shell">
      <div className="background-grid" aria-hidden="true" />
      <Header profile={profile} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      <main>
        <Hero profile={profile} lang={lang} />
        <Stats profile={profile} lang={lang} />
        <About profile={profile} lang={lang} />
        <Skills profile={profile} lang={lang} />
        <Projects profile={profile} lang={lang} />
        <Education profile={profile} lang={lang} />
        <Honors profile={profile} lang={lang} />
        <Contact profile={profile} lang={lang} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
