import { pageLink } from '../lib/site.js';
// Internal links from each service page to the most relevant blog guides.
// Helps Google crawl the articles and builds topical authority (service → guide).
const GUIDES = [
  { serviceKey: 'deep', title: 'Deep Cleaning Cost in Gurgaon 2026', href: '/blog/deep-cleaning-cost-gurgaon-2026.html' },
  { serviceKey: 'deep', title: 'Urban Company vs Aone Deep Cleaning — Compared', href: '/blog/urban-company-vs-sachin-deep-cleaning.html' },
  { serviceKey: 'deep', title: 'House Maid vs Deep Cleaning — What’s Actually Worth It', href: '/blog/house-maid-vs-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Book Cleaning Online — No App Needed', href: '/book-cleaning-online-gurgaon.html' },
  { serviceKey: 'deep', title: 'Cleaning Services in Gurgaon — Complete Guide', href: '/blog/cleaning-services-gurgaon-guide.html' },
  { serviceKey: 'deep', title: 'What Is Deep Cleaning? Complete Guide', href: '/blog/what-is-deep-cleaning-guide.html' },
  { serviceKey: 'deep', title: 'Deep Cleaners Near Me — Hire Verified Pros', href: '/blog/deep-cleaners-near-me-gurgaon.html' },
  { serviceKey: 'deep', title: 'NoBroker Cleaning vs Aone — Compared', href: '/blog/nobroker-cleaning-vs-sachin-deep-cleaning.html' },
  { serviceKey: 'deep', title: 'Safaiwale vs Aone — Gurgaon Prices', href: '/blog/safaiwale-vs-sachin-deep-cleaning.html' },
  { serviceKey: 'house', title: 'Home Cleaning Services Near Me — Gurgaon Guide', href: '/blog/home-cleaning-services-near-me-gurgaon.html' },
  { serviceKey: 'house', title: 'How Often Should You Deep Clean Your Home?', href: '/blog/how-often-deep-clean-home-india.html' },
  { serviceKey: 'house', title: 'Kitchen Deep Cleaning vs Regular Cleaning', href: '/blog/kitchen-vs-regular-cleaning.html' },
  { serviceKey: 'house', title: 'Urban Company vs Aone Deep Cleaning — Compared', href: '/blog/urban-company-vs-sachin-deep-cleaning.html' },
  { serviceKey: 'house', title: 'House Maid vs Deep Cleaning — What’s Actually Worth It', href: '/blog/house-maid-vs-deep-cleaning-gurgaon.html' },
  { serviceKey: 'house', title: 'Book Cleaning Online — No App Needed', href: '/book-cleaning-online-gurgaon.html' },
  { serviceKey: 'fullhome', title: 'Deep Cleaning Cost in Gurgaon 2026', href: '/blog/deep-cleaning-cost-gurgaon-2026.html' },
  { serviceKey: 'fullhome', title: 'Diwali Cleaning in Gurgaon — Price & Booking', href: '/blog/diwali-cleaning-gurgaon.html' },
  { serviceKey: 'fullhome', title: 'Dussehra Cleaning — Beat Diwali Rush', href: '/blog/dussehra-cleaning-gurgaon.html' },
  { serviceKey: 'fullhome', title: 'Full Home Packages Compared — Prices & Time', href: '/blog/full-home-deep-cleaning-packages-gurgaon.html' },
  { serviceKey: 'fullhome', title: 'Room Cleaning Services — Price Guide', href: '/blog/room-cleaning-services-gurgaon.html' },
  { serviceKey: 'fullhome', title: 'Urban Company vs Aone Deep Cleaning — Compared', href: '/blog/urban-company-vs-sachin-deep-cleaning.html' },
  { serviceKey: 'fullhome', title: 'House Maid vs Deep Cleaning — What’s Actually Worth It', href: '/blog/house-maid-vs-deep-cleaning-gurgaon.html' },
  { serviceKey: 'kitchen', title: 'Kitchen Chimney Cleaning Guide', href: '/blog/kitchen-chimney-cleaning-guide.html' },
  { serviceKey: 'kitchen', title: 'Navratri Cleaning — Pooja-Ready Homes', href: '/blog/navratri-cleaning-gurgaon.html' },
  { serviceKey: 'kitchen', title: 'Kitchen Deep Cleaning vs Regular Cleaning', href: '/blog/kitchen-vs-regular-cleaning.html' },
  { serviceKey: 'bathroom', title: 'How to Remove Hard Water Stains in Gurgaon Bathrooms', href: '/blog/hard-water-bathroom-stains-gurgaon.html' },
  { serviceKey: 'sofa', title: 'Sofa Shampoo Cleaning in Gurgaon — Complete Guide', href: '/blog/sofa-cleaning-gurgaon-guide.html' },
  { serviceKey: 'carpet', title: 'Carpet Cleaning in Gurgaon — Price & Method', href: '/blog/carpet-cleaning-gurgaon-guide.html' },
  { serviceKey: 'office', title: 'Office Deep Cleaning in Gurgaon — Prices & Checklist', href: '/blog/office-deep-cleaning-gurgaon-guide.html' },
  { serviceKey: 'office', title: 'Best Office Deep Cleaning — Top 5 Compared', href: '/blog/best-office-deep-cleaning-services-gurgaon.html' },
  { serviceKey: 'office', title: 'Deep Cleaning Cost in Gurgaon 2026', href: '/blog/deep-cleaning-cost-gurgaon-2026.html' },
  { serviceKey: 'move', title: 'Move-In / Move-Out Cleaning Checklist', href: '/blog/move-in-move-out-cleaning-checklist-gurgaon.html' },
  { serviceKey: 'move', title: 'Deep Cleaning Cost in Gurgaon 2026', href: '/blog/deep-cleaning-cost-gurgaon-2026.html' },
  // ── 2026-09-20 audit: wire new price / micro-local / Udyog inventory ──
  { serviceKey: 'deep', title: 'Deep Cleaning DLF Phase 3 — Same-Day', href: '/blog/dlf-phase-3-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Deep Cleaning Sohna Road — All Towers', href: '/blog/sohna-road-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Deep Cleaning Golf Course Road — Premium Homes', href: '/blog/golf-course-road-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Dwarka Expressway Deep Cleaning — Sectors 102–113', href: '/blog/dwarka-expressway-deep-cleaning-gurgaon.html' },
  { serviceKey: 'deep', title: 'Society Deep Cleaning — Tower Cluster Days', href: '/blog/society-deep-cleaning-day-gurgaon.html' },
  { serviceKey: 'deep', title: 'Monsoon Cleaning Checklist — Gurgaon Homes', href: '/blog/monsoon-cleaning-checklist-gurgaon.html' },
  { serviceKey: 'fullhome', title: '1BHK Deep Cleaning Price — ₹2,500 Itemised', href: '/blog/1bhk-deep-cleaning-price-gurgaon.html' },
  { serviceKey: 'fullhome', title: '2BHK Deep Cleaning Price — Fixed ₹4,500', href: '/blog/2bhk-deep-cleaning-price-gurgaon.html' },
  { serviceKey: 'fullhome', title: '3BHK Deep Cleaning Price — Fixed ₹5,500', href: '/blog/3bhk-deep-cleaning-price-gurgaon.html' },
  { serviceKey: 'fullhome', title: '4BHK Deep Cleaning Price — Fixed ₹6,500', href: '/blog/4bhk-deep-cleaning-price-gurgaon.html' },
  { serviceKey: 'fullhome', title: '5BHK Deep Cleaning Price — Fixed ₹9,000', href: '/blog/5bhk-deep-cleaning-price-gurgaon.html' },
  { serviceKey: 'bathroom', title: 'Bathroom Cleaning Price — ₹800/Bath', href: '/blog/bathroom-cleaning-price-gurgaon-per-bathroom.html' },
  { serviceKey: 'kitchen', title: 'Kitchen Cleaning Price — ₹1,500 Chimney Included', href: '/blog/kitchen-cleaning-price-gurgaon-chimney.html' },
  { serviceKey: 'sofa', title: 'Sofa Cleaning Price — ₹499/Seat Explained', href: '/blog/sofa-cleaning-price-gurgaon-per-seat.html' },
  { serviceKey: 'sofa', title: 'Mattress Cleaning — Steam & Shampoo Guide', href: '/blog/mattress-cleaning-gurgaon.html' },
  { serviceKey: 'house', title: 'What a ₹499 House Cleaning Visit Covers', href: '/blog/house-cleaning-price-gurgaon-per-visit.html' },
  { serviceKey: 'house', title: 'Home Cleaning Service — What It Includes & Costs', href: '/blog/home-cleaning-service-guide.html' },
  { serviceKey: 'move', title: 'End of Tenancy Cleaning — Get the Deposit Back', href: '/blog/end-of-tenancy-cleaning-gurgaon.html' },
  { serviceKey: 'office', title: 'Office Deep Cleaning Udyog Vihar — Phases 1–5', href: '/blog/office-deep-cleaning-udyog-vihar.html' },
  { serviceKey: 'office', title: 'Commercial Office Cleaning Udyog Vihar — AMC & Deep', href: '/blog/commercial-office-cleaning-udyog-vihar.html' },
  { serviceKey: 'office', title: 'Sector 44 & Corporate Hubs — Office Cleaning', href: '/blog/office-deep-cleaning-sector-44-gurgaon.html' },
  { serviceKey: 'office', title: 'Sector 44 Offices — Detailed Guide', href: '/blog/sector-44-office-deep-cleaning-gurgaon.html' },
  { serviceKey: 'office', title: 'Cyber City Offices — Tower Playbook', href: '/blog/office-deep-cleaning-cyber-city-gurgaon.html' },
  { serviceKey: 'office', title: 'Golf Course Road — Premium Offices', href: '/blog/office-deep-cleaning-golf-course-road-gurgaon.html' },
  { serviceKey: 'office', title: 'Sector 32 — Weekend-Night Offices', href: '/blog/office-deep-cleaning-sector-32-gurgaon.html' },
];

export default function RelatedGuides({ serviceKey, file }) {
  const guides = GUIDES.filter((g) => g.serviceKey === serviceKey);
  if (guides.length === 0) return null;

  return (
    <section className="section">
      <div className="section-inner">
        <div style={{ textAlign: 'center' }} className="fade-up">
          <div className="section-tag">Guides & Tips</div>
          <h2 className="section-title">Read Our Cleaning Guides</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Practical, expert guides written for Gurgaon homes — costs, frequency and how it's done.</p>
        </div>
        <div className="areas-list" style={{ marginTop: '28px' }}>
          {guides.map((g) => (
            <a key={g.href} href={pageLink(file, g.href)} className="area-tag" style={{ color: 'var(--green)', fontWeight: 700 }}>
              {g.title} →
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
