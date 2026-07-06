import { Download, Github, Mail, MapPin, Phone } from 'lucide-react';

export default function Contact({ profile, lang }) {
  const contacts = [
    {
      icon: Github,
      label: 'GitHub',
      value: profile.identity.githubUser,
      href: profile.identity.githubUrl,
      external: true,
    },
    {
      icon: Mail,
      label: 'Email',
      value: profile.identity.email,
      href: '#',
      disabled: true,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profile.identity.phone,
      href: '#',
      disabled: true,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profile.identity.location[lang],
      href: null,
    },
  ];

  return (
    <section className="section-pad contact-section" id="contact">
      <div className="section-heading reveal">
        <span className="eyebrow">Contact</span>
        <h2>{lang === 'zh' ? '联系方式' : 'Contact Me'}</h2>
        <p>
          {lang === 'zh'
            ? '欢迎通过 GitHub 或邮箱联系，一起学习、交流和协作。'
            : 'Feel free to connect through GitHub or email for learning, communication, and collaboration.'}
        </p>
      </div>

      <div className="contact-layout">
        <div className="contact-grid reveal">
          {contacts.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <Icon size={22} />
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </>
            );

            return item.href ? (
              <a
                className="contact-card"
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                aria-disabled={item.disabled ? 'true' : undefined}
                onClick={item.disabled ? (event) => event.preventDefault() : undefined}
              >
                {content}
              </a>
            ) : (
              <div className="contact-card" key={item.label}>
                {content}
              </div>
            );
          })}
          <a className="glow-button contact-resume" href="/resume/Blank_Resume.docx" download="Blank_Resume.docx">
            <Download size={18} />
            {lang === 'zh' ? '下载简历' : 'Download Resume'}
          </a>
          <p className="resume-hint">{profile.resume.hint[lang]}</p>
        </div>
        <div className="terminal-card contact-terminal reveal">
          <div className="terminal-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <pre>{profile.contactTerminal.join('\n')}</pre>
        </div>
      </div>
    </section>
  );
}
