import { ArrowUpRight, Check } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading'
import { scrollToSection } from '../utils/navigation'

const benefits = ['Learn real estate sales skills', 'Explore available property listings', 'Find and manage potential buyers', 'Access sales resources and marketing materials', 'Build professional relationships', 'Explore freelance collaboration and eligible opportunities']

export default function Benefits() {
  return <section id="benefits" className="section benefits"><div className="container benefits-layout"><div className="benefit-image"><div className="benefit-stat"><span>THE DUBAI EDGE</span><strong>01</strong><small>Learn. Connect.<br />Move forward.</small></div></div><div className="benefit-copy"><SectionHeading eyebrow="WHY ESTATEPRO" title={<>Your ambition.<br /><em>More equipped.</em></>} copy="A professional ecosystem for independent brokers who want to approach the market with clarity and confidence." /><ul>{benefits.map(item => <li key={item}><span><Check size={14} /></span>{item}</li>)}</ul><button className="btn btn-dark" onClick={() => scrollToSection('contact')}>Start your journey <ArrowUpRight size={16} /></button></div></div></section>
}
