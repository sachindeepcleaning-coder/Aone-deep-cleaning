import QuoteForm from '../components/QuoteForm.jsx';
import TrustBar from '../components/TrustBar.jsx';
import PricingSection from '../components/PricingSection.jsx';
import PricingTable from '../components/PricingTable.jsx';
import WhyUsSection from '../components/WhyUsSection.jsx';
import BeforeAfter from '../components/BeforeAfter.jsx';
import GuaranteeSection from '../components/GuaranteeSection.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import FaqSection from '../components/FaqSection.jsx';
import YtShortsSection from '../components/YtShortsSection.jsx';
import OfficeReelSection from '../components/OfficeReelSection.jsx';
import RelatedServices from '../components/RelatedServices.jsx';
import RelatedGuides from '../components/RelatedGuides.jsx';
import { JsonLd, localBusinessSchema, serviceSchema, faqSchema, breadcrumbSchema, reviewsSchema } from '../lib/schema.jsx';
import { trustVariantFor, guaranteeVariantFor } from '../lib/trust-variants.js';
import { imageDims, srcSetFor } from '../lib/image-dims.js';
import { getService } from '../lib/services.js';
import { pageUrl } from '../lib/site.js';

// Renders inline **bold** markdown and [anchor](/path.html) links in service copy.
// Same authoring convention as BlogArticlePage.jsx, so editors write internal
// links identically on blog and service pages.
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

// Strips inline markdown so structured-data descriptions stay plain text.
function plain(text) {
  return String(text).replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '');
}

