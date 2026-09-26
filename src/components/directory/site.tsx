import { Link, useRouterState } from '@tanstack/react-router'
import { ArrowRight, Menu, X, MapPin, Instagram, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/use-auth'

const nav = [
  { to: '/' as const, label: 'Home' },
  { to: '/dates' as const, label: 'Dates' },
  { to: '/crafts' as const, label: 'Crafts' },
  { to: '/listing' as const, label: 'Add / Update Listing' },
]

export function SiteHeader() {
  const [menu, setMenu] = useState(false)
  const [language, setLanguage] = useState('English')
  const pathname = useRouterState({ select: s => s.location.pathname })
  const { user, loading } = useAuth()
  const accountLink = loading ? null : user ? { to: '/dashboard' as const, label: 'My Listing' } : { to: '/login' as const, label: 'Login' }
  const fullNav = accountLink ? [...nav, accountLink] : nav
  return <header className="site-header">
    <div className="topline"><div className="container-wide topline-inner"><span><MapPin size={12}/> Panjgur, Balochistan, Pakistan</span><span>Rooted in place. Connected to people.</span></div></div>
    <div className="container-wide nav-row">
      <Link to="/" className="brand" aria-label="Panjgur Heritage Directory home"><span className="brand-mark" aria-hidden="true">✳</span><span>PANJGUR<span className="brand-sub">HERITAGE DIRECTORY</span></span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(item => <Link key={item.to} to={item.to} className={`nav-link ${pathname === item.to ? 'nav-current' : ''}`}>{item.label}</Link>)}</nav>
      <div className="nav-actions">
        {accountLink && <Link to={accountLink.to} className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><User size={16}/> {accountLink.label}</Link>}
        <div className="language-switch" aria-label="Language"><select aria-label="Choose language" value={language} onChange={e => setLanguage(e.target.value)}><option>English</option><option>اردو</option><option>بلوچی</option></select></div><Button variant="ghost" size="icon" className="mobile-menu" aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</Button></div>
    </div>
    {menu && <nav className="mobile-nav" aria-label="Mobile navigation">{fullNav.map(item => <Link key={item.to} to={item.to} onClick={() => setMenu(false)}>{item.label}<ArrowRight size={16}/></Link>)}</nav>}
  </header>
}
export function SiteFooter() { return <footer className="site-footer"><div className="container-wide footer-grid"><div><Link to="/" className="footer-brand">PANJGUR <span>HERITAGE DIRECTORY</span></Link><p>A place to find the people keeping Panjgur’s dates and crafts alive.</p></div><div className="footer-links"><Link to="/dates">Explore dates</Link><Link to="/crafts">Explore crafts</Link><Link to="/listing">Add a listing</Link></div><div className="footer-location"><MapPin size={16}/> Panjgur, Balochistan, Pakistan</div></div><div className="container-wide footer-bottom"><span>© Panjgur Heritage Directory</span><span>Made for local connection, not transactions.</span></div></footer> }
export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) { return <div className="page-intro"><div className="container-wide"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="intro-description">{description}</p></div></div> }
export function SectionEyebrow({ children }: { children: React.ReactNode }) { return <p className="eyebrow">{children}</p> }
