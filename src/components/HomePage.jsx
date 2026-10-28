import Navbar from './layout/Navbar'
import Hero from '../sections/Hero'
import HowItWorks from '../sections/HowItWorks'
import CoursesSection from '../sections/CoursesSection'
import PropertySection from '../sections/PropertiesSection'
import Benefits from '../sections/BrokerBenefits'
import Earnings from '../sections/CommissionSection'
import FAQ from '../sections/FAQ'
import Contact from '../sections/BrokerRegistration'
import Footer from './layout/Footer'

export default function HomePage() {
  return <><Navbar />
         <main>
          <Hero />
          <HowItWorks />
          <CoursesSection limit={4} />
          <PropertySection limit={8} />
          <Benefits />
          <Earnings />
          <FAQ />
          <Contact /></main><Footer /></>
}
