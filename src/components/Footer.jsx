export default function Footer({ profile }) {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {profile.identity.name.en}. Built with React + Vite.
      </p>
    </footer>
  );
}
