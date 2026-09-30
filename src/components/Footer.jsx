import { PHONE_TEL } from '../lib/site.js';
import { phoneCallClick } from '../lib/landing.js';

export default function Footer() {
  return (
    <footer>
      <p><strong>Balaji Deep Cleaning Services</strong> — Professional Deep Cleaning in Gurgaon</p>
      <p>📍 Serving all of Gurgaon, Haryana &nbsp;|&nbsp; 📞 <a href={PHONE_TEL} onClick={phoneCallClick}>+91 95607-39281</a></p>
      <p style={{ marginTop: '10px' }}>© {new Date().getFullYear()} Balaji Deep Cleaning. All rights reserved.</p>
      <p style={{ marginTop: '6px' }}>
        <a href="/deep-cleaning-services-in-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Deep Cleaning Services in Gurgaon</a>
        <a href="/house-cleaning-services-in-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>House Cleaning Services</a>
        <a href="/full-home-deep-cleaning-1bhk-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>1 BHK</a>
        <a href="/full-home-deep-cleaning-2bhk-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>2 BHK</a>
        <a href="/full-home-deep-cleaning-3bhk-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>3 BHK</a>
        <a href="/full-home-deep-cleaning-4bhk-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>4 BHK</a>
        <a href="/full-home-deep-cleaning-5bhk-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>5 BHK</a>
        <a href="/kitchen-deep-cleaning-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Kitchen Deep Cleaning Gurgaon</a>
        <a href="/bathroom-deep-cleaning-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Bathroom Deep Cleaning Gurgaon</a>
        <a href="/sofa-shampoo-cleaning-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Sofa Cleaning Gurgaon</a>
        <a href="/carpet-shampoo-cleaning-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Carpet Cleaning Gurgaon</a>
        <a href="/office-deep-cleaning-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Office Deep Cleaning Gurgaon</a>
        <a href="/move-in-move-out-cleaning-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Move-In Move-Out Gurgaon</a>
        <a href="/residential-cleaners-near-me.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Residential Cleaners Near Me</a>
        <a href="/society-cleaning-services-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Society Cleaning Gurgaon</a>
        <a href="/book-cleaning-online-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Book Cleaning Online</a>
      </p>
      <p style={{ marginTop: '6px' }}>
        <span style={{ color: '#8FA4BE', marginRight: '16px' }}>Top Guides:</span>
        <a href="/blog/deep-cleaning-cost-gurgaon-2026.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Deep Cleaning Cost Guide</a>
        <a href="/blog/urban-company-vs-sachin-deep-cleaning.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Urban Company vs Balaji</a>
        <a href="/blog/nobroker-cleaning-vs-sachin-deep-cleaning.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>NoBroker vs Balaji</a>
        <a href="/blog/safaiwale-vs-sachin-deep-cleaning.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Safaiwale vs Balaji</a>
        <a href="/blog/diwali-cleaning-gurgaon.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Diwali Cleaning Gurgaon</a>
      </p>
      <p style={{ marginTop: '6px' }}>
        <a href="/all-pages.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>All Pages</a>
        <a href="/about.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>About Us</a>
        <a href="/blog.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Blog</a>
        <a href="/contact.html" style={{ color: '#8FA4BE', textDecoration: 'none', marginRight: '16px' }}>Contact</a>
        <a href="/sitemap.xml" style={{ color: '#8FA4BE', textDecoration: 'none' }}>Sitemap</a>
      </p>
    </footer>
  );
}