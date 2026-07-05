export default function Footer({ profile }) {
  const ticker = [...profile.ticker, ...profile.ticker];

  return (
    <footer className="site-footer">
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {ticker.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>
      <p>
        © {new Date().getFullYear()} {profile.identity.name.en}. Built with React + Vite.
      </p>
    </footer>
  );
}
