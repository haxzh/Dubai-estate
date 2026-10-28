import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading'

const faqs = ['Who can join the platform?', 'Do I need prior real estate experience?', 'How do the courses work?', 'How can I explore listed properties?', 'How are commissions or referral fees determined?', 'Can international brokers participate?', 'What licensing or authorization is required to market Dubai properties?']

export default function FAQ() {
  const [active, setActive] = useState(0)
  return <section id="about" className="section faq"><div className="container faq-layout"><SectionHeading eyebrow="GOOD TO KNOW" title={<>Questions,<br /><em>answered.</em></>} copy="A few things to know before you take your first step. For specific legal or commercial guidance, always seek qualified advice." /><div className="faq-list">{faqs.map((question, index) => <div className={`faq-item ${active === index ? 'active' : ''}`} key={question}><button onClick={() => setActive(active === index ? -1 : index)} aria-expanded={active === index}><span>{question}</span><ChevronDown size={18} /></button>{active === index && <p>{index === 0 ? 'EstatePro is designed for people interested in learning about Dubai property sales and exploring freelance broker opportunities, subject to eligibility and applicable rules.' : index === 1 ? 'No. Our foundation courses are designed to help people build the basics, while experienced brokers can deepen their existing practice.' : 'This is a prototype answer. Final policies, listing access, licensing requirements, and commercial terms must be confirmed before launch.'}</p>}</div>)}</div></div></section>
}
