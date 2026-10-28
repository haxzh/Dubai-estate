import { useState } from 'react'
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  function submit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (!data.get('name') || !data.get('email') || !data.get('consent')) {
      setError('Please complete your name, email, and consent before submitting.')
      return
    }
    setError('')
    setSent(true)
    event.currentTarget.reset()
  }
  return <section id="contact" className="section contact"><div className="container contact-layout"><div><SectionHeading light eyebrow="YOUR NEXT CHAPTER" title={<>Ready to move<br /><em>with intent?</em></>} copy="Tell us a little about yourself. Our team will be in touch once applications and backend notifications are connected." /><a className="whatsapp" href="https://wa.me/8077827705" target="_blank" rel="noreferrer"><MessageCircle size={19} /> Chat with us on WhatsApp <ArrowUpRight size={16} /></a></div><form className="broker-form" onSubmit={submit}><div className="form-heading"><span>01</span><h3>Broker application</h3></div><div className="form-grid"><label>Full name<input name="name" placeholder="Your full name" /></label><label>Email address<input name="email" type="email" placeholder="you@example.com" /></label><label>Phone number<input name="phone" placeholder="+971 50 000 0000" /></label><label>Country of residence<input name="country" placeholder="United Arab Emirates" /></label><label>Experience<select name="experience"><option>New to real estate</option><option>Less than 2 years</option><option>2+ years</option></select></label><label>Area of interest<select name="interest"><option>Courses</option><option>Brokerage</option><option>Property listings</option><option>Partnerships</option></select></label></div><label className="consent"><input name="consent" type="checkbox" /> <span>I agree to be contacted about EstatePro and accept the privacy notice.</span></label>{error && <p className="form-error">{error}</p>}{sent && <p className="form-success"><Check size={15} /> Application captured for this frontend demo. Backend integration is required to store applications and send notifications.</p>}<button className="btn btn-gold submit" type="submit">Submit application <ArrowUpRight size={16} /></button></form></div></section>
}
