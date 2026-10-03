import { useState } from 'react';
import { asset } from '../lib/site.js';
import YtShortsSection from './YtShortsSection.jsx';

// Portrait 9:16 Instagram reels as click-to-play facades (local poster, real
// iframe only on tap). Direct IG iframes pulled ~15 scontent/cdninstagram
// requests that Googlebot flags blocked-by-robots on every crawl — the facade
// removes them from page load entirely while keeping one-tap playback.
const REELS = [
  {
    id: 'Db2rFlgxWoU',
    label: 'Real Jobs',
    caption: 'Real deep-clean, DLF Phase 2',
    poster: '/images/office-deep-cleaning.webp',
  },
  {
    id: 'Db2qqbgxXQy',
    label: 'Kitchen & Bathroom',
    caption: 'Kitchen & bathroom deep clean',
    poster: '/images/kitchen-deep-cleaning.webp',
  },
  {
    id: 'Db2qRfaRnO9',
    label: 'Full Walkthrough',
    caption: 'Full home walkthrough',
    poster: '/images/full-home-deep-cleaning.webp',
  },
];

function IgCard({ id, label, caption, poster, onTrack, file }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="sdc-reel-item fade-up">
      <span className="sdc-reel-label">{label}</span>
      <div className="sdc-ig-card">
        <div className="ig-reel-frame">
          {play ? (
            <iframe
              src={`https://www.instagram.com/reel/${id}/embed/`}
              title={`Instagram reel — ${caption}`}
              allowTransparency="true"
              allowFullScreen="true"
              scrolling="no"
              frameBorder="0"
            />
          ) : (
            <button
              type="button"
              className="yt-thumb"
              onClick={() => {
                setPlay(true);
                onTrack(`Reel ${id}`);
              }}
              aria-label={`Play Instagram reel: ${caption}`}
            >
              <img
                src={asset(file, poster)}
                alt={`${caption} — watch on Instagram`}
                loading="lazy"
                decoding="async"
              />
              <span className="yt-play-btn">▶</span>
            </button>
          )}
        </div>
      </div>
      <div className="sdc-reel-caption-row">
        {caption} ·
        <a
          href={`https://www.instagram.com/reel/${id}/`}
          target="_blank"
          rel="noopener"
          onClick={() => onTrack(`Reel ${id}`)}
        >
          Watch on Instagram ↗
        </a>
      </div>
    </div>
  );
}

export default function OfficeReelSection({ file }) {
  const track = (label) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'ig_reel_click', { event_category: 'Social', event_label: label });
    }
  };

  return (
    <>
      <section className="section section-alt sdc-reel-sec">
      <div className="section-inner">
        <div style={{ textAlign: 'center' }} className="fade-up">
          <div className="section-tag">Real Work · Instagram</div>
          <h2 className="section-title">See Our Cleaning in Action</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Real deep-cleaning jobs by our team in Gurgaon — straight from our Instagram, @cleaning_service_in_gurgaon.
          </p>
        </div>

        <div className="sdc-reel-grid">
          {REELS.map((r) => (
            <IgCard key={r.id} {...r} onTrack={track} file={file} />
          ))}
        </div>

        <div className="sdc-reel-followcta fade-up">
          <a
            href="https://www.instagram.com/cleaning_service_in_gurgaon/"
            target="_blank"
            rel="noopener"
            className="sdc-reel-followbtn"
            onClick={() => track('Follow IG')}
          >
            <svg width="18" height="18" fill="#fff" viewBox="0 0 448 512" aria-hidden="true"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
            Follow @cleaning_service_in_gurgaon
          </a>
        </div>
      </div>
    </section>
    <YtShortsSection />
    </>
  );
}
