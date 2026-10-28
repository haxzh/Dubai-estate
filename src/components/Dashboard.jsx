import { useEffect, useState } from 'react'
import { ArrowUpRight, BookOpen, Building2, LogOut, MapPin } from 'lucide-react'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import { courses } from '../data/courses'
import { properties } from '../data/properties'
import { getCurrentUser } from '../services/api'

function getPendingItem() {
  try {
    return JSON.parse(sessionStorage.getItem('estatepro_pending_item') || 'null')
  } catch {
    return null
  }
}

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const pending = getPendingItem()
  const pendingCourse = pending?.type === 'course' ? pending.item : null
  const pendingProperty = pending?.type === 'property' ? pending.item : null

  useEffect(() => {
    const token = localStorage.getItem('estatepro_token')
    if (!token) {
      window.location.href = '/login'
      return
    }

    getCurrentUser(token)
      .then((currentUser) => {
        setUser(currentUser)
        localStorage.setItem('estatepro_user', JSON.stringify(currentUser))
      })
      .catch(() => {
        localStorage.removeItem('estatepro_token')
        localStorage.removeItem('estatepro_user')
        window.location.href = '/login'
      })
      .finally(() => setLoading(false))
  }, [])

  function logout() {
    localStorage.removeItem('estatepro_token')
    localStorage.removeItem('estatepro_user')
    window.location.href = '/'
  }

  if (loading) return <main className="dashboard-loading"><span>Loading your dashboard...</span></main>
  if (!user) return null

  const initials = user.name?.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'EP'
  const accountType = user.role === 'admin' ? 'Administrator' : user.role === 'broker' ? 'Broker member' : 'EstatePro member'

  return <><Navbar light /><main className="dashboard-page"><section className="dashboard-hero"><div className="container dashboard-hero-layout"><div className="dashboard-hero-copy"><div className="eyebrow"><span /> YOUR ESTATEPRO DASHBOARD</div><h1>Welcome{user.name ? `, ${user.name.split(' ')[0]}` : ''}.<br /><em>Let’s move forward.</em></h1><p>Continue learning, review property opportunities, and manage the next step in your broker journey.</p><button className="dashboard-logout" onClick={logout}><LogOut size={15} /> Log out</button></div><aside className="dashboard-profile-card"><div className="dashboard-profile-top"><div className="dashboard-avatar">{initials}</div><span className="dashboard-status"><i /> Active</span></div><h2>{user.name || 'EstatePro member'}</h2><p className="dashboard-profile-email">{user.email}</p><div className="dashboard-profile-divider" /><div className="dashboard-profile-row"><span>Account type</span><strong>{accountType}</strong></div><div className="dashboard-profile-row"><span>Member since</span><strong>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'EstatePro'}</strong></div><a href="#profile" className="dashboard-profile-link">View profile <ArrowUpRight size={14} /></a></aside></div></section>
    <section className="section dashboard-content"><div className="container">
      {pendingCourse && <div className="dashboard-focus"><div><div className="eyebrow"><span /> COURSE YOU SELECTED</div><h2>{pendingCourse.title}</h2><p>{pendingCourse.description}</p><div className="dashboard-focus-meta"><span>{pendingCourse.level}</span><span>{pendingCourse.duration}</span><strong>{pendingCourse.price}</strong></div></div><a href="/signup" className="btn btn-gold">Continue to purchase <ArrowUpRight size={16} /></a></div>}
      {pendingProperty && <div className="dashboard-focus"><div><div className="eyebrow"><span /> PROPERTY OPPORTUNITY</div><h2>{pendingProperty.title}</h2><p>{pendingProperty.description}</p><div className="dashboard-focus-meta"><span><MapPin size={14} /> {pendingProperty.location}</span><span>{pendingProperty.type}</span><strong>{pendingProperty.price}</strong></div></div><a href="/properties" className="btn btn-gold">Review property <ArrowUpRight size={16} /></a></div>}
      <div className="dashboard-heading" id="profile"><div><div className="eyebrow"><span /> KEEP EXPLORING</div><h2>Your learning<br /><em>and opportunities.</em></h2></div><p>Choose a course to build your skills or explore sample listings for an authorized buyer conversation.</p></div>
      <div className="dashboard-stats"><div><strong>{courses.length}</strong><span>Courses available</span></div><div><strong>{properties.length}</strong><span>Property opportunities</span></div><div><strong>Active</strong><span>Profile status</span></div></div>
      <div className="dashboard-columns"><div><div className="dashboard-section-title"><BookOpen size={18} /><h3>Recommended courses</h3><a href="/courses">View all <ArrowUpRight size={14} /></a></div><div className="dashboard-list">{courses.slice(0, 3).map((course) => <a className="dashboard-list-card" href="/courses" key={course.title}><img src={course.image} alt="" /><span><strong>{course.title}</strong><small>{course.level} · {course.duration}</small></span><b>{course.price}</b></a>)}</div></div><div><div className="dashboard-section-title"><Building2 size={18} /><h3>Property opportunities</h3><a href="/properties">View all <ArrowUpRight size={14} /></a></div><div className="dashboard-list">{properties.slice(0, 3).map((property) => <a className="dashboard-list-card" href="/properties" key={property.title}><img src={property.image} alt="" /><span><strong>{property.title}</strong><small>{property.location} · {property.type}</small></span><b>{property.price}</b></a>)}</div></div></div>
    </div></section>
  </main><Footer /></>
}
