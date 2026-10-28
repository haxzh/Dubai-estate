import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, Check, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { authRequest } from '../services/api'

export default function AuthPage({ mode, onBack }) {
  const isSignup = mode === 'signup'
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function submit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const invalid = !data.get('email') || !data.get('password') || (isSignup && (!data.get('name') || !data.get('consent')))
    if (invalid) {
      setError(isSignup ? 'Please complete your name, email, password, and consent.' : 'Please enter your email and password.')
      setSubmitted(false)
      return
    }

    setError('')
    setSubmitted(false)
    setLoading(true)
    try {
      const result = await authRequest(isSignup ? 'signup' : 'login', {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
        consent: Boolean(data.get('consent')),
      })
      localStorage.setItem('estatepro_token', result.token)
      localStorage.setItem('estatepro_user', JSON.stringify(result.user || { email: data.get('email') }))
      window.location.href = result.user?.role === 'admin' ? '/admin' : '/dashboard'
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return <main className="auth-page">
    <div className="auth-visual"><div className="auth-visual-overlay" /><button className="auth-back light" onClick={onBack}><ArrowLeft size={16} /> Back to EstatePro</button><div className="auth-visual-copy"><div className="eyebrow light"><span /> THE ESTATEPRO NETWORK</div><h1>Your next<br /><em>chapter starts here.</em></h1><p>Learn the market. Build your network. Move forward with intent.</p></div></div>
    <div className="auth-panel"><button className="auth-back" onClick={onBack}><ArrowLeft size={16} /> Back to home</button><div className="auth-brand"><span className="brand-mark">E</span><span>ESTATE<span className="gold">PRO</span></span></div><div className="auth-heading"><div className="eyebrow"><span /> {isSignup ? 'JOIN THE NETWORK' : 'WELCOME BACK'}</div><h2>{isSignup ? <>Start your <em>journey.</em></> : <>Good to see<br /><em>you again.</em></>}</h2><p>{isSignup ? 'Create your broker profile and take your first step into Dubai real estate.' : 'Log in to continue learning and exploring your broker opportunities.'}</p></div>
      <form className="auth-form" onSubmit={submit}>{isSignup && <label>Full name<div className="auth-input"><UserRound size={16} /><input name="name" placeholder="Your full name" /></div></label>}<label>Email address<div className="auth-input"><Mail size={16} /><input name="email" type="email" placeholder="you@example.com" /></div></label><label>Password<div className="auth-input"><LockKeyhole size={16} /><input name="password" type="password" placeholder="Minimum 8 characters" /></div></label>{!isSignup && <button type="button" className="forgot">Forgot password?</button>}{isSignup && <label className="auth-consent"><input name="consent" type="checkbox" /> <span>I agree to the privacy notice and platform terms.</span></label>}{error && <p className="form-error">{error}</p>}{submitted && <p className="form-success"><Check size={15} /> {isSignup ? 'Account created successfully.' : 'Logged in successfully.'}</p>}<button className="btn btn-gold auth-submit" type="submit" disabled={loading}>{loading ? 'Please wait...' : isSignup ? 'Create account' : 'Log in'} {!loading && <ArrowUpRight size={16} />}</button></form>
      <div className="auth-switch">{isSignup ? 'Already have an account?' : 'New to EstatePro?'} <a href={isSignup ? '/login' : '/signup'}>{isSignup ? 'Log in' : 'Create an account'}</a></div><p className="auth-note">Your password is securely hashed by the Node.js backend and is never stored as plain text.</p>
    </div>
  </main>
}
