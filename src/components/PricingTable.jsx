export default function PricingTable({ rows, title = 'Deep Cleaning Service Charges in Gurgaon', subtitle = 'All prices confirmed upfront before any professional visits your home.' }) {
  if (!rows || rows.length === 0) return null;
  return (
    <section className="section">
      <div className="section-inner">
        <div style={{ textAlign: 'center' }} className="fade-up">
          <div className="section-tag">Transparent Pricing</div>
          <h2 className="section-title">{title}</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>{subtitle}</p>
        </div>
        <div className="fade-up" style={{ marginTop: 32, overflowX: 'auto', borderRadius: 14, border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--card)' }} aria-label="Deep cleaning service prices in Gurgaon">
            <thead>
              <tr style={{ background: 'var(--primary)' }}>
                <th style={{ padding: '14px 20px', fontSize: 13, fontWeight: 600, color: '#fff', textAlign: 'left' }}>Service</th>
                <th style={{ padding: '14px 20px', fontSize: 13, fontWeight: 600, color: '#fff', textAlign: 'left' }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={r.service} style={{ background: idx % 2 === 1 ? 'var(--bg-alt)' : 'var(--card)' }}>
                  <td style={{ padding: '13px 20px', fontSize: 14, borderBottom: '1px solid var(--border)', color: 'var(--text)' }}>{r.service}</td>
                  <td style={{ padding: '13px 20px', fontSize: 14, borderBottom: '1px solid var(--border)', color: 'var(--primary)', fontWeight: 700 }}>{r.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: 'var(--muted)' }}>
          Need a confirmed quote? Call <a href="tel:+919267905943" style={{ color: 'var(--primary)', fontWeight: 600 }}>+91 95607 39281</a> — prices are locked before any professional visits.
        </p>
      </div>
    </section>
  );
}
