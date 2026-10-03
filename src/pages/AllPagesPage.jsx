import FinalCta from '../components/FinalCta.jsx';
import QuoteForm from '../components/QuoteForm.jsx';
import YtShortsSection from '../components/YtShortsSection.jsx';
import { JsonLd, breadcrumbSchema } from '../lib/schema.jsx';
import { pageUrl, WA_BOOK, waMsg, asset } from '../lib/site.js';
import { whatsappClick } from '../lib/landing.js';
import { ARTICLES } from '../lib/blog.js';

const GROUPS = [
  {
    label: 'Popular Services',
    items: [
      { icon: '🧹', title: 'Deep Cleaning Services in Gurgaon', text: 'Top-to-bottom refresh for every corner of your home.', href: 'deep-cleaning-services-in-gurgaon.html' },
      { icon: '🏠', title: 'House Cleaning Services in Gurgaon', text: 'Reliable, affordable cleaning for a healthier home.', href: 'house-cleaning-services-in-gurgaon.html' },
      { icon: '🍳', title: 'Kitchen Deep Cleaning in Gurgaon', text: 'Chimney, cabinets, countertops & appliances.', href: 'kitchen-deep-cleaning-gurgaon.html' },
      { icon: '🚿', title: 'Bathroom Deep Cleaning in Gurgaon', text: 'Descaling tiles, faucets, commodes & exhaust fans.', href: 'bathroom-deep-cleaning-gurgaon.html' },
      { icon: '🛋️', title: 'Sofa Shampoo Cleaning in Gurgaon', text: 'Stain removal, odor control, fabric-safe.', href: 'sofa-shampoo-cleaning-gurgaon.html' },
      { icon: '🪑', title: 'Carpet Shampoo Cleaning in Gurgaon', text: 'Deep stain & dust-mite removal for carpets.', href: 'carpet-shampoo-cleaning-gurgaon.html' },
      { icon: '🏢', title: 'Office Deep Cleaning in Gurgaon', text: 'Cabins, pantries, washrooms & floors.', href: 'office-deep-cleaning-gurgaon.html' },
      { icon: '📦', title: 'Move-In / Move-Out Cleaning in Gurgaon', text: 'Leave it spotless — or move into one.', href: 'move-in-move-out-cleaning-gurgaon.html' },
      { icon: '📍', title: 'Residential Cleaners Near Me', text: 'Local, police-verified team at your door.', href: 'residential-cleaners-near-me.html' },
    ],
  },
  {
    label: 'Full Home Packages (by BHK)',
    items: [
      { icon: '1️⃣', title: '1 BHK Full Home Deep Cleaning', text: 'Complete 1 BHK deep cleaning.', href: 'full-home-deep-cleaning-1bhk-gurgaon.html' },
      { icon: '2️⃣', title: '2 BHK Full Home Deep Cleaning', text: 'Complete 2 BHK deep cleaning.', href: 'full-home-deep-cleaning-2bhk-gurgaon.html' },
      { icon: '3️⃣', title: '3 BHK Full Home Deep Cleaning', text: 'Complete 3 BHK deep cleaning.', href: 'full-home-deep-cleaning-3bhk-gurgaon.html' },
      { icon: '4️⃣', title: '4 BHK Full Home Deep Cleaning', text: 'Complete 4 BHK deep cleaning.', href: 'full-home-deep-cleaning-4bhk-gurgaon.html' },
      { icon: '5️⃣', title: '5 BHK Full Home Deep Cleaning', text: 'Complete 5 BHK deep cleaning.', href: 'full-home-deep-cleaning-5bhk-gurgaon.html' },
    ],
  },
  {
    label: 'Blog & Guides',
    items: [
      { icon: '📖', title: 'All Cleaning Guides', text: 'Every article in the blog.', href: 'blog.html' },
      ...ARTICLES.map((a) => ({
        icon: '📖',
        title: a.title,
        text: a.description,
        href: `${a.file}.html`,
      })),
    ],
  },
  {
    label: 'Main & Utility Pages',
    items: [
      { icon: '🏠', title: 'Home', text: 'Aone Deep Cleaning — home page.', href: 'index.html' },
      { icon: '👨‍🔧', title: 'About Us', text: 'Our team, process, areas & transparent pricing.', href: 'about.html' },
      { icon: '📞', title: 'Contact Us', text: 'Get a free quote — call or WhatsApp.', href: 'contact.html' },
      { icon: '✅', title: 'Thank You', text: 'Confirmation page after lead submission.', href: 'thank-you.html' },
      { icon: '🗺️', title: 'Site Map', text: 'XML sitemap for search engines.', href: 'sitemap.xml' },
    ],
  },
];

export default function AllPagesPage({ url, file }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: pageUrl('index') },
        { name: 'All Pages', url },
      ])} />

      <section className="hero" style={{ backgroundImage: `url("${asset(file, '/images/template/home/Balaji-Deep-Cleaning-banner-1.webp')}")` }}>
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <svg width="8" height="8" fill="#4ade80" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
              Everything in one place
            </div>
            <h1>
              <span className="hl">All Pages</span><br />
              <span className="hl2">Aone Deep Cleaning — Gurgaon</span>
            </h1>
            <p className="hero-sub">
              A single directory of every page on this site — services, BHK packages, contact and more. Jump straight to what you need.
            </p>
            <div className="hero-pills">
              <span className="pill"><span className="pi">✓</span> 9 Services</span>
              <span className="pill"><span className="pi">✓</span> 5 BHK Packages</span>
              <span className="pill"><span className="pi">✓</span> {ARTICLES.length} Guides</span>
              <span className="pill"><span className="pi">✓</span> Same-Day Available</span>
              <span className="pill"><span className="pi">✓</span> Pay After Cleaning</span>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      {GROUPS.map((group) => (
        <section key={group.label} className="section section-alt">
          <div className="section-inner">
            <div style={{ textAlign: 'center' }} className="fade-up">
              <div className="section-tag">Navigate</div>
              <h2 className="section-title">{group.label}</h2>
            </div>
            <div className="services-grid" style={{ marginTop: '32px' }}>
              {group.items.map((it) => (
                <a
                  key={it.href + it.title}
                  className="card"
                  href={it.href}
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <div className="card-icon">{it.icon}</div>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">Can't Decide?</div>
            <h2 className="section-title">Talk to Us — We'll Recommend the Right Service</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Tell us your home size or cleaning need and we'll suggest the best package with a free quote.
            </p>
            <div style={{ marginTop: '28px', display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={waMsg('Hi, I need help choosing the right cleaning service in Gurgaon. Please advise.')}
                target="_blank" rel="noopener"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#25D366', color: '#fff', borderRadius: '12px', textDecoration: 'none', fontWeight: 800, fontSize: '.95rem' }}
                onClick={whatsappClick}
              >
                💬 WhatsApp Us
              </a>
              <a
                href={WA_BOOK}
                target="_blank" rel="noopener"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'var(--green)', color: '#fff', borderRadius: '12px', textDecoration: 'none', fontWeight: 800, fontSize: '.95rem' }}
                onClick={whatsappClick}
              >
                🧹 Book Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <YtShortsSection file={file} />

      <FinalCta />
    </>
  );
}
