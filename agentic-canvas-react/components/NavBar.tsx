import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/navbar.module.css";

const NAV_LINKS = [
  { label: "GenAI Canvas", href: "/canvas", external: false },
  { label: "GitHub",       href: "https://github.com/awindest", external: true },
  { label: "LinkedIn",     href: "https://www.linkedin.com/in/awindest/", external: true },
];

export default function NavBar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "#0f172a",
      borderBottom: "1px solid #1e3a5f",
    }}>
      <div style={{
        maxWidth: 800, margin: "0 auto",
        height: 56, padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/" style={{
          color: "#818cf8", fontWeight: 800, fontSize: 15,
          textDecoration: "none", letterSpacing: 0,
        }}>
          indest_labs.dev
        </Link>

        {/* Desktop links */}
        <div className={styles.desktopLinks}>
          {NAV_LINKS.map((link) => {
            const isActive = !link.external && router.pathname === link.href;
            const linkStyle = {
              color: isActive ? "#f1f5f9" : "#94a3b8",
              fontWeight: isActive ? 600 : 400,
              fontSize: 13,
              textDecoration: "none",
            };
            if (link.external) {
              return (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" style={linkStyle}>
                  {link.label}
                </a>
              );
            }
            return (
              <Link key={link.href} href={link.href} style={linkStyle}>
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((link) => {
            const isActive = !link.external && router.pathname === link.href;
            const linkStyle = {
              color: isActive ? "#f1f5f9" : "#94a3b8",
              fontWeight: isActive ? 600 : 400,
              fontSize: 15,
              textDecoration: "none",
              padding: "10px 0",
              borderBottom: "1px solid #1e3a5f",
              display: "block",
            };
            if (link.external) {
              return (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer"
                   style={linkStyle} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              );
            }
            return (
              <Link key={link.href} href={link.href} style={linkStyle} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
