import { useState } from 'react';
import { Github, Globe2, Mail, Menu, Moon, Sun, X } from 'lucide-react';

export default function Header({ profile, lang, setLang, theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const isZh = lang === 'zh';

  const closeMenu = () => setOpen(false);
  const handleNavClick = (event, href) => {
    const target = document.querySelector(href);
    if (!target) {
      closeMenu();
      return;
    }

    event.preventDefault();
    closeMenu();

    const top = target.getBoundingClientRect().top + window.scrollY - 86;
    const lowMotion = document.documentElement.dataset.motion === 'low';
    const options = { top: Math.max(top, 0), behavior: lowMotion ? 'auto' : 'smooth' };
    const scroller = document.scrollingElement || document.documentElement;

    window.history.pushState(null, '', href);
    window.scrollTo(options);
    scroller.scrollTo?.(options);
    scroller.scrollTop = options.top;
  };

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="CJF Home" onClick={closeMenu}>
        <span className="brand-mark">{profile.identity.logo}</span>
        <span>
          <strong>{profile.identity.name[lang]}</strong>
          <small>{profile.identity.role[lang]}</small>
        </span>
      </a>

      <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        {profile.nav.map((item) => (
          <a key={item.href} href={item.href} onClick={(event) => handleNavClick(event, item.href)}>
            {item[lang]}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <a className="icon-button" href={profile.identity.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <Github size={19} />
        </a>
        <a className="icon-button" href={`mailto:${profile.identity.email}`} aria-label="Email">
          <Mail size={19} />
        </a>
        <button className="chip-button" type="button" onClick={() => setLang(isZh ? 'en' : 'zh')} aria-label="Switch language">
          <Globe2 size={17} />
          {isZh ? 'EN' : '中文'}
        </button>
        <button className="icon-button" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Switch theme">
          {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
        </button>
        <button className="icon-button menu-toggle" type="button" aria-label="Toggle menu" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
    </header>
  );
}
