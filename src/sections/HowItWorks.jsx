import { ArrowUpRight, Building2, ChevronRight, Sparkles, Users } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading'

const steps = [['01', 'Register as a broker', 'Create your profile and tell us what kind of real estate journey you want to build.'], ['02', 'Learn with purpose', 'Move through practical courses designed around the conversations and skills that matter.'], ['03', 'Explore opportunities', 'Browse available properties and resources you can confidently bring to your network.'], ['04', 'Connect & grow', 'Coordinate buyer enquiries and pursue eligible opportunities through authorized processes.']]

export default function HowItWorks() {
  return <section id="how-it-works" className="section how"><div className="container"><SectionHeading eyebrow="THE ESTATEPRO METHOD" title={<>A clear path to <em>momentum.</em></>} copy="Everything you need to take your next step in Dubai real estate — thoughtfully brought together." /><div className="steps">{steps.map(([num, title, copy]) => <article className="step-card" key={num}><span className="step-num">{num}</span><div className="step-icon">{num === '01' ? <Users /> : num === '02' ? <Sparkles /> : num === '03' ? <Building2 /> : <ArrowUpRight />}</div><h3>{title}</h3><p>{copy}</p><ChevronRight className="step-arrow" size={20} /></article>)}</div></div></section>
}
