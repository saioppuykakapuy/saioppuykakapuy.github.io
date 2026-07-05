import {
  BookOpen,
  Code2,
  Cpu,
  Layers,
  MessageCircle,
  Radio,
  Sparkles,
  Terminal,
  Users,
  Wifi,
  Wrench,
} from 'lucide-react';

const iconMap = {
  book: BookOpen,
  code: Code2,
  cpu: Cpu,
  layers: Layers,
  message: MessageCircle,
  office: BookOpen,
  radio: Radio,
  sensor: Sparkles,
  spark: Sparkles,
  team: Users,
  terminal: Terminal,
  tool: Wrench,
  wifi: Wifi,
};

export default function Skills({ profile, lang }) {
  return (
    <section className="section-pad" id="skills">
      <div className="section-heading reveal">
        <span className="eyebrow">Skills Matrix</span>
        <h2>{lang === 'zh' ? '技术能力栈' : 'Technical Skill Stack'}</h2>
        <p>{profile.techDirection[lang]}</p>
      </div>

      <div className="skill-groups">
        {profile.skills.map((group) => (
          <article className="skill-group reveal" key={group.group.en}>
            <div className="group-title">
              <Cpu size={20} />
              <h3>{group.group[lang]}</h3>
            </div>
            <div className="skill-grid">
              {group.items.map((skill) => {
                const Icon = iconMap[skill.icon] || Cpu;
                return (
                  <div className="skill-card" key={`${group.group.en}-${skill.en}`}>
                    <Icon size={24} />
                    <div>
                      <strong>{lang === 'zh' ? skill.zh : skill.en}</strong>
                      <span>{lang === 'zh' ? skill.en : skill.zh}</span>
                    </div>
                    <div className="progress-bar" aria-label={`${skill.en} ${skill.level}%`}>
                      <span style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      <div className="future-skills reveal">
        <span>{lang === 'zh' ? '预留扩展技能' : 'Future Learning Tracks'}</span>
        <div>
          {profile.futureSkills.map((skill) => (
            <em key={skill}>{skill}</em>
          ))}
        </div>
      </div>
    </section>
  );
}
