import { ARTICLES } from '../lib/blog.js';
import { JsonLd, breadcrumbSchema } from '../lib/schema.jsx';
import { pageUrl, asset } from '../lib/site.js';
import TrustBar from '../components/TrustBar.jsx';

export default function BlogIndexPage({ url, file }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: pageUrl('index') },
          { name: 'Blog', url },
        ])}
      />

      <section className="blog-hero">
        <div className="section-inner">
          <div className="blog-meta">
            <span>Cleaning guides for Gurgaon homes</span>
          </div>
          <h1>Deep Cleaning Blog & Guides</h1>
          <p className="blog-lead">
            Practical, expert-written guides on deep cleaning in Gurgaon — real prices,
            how often to clean, chimney care, hard water and upholstery maintenance.
          </p>
          <p className="blog-lead" style={{ marginTop: '12px' }}>
            Start with your intent: <strong>prices</strong> (cost guides by BHK and service),
            <strong> booking</strong> (near-me dispatch, packages, how to verify a cleaner — <strong>and Urban Company vs us</strong>),
            <strong> know-how</strong> (chimney, hard-water, sofa and carpet methods), or
            <strong> festive</strong> (Diwali, Dussehra and Navratri playbooks from 10+ seasons since 2015).
            Every guide ends with a fixed-price quote path — no “call for price” dead-ends.
            Festive playbooks (Diwali, Dussehra, Navratri) follow the real October–November rush calendar;
            comparison guides (best services, Mr Deep Cleaning vs us) show their scoring openly so you can audit us.
            New here? Read the cost guide for your BHK first, then the booking guide for your situation — you will know exactly what to order before you ever message us.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="blog-grid">
            {ARTICLES.map((a) => (
              <a key={a.slug} className="blog-card" href={`${a.file}.html`}>
                <img
                  src={asset(file, a.image)}
                  alt={a.imageAlt}
                  loading="lazy"
                  width="1200"
                  height="675"
                />
                <div className="blog-card-body">
                  <div className="blog-meta">
                    <span>{a.dateModified}</span>
                    <span>·</span>
                    <span>Guide</span>
                  </div>
                  <h2>{a.title}</h2>
                  <p>{a.description}</p>
                  <span className="blog-card-link">Read guide →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <TrustBar />
    </>
  );
}
