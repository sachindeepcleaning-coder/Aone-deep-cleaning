import { useEffect, useState } from 'react';

// Top urgency bar. Fully static markup: React hydrates this identically on
// server and client. (A previous version mutated #callbackTime — a node owned
// by QuoteForm, which may not be hydrated yet when this effect fires —
// causing hydration mismatch #425/#418 flakily on every page with a form.
// Never touch another component's DOM from here.)
export default function UrgencyBar({ page }) {
  const [date, setDate] = useState('');

  useEffect(() => {
    const d = new Date();
    const opts = { weekday: 'long', day: 'numeric', month: 'short' };
    setDate(d.toLocaleDateString('en-IN', opts));
  }, []);

  // `page` comes from App via Layout, so SSR and client render identically.
  const isPpc = page === 'ppc';

  return (
    <div className="urgency-bar">
      <span className="ub-live"><span className="ub-dot"></span>OPEN TODAY</span>
      {isPpc ? (
        <>🏠 Deep Cleaning in Gurgaon &nbsp;·&nbsp; <span className="ub-hl">under 5 min callback</span> &nbsp;·&nbsp; 🎁 <span className="ub-hl">up to 40% OFF</span> today</>
      ) : (
        <>🏠 Full Home Deep Cleaning in Gurgaon &nbsp;·&nbsp; <span className="ub-hl">under 5 min callback</span> &nbsp;·&nbsp; 🎁 <span className="ub-hl">₹200 OFF</span> for new customers</>
      )}
    </div>
  );
}
