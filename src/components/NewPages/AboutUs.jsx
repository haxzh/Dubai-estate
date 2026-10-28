import { ArrowUpRight, Building2, Check, GraduationCap, ShieldCheck, Users } from 'lucide-react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'

const values = [
  ['Learn with purpose', 'Practical courses to understand Dubai real estate, sales, and client handling.', GraduationCap],
  ['Explore opportunities', 'Discover sample property listings and resources for broker conversations.', Building2],
  ['Build relationships', 'Connect with buyers and develop professional relationships with clarity.', Users],
  ['Work responsibly', 'Follow authorized processes and review applicable terms before participating.', ShieldCheck],
]

const journey = [
  ['01', 'Learn the market', 'Build a practical foundation through focused real estate courses.'],
  ['02', 'Explore properties', 'Review available property information and sample opportunities.'],
  ['03', 'Connect with buyers', 'Understand buyer needs and coordinate enquiries professionally.'],
  ['04', 'Grow your career', 'Pursue eligible opportunities under agreed and authorized terms.'],
]

export default function AboutUs() {
  return <><Navbar light /><main className="about-page-simple">
    <section className="about-simple-hero"><div className="about-simple-overlay" /><div className="container about-simple-content"><div className="eyebrow light"><span /> ABOUT ESTATEPRO</div><h1>Building careers.<br /><em>Creating opportunities.</em></h1><p>EstatePro brings learning, property exploration, and broker-focused guidance together for people building their path in Dubai real estate.</p><div className="about-actions"><a className="btn btn-gold" href="/courses">Explore courses <ArrowUpRight size={16} /></a><a className="btn btn-ghost" href="/properties">Explore properties <ArrowUpRight size={16} /></a></div></div></section>

    <section className="section about-intro-simple"><div className="container about-intro-grid-simple"><div><div className="eyebrow"><span /> WHO WE ARE</div><h2>Your next chapter in <em>real estate starts here.</em></h2><p>We help aspiring and experienced brokers understand the market, improve their skills, and approach Dubai property opportunities with more confidence.</p><p>Our platform is designed around practical learning, transparent communication, and responsible professional growth.</p><div className="about-facts"><span><strong>Learn</strong> practical skills</span><span><strong>Connect</strong> with intent</span><span><strong>Grow</strong> professionally</span></div></div><div className="about-image-simple" /></div></section>

    <section className="section about-values-simple"><div className="container"><div className="section-heading centered"><div className="eyebrow"><span /> WHAT WE STAND FOR</div><h2>More than a platform.<br /><em>A path to grow.</em></h2><p>Clear expectations, useful resources, and a professional approach to the Dubai real estate journey.</p></div><div className="about-value-grid">{values.map(([title, copy, Icon]) => <article key={title}><span className="about-value-icon"><Icon size={22} /></span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="section about-journey-simple"><div className="container"><div className="eyebrow"><span /> THE ESTATEPRO JOURNEY</div><h2>From learning to <em>real opportunities.</em></h2><div className="about-journey-grid">{journey.map(([number, title, copy]) => <article key={number}><strong>{number}</strong><span><Check size={14} /></span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="about-cta-simple"><div className="container"><div><div className="eyebrow light"><span /> YOUR NEXT MOVE</div><h2>Ready to explore<br /><em>what's possible?</em></h2><p>Start with a course, explore property opportunities, and take your next step with EstatePro.</p></div><a className="btn btn-gold" href="/signup">Join as a broker <ArrowUpRight size={16} /></a></div></section>
  </main><Footer /></>
}
