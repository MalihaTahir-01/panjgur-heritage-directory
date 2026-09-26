import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, X, MapPin, Instagram, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/use-auth";
import { useLanguage } from "@/lib/i18n";

const nav = [
  { to: "/" as const, label: "Home" },
  { to: "/dates" as const, label: "Dates" },
  { to: "/crafts" as const, label: "Crafts" },
  { to: "/listing" as const, label: "Add / Update Listing" },
];

export function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const { t } = useLanguage();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, loading } = useAuth();
  const accountLink = loading
    ? null
    : user
      ? { to: "/dashboard" as const, label: "My Listing" }
      : { to: "/login" as const, label: "Login" };
  const fullNav = accountLink ? [...nav, accountLink] : nav;
  return (
    <header className="site-header">
      <div className="topline">
        <div className="container-wide topline-inner">
          <span>
            <MapPin size={12} /> {t("Panjgur, Balochistan, Pakistan")}
          </span>
          <span>{t("Rooted in place. Connected to people.")}</span>
        </div>
      </div>
      <div className="container-wide nav-row">
        <Link to="/" className="brand" aria-label="Panjgur Heritage Directory home">
          <span className="brand-mark" aria-hidden="true">
            ✳
          </span>
          <span>
            PANJGUR<span className="brand-sub">HERITAGE DIRECTORY</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link ${pathname === item.to ? "nav-current" : ""}`}
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          {accountLink && (
            <Link
              to={accountLink.to}
              className="nav-link"
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <User size={16} /> {t(accountLink.label)}
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu"
            aria-label={menu ? "Close menu" : "Open menu"}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {menu && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {fullNav.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setMenu(false)}>
              {t(item.label)}
              <ArrowRight size={16} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="container-wide footer-grid">
        <div>
          <Link to="/" className="footer-brand">
            PANJGUR <span>HERITAGE DIRECTORY</span>
          </Link>
          <p>{t("A place to find the people keeping Panjgur’s dates and crafts alive.")}</p>
        </div>
        <div className="footer-links">
          <Link to="/dates">{t("Explore dates")}</Link>
          <Link to="/crafts">{t("Explore crafts")}</Link>
          <Link to="/listing">{t("Add a listing")}</Link>
        </div>
        <div className="footer-location">
          <MapPin size={16} /> {t("Panjgur, Balochistan, Pakistan")}
        </div>
      </div>
      <div className="container-wide footer-bottom">
        <span>© Panjgur Heritage Directory</span>
        <span>{t("Made for local connection, not transactions.")}</span>
      </div>
    </footer>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-intro">
      <div className="container-wide">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="intro-description">{description}</p>
      </div>
    </div>
  );
}
export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
