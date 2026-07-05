import { memo } from 'react';

function OrbitTech({ profile, lang }) {
  return (
    <div className="identity-core-panel" aria-label="Future Identity Core Panel">
      <div className="identity-orbit-stage">
        <div className="orbit-halo" />
        <div className="orbit-ring orbit-ring-one" />
        <div className="orbit-ring orbit-ring-two" />
        <div className="orbit-node-field">
          {profile.orbit.skills.map((skill, index) => {
            const angle = (360 / profile.orbit.skills.length) * index;
            const radius = index < 4 ? '154px' : '116px';
            return (
              <span
                className="orbit-node"
                key={skill}
                style={{
                  '--angle': `${angle}deg`,
                  '--radius': radius,
                  '--node-delay': `${index * 0.08}s`,
                }}
              >
                <span>{skill}</span>
              </span>
            );
          })}
        </div>
        <div className="identity-core">
          <span className="identity-logo">{profile.identity.logo}</span>
          <strong>{profile.identity.role.en}</strong>
          <small>{profile.identity.slogan.zh}</small>
          <small>{profile.identity.slogan.en}</small>
        </div>
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
