import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const FLOWERS_IMG = "https://cdn.ezst.app/projects/484d62d1-93ec-41a1-a7ac-f39d1a365a2a/files/b1952fb7-08cb-4e76-a460-4b0d47b6b983.jpg";
const PHOTO_IMG = "https://cdn.ezst.app/projects/484d62d1-93ec-41a1-a7ac-f39d1a365a2a/files/20eecb92-8054-4431-b1d1-b23bfe8d9046.jpg";
const GIFT_IMG = "https://cdn.ezst.app/projects/484d62d1-93ec-41a1-a7ac-f39d1a365a2a/files/70a020ed-4299-4f44-8c93-4707f72e4702.jpg";

type GiftType = "flowers" | "photos" | "message" | null;

const petals = ["🌸", "🌷", "✿", "❀", "🌺"];

function PetalRain() {
  const items = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${5 + i * 8}%`,
    duration: `${7 + (i % 5)}s`,
    delay: `${(i * 1.3) % 10}s`,
    emoji: petals[i % petals.length],
    size: `${0.8 + (i % 3) * 0.3}rem`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            top: "-20px",
            animationDuration: p.duration,
            animationDelay: p.delay,
            fontSize: p.size,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

function HeroSection({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-6 py-16">
      <PetalRain />

      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, hsl(350 60% 94%) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, hsl(38 50% 93%) 0%, transparent 55%), hsl(40 30% 97%)",
        }}
      />

      <div className="flex items-center gap-4 mb-10 animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
        <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, hsl(345 55% 75%))" }} />
        <span className="text-sm tracking-[0.3em] uppercase font-light" style={{ color: "hsl(345 45% 60%)", fontFamily: "'Jost', sans-serif" }}>
          With all my love
        </span>
        <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, hsl(345 55% 75%))" }} />
      </div>

      <h1
        className="text-center mb-6 animate-fade-up"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2.8rem, 8vw, 6rem)",
          fontWeight: 300,
          lineHeight: 1.1,
          color: "hsl(20 10% 22%)",
          animationDelay: "0.4s",
          opacity: 0,
        }}
      >
        Happy{" "}
        <em className="shimmer-text" style={{ fontStyle: "italic", fontWeight: 400 }}>
          Mother's Day
        </em>
      </h1>

      <p
        className="text-center max-w-md mb-14 animate-fade-up"
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 200,
          fontSize: "1.05rem",
          color: "hsl(20 10% 48%)",
          lineHeight: 1.8,
          animationDelay: "0.7s",
          opacity: 0,
        }}
      >
        A small corner of the world created just for you, filled with everything that makes today special.
      </p>

      <button
        onClick={onExplore}
        className="animate-fade-up gift-btn"
        style={{
          animationDelay: "1s",
          opacity: 0,
          background: "linear-gradient(135deg, hsl(345 55% 62%), hsl(345 45% 52%))",
          color: "white",
          border: "none",
          padding: "16px 48px",
          fontSize: "0.85rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          borderRadius: "100px",
          cursor: "pointer",
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
        }}
      >
        Open Your Gift ✦
      </button>

      <div className="flex gap-4 mt-16 animate-fade-in" style={{ animationDelay: "1.3s", opacity: 0 }}>
        {[
          { src: FLOWERS_IMG, rotate: "-6deg", size: "80px", mt: "0" },
          { src: PHOTO_IMG, rotate: "0deg", size: "96px", mt: "-16px" },
          { src: GIFT_IMG, rotate: "5deg", size: "80px", mt: "0" },
        ].map((img, i) => (
          <div
            key={i}
            style={{
              width: img.size,
              height: img.size,
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              transform: `rotate(${img.rotate})`,
              marginTop: img.mt,
              border: "2px solid rgba(255,255,255,0.9)",
            }}
          >
            <img src={img.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function GiftCard({ emoji, label, sub, bg, accent, delay, onClick }: {
  emoji: string; label: string; sub: string; bg: string; accent: string; delay: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="gift-btn animate-slide-in-up flex flex-col items-center gap-3 py-10 px-6"
      style={{
        animationDelay: delay,
        opacity: 0,
        background: bg,
        border: `1px solid ${accent}33`,
        cursor: "pointer",
        borderRadius: "24px",
        outline: "none",
      }}
    >
      <span style={{ fontSize: "2.5rem" }}>{emoji}</span>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 500, color: "hsl(20 10% 22%)" }}>
        {label}
      </span>
      <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", fontWeight: 200, color: "hsl(20 10% 55%)", letterSpacing: "0.05em" }}>
        {sub}
      </span>
      <div
        style={{
          marginTop: "8px",
          width: "32px",
          height: "1px",
          background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
        }}
      />
    </button>
  );
}

function GiftReveal({ type, onBack }: { type: GiftType; onBack: () => void }) {
  const content = {
    flowers: {
      title: "A Bouquet of Love",
      subtitle: "Every petal holds a thought of you",
      image: FLOWERS_IMG,
      text: "These flowers are as beautiful as you are — a little reminder that you make every room bloom just by being in it. Today and always, you deserve all the flowers in the world.",
      closing: null,
      accent: "hsl(345 55% 62%)",
      emoji: "🌷",
    },
    photos: {
      title: "Our Memories",
      subtitle: "Captured moments, forever treasured",
      image: PHOTO_IMG,
      text: "Every photograph is a love letter. These moments are my most precious gifts — because every one of them has you in it. Thank you for being the story I love telling.",
      closing: null,
      accent: "hsl(38 50% 60%)",
      emoji: "📸",
    },
    message: {
      title: "From My Heart",
      subtitle: "Words I carry every day",
      image: GIFT_IMG,
      text: "You are my first home, my safe harbor, my greatest teacher. The world is kinder because you are in it, and I am who I am because of you. Thank you for your love, your patience, and your endless grace.",
      closing: "With all my love — always.",
      accent: "hsl(345 45% 52%)",
      emoji: "💌",
    },
  };

  const c = content[type!];
  if (!c) return null;

  return (
    <div className="w-full max-w-xl mx-auto animate-scale-reveal">
      <button
        onClick={onBack}
        className="mb-10 flex items-center gap-2 text-sm"
        style={{ color: "hsl(20 10% 55%)", fontFamily: "'Jost', sans-serif", fontWeight: 300, letterSpacing: "0.05em", background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <Icon name="ArrowLeft" size={16} />
        Choose another
      </button>

      <div className="text-center mb-5" style={{ fontSize: "3rem" }}>{c.emoji}</div>

      <h2
        className="text-center mb-2"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 400,
          color: "hsl(20 10% 20%)",
          lineHeight: 1.15,
        }}
      >
        {c.title}
      </h2>
      <p
        className="text-center mb-8"
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.75rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase" as const,
          color: c.accent,
          fontWeight: 300,
        }}
      >
        {c.subtitle}
      </p>

      <div
        className="photo-frame rounded-3xl overflow-hidden mb-8"
        style={{ border: `1px solid ${c.accent}33`, aspectRatio: "4/3", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
      >
        <img src={c.image} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <div
        className="message-card rounded-3xl p-8"
        style={{ border: `1px solid ${c.accent}22` }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.15rem",
            lineHeight: 1.85,
            fontWeight: 300,
            color: "hsl(20 10% 28%)",
          }}
        >
          {c.text}
        </p>
        {c.closing && (
          <p
            className="mt-5"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem",
              lineHeight: 1.85,
              fontWeight: 300,
              color: "hsl(20 10% 38%)",
              fontStyle: "italic",
            }}
          >
            {c.closing}
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-3 mt-8">
        <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${c.accent})` }} />
        <span style={{ color: c.accent, fontSize: "1rem" }}>✦</span>
        <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${c.accent})` }} />
      </div>
    </div>
  );
}

function GiftSection({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<GiftType>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (type: GiftType) => {
    setSelected(type);
    setTimeout(() => setRevealed(true), 100);
  };

  const handleBack = () => {
    setRevealed(false);
    setTimeout(() => setSelected(null), 400);
  };

  const gifts = [
    { id: "flowers" as GiftType, emoji: "🌷", label: "Flowers", sub: "A bouquet just for you", accent: "hsl(345 55% 62%)", bg: "hsl(350 60% 96%)" },
    { id: "photos" as GiftType, emoji: "📸", label: "Photos", sub: "Our precious memories", accent: "hsl(38 50% 60%)", bg: "hsl(40 50% 96%)" },
    { id: "message" as GiftType, emoji: "💌", label: "Message", sub: "Words from the heart", accent: "hsl(200 40% 55%)", bg: "hsl(200 40% 96%)" },
  ];

  return (
    <div className="min-h-screen relative px-6 py-16 flex flex-col items-center">
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, hsl(350 60% 94%) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(38 50% 93%) 0%, transparent 50%), hsl(40 30% 97%)",
        }}
      />
      <PetalRain />

      {!revealed ? (
        <>
          <button
            onClick={onBack}
            className="self-start mb-10 flex items-center gap-2 text-sm"
            style={{ color: "hsl(20 10% 55%)", fontFamily: "'Jost', sans-serif", fontWeight: 300, letterSpacing: "0.05em", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <Icon name="ArrowLeft" size={16} />
            Back
          </button>

          <p className="text-center mb-3" style={{ color: "hsl(345 45% 60%)", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase" as const, fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
            Choose Your Gift
          </p>
          <h2
            className="text-center mb-14 animate-fade-up"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "hsl(20 10% 22%)", animationDelay: "0.1s", opacity: 0 }}
          >
            What shall we open first?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-2xl">
            {gifts.map((g, i) => (
              <GiftCard
                key={g.id}
                emoji={g.emoji}
                label={g.label}
                sub={g.sub}
                bg={g.bg}
                accent={g.accent}
                delay={`${0.2 + i * 0.15}s`}
                onClick={() => handleSelect(g.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <GiftReveal type={selected} onBack={handleBack} />
      )}
    </div>
  );
}

export default function Index() {
  const [page, setPage] = useState<"hero" | "gifts">("hero");

  return (
    <div style={{ minHeight: "100vh" }}>
      {page === "hero" ? (
        <HeroSection onExplore={() => setPage("gifts")} />
      ) : (
        <GiftSection onBack={() => setPage("hero")} />
      )}
    </div>
  );
}
