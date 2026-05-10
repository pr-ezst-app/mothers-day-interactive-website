import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

// Soft lo-fi / music box style track (royalty-free from Pixabay)
const MUSIC_URL = "https://cdn.pixabay.com/audio/2023/09/05/audio_1d0e716ef9.mp3";

function MusicButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  const toggle = () => {
    if (!audioRef.current) {
      const audio = new Audio(MUSIC_URL);
      audio.loop = true;
      audio.volume = 0.45;
      audioRef.current = audio;
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
      setStarted(true);
    }
  };

  return (
    <button
      onClick={toggle}
      className="animate-fade-in"
      style={{
        animationDelay: "1.6s",
        opacity: 0,
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: playing ? "hsl(340 85% 68%)" : "rgba(255,255,255,0.92)",
        color: playing ? "white" : "hsl(340 50% 50%)",
        border: "2px solid hsl(340 80% 85%)",
        borderRadius: "100px",
        padding: "10px 18px",
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 800,
        fontSize: "0.78rem",
        cursor: "pointer",
        boxShadow: "0 6px 20px rgba(220,80,130,0.2)",
        backdropFilter: "blur(8px)",
        transition: "all 0.3s ease",
        letterSpacing: "0.04em",
      }}
    >
      <span style={{ fontSize: "1rem" }}>{playing ? "🎵" : "🎵"}</span>
      {!started ? "Click here to play music!" : playing ? "Pause music" : "Play music"}
    </button>
  );
}

const FLOWERS_IMG = "https://cdn.ezst.app/projects/484d62d1-93ec-41a1-a7ac-f39d1a365a2a/files/2796f461-7057-40c8-89a8-e1a595d3ec0c.jpg";
const PHOTO_IMG   = "https://cdn.ezst.app/projects/484d62d1-93ec-41a1-a7ac-f39d1a365a2a/files/3fa4e585-b647-42db-840f-dede1dbfa714.jpg";
const GIFT_IMG    = "https://cdn.ezst.app/projects/484d62d1-93ec-41a1-a7ac-f39d1a365a2a/files/70a020ed-4299-4f44-8c93-4707f72e4702.jpg";

type GiftType = "flowers" | "photos" | "message" | null;

const PETALS = ["🌸", "🌷", "🌺", "🌼", "💮"];

