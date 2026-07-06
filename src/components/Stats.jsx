import { Activity, Award, BookOpen, Gauge, GraduationCap, Users } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import { useCountUp } from '../utils/animations.js';

const metricIcons = [Activity, BookOpen, Users, Gauge, Award];

const copy = {
  zh: {
    title: '成长数据仪表盘',
    titleAccent: '数据仪表盘',
    subtitle: '用数据记录学习、项目实践与持续成长。',
    kicker: 'DATA PANEL',
    progress: '超过约 78% 的同专业同学',
  },
  en: {
    title: 'Growth Dashboard',
    titleAccent: 'Dashboard',
    subtitle: 'Tracking learning, project practice, and continuous growth through data.',
    kicker: 'DATA PANEL',
    progress: 'Ahead of about 78% of peers in the same major',
  },
};

function formatValue(value, suffix) {
  return `${value}${suffix}`;
}

const StatsMainCard = memo(function StatsMainCard({ stat, lang, active }) {
  const count = useCountUp(stat.value, active, 1150);
  const progressScale = (stat.progress || 78) / 100;

  return (
    <article className={`stats-main-card ${active ? 'is-visible' : ''}`} style={{ '--progress-scale': progressScale }}>
      <div className="stats-main-top">
        <span className="stats-icon stats-icon-large">
          <GraduationCap size={26} />
        </span>
        <span>{copy[lang].kicker}</span>
      </div>

      <strong className="stats-main-number">{formatValue(count, stat.suffix)}</strong>
      <h3>{stat.label[lang]}</h3>
      <p>{stat.text[lang]}</p>

      <div className="stats-progress stats-progress-main" aria-hidden="true">
        <span className="stats-progress-fill" />
      </div>
      <small className="stats-progress-note">{copy[lang].progress}</small>

      <div className="stats-tags" aria-label="Core metric tags">
        {(stat.tags || []).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
});

const StatsCard = memo(function StatsCard({ stat, index, lang, active }) {
  const Icon = metricIcons[index % metricIcons.length];
  const count = useCountUp(stat.value, active, 980 + index * 90);
  const progressScale = (stat.progress || 55) / 100;

  return (
    <article
      className={`stats-card ${active ? 'is-visible' : ''}`}
      style={{ '--delay': `${80 + index * 80}ms`, '--progress-scale': progressScale }}
    >
      <div className="stats-card-head">
        <span className="stats-icon">
          <Icon size={20} />
        </span>
        <span className="stats-card-index">{String(index + 2).padStart(2, '0')}</span>
      </div>

      <strong className="stats-number">{formatValue(count, stat.suffix)}</strong>
      <span className="stats-label">{stat.label[lang]}</span>
      <p className="stats-desc">{stat.text[lang]}</p>

      <div className="stats-progress" aria-hidden="true">
        <span className="stats-progress-fill" />
      </div>
    </article>
  );
});

export default function Stats({ profile, lang }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [coreStat, ...metricStats] = profile.stats;
  const sectionCopy = copy[lang];

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.24 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section-pad stats-section ${active ? 'is-visible' : ''}`} ref={ref} aria-label={sectionCopy.title}>
      <header className="stats-header">
        <span className="stats-kicker">{sectionCopy.kicker}</span>
        <h2 className="stats-title">
          {sectionCopy.title.replace(sectionCopy.titleAccent, '')}
          <span>{sectionCopy.titleAccent}</span>
        </h2>
        <p className="stats-subtitle">{sectionCopy.subtitle}</p>
      </header>

      <div className="stats-dashboard">
        <StatsMainCard stat={coreStat} lang={lang} active={active} />
        <div className="stats-grid">
          {metricStats.map((stat, index) => (
            <StatsCard key={stat.label.en} stat={stat} index={index} lang={lang} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
