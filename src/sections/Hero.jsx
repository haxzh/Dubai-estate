
import {
  ArrowUpRight,
  Building2,
  ChevronRight,
  Globe2,
  Play,
  Users
} from 'lucide-react';

import { scrollToSection } from '../utils/navigation';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />

      <div className="container hero-content">
        <div className="eyebrow light">
          <span /> DUBAI'S BROKER NETWORK
        </div>

        <h1>
          Learn the market.
          <br />
          <em>Sell the opportunity.</em>
        </h1>

        <p className="hero-copy">
          A smarter way to build your real estate career. Learn with
          confidence, discover curated opportunities, and connect with the
          people who make Dubai move.
        </p>

        <div className="hero-actions">
          <button
            className="btn btn-gold"
            onClick={() => scrollToSection('contact')}
          >
            Become a Broker
            <ArrowUpRight size={17} />
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => scrollToSection('courses')}
          >
            <Play size={15} fill="currentColor" />
            Explore Courses
          </button>
        </div>

        <div className="trust-row">
          <div>
            <Globe2 size={18} />
            <span>
              <b>Flexible</b> learning
            </span>
          </div>

          <div>
            <Building2 size={18} />
            <span>
              <b>Curated</b> listings
            </span>
          </div>

          <div>
            <Users size={18} />
            <span>
              <b>Broker</b> network
            </span>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        SCROLL TO EXPLORE
        <ChevronRight size={15} />
      </div>
    </section>
  );
}
