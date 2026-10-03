import { track } from '../lib/landing.js';
import { asset, pageLink } from '../lib/site.js';

const SERVICES = [
  { img: '/images/template/service/home-cleaning.jpg', name: 'Full Home Deep Cleaning', url: '/full-home-deep-cleaning-1bhk-gurgaon.html', price: 'From ₹2,500', desc: 'Every room, floor to ceiling — bedrooms, kitchen, bathrooms, balconies. Priced by BHK.' },
  { img: '/images/template/deep-clean-service-1.jpg', name: 'Deep Cleaning Services', url: '/deep-cleaning-services-in-gurgaon.html', price: 'From ₹2,000', desc: 'A top-to-bottom refresh beyond routine sweeping — scrubbed, sanitized, detailed.' },
  { img: '/images/template/slider-services/home-service.jpg', name: 'House Cleaning', url: '/house-cleaning-services-in-gurgaon.html', price: 'From ₹499', desc: 'One-time or weekly plans to keep your Gurgaon home consistently spotless.' },
  { img: '/images/template/slider-services/kitchen-service.jpg', name: 'Kitchen Deep Cleaning', url: '/kitchen-deep-cleaning-gurgaon.html', price: 'From ₹1,500', desc: 'Chimney, exhaust, hob, cabinets and tiles — fully degreased and hygienic.' },
  { img: '/images/template/slider-services/bathroom-service.jpg', name: 'Bathroom Deep Cleaning', url: '/bathroom-deep-cleaning-gurgaon.html', price: 'From ₹800', desc: 'Hard-water stains, grout and mould removed; fully sanitized and polished.' },
  { img: '/images/template/slider-services/sofa-service.png', name: 'Sofa Shampoo Cleaning', url: '/sofa-shampoo-cleaning-gurgaon.html', price: 'From ₹499/seat', desc: 'Stain, dust-mite and odor removal — dry or shampoo extraction per seat.' },
  { img: '/images/template/slider-services/carpet-service.jpg', name: 'Carpet Shampoo Cleaning', url: '/carpet-shampoo-cleaning-gurgaon.html', price: 'From ₹18/sq ft', desc: 'Deep extraction for carpets and rugs.' },
  { img: '/images/template/service/office-cleaning.jpg', name: 'Office Deep Cleaning', url: '/office-deep-cleaning-gurgaon.html', price: 'From ₹5,000', desc: 'Workstations, pantries, washrooms and carpets — cleaned after hours.' },
  { img: '/images/template/slider-services/bedroom-service.jpg', name: 'Move-In / Move-Out Cleaning', url: '/move-in-move-out-cleaning-gurgaon.html', price: 'From ₹1,999', desc: 'Spotless handovers and move-in ready homes — checklist sign-off included.' },
];

export default function ServiceSection({ file }) {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="services-head fade-up">
          <div className="section-tag">Our Services</div>
          <h2 className="section-title">Deep Cleaning Services in Gurgaon</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Complete, professional deep cleaning for homes and offices across Gurgaon — eco-friendly products, police-verified team, ₹200 OFF today.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <a key={s.name} href={pageLink(file, s.url)} className="service-card fade-up" onClick={() => track('service_select', { event_category: 'Engagement', event_label: s.name })}>
              <img src={asset(file, s.img)} alt={`${s.name} in Gurgaon`} className="sc-img" loading="lazy" width="400" height="200" />
              <div className="sc-body">
                <div className="sc-name">{s.name}</div>
                <div className="sc-desc">{s.desc}</div>
                <div className="sc-price">{s.price}</div>
                <div className="sc-cta">View Details →</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
