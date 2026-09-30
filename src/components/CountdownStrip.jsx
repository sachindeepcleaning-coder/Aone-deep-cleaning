import { useEffect, useState } from 'react';

export default function CountdownStrip({ offerText } = {}) {
  const [t, setT] = useState({ h: '00', m: '00', s: '00' });

  useEffect(() => {
    function tick() {
      const now = new Date();
      const end = new Date();
      end.setHours(23, 59, 59, 0);
      let diff = Math.max(0, Math.floor((end - now) / 1000));
      setT({
        h: String(Math.floor(diff / 3600)).padStart(2, '0'),
        m: String(Math.floor((diff % 3600) / 60)).padStart(2, '0'),
        s: String(diff % 60).padStart(2, '0'),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown-strip">
      <span>🔥 <strong>Limited Time:</strong> {offerText || '₹200 OFF Full Home Deep Cleaning in Gurgaon'}</span>
      <div className="countdown-timer">
        <span className="ct-seg">{t.h}</span>
        <span className="ct-colon">:</span>
        <span className="ct-seg">{t.m}</span>
        <span className="ct-colon">:</span>
        <span className="ct-seg">{t.s}</span>
      </div>
      <span>— Offer expires today</span>
    </div>
  );
}