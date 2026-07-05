import { BadgeCheck, Cpu } from 'lucide-react';
import SmartImage from './SmartImage.jsx';

export default function About({ profile, lang }) {
  return (
    <section className="section-pad about-section" id="about">
      <div className="section-heading reveal">
        <span className="eyebrow">About Me</span>
        <h2>{lang === 'zh' ? '关于我' : 'About Me'}</h2>
        <p>{profile.identity.current[lang]}</p>
      </div>

      <div className="about-layout">
        <div className="avatar-panel reveal">
          <SmartImage
            src={profile.about.avatar}
            alt={profile.identity.name[lang]}
            className="avatar-image"
            title="CJF"
            subtitle="Tech Avatar Placeholder"
          />
          <div className="avatar-ring" aria-hidden="true" />
        </div>
        <div className="about-copy reveal">
          {profile.about[lang].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="tag-row">
            {profile.about.tags.map((tag) => (
              <span key={tag}>
                <BadgeCheck size={15} />
                {tag}
              </span>
            ))}
          </div>
          <div className="mini-terminal">
            <Cpu size={19} />
            <span>{profile.identity.slogan[lang]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
