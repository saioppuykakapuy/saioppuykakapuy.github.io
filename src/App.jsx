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

const motionQuery = '(prefers-reduced-motion: reduce)';

const particles = Array.from({ length: 12 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  delay: `${(index % 8) * -0.7}s`,
  duration: `${16 + (index % 5)}s`,
}));

function shouldUseLowMotion() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.innerWidth < 768 || window.matchMedia(motionQuery).matches;
}

export default function App() {
  const [lang, setLang] = useState('zh');
  const [theme, setTheme] = useState('light');
  const [lowMotion, setLowMotion] = useState(shouldUseLowMotion);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.motion = lowMotion ? 'low' : 'full';
  }, [lowMotion]);

  useEffect(() => {
    const media = window.matchMedia(motionQuery);
    let frame = 0;

    const updateMotion = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          setLowMotion(shouldUseLowMotion());
          frame = 0;
        });
      }
    };

    updateMotion();
    window.addEventListener('resize', updateMotion, { passive: true });
    media.addEventListener('change', updateMotion);

    return () => {
      window.removeEventListener('resize', updateMotion);
      media.removeEventListener('change', updateMotion);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    if (lowMotion) {
      return undefined;
    }

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const commitGlow = () => {
      document.documentElement.style.setProperty('--mouse-x', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y}px`);
      frame = 0;
    };

    const moveGlow = (event) => {
      x = event.clientX;
      y = event.clientY;

      if (!frame) {
        frame = window.requestAnimationFrame(commitGlow);
      }
    };

    window.addEventListener('pointermove', moveGlow, { passive: true });
    return () => {
      window.removeEventListener('pointermove', moveGlow);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [lowMotion]);

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
    <div className="app-shell" data-low-motion={lowMotion ? 'true' : 'false'}>
      <div className="background-grid" aria-hidden="true" />
      {!lowMotion ? (
        <>
          <div className="particle-field" aria-hidden="true">
            {particles.map((particle, index) => (
              <span
                key={index}
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                }}
              />
            ))}
          </div>
          <div className="cursor-glow" aria-hidden="true" />
        </>
      ) : null}
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
