import { useEffect } from 'react'
import './App.css'
import AuthPage from './pages/AuthPage'
import HomePage from './components/HomePage'
import HowItWorks from './components/NewPages/HowItWorks'
import Courses from './components/NewPages/Courses'
import Properties from './components/NewPages/Properties'
import Benefits from './components/NewPages/Benefits'
import AboutUs from './components/NewPages/AboutUs'
import Dashboard from './components/Dashboard'
import AdminPage from './pages/AdminPage'
import { publicRequest } from './services/api'

export default function App() {
  const route = window.location.pathname
  useEffect(() => {
    publicRequest('theme').then(({ theme }) => {
      const variables = { primary: '--navy', accent: '--gold', background: '--cream', card: '--card', text: '--ink', muted: '--muted', border: '--line' }
      Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}-color`, value)
        if (variables[key]) document.documentElement.style.setProperty(variables[key], value)
      })
    }).catch(() => {})
  }, [])
  if (route === '/login' || route === '/signup') {
    return <AuthPage mode={route.slice(1)} onBack={() => { window.location.href = '/' }} />
  }
  if (route === '/dashboard') return <Dashboard />
  if (route.startsWith('/admin')) return <AdminPage />
  if (route === '/how-it-works') return <HowItWorks />
  if (route === '/courses') return <Courses />
  if (route === '/properties') return <Properties />
  if (route === '/benefits') return <Benefits />
  if (route === '/about-us') return <AboutUs />
  return <HomePage />
}
