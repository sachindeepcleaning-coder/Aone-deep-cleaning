import { JsonLd, articleSchema, faqSchema, breadcrumbSchema } from '../lib/schema.jsx';
import { getArticle } from '../lib/blog.js';
import { pageUrl } from '../lib/site.js';
import { imageDims, srcSetFor } from '../lib/image-dims.js';
import QuoteForm from '../components/QuoteForm.jsx';
import FaqSection from '../components/FaqSection.jsx';
import TrustBar from '../components/TrustBar.jsx';

// Renders inline **bold** markdown and [anchor](/path.html) links in article text.
function Rich({ text }) {
  const segs = String(text).split(/(\[[^\]]+\]\([^)]+\))/g);
  return segs.map((s, i) => {
    const m = s.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (m) {
      const ext = /^https?:/.test(m[2]);
      return <a key={i} href={m[2]} {...(ext ? { target: '_blank', rel: 'noopener' } : {})} style={{ color: 'var(--primary)', fontWeight: 700 }}>{m[1]}</a>;
    }
    return String(s).split(/\*\*(.+?)\*\*/g).map((p, j) => (j % 2 === 1 ? <strong key={`${i}-${j}`}>{p}</strong> : p));
  });
}

function slugId(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 60);
}
function renderBlock(b, key) {
  switch (b.t) {
    case 'p': return <p key={key} className="blog-p"><Rich text={b.x} /></p>;
    case 'lead': return <p key={key} className="blog-lead"><Rich text={b.x} /></p>;
    case 'h2': return <h2 key={key} id={slugId(b.x)} className="blog-h2">{b.x}</h2>;
    case 'h3': return <h3 key={key} id={slugId(b.x)} className="blog-h3">{b.x}</h3>;
    case 'table':
      return (
        <div key={key} className="blog-table-wrap">
          <table className="blog-table">
            <thead>
              <tr>{b.head.map((h, i) => <th key={i}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {b.rows.map((r, ri) => (
                <tr key={ri}>{r.map((c, ci) => <td key={ci}><Rich text={c} /></td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'ul': return <ul key={key} className="blog-ul">{b.items.map((it, i) => <li key={i}><Rich text={it} /></li>)}</ul>;
    case 'ol': return <ol key={key} className="blog-ol">{b.items.map((it, i) => <li key={i}><Rich text={it} /></li>)}</ol>;
    case 'tip': return <div key={key} className="blog-tip"><Rich text={b.x} /></div>;
    default: return null;
  }
}

function readingMinutes(article) {
  let words = 0;
  for (const b of article.blocks) {
    if (b.x) words += String(b.x).split(/\s+/).length;
    if (b.items) words += b.items.join(' ').split(/\s+/).length;
    if (b.rows) words += b.rows.flat().join(' ').split(/\s+/).length;
  }
  return Math.max(3, Math.round(words / 200));
}

// Second in-content visual: every article ships a hero, so a mid-article
// process/proof image doubles image depth using existing assets (no new files).
// Keyed by the article CTA so the visual matches the money page it feeds.
const SECONDARY_IMAGES = {
  '/deep-cleaning-services-in-gurgaon.html': { src: '/images/full-home-2bhk-deep-cleaning.webp', alt: 'Full home deep cleaning in progress — machine-scrubbed floors in a Gurgaon 2 BHK' },
  '/house-cleaning-services-in-gurgaon.html': { src: '/images/house-cleaning.webp', alt: 'Scheduled house cleaning visit in a Gurgaon home — dusting, mopping and bathrooms' },
  '/kitchen-deep-cleaning-gurgaon.html': { src: '/images/kitchen-deep-cleaning.webp', alt: 'Chimney filter dismantled for degreasing during a kitchen deep clean in Gurgaon' },
  '/bathroom-deep-cleaning-gurgaon.html': { src: '/images/bathroom-deep-cleaning.webp', alt: 'Bathroom tiles being descaled to remove hard-water stains in Gurgaon' },
  '/sofa-shampoo-cleaning-gurgaon.html': { src: '/images/sofa-shampoo-cleaning.webp', alt: 'Sofa shampoo extraction lifting dust mites and stains in Gurgaon' },
  '/carpet-shampoo-cleaning-gurgaon.html': { src: '/images/carpet-shampoo-cleaning.webp', alt: 'Hot-water carpet extraction in a Gurgaon living room' },
  '/office-deep-cleaning-gurgaon.html': { src: '/images/office-deep-cleaning.jpg', alt: 'After-hours office deep cleaning in Gurgaon — workstations and floors' },
  '/move-in-move-out-cleaning-gurgaon.html': { src: '/images/full-home-deep-cleaning.webp', alt: 'Empty flat being deep cleaned for a move-in handover in Gurgaon' },
  '/full-home-deep-cleaning-1bhk-gurgaon.html': { src: '/images/full-home-deep-cleaning.webp', alt: 'Compact 1 BHK deep cleaned top to bottom in a single visit' },
  '/full-home-deep-cleaning-2bhk-gurgaon.html': { src: '/images/full-home-2bhk-deep-cleaning.webp', alt: 'Two-bedroom home deep cleaning — kitchen, baths and living areas' },
  '/full-home-deep-cleaning-3bhk-gurgaon.html': { src: '/images/full-home-3bhk-deep-cleaning.webp', alt: 'Three-bedroom family home deep cleaning in Gurgaon' },
  '/full-home-deep-cleaning-4bhk-gurgaon.html': { src: '/images/full-home-4bhk-deep-cleaning.webp', alt: 'Four-bedroom villa deep cleaning with marble-safe products' },
  '/full-home-deep-cleaning-5bhk-gurgaon.html': { src: '/images/full-home-5bhk-deep-cleaning.webp', alt: 'Luxury villa deep cleaning in Gurgaon — premium finishes' },
  '/residential-cleaners-near-me.html': { src: '/images/cleaning-1.jpg', alt: 'Verified residential cleaner at work in a Gurgaon home' },
  '/book-cleaning-online-gurgaon.html': { src: '/images/house-cleaning.webp', alt: 'Online-booked home cleaning in Gurgaon — no app needed' },
};

function secondaryImage(article) {
  // Per-article second visual (image2) keeps office-hub pages on-topic;
  // otherwise fall back to the CTA-mapped category image, then site defaults.
  if (article.image2 && article.image2 !== article.image) {
    return { src: article.image2, alt: article.image2Alt || article.title };
  }
  const mapped = (article.cta && SECONDARY_IMAGES[article.cta.href]) || SECONDARY_IMAGES['/deep-cleaning-services-in-gurgaon.html'];
  const fallbacks = [mapped, SECONDARY_IMAGES['/deep-cleaning-services-in-gurgaon.html'], { src: '/images/cleaning-1.jpg', alt: 'Professional deep cleaning in a Gurgaon home by Balaji Deep Cleaning' }];
  for (const img of fallbacks) {
    if (img && img.src !== article.image) return img;
  }
  return null;
}

export default function BlogArticlePage({ file = 'blog', url = '' }) {
  const article = getArticle(file);

  if (!article) {
    return (
      <section className="section">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <h1>Article not found</h1>
          <p style={{ color: 'var(--muted)' }}>This guide does not exist. <a href="/blog.html" style={{ color: 'var(--primary)' }}>Browse all guides</a>.</p>
        </div>
      </section>
    );
  }

  const mins = readingMinutes(article);
  const faqs = article.faqs;

  return (
    <>
      <JsonLd data={articleSchema({ title: article.title, description: article.description, url, datePublished: article.datePublished, dateModified: article.dateModified, image: article.image })} />
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: pageUrl('index') },
          { name: 'Blog', url: pageUrl('blog') },
          { name: article.title, url },
        ])}
      />

      <section className="blog-hero">
        <div className="section-inner">
          <div className="blog-meta">
            <a href="/blog.html" className="blog-back">← All guides</a>
            <span>Updated {article.dateModified}</span>
            <span>·</span>
            <span>{mins} min read</span>
            <span>·</span>
            <span>By <a href="/about.html#sachin-kumar" style={{ color: 'var(--primary)', fontWeight: 700 }}>Balaji Deep Cleaning</a>, Founder</span>
          </div>
          <h1>{article.title}</h1>
          {article.printable && (
            <div style={{ margin: '14px 0 4px' }}>
              <button className="blog-print-btn" onClick={() => window.print()} style={{ background: 'var(--dark)', color: '#fff', fontWeight: 700, fontSize: '.85rem', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>
                🖨️ Print checklist / Save as PDF
              </button>
            </div>
          )}
          <img
            src={article.image}
            srcSet={srcSetFor(article.image)}
            sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 860px"
            alt={article.imageAlt}
            width={imageDims(article.image)[0]}
            height={imageDims(article.image)[1]}
            className="blog-hero-img"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>

      <section className="section">
        <div className="section-inner blog-content">
          <QuoteForm />
          <article>
            {article.blocks.slice(0, Math.ceil(article.blocks.length / 2)).map((b, i) => renderBlock(b, `${b.t}-${i}`))}
            {secondaryImage(article) && (
              <img
                src={secondaryImage(article).src}
                alt={secondaryImage(article).alt}
                width={imageDims(secondaryImage(article).src)[0]}
                height={imageDims(secondaryImage(article).src)[1]}
                className="blog-hero-img"
                loading="lazy"
                decoding="async"
              />
            )}
            {article.blocks.slice(Math.ceil(article.blocks.length / 2)).map((b, i) => renderBlock(b, `${b.t}-b${i}`))}
          </article>
          {article.cta && (
            <div className="blog-cta">
              <h2 className="blog-h2" style={{ marginTop: 0 }}>{article.cta.title}</h2>
              <p>
                <strong>{article.title}</strong>? Our police-verified team in Gurgaon handles it for you — with a fixed quote before we start and pay-after-satisfaction. Same-day slots are often available if you book before noon.
              </p>
              <a href={article.cta.href} className="blog-cta-btn">{article.cta.label}</a>
              <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                {[
                  { href: '/deep-cleaning-services-in-gurgaon.html', label: 'Deep Cleaning Services in Gurgaon →' },
                  { href: '/house-cleaning-services-in-gurgaon.html', label: 'House Cleaning Services in Gurgaon →' },
                  { href: '/kitchen-deep-cleaning-gurgaon.html', label: 'Kitchen Deep Cleaning Gurgaon →' },
                  // blog-seo-check §5.5: never repeat the CTA destination in body links.
                  { href: '/bathroom-deep-cleaning-gurgaon.html', label: 'Bathroom Deep Cleaning Gurgaon →' },
                  { href: '/sofa-shampoo-cleaning-gurgaon.html', label: 'Sofa Shampoo Cleaning Gurgaon →' },
                ].filter((l) => !article.cta || l.href !== article.cta.href).slice(0, 3).map((l) => (
                  <a key={l.href} href={l.href} style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '.88rem' }}>{l.label}</a>
                ))}
              </div>
            </div>
          )}
          {faqs.length > 0 && (
            <div className="blog-faq">
              <FaqSection faqs={faqs.map((f) => [f.q, f.a])} />
            </div>
          )}
          {article.sources && article.sources.length > 0 && (
            <div className="blog-sources">
              <h2 className="blog-h2">Sources & further reading</h2>
              <ul className="blog-ul">
                {article.sources.map((s, i) => (
                  <li key={i}><a href={s.href} target="_blank" rel="noopener" style={{ color: 'var(--primary)', fontWeight: 700 }}>{s.label}</a></li>
                ))}
              </ul>
            </div>
          )}
          <p className="blog-end" style={{ textAlign: 'center', marginTop: '40px' }}>
            <a href="/blog.html" style={{ color: 'var(--primary)', fontWeight: 700 }}>More cleaning guides for Gurgaon homes →</a>
          </p>
        </div>
      </section>

      <TrustBar />
    </>
  );
}