/* ── Floating petals ── */
function PetalRain() {
  const items = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${(i * 7) % 100}%`,
    duration: `${6 + (i % 6)}s`,
    delay: `${(i * 1.1) % 9}s`,
    emoji: PETALS[i % PETALS.length],
    size: `${0.9 + (i % 3) * 0.35}rem`,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((p) => (
        <span key={p.id} className="petal" style={{ left: p.left, top: "-20px", animationDuration: p.duration, animationDelay: p.delay, fontSize: p.size }}>
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

/* ── Doodle SVG decorations ── */
function DoodleStars() {
  return (
    <svg className="absolute pointer-events-none select-none" width="100%" height="100%" style={{ inset: 0, position: "absolute", zIndex: 0, opacity: 0.18 }}>
      {[
        { cx: "8%",  cy: "12%", r: 3 },
        { cx: "92%", cy: "8%",  r: 4 },
        { cx: "5%",  cy: "75%", r: 2.5 },
        { cx: "95%", cy: "60%", r: 3 },
        { cx: "50%", cy: "5%",  r: 2 },
        { cx: "80%", cy: "88%", r: 3.5 },
        { cx: "15%", cy: "90%", r: 2 },
      ].map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="hsl(340 90% 68%)" />
      ))}
      {[
        "M 3% 40% Q 6% 35% 9% 40%",
        "M 88% 30% Q 91% 25% 94% 30%",
        "M 45% 95% Q 50% 90% 55% 95%",
      ].map((d, i) => (
        <path key={i} d={d} stroke="hsl(340 90% 72%)" strokeWidth="2" fill="none" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function DoodleHeart({ color = "hsl(340 90% 76%)", size = 18 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: "inline-block" }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

/* ── Hero ── */
function HeroSection({ onExplore }: { onExplore: () => void }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative px-6 py-16 overflow-hidden"
      style={{ background: "linear-gradient(160deg, hsl(340 80% 96%) 0%, hsl(30 80% 96%) 40%, hsl(200 60% 96%) 100%)" }}
    >
      <PetalRain />
      <DoodleStars />

      {/* Spinning doodle ring */}
      <div className="animate-spin-slow absolute" style={{ width: 320, height: 320, opacity: 0.08, borderRadius: "50%", border: "3px dashed hsl(340 70% 65%)" }} />
      <div className="animate-spin-slow absolute" style={{ width: 380, height: 380, opacity: 0.05, borderRadius: "50%", border: "2px dashed hsl(200 70% 65%)", animationDirection: "reverse" }} />

      {/* Top badge */}
      <div
        className="animate-fade-in mb-8 px-5 py-2 rounded-full flex items-center gap-2"
        style={{ animationDelay: "0.1s", opacity: 0, background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", border: "1.5px solid hsl(340 80% 88%)", boxShadow: "0 4px 16px rgba(230,100,140,0.12)" }}
      >
        <span className="animate-heartbeat" style={{ display: "inline-block" }}>💖</span>
        <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "hsl(340 50% 45%)", letterSpacing: "0.08em" }}>
          Happy Mother's Day, Akiko!
        </span>
        <span className="animate-heartbeat" style={{ display: "inline-block", animationDelay: "0.4s" }}>💖</span>
      </div>

      {/* Main title */}
      <h1
        className="text-center mb-4 animate-fade-up"
        style={{
          fontFamily: "'Caveat', cursive",
          fontSize: "clamp(3rem, 10vw, 6.5rem)",
          fontWeight: 700,
          lineHeight: 1.05,
          color: "hsl(340 50% 38%)",
          animationDelay: "0.3s",
          opacity: 0,
          textShadow: "2px 3px 0px hsl(340 80% 90%)",
        }}
      >
        お母さんへ 🌸
      </h1>

      <p
        className="text-center max-w-sm mb-10 animate-fade-up"
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 600,
          fontSize: "1rem",
          color: "hsl(340 30% 52%)",
          lineHeight: 1.75,
          animationDelay: "0.55s",
          opacity: 0,
        }}
      >
        A little gift from Coco, made with lots of love 🎀<br />
        <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "hsl(340 25% 62%)" }}>Tap below to start opening!</span>
      </p>

      {/* CTA button */}
      <button
        onClick={onExplore}
        className="animate-fade-up gift-btn animate-bounce-gentle"
        style={{
          animationDelay: "0.8s",
          opacity: 0,
          background: "linear-gradient(135deg, hsl(340 85% 68%), hsl(15 90% 68%))",
          color: "white",
          border: "none",
          padding: "16px 44px",
          fontSize: "1rem",
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 800,
          borderRadius: "100px",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(220, 80, 120, 0.35), 0 2px 0px rgba(180,60,100,0.4)",
          letterSpacing: "0.03em",
        }}
      >
        🎁 Open Your Gifts!
      </button>

      {/* Floating polaroid previews */}
      <div className="flex gap-5 mt-14 animate-fade-in" style={{ animationDelay: "1.1s", opacity: 0 }}>
        {[
          { src: FLOWERS_IMG, rotate: "-8deg", mt: "0" },
          { src: PHOTO_IMG,   rotate: "1deg",  mt: "-18px" },
          { src: GIFT_IMG,    rotate: "7deg",  mt: "4px" },
        ].map((img, i) => (
          <div key={i} className="polaroid animate-wiggle" style={{ width: 72, transform: `rotate(${img.rotate})`, marginTop: img.mt, animationDelay: `${i * 0.6}s` }}>
            <img src={img.src} alt="" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: "2px" }} />
          </div>
        ))}
      </div>

      {/* Bottom doodle sparkles */}
      <div className="flex gap-3 mt-8 animate-fade-in" style={{ animationDelay: "1.4s", opacity: 0 }}>
        {["✨", "🌷", "✨", "🌸", "✨"].map((s, i) => (
          <span key={i} className="sticker" style={{ fontSize: "1.1rem", animationDelay: `${i * 0.2}s` }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Gift choice cards ── */
function GiftCard({ emoji, label, sub, bg, border, delay, onClick }: {
  emoji: string; label: string; sub: string; bg: string; border: string; delay: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="gift-btn cute-card animate-slide-in-up flex flex-col items-center gap-3 py-9 px-5 w-full"
      style={{ animationDelay: delay, opacity: 0, background: bg, border: `2.5px solid ${border}`, cursor: "pointer", outline: "none" }}
    >
      <span className="animate-bounce-gentle" style={{ fontSize: "2.8rem", display: "block" }}>{emoji}</span>
      <span style={{ fontFamily: "'Caveat', cursive", fontSize: "1.6rem", fontWeight: 700, color: "hsl(340 40% 32%)" }}>{label}</span>
      <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "hsl(340 20% 58%)" }}>{sub}</span>
    </button>
  );
}

/* ── Gift reveal ── */
function GiftReveal({ type, onBack }: { type: GiftType; onBack: () => void }) {
  const content = {
    flowers: {
      title: "お花のブーケ 🌷",
      subtitle: "A bouquet of love, just for you",
      image: FLOWERS_IMG,
      paragraphs: [
        "These flowers are as beautiful as you are, Akiko — a little reminder that you make every room bloom just by being in it.",
        "Today and always, you deserve all the flowers in the world. 🌸",
      ],
      signing: null,
      bg: "linear-gradient(140deg, hsl(340 80% 96%) 0%, hsl(20 80% 97%) 100%)",
      accent: "hsl(340 85% 68%)",
      border: "hsl(340 80% 85%)",
      tag: "🌷 flowers",
    },
    photos: {
      title: "思い出 📸",
      subtitle: "Captured moments, forever treasured",
      image: PHOTO_IMG,
      paragraphs: [
        "Every photograph is a love letter. These moments are our most precious gifts — because every one of them has you in it.",
        "Thank you for being the story I love telling. 💛",
      ],
      signing: null,
      bg: "linear-gradient(140deg, hsl(40 80% 96%) 0%, hsl(160 60% 96%) 100%)",
      accent: "hsl(30 85% 62%)",
      border: "hsl(30 80% 82%)",
      tag: "📸 memories",
    },
    message: {
      title: "こっちゃんより 💌",
      subtitle: "A letter from Coco, with all my heart",
      image: GIFT_IMG,
      paragraphs: [
        "母の日おめでとう。",
        "日本に入れないから直接感謝を伝えられないのが残念だけど、いつも遠くからたくさんこっちゃんのことサポートしてくれてありがとう。",
        "いつも感謝してるよ ♡",
      ],
      signing: "— Coco 🎀",
      bg: "linear-gradient(140deg, hsl(270 60% 97%) 0%, hsl(340 70% 97%) 100%)",
      accent: "hsl(340 80% 62%)",
      border: "hsl(270 60% 85%)",
      tag: "💌 letter",
    },
  };

  const c = content[type!];
  if (!c) return null;

  return (
    <div className="w-full max-w-lg mx-auto animate-scale-reveal pb-10">
      {/* Back */}
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-sm"
        style={{ color: "hsl(340 30% 55%)", fontFamily: "'Nunito', sans-serif", fontWeight: 700, background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <Icon name="ArrowLeft" size={15} />
        Choose another gift
      </button>

      {/* Tag sticker */}
      <div className="mb-5 flex items-center gap-3">
        <span
          style={{
            fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.72rem",
            background: c.accent, color: "white", padding: "4px 12px",
            borderRadius: "100px", letterSpacing: "0.06em", textTransform: "uppercase" as const,
          }}
        >
          {c.tag}
        </span>
      </div>

      {/* Title */}
      <h2
        className="mb-1"
        style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(2rem, 6vw, 2.8rem)", fontWeight: 700, color: "hsl(340 45% 33%)", lineHeight: 1.15 }}
      >
        {c.title}
      </h2>
      <p className="mb-7" style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "hsl(340 20% 60%)" }}>
        {c.subtitle}
      </p>

      {/* Image */}
      <div className="polaroid mb-8" style={{ borderRadius: "8px" }}>
        <img src={c.image} alt={c.title} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: "4px" }} />
        <p style={{ textAlign: "center", marginTop: "8px", fontFamily: "'Caveat', cursive", fontSize: "1rem", color: "hsl(340 30% 55%)", fontWeight: 600 }}>
          {c.tag}
        </p>
      </div>

      {/* Letter card */}
      <div
        className="letter-paper cute-card p-7"
        style={{ border: `2px solid ${c.border}`, boxShadow: `0 8px 32px ${c.accent}22` }}
      >
        {/* Doodle corner hearts */}
        <div className="flex justify-between mb-4" style={{ opacity: 0.5 }}>
          <DoodleHeart color={c.accent} size={16} />
          <DoodleHeart color={c.accent} size={16} />
        </div>

        {c.paragraphs.map((para, i) => (
          <p
            key={i}
            className={i > 0 ? "mt-4" : ""}
            style={{
              fontFamily: i === 0 && type === "message" ? "'Caveat', cursive" : "'Nunito', sans-serif",
              fontSize: i === 0 && type === "message" ? "1.4rem" : "1rem",
              fontWeight: i === 0 && type === "message" ? 700 : 500,
              lineHeight: 1.85,
              color: "hsl(340 25% 30%)",
            }}
          >
            {para}
          </p>
        ))}

        {c.signing && (
          <p
            className="mt-6 text-right"
            style={{ fontFamily: "'Caveat', cursive", fontSize: "1.3rem", fontWeight: 700, color: c.accent }}
          >
            {c.signing}
          </p>
        )}

        <div className="flex justify-between mt-5" style={{ opacity: 0.4 }}>
          <span className="sticker">✨</span>
          <span className="sticker">🌸</span>
          <span className="sticker">✨</span>
        </div>
      </div>
    </div>
  );
}

/* ── Gift selection section ── */
function GiftSection({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<GiftType>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (type: GiftType) => {
    setSelected(type);
    setTimeout(() => setRevealed(true), 80);
  };

  const handleBack = () => {
    setRevealed(false);
    setTimeout(() => setSelected(null), 350);
  };

  const gifts = [
    { id: "flowers" as GiftType, emoji: "🌷", label: "Flowers",   sub: "A bouquet for you",       bg: "hsl(340 80% 97%)", border: "hsl(340 70% 84%)" },
    { id: "photos"  as GiftType, emoji: "📸", label: "Photos",    sub: "Our precious memories",   bg: "hsl(38 80% 96%)",  border: "hsl(38 70% 82%)" },
    { id: "message" as GiftType, emoji: "💌", label: "Letter",    sub: "Words from Coco's heart", bg: "hsl(270 50% 97%)", border: "hsl(270 50% 85%)" },
  ];

  return (
    <div
      className="min-h-screen relative px-6 py-14 flex flex-col items-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, hsl(340 80% 97%) 0%, hsl(40 80% 97%) 50%, hsl(200 60% 97%) 100%)" }}
    >
      <PetalRain />
      <DoodleStars />

      {!revealed ? (
        <>
          <button
            onClick={onBack}
            className="self-start mb-8 flex items-center gap-2 text-sm"
            style={{ color: "hsl(340 30% 55%)", fontFamily: "'Nunito', sans-serif", fontWeight: 700, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <Icon name="ArrowLeft" size={15} />
            Back
          </button>

          <span className="sticker text-4xl mb-3 animate-bounce-gentle" style={{ display: "block" }}>🎀</span>

          <h2
            className="text-center mb-2 animate-fade-up"
            style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(2.2rem, 7vw, 3.8rem)", fontWeight: 700, color: "hsl(340 45% 35%)", animationDelay: "0.1s", opacity: 0 }}
          >
            Pick a gift, Akiko!
          </h2>
          <p
            className="text-center mb-10 animate-fade-up"
            style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.88rem", fontWeight: 600, color: "hsl(340 20% 58%)", animationDelay: "0.25s", opacity: 0 }}
          >
            Three little surprises waiting for you 🌸
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
            {gifts.map((g, i) => (
              <GiftCard
                key={g.id}
                emoji={g.emoji}
                label={g.label}
                sub={g.sub}
                bg={g.bg}
                border={g.border}
                delay={`${0.3 + i * 0.12}s`}
                onClick={() => handleSelect(g.id)}
              />
            ))}
          </div>

          <div className="flex gap-2 mt-10 animate-fade-in" style={{ animationDelay: "0.8s", opacity: 0 }}>
            {["💖", "🌸", "✨", "🌷", "💖"].map((s, i) => (
              <span key={i} className="sticker" style={{ fontSize: "1rem" }}>{s}</span>
            ))}
          </div>
        </>
      ) : (
        <GiftReveal type={selected} onBack={handleBack} />
      )}
    </div>
  );
}

/* ── Root ── */
export default function Index() {
  const [page, setPage] = useState<"hero" | "gifts">("hero");

  return (
    <div style={{ minHeight: "100vh" }}>
      {page === "hero"
        ? <HeroSection onExplore={() => setPage("gifts")} />
        : <GiftSection onBack={() => setPage("hero")} />
      }
      <MusicButton />
    </div>
  );
}