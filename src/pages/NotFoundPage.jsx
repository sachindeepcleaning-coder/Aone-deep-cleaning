import QuoteForm from '../components/QuoteForm.jsx';
import TrustBar from '../components/TrustBar.jsx';
import { JsonLd, breadcrumbSchema } from '../lib/schema.jsx';
import { pageUrl, pageLink } from '../lib/site.js';

// GitHub Pages serves /404.html for unknown paths. Kept useful (not a dead
// end): search box equivalent via popular links + instant quote CTA.
const LINKS = [
  ['Deep Cleaning Services in Gurgaon', '/deep-cleaning-services-in-gurgaon.html'],
  ['House Cleaning Services in Gurgaon', '/house-cleaning-services-in-gurgaon.html'],
  ['Full Home Deep Cleaning (3 BHK)', '/full-home-deep-cleaning-3bhk-gurgaon.html'],
  ['Kitchen Deep Cleaning', '/kitchen-deep-cleaning-gurgaon.html'],
  ['Bathroom Deep Cleaning', '/bathroom-deep-cleaning-gurgaon.html'],
  ['Residential Cleaners Near Me', '/residential-cleaners-near-me.html'],
  ['All Cleaning Guides', '/blog.html'],
  ['Book a Deep Clean', '/contact.html'],
];

export default function NotFoundPage({ url, file }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: pageUrl('index') },
          { name: 'Page Not Found', url },
        ])}
      />

      <section className="section">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <div className="section-tag">404 — Page Not Found</div>
          <h1>This Page Moved or Never Existed</h1>
          <p className="blog-lead" style={{ margin: '0 auto' }}>
            The link you followed is outdated — but every cleaning service below is one tap away,
            with fixed prices and same-day slots across Gurgaon.
          </p>
          <div className="areas-list" style={{ marginTop: '28px', justifyContent: 'center' }}>
            {LINKS.map(([label, href]) => (
              <a key={href} href={pageLink(file, href)} className="area-tag" style={{ color: 'var(--green)', fontWeight: 700 }}>
                {label} →
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner blog-content">
          <QuoteForm />
        </div>
      </section>

      <TrustBar />
    </>
  );
}
