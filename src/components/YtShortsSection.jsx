// Portrait 9:16 YouTube Shorts embeds shown on every page of the site.
// Each card is click-to-play: a lightweight thumbnail + play button, and the
// real iframe only loads when tapped. This avoids YouTube's "Video unavailable"
// overlay on embeds and removes 3 iframes from every page load (big speed win).
import { useState } from 'react';
import { asset } from '../lib/site.js';

const SHORTS = [
  {
    id: 'p-ArftUay5I',
    label: 'Deep Clean',
    caption: 'Real deep-clean, Gurgaon home',
    poster: '/images/full-home-deep-cleaning.webp',
  },
  {
    id: 'W6L8qudgzvc',
    label: 'Kitchen & Bath',
    caption: 'Kitchen & bathroom deep clean',
    poster: '/images/kitchen-deep-cleaning.webp',
  },
  {
    id: 'cdjlmvP-hM4',
    label: 'Full Home',
    caption: 'Full home walkthrough',
    poster: '/images/house-cleaning.webp',
  },
];

export const YT_CHANNEL = 'https://www.youtube.com/@Cleaning_service_in_Gurgaon';
export const IG_PAGE = 'https://www.instagram.com/cleaning_service_in_gurgaon/';

function ShortCard({ id, label, caption, poster, onTrack, file }) {
  const [play, setPlay] = useState(false);

  return (
    <div className="sdc-reel-item fade-up">
      <span className="sdc-reel-label">{label}</span>
      <div className="sdc-ig-card">
        <div className="ig-reel-frame">
          {play ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
              title={`YouTube Short — ${caption}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <button
              type="button"
              className="yt-thumb"
              onClick={() => {
                setPlay(true);
                onTrack(`Short ${id}`);
              }}
              aria-label={`Play video: ${caption}`}
            >
              <img
                src={asset(file, poster)}
                alt={`${caption} — watch on YouTube`}
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
          href={`https://www.youtube.com/shorts/${id}`}
          target="_blank"
          rel="noopener"
          onClick={() => onTrack(`Short ${id}`)}
        >
          Watch on YouTube ↗
        </a>
      </div>
    </div>
  );
}

export default function YtShortsSection({ file }) {
  const track = (label) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'yt_short_click', { event_category: 'Social', event_label: label });
    }
  };

  return (
    <section className="section section-alt sdc-reel-sec">
      <div className="section-inner">
        <div style={{ textAlign: 'center' }} className="fade-up">
          <div className="section-tag">Real Work · YouTube Shorts</div>
          <h2 className="section-title">Watch Us Clean in 60 Seconds</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Real deep-cleaning jobs by our team in Gurgaon — straight from our YouTube channel, Cleaning Service In Gurgaon.
          </p>
        </div>

        <div className="sdc-reel-grid">
          {SHORTS.map((s) => (
            <ShortCard key={s.id} {...s} onTrack={track} file={file} />
          ))}
        </div>

        <div className="sdc-reel-followcta sdc-social-row fade-up">
          <a
            href={YT_CHANNEL}
            target="_blank"
            rel="noopener"
            className="sdc-reel-followbtn sdc-yt-btn"
            onClick={() => track('Follow YT')}
          >
            <svg width="18" height="18" fill="#fff" viewBox="0 0 576 512" aria-hidden="true"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64s-170.8 0-213.4 11.5c-23.5 6.3-42 24.9-48.3 48.6C15 166.7 15 256 15 256s0 89.3 11.5 131.9c6.3 23.7 24.8 42.3 48.3 48.6C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.9 48.3-48.6C561 345.3 561 256 561 256s0-89.3-11.5-131.9zM232 332.3V179.7l138.7 76.3L232 332.3z"/></svg>
            Follow @Cleaning_service_in_Gurgaon
          </a>
          <a
            href={IG_PAGE}
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
  );
}
