import Hero from '../components/Hero.jsx';
import TrustBar from '../components/TrustBar.jsx';
import LocalReel from '../components/LocalReel.jsx';
import CountdownStrip from '../components/CountdownStrip.jsx';
import ServiceSection from '../components/ServiceSection.jsx';
import ChecklistSection from '../components/ChecklistSection.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';
import WhyUsSection from '../components/WhyUsSection.jsx';
import PricingSection from '../components/PricingSection.jsx';
import GuaranteeSection from '../components/GuaranteeSection.jsx';
import AreasSection from '../components/AreasSection.jsx';
import FaqSection from '../components/FaqSection.jsx';
import FinalCta from '../components/FinalCta.jsx';
import { JsonLd, websiteSchema, localBusinessSchema, faqSchema, reviewsSchema } from '../lib/schema.jsx';
import { FAQS, REVIEWS } from '../lib/landing.js';

export default function IndexPage({ url }) {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <JsonLd data={localBusinessSchema({ url })} />
      <JsonLd data={faqSchema(FAQS.map(([q, a]) => ({ q, a })))} />
      <JsonLd data={reviewsSchema(REVIEWS, 'Deep Cleaning Services in Gurgaon')} />

      <Hero />
      <TrustBar />
      <section className="section">
        <div className="section-inner split">
          <div className="fade-up">
            <img src="/images/template/about.webp" alt="Aone Deep Cleaning professional team at work in Gurgaon" className="split-img" loading="lazy" width="570" height="420" />
          </div>
          <div className="split-text fade-up">
            <div className="section-tag">About Aone Deep Cleaning</div>
            <h2 className="section-title">Professional Deep Cleaning Services in Gurgaon</h2>
            <p>Now quality deep cleaning services in Gurgaon are just a phone call away. Polite, friendly and efficient, our staff guarantee a top-quality clean on a timetable that suits you — since 2015.</p>
            <ul className="split-points">
              <li>Police-verified &amp; trained cleaning teams</li>
              <li>Eco-friendly, kid &amp; pet-safe products</li>
              <li>Fixed BHK prices — pay only after approval</li>
              <li>Same-day slots across all Gurgaon sectors</li>
            </ul>
            <div className="hero-actions">
              <a href="/about.html" className="btn btn-primary">Know More →</a>
              <a href="/contact.html" className="btn btn-outline">Contact Us</a>
            </div>
          </div>
        </div>
      </section>
      <LocalReel />
      <CountdownStrip />
      <ServiceSection />
      <ChecklistSection />
      <HowItWorks />
      <ReviewsSection />
      <WhyUsSection />
      <PricingSection />
      <GuaranteeSection />
      <AreasSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}