import { ArrowRight, Download, Trophy, Send } from 'lucide-react';
import OrbitTech from './OrbitTech.jsx';
import { useTypewriter } from '../utils/animations.js';

export default function Hero({ profile, lang }) {
  const content = profile.hero[lang];
  const typed = useTypewriter(content.greeting, [lang], lang === 'zh' ? 70 : 42);

  return (
    <section className="hero section-pad" id="home">
      <div className="hero-copy reveal">
        <span className="eyebrow">{content.eyebrow}</span>
        <h1 className="hero-title">
          <span className="hero-greeting">
            <span className="typewriter">{typed.output}</span>
          </span>
          <span className="type-cursor" aria-hidden="true" />
          <span className="hero-name">{profile.identity.name[lang]}</span>
        </h1>
        <p className="hero-role">{content.role}</p>
        <p className="hero-slogan">{content.slogan}</p>
        <p className="hero-intro">{content.intro}</p>
        <div className={`hero-actions ${typed.done ? 'is-ready' : ''}`}>
          <a className="glow-button" href="#projects">
            <ArrowRight size={18} />
            {content.actions.projects}
          </a>
          <a className="glow-button secondary" href="#honors">
            <Trophy size={18} />
            {content.actions.honors}
          </a>
          <a className="glow-button secondary" href="/resume/Blank_Resume.docx" download="Blank_Resume.docx">
            <Download size={18} />
            {content.actions.resume}
          </a>
          <a className="glow-button ghost" href="#contact">
            <Send size={18} />
            {content.actions.contact}
          </a>
        </div>
      </div>

      <div className="hero-visual reveal">
        <OrbitTech profile={profile} lang={lang} />
      </div>
    </section>
  );
}
