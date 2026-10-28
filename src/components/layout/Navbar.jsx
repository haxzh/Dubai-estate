import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { scrollToSection } from '../../utils/navigation'

const links = [['How It Works', '/how-it-works'], ['Courses', '/courses'], ['Properties', '/properties'], ['Benefits', '/benefits'], ['About Us', '/about-us']]

export default function Navbar({ light = false }) {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('estatepro_user') || 'null')
    } catch {
      return null
    }
  })
  const closeMenu = () => setOpen(false)
  const logout = () => {
    localStorage.removeItem('estatepro_token')
    localStorage.removeItem('estatepro_user')
    setUser(null)
    window.location.href = '/'
  }
  return <header className={`nav-wrap ${light ? 'light-nav' : ''}`}><nav className="nav container">
    <button className="brand" onClick={() => scrollToSection('top')}><span className="brand-mark">E</span><span>ESTATE<span className="gold">PRO</span></span></button>
    <div className={`nav-links ${open ? 'open' : ''}`}>
      {links.map(([label, path]) => <a href={path} key={path} onClick={closeMenu}>{label}</a>)}
      {user ? <><a href="/dashboard" onClick={closeMenu} className="mobile-contact">Dashboard</a><button onClick={() => { logout(); closeMenu() }} className="mobile-contact">Log out</button></> : <><a href="/login" onClick={closeMenu} className="mobile-contact">Log in</a><a href="/signup" onClick={closeMenu} className="mobile-contact">Join as a Broker</a></>}
      <button onClick={() => { scrollToSection('contact'); closeMenu() }} className="mobile-contact">Contact</button>
    </div>
    <div className="auth-actions">{user ? <><a className="nav-user" href="/dashboard"><span>{user.name?.charAt(0).toUpperCase() || 'E'}</span>{user.name?.split(' ')[0] || 'Profile'}</a><button className="nav-logout" onClick={logout}>Log out</button></> : <><a className="login-link" href="/login">Log in</a><a className="nav-cta" href="/signup">Join as a Broker <ArrowUpRight size={16} /></a></>}</div>
    <button className="menu-btn" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
  </nav></header>
}
