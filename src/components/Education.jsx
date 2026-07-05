import { BookOpen, GraduationCap } from 'lucide-react';

export default function Education({ profile, lang }) {
  const education = profile.education[lang];

  return (
    <section className="section-pad education-section" id="education">
      <div className="section-heading reveal">
        <span className="eyebrow">Education</span>
        <h2>{lang === 'zh' ? '教育背景' : 'Education Background'}</h2>
        <p>{lang === 'zh' ? '课程方向围绕嵌入式系统、传感器与智慧农业应用展开。' : 'Coursework focuses on embedded systems, sensors, and smart agriculture applications.'}</p>
      </div>

      <div className="education-card reveal">
        <div className="timeline-dot">
          <GraduationCap size={28} />
        </div>
        <div>
          <span className="status-pill">{education.degree}</span>
          <h3>{education.school}</h3>
          <p>
            {education.major} · {education.className}
          </p>
          <div className="course-list">
            {education.courses.map((course) => (
              <span key={course}>
                <BookOpen size={15} />
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
