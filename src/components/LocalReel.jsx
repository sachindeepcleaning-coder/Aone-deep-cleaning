import { useEffect, useRef, useState } from 'react';

// Phone-style local reel player (old Firebase ad-page design, Balaji header).
// Single verified-clean clip only: public/videos/cleaning-2.mp4 carries no
// brand or phone overlays. No YouTube/Instagram embeds or outbound links —
// safe for PPC pages. SSR renders the shell; src attaches on visibility.
const CLIP = 'videos/cleaning-2.mp4';
const POSTER = '/images/cleaning-1.webp';

export default function LocalReel() {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || visible) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  useEffect(() => {
    if (visible) {
      videoRef.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [visible]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="section sdc-reel-sec">
      <div className="section-inner sdc-reel-wrap">
        <div style={{ textAlign: 'center' }} className="fade-up">
          <div className="section-tag">Real Work</div>
          <h2 className="section-title">See Our Cleaning in Action</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Watch a real deep-cleaning job done by our team in Gurgaon. Tap to pause.</p>
        </div>
        <div className="sdc-reel-grid sdc-reel-single">
          <div className="sdc-reel-item">
            <span className="sdc-reel-kicker">Real Jobs · Gurgaon</span>
            <div ref={wrapRef} className="sdc-reel" onClick={toggle} role="button" aria-label="Deep cleaning video — tap to pause">
              <video
                ref={videoRef}
                src={visible ? CLIP : undefined}
                poster={POSTER}
                muted
                loop
                playsInline
                preload="none"
                title="Deep cleaning in action — Gurgaon home"
              />
              <div className="sdc-reel-header">
                <div className="sdc-reel-avatar">🧹</div>
                <div className="sdc-reel-handle">
                  <strong>Balaji Deep Cleaning</strong>
                  <span>Gurgaon · Real job footage</span>
                </div>
              </div>
              <div className="sdc-reel-caption">Real deep-cleaning job in a Gurgaon home 🧼✨</div>
              <div className="sdc-reel-play">{playing ? '❚❚' : '▶'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
