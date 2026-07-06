import { memo } from 'react';

function OrbitTech({ profile, lang }) {
  return (
    <div className="identity-core-panel" aria-label="Future Identity Core Panel">
      <div className="identity-core">
        <span className="identity-logo">{profile.identity.logo}</span>
        <strong>{profile.identity.role.en}</strong>
        <small>{profile.identity.slogan.zh}</small>
        <small>{profile.identity.slogan.en}</small>
      </div>

      <div className="identity-skill-tags" aria-label="Core skills">
        {profile.orbit.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <div className="identity-status-grid">
        {profile.orbit.status.map((item) => (
          <div className="identity-status-card" key={item.label.en}>
            <span>{item.label[lang]}</span>
            <strong>{item.value[lang]}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(OrbitTech);
