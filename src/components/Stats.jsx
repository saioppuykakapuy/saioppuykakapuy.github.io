import { Activity, Award, BookOpen, Gauge, GraduationCap, Users } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import { useCountUp } from '../utils/animations.js';

const icons = [GraduationCap, Activity, BookOpen, Users, Gauge, Award];

const StatCard = memo(function StatCard({ stat, index, lang, active }) {
  const Icon = icons[index % icons.length];
  const count = useCountUp(stat.value, active);

  return (
    <article className="stat-card reveal">
      <Icon size={24} />
      <strong>
        {count}
        {stat.suffix}
      </strong>
      <span>{stat.label[lang]}</span>
      <p>{stat.text[lang]}</p>
    </article>
  );
});

export default function Stats({ profile, lang }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

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
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-pad stats-section" ref={ref} aria-label="Statistics">
      <div className="stats-grid">
        {profile.stats.map((stat, index) => (
          <StatCard key={stat.label.en} stat={stat} index={index} lang={lang} active={active} />
        ))}
      </div>
    </section>
  );
}
