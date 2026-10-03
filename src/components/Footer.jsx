import { PHONE_TEL, SOCIAL, WHATSAPP } from '../lib/site.js';
import { phoneCallClick, whatsappClick } from '../lib/landing.js';

const SERVICE_LINKS = [
  ['Deep Cleaning Services in Gurgaon', '/deep-cleaning-services-in-gurgaon.html'],
  ['House Cleaning Services', '/house-cleaning-services-in-gurgaon.html'],
  ['Kitchen Deep Cleaning Gurgaon', '/kitchen-deep-cleaning-gurgaon.html'],
  ['Bathroom Deep Cleaning Gurgaon', '/bathroom-deep-cleaning-gurgaon.html'],
  ['Sofa Cleaning Gurgaon', '/sofa-shampoo-cleaning-gurgaon.html'],
  ['Carpet Cleaning Gurgaon', '/carpet-shampoo-cleaning-gurgaon.html'],
  ['Office Deep Cleaning Gurgaon', '/office-deep-cleaning-gurgaon.html'],
  ['Move-In Move-Out Gurgaon', '/move-in-move-out-cleaning-gurgaon.html'],
];

const BHK_LINKS = [
  ['1 BHK Deep Cleaning', '/full-home-deep-cleaning-1bhk-gurgaon.html'],
  ['2 BHK Deep Cleaning', '/full-home-deep-cleaning-2bhk-gurgaon.html'],
  ['3 BHK Deep Cleaning', '/full-home-deep-cleaning-3bhk-gurgaon.html'],
  ['4 BHK Deep Cleaning', '/full-home-deep-cleaning-4bhk-gurgaon.html'],
  ['5 BHK Deep Cleaning', '/full-home-deep-cleaning-5bhk-gurgaon.html'],
  ['Residential Cleaners Near Me', '/residential-cleaners-near-me.html'],
  ['Society Cleaning Gurgaon', '/society-cleaning-services-gurgaon.html'],
  ['Book Cleaning Online', '/book-cleaning-online-gurgaon.html'],
];

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="/" className="logo">
            <img src="/images/template/logo.webp?v=3" alt="Aone Deep Cleaning logo" className="logo-icon" width="163" height="48" loading="lazy" decoding="async" />
          </a>
          <p>Professional deep cleaning in Gurgaon since 2015 — police-verified team, eco-friendly products, pay only after you approve the work.</p>
          <p style={{ marginTop: '12px' }}>📍 Serving all of Gurgaon, Haryana</p>
          <p>📞 <a href={PHONE_TEL} onClick={phoneCallClick}>+91 92679-05943</a></p>
          <p style={{ marginTop: '12px' }}>
            <a href={SOCIAL.facebook} target="_blank" rel="noopener" style={{ marginRight: '14px' }}>Facebook</a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener" style={{ marginRight: '14px' }}>Instagram</a>
            <a href={SOCIAL.youtube} target="_blank" rel="noopener" style={{ marginRight: '14px' }}>YouTube</a>
            <a href={SOCIAL.twitter} target="_blank" rel="noopener" style={{ marginRight: '14px' }}>X</a>
            <a href={WHATSAPP} target="_blank" rel="noopener" onClick={whatsappClick}>WhatsApp</a>
          </p>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          {SERVICE_LINKS.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
        <div className="footer-col">
          <h4>BHK Packages</h4>
          {BHK_LINKS.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <a href="/about.html">About Us</a>
          <a href="/blog.html">Blog &amp; Guides</a>
          <a href="/blog/deep-cleaning-cost-gurgaon-2026.html">Deep Cleaning Cost Guide</a>
          <a href="/blog/urban-company-vs-sachin-deep-cleaning.html">Urban Company vs Aone</a>
          <a href="/blog/diwali-cleaning-gurgaon.html">Diwali Cleaning Gurgaon</a>
          <a href="/contact.html">Contact Us</a>
          <a href="/all-pages.html">All Pages</a>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Aone Deep Cleaning. All rights reserved.</div>
    </footer>
  );
}