export default function ServicePage({ serviceKey, bhk, url = '' }) {
  const s = getService(serviceKey, bhk);
  // 2026-09-20 audit: vary the shared trust blocks per service group so the
  // 13 service pages don't render byte-identical WhyUs/Guarantee/TrustBar.
  const trustVariant = trustVariantFor(serviceKey);
  const guaranteeVariant = guaranteeVariantFor(serviceKey);
  // Per-BHK review rotation: the 5 BHK pages share one review pool, so each
  // size leads with a different real review instead of the identical order.
  const reviews = serviceKey === 'fullhome' && bhk
    ? [...s.reviews.slice(bhk % s.reviews.length), ...s.reviews.slice(0, bhk % s.reviews.length)]
    : s.reviews;

  return (
    <>
      <JsonLd data={localBusinessSchema({ url })} />
      <JsonLd data={serviceSchema({ name: s.name, description: plain(s.intro), url, price: s.price, image: s.image })} />
      <JsonLd data={faqSchema(s.faqs)} />
      <JsonLd data={reviewsSchema(reviews, s.name)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: pageUrl('index') },
          ...(serviceKey === 'fullhome' && bhk
            ? [{ name: 'Full Home Deep Cleaning', url: pageUrl('full-home-deep-cleaning-1bhk-gurgaon') }]
            : serviceKey === 'fullhome'
              ? []
              : serviceKey !== 'index'
                ? [{ name: 'Services', url: pageUrl('deep-cleaning-services-in-gurgaon') }]
                : []),
          { name: s.name, url },
        ])}
      />
      {serviceKey === 'deep' && (
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: `${s.name} — Real Cleaning Video Gurgaon`,
          description: `Watch real ${s.name.toLowerCase()} work by Balaji Deep Cleaning team in Gurgaon — before/after, 60 seconds.`,
          thumbnailUrl: `https://balajicleaningservice.shop${s.image}`,
          uploadDate: '2026-08-28',
          duration: 'PT60S',
          isFamilyFriendly: true,
          author: { '@type': 'Person', name: 'Sachin Kumar', url: 'https://balajicleaningservice.shop/about.html#sachin-kumar' },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://balajicleaningservice.shop/#business',
            name: 'Balaji Deep Cleaning',
          },
          contentUrl: 'https://www.youtube.com/shorts/p-ArftUay5I',
          embedUrl: 'https://www.youtube.com/shorts/p-ArftUay5I',
        }}
      />
      )}

      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <svg width="8" height="8" fill="#4ade80" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
              {s.tagline}
            </div>
            <h1>
              <span className="hl">{s.name}</span>
            </h1>
            <p className="hero-sub"><Rich text={s.intro} /> {s.price?.amount && s.price.amount !== 'request' && <strong>{s.price.amount} onwards.</strong>}</p>
            <div className="hero-pills">
              <span className="pill"><span className="pi">✓</span> Same-Day Service</span>
              <span className="pill"><span className="pi">✓</span> Police-Verified Team</span>
              <span className="pill"><span className="pi">✓</span> Pay After Cleaning</span>
              <span className="pill"><span className="pi">✓</span> Eco-Friendly</span>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <TrustBar variant={trustVariant} />

      {/* Competitor-inspired: 8-service grid on deep page — improves topical clustering & internal linking */}
      {serviceKey === 'deep' && (
        <section className="section section-alt">
          <div className="section-inner">
            <div style={{ textAlign: 'center' }} className="fade-up">
              <div className="section-tag">Our services</div>
              <h2 className="section-title">Deep Cleaning Sub-Services in Gurgaon</h2>
              <p className="section-sub" style={{ margin: '0 auto' }}>8 specialised services, each with a confirmed upfront price — no surprises on the day.</p>
            </div>
            <div className="services-grid" style={{ marginTop: 32 }}>
              <a className="service-card" href="/full-home-deep-cleaning-3bhk-gurgaon.html"><div className="sc-icon">🏠</div><div className="sc-name">Full Home Cleaning</div><div className="sc-desc">Every room top to bottom</div><div className="sc-price">From ₹2,500</div></a>
              <a className="service-card" href="/office-deep-cleaning-gurgaon.html"><div className="sc-icon">🏢</div><div className="sc-name">Office &amp; Shop Cleaning</div><div className="sc-desc">Workstations & washrooms</div><div className="sc-price">From ₹5,000</div></a>
              <a className="service-card" href="/kitchen-deep-cleaning-gurgaon.html"><div className="sc-icon">🍳</div><div className="sc-name">Kitchen Deep Cleaning</div><div className="sc-desc">Chimney & hob degreasing</div><div className="sc-price">From ₹1,500</div></a>
              <a className="service-card" href="/bathroom-deep-cleaning-gurgaon.html"><div className="sc-icon">🚿</div><div className="sc-name">Bathroom Cleaning</div><div className="sc-desc">Descaling & sanitization</div><div className="sc-price">From ₹800</div></a>
              <a className="service-card" href="/sofa-shampoo-cleaning-gurgaon.html"><div className="sc-icon">🛋️</div><div className="sc-name">Sofa Cleaning</div><div className="sc-desc">Shampoo & extraction</div><div className="sc-price">From ₹499/seat</div></a>
              <a className="service-card" href="/carpet-shampoo-cleaning-gurgaon.html"><div className="sc-icon">🧶</div><div className="sc-name">Carpet Cleaning</div><div className="sc-desc">Hot-water extraction</div><div className="sc-price">From ₹18/sq ft</div></a>
              <a className="service-card" href="/house-cleaning-services-in-gurgaon.html"><div className="sc-icon">✨</div><div className="sc-name">House Cleaning</div><div className="sc-desc">Regular upkeep plans</div><div className="sc-price">From ₹499</div></a>
              <a className="service-card" href="/move-in-move-out-cleaning-gurgaon.html"><div className="sc-icon">📦</div><div className="sc-name">Move-In / Move-Out</div><div className="sc-desc">Empty-flat handover</div><div className="sc-price">From ₹1,999</div></a>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }} className="fade-up">
            <div className="section-tag">Why It Matters</div>
            <h2 className="section-title">About {s.name}</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Here's what a proper deep clean actually involves — and why it matters for your Gurgaon home.</p>
          </div>
          <div className="about-wrap fade-up" style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center', marginTop: '32px' }}>
            <div style={{ flex: '1 1 300px', minWidth: 0 }}>
              {s.detail.split('\n\n').map((p, i) => (
                <p key={i} style={{ margin: '0 0 16px', lineHeight: 1.75, color: 'var(--muted)' }}><Rich text={p} /></p>
              ))}
            </div>
            <div style={{ flex: '1 1 300px', minWidth: 0 }}>
              <img
                src={s.image}
                srcSet={srcSetFor(s.image)}
                sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 600px"
                alt={s.imageAlt}
                loading="lazy"
                width={imageDims(s.image)[0]}
                height={imageDims(s.image)[1]}
                style={{ width: '100%', height: 'auto', borderRadius: '14px', display: 'block' }}
              />
              {serviceKey === 'move' && (
                <p style={{ marginTop: '10px', fontSize: '.82rem', color: 'var(--muted)', fontStyle: 'italic' }}>
                  Representative Gurgaon empty-flat handover photo. Your flat may differ — we adapt the checklist to your layout.
                </p>
              )}
            </div>          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">What's Included</div>
            <h2 className="section-title">Everything We Cover</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Every service comes with expert attention to detail and eco-friendly products.</p>
          </div>
          <div className="checklist-grid">
            {s.includes.map((i) => (
              <div key={i} className="checklist-item fade-up">
                <div className="checklist-icon">✓</div>
                <div>
                  <div className="checklist-title">{i.split('\u2013')[0]}</div>
                  <div className="checklist-desc">{i}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {s.process && (
        <section className="section section-alt">
          <div className="section-inner">
            <div style={{ textAlign: 'center' }} className="fade-up">
              <div className="section-tag">How It Works</div>
              <h2 className="section-title">{s.name} — Step by Step</h2>
              <p className="section-sub" style={{ margin: '0 auto' }}>Here&apos;s exactly what our team does on the day.</p>
            </div>
            <div className="hiw-wrap">
              {s.process.map((p) => (
                <div key={p.step} className="hiw-step fade-up">
                  <div className="hiw-num">{p.step}</div>
                  <div className="hiw-title">{p.title}</div>
                  <div className="hiw-desc">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <WhyUsSection variant={trustVariant} />

      {/* Competitor-inspired transparent pricing table — deep shows full table, others keep cards */}
      {s.pricingTable ? <PricingTable rows={s.pricingTable} /> : (!['kitchen', 'bathroom', 'sofa', 'carpet'].includes(serviceKey) && <PricingSection />)}

      {/* Public price check — verified-figures comparison for the money keyword */}
      {s.priceCheck && (
        <section className="section section-alt">
          <div className="section-inner">
            <div style={{ textAlign: 'center' }} className="fade-up">
              <div className="section-tag">Honest Pricing</div>
              <h2 className="section-title">{s.priceCheck.title}</h2>
              <p className="section-sub" style={{ margin: '0 auto' }}>{s.priceCheck.note}</p>
            </div>
            <div className="fade-up" style={{ marginTop: 32, overflowX: 'auto', borderRadius: 14, border: '1px solid var(--border)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--card)' }}>
                <thead><tr style={{ background: 'var(--primary)' }}>{s.priceCheck.head.map((h) => (
                  <th key={h} style={{ padding: '14px 20px', color: '#fff', textAlign: 'left' }}>{h}</th>
                ))}</tr></thead>
                <tbody>
                  {s.priceCheck.rows.map((r, i) => (
                    <tr key={i} style={{ background: i % 2 ? 'var(--card)' : 'var(--bg-alt)' }}>
                      {r.map((c, j) => (
                        <td key={j} style={{ padding: '13px 20px', borderBottom: '1px solid var(--border)', color: j === 1 ? 'var(--primary)' : 'inherit', fontWeight: j === 1 ? 700 : 400 }}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Sqft pricing + BHK/sqft table — fixed prices before team arrives */}
      {(serviceKey === 'fullhome' || serviceKey === 'deep') && s.sqftByBhk && (
        <section className="section section-alt">
          <div className="section-inner">
            <div style={{ textAlign: 'center' }} className="fade-up">
              <div className="section-tag">Pricing by Area</div>
              <h2 className="section-title">Price by BHK & Sq Ft — No Guesswork</h2>
              <p className="section-sub" style={{ margin: '0 auto' }}>Every BHK&apos;s sq ft range is fixed before the team arrives — no hidden charges, no surprises on the day.</p>
            </div>
            <div className="fade-up" style={{ marginTop: 32, overflowX: 'auto', borderRadius: 14, border: '1px solid var(--border)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--card)' }}>
                <thead><tr style={{ background: 'var(--primary)' }}><th style={{ padding: '14px 20px', color: '#fff', textAlign: 'left' }}>BHK</th><th style={{ padding: '14px 20px', color: '#fff', textAlign: 'left' }}>Area</th><th style={{ padding: '14px 20px', color: '#fff', textAlign: 'left' }}>Price</th></tr></thead>
                <tbody>
                  {[1,2,3,4,5].map((n) => (
                    <tr key={n} style={{ background: n % 2 ? 'var(--card)' : 'var(--bg-alt)' }}>
                      <td style={{ padding: '13px 20px', borderBottom: '1px solid var(--border)' }}>{n} BHK</td>
                      <td style={{ padding: '13px 20px', borderBottom: '1px solid var(--border)' }}>{s.sqftByBhk[n]}</td>
                      <td style={{ padding: '13px 20px', borderBottom: '1px solid var(--border)', color: 'var(--primary)', fontWeight: 700 }}>{s.priceByBhk[n]}</td>
                    </tr>
                  ))}
                  <tr style={{ background: 'var(--card)' }}><td style={{ padding: '13px 20px' }}>1 RK / Studio</td><td style={{ padding: '13px 20px' }}>Up to 400 sq ft</td><td style={{ padding: '13px 20px', color: 'var(--primary)', fontWeight: 700 }}>₹2,000</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Before/After — Safaiwale 6-image proof, we show 3 sliders */}
      {(serviceKey === 'deep' || serviceKey === 'fullhome') && (
        <section className="section">
          <div className="section-inner">
            <div style={{ textAlign: 'center' }} className="fade-up">
              <div className="section-tag">Real Results</div>
              <h2 className="section-title">From Dusty to Dazzling — Before & After</h2>
              <p className="section-sub" style={{ margin: '0 auto' }}>Drag the slider — real Gurgaon homes, not stock. Same 8-hour process you’ll get.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginTop: 32 }}>
              <div className="fade-up"><BeforeAfter before="/images/bathroom-deep-cleaning.jpg" after="/images/full-home-deep-cleaning.jpg" beforeLabel="Before — Hard-water scale" afterLabel="After — Descaled" /></div>
              <div className="fade-up"><BeforeAfter before="/images/sofa-shampoo-cleaning.jpg" after="/images/carpet-shampoo-cleaning.jpg" beforeLabel="Before — Dusty" afterLabel="After — Extracted" /></div>
              <div className="fade-up"><BeforeAfter before="/images/house-cleaning.jpg" after="/images/kitchen-deep-cleaning.webp" beforeLabel="Before — Greasy" afterLabel="After — Degreased" /></div>
            </div>
          </div>
        </section>
      )}

      <ReviewsSection reviews={reviews} />

      {serviceKey === 'office' ? <OfficeReelSection /> : <YtShortsSection />}

      <GuaranteeSection variant={guaranteeVariant} />

      <section className="section">
        <div className="section-inner">
          <FaqSection faqs={s.faqs.map((f) => [f.q, f.a])} />
        </div>
      </section>

      <RelatedGuides serviceKey={serviceKey} />
      <RelatedServices currentHref={url.split('/').pop()} />
    </>
  );
}