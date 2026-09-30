import { useEffect, useState } from 'react';
import { SOCIAL_PROOF_BOOKINGS, TIME_AGO } from '../lib/landing.js';

export default function SocialProofPopup() {
  const [show, setShow] = useState(false);
  const [entry, setEntry] = useState(SOCIAL_PROOF_BOOKINGS[0]);
  const [time, setTime] = useState(TIME_AGO[0]);

  useEffect(() => {
    let suppressedUntil = 0;
    // Never fight the WhatsApp nudge for the same corner: when a lead
    // converts and the nudge opens, hide this popup for 60s.
    const onNudge = () => {
      suppressedUntil = Date.now() + 60000;
      setShow(false);
    };
    window.addEventListener('wa-nudge', onNudge);
    const pick = () => {
      setEntry(SOCIAL_PROOF_BOOKINGS[Math.floor(Math.random() * SOCIAL_PROOF_BOOKINGS.length)]);
      setTime(TIME_AGO[Math.floor(Math.random() * TIME_AGO.length)]);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (Date.now() < suppressedUntil) return;
          pick();
          setShow(true);
          setTimeout(() => setShow(false), 5000);
          const id = setInterval(() => {
            if (Date.now() < suppressedUntil) return;
            pick(); setShow(true); setTimeout(() => setShow(false), 5000);
          }, 25000);
          // clear interval when hidden (kept simple below)
        }
      });
    }, { threshold: 0.3 });
    const target = document.querySelector('.section');
    if (target) observer.observe(target);
    return () => {
      observer.disconnect();
      window.removeEventListener('wa-nudge', onNudge);
    };
  }, []);

  return (
    <div className={`booking-popup${show ? ' show' : ''}`} id="bookingPopup">
      <div className="bp-av">{entry[0]}</div>
      <div>
        <div className="bp-name">{entry[1]} ({entry[3]})</div>
        <div className="bp-detail">{entry[2]}</div>
        <div className="bp-time">{time}</div>
      </div>
    </div>
  );
}