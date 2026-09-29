'use client';
import { useEffect, useState } from 'react';

const NAME = 'EwaTechie';

export function Intro({ enabled, copy, asset }: { enabled: boolean; copy: string; asset: string }) {
  const [show, setShow] = useState(false);
  const [typed, setTyped] = useState('');
  const [videoFailed, setVideoFailed] = useState(false);
  const media = !asset || asset === '/images/character.png' || asset === '/Animate_character_waving_on_laptop_20260928213512.mp4'
    ? '/wave_wide_full.mp4'
    : asset;
  const isVideo = /\.(mp4|webm)(?:\?|$)/i.test(media);

  function dismiss() {
    setShow(false);
  }

  useEffect(() => {
    if (!enabled || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setTyped('');
    setShow(true);
    // Replay on each homepage mount, including refresh. Cleanup supports Strict Mode restarts.
    const letters = Array.from(NAME, (_, index) =>
      setTimeout(() => setTyped(NAME.slice(0, index + 1)), 650 + index * 140)
    );
    const finish = setTimeout(dismiss, 3400);
    return () => { letters.forEach(clearTimeout); clearTimeout(finish); };
  }, [enabled]);

  if (!show) return null;
  return (
    <div className="intro" aria-label="Welcome to EwaTechie">
      <button className="intro-skip" onClick={dismiss}>Skip intro ↗</button>
      <div className="intro-scene">
        <div className="greeting">{copy}</div>
        {isVideo && !videoFailed ? (
          <video className="intro-video" src={media} autoPlay muted playsInline preload="auto"
            poster="/images/character.png" aria-hidden="true"
            onError={() => setVideoFailed(true)} />
        ) : (
          <img src={isVideo ? '/images/character.png' : media} alt="" width="208" height="260" />
        )}
        <strong className="intro-name" aria-label={NAME}>
          <span className="intro-name-space" aria-hidden="true">{NAME}</span>
          <span className="intro-name-typed" aria-hidden="true">{typed}<i className="intro-caret" /></span>
        </strong>
      </div>
    </div>
  );
}
