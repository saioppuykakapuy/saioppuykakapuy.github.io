import { ExternalLink, FolderOpen, Lock } from 'lucide-react';
import SmartImage from './SmartImage.jsx';

export default function Projects({ profile, lang }) {
  return (
    <section className="section-pad" id="projects">
      <div className="section-heading reveal">
        <span className="eyebrow">Project Dock</span>
        <h2>{lang === 'zh' ? '项目入口' : 'Project Entrances'}</h2>
        <p>
          {lang === 'zh'
            ? '当前先保留项目占位卡片，后期可以在 profile.js 中补充真实 GitHub 项目链接。'
            : 'Project cards are prepared as placeholders. Real GitHub links can be added later in profile.js.'}
        </p>
      </div>

      <div className="project-grid">
        {profile.projects.map((project) => (
          <article className="project-card reveal" key={project.titleEn}>
            <div className="project-media">
              <SmartImage
                src={project.image}
                alt={lang === 'zh' ? project.titleZh : project.titleEn}
                title={lang === 'zh' ? '项目图片待添加' : 'Project Image Coming Soon'}
                subtitle="Project Placeholder"
              />
            </div>
            <div className="project-body">
              <span className="status-pill">{project.status}</span>
              <h3>{lang === 'zh' ? project.titleZh : project.titleEn}</h3>
              <p>{lang === 'zh' ? project.descZh : project.descEn}</p>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {project.github ? (
                <a className="link-button" href={project.github} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={17} />
                  GitHub
                </a>
              ) : (
                <button className="link-button disabled" type="button" disabled>
                  <Lock size={17} />
                  {lang === 'zh' ? '待补充 / Coming Soon' : 'Coming Soon'}
                </button>
              )}
            </div>
            <FolderOpen className="project-watermark" size={92} aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
