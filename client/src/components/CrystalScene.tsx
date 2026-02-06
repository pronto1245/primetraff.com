import { useState, useEffect, useRef } from "react";

function CrystalStar({ side, scrollY }: { side: "left" | "right"; scrollY: number }) {
  const isLeft = side === "left";

  const baseY = isLeft ? Math.sin(scrollY * 0.003) * 15 : Math.cos(scrollY * 0.0025) * 18;
  const parallaxY = scrollY * (isLeft ? -0.08 : -0.06);
  const floatX = isLeft ? Math.cos(scrollY * 0.002) * 8 : Math.sin(scrollY * 0.0018) * 10;

  const spokes = 6;
  const layers = 5;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        [isLeft ? "left" : "right"]: "-2%",
        top: isLeft ? "15%" : "10%",
        width: isLeft ? 320 : 300,
        height: isLeft ? 320 : 300,
        transform: `translate(${floatX}px, ${baseY + parallaxY}px)`,
        transition: "transform 0.12s ease-out",
      }}
    >
      <div
        className="relative w-full h-full"
        style={{
          animation: `crystalSpin ${isLeft ? 25 : 30}s linear infinite ${isLeft ? "" : "reverse"}`,
        }}
      >
        {Array.from({ length: spokes }).map((_, i) => {
          const angle = (360 / spokes) * i;
          return (
            <div
              key={`spoke-${i}`}
              className="absolute left-1/2 top-1/2"
              style={{
                width: 1,
                height: "80%",
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                background: `linear-gradient(to bottom, transparent 0%, rgba(0,170,255,0.6) 15%, rgba(80,200,255,0.8) 50%, rgba(0,170,255,0.6) 85%, transparent 100%)`,
                boxShadow: "0 0 6px rgba(0,150,255,0.5), 0 0 12px rgba(0,120,255,0.2)",
              }}
            />
          );
        })}

        {[0, 60, 120].map((angle, i) => (
          <div
            key={`tri-up-${i}`}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "55px solid transparent",
                borderRight: "55px solid transparent",
                borderBottom: "95px solid rgba(0,140,255,0.07)",
                transform: "translateY(-32px)",
                filter: "drop-shadow(0 0 4px rgba(0,150,255,0.15))",
              }}
            />
          </div>
        ))}
        {[30, 90, 150].map((angle, i) => (
          <div
            key={`tri-down-${i}`}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg) scaleY(-1)`,
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "55px solid transparent",
                borderRight: "55px solid transparent",
                borderBottom: "95px solid rgba(0,120,230,0.06)",
                transform: "translateY(-32px)",
                filter: "drop-shadow(0 0 4px rgba(0,140,255,0.12))",
              }}
            />
          </div>
        ))}

        {Array.from({ length: layers }).map((_, i) => {
          const size = 90 - i * 15;
          const rotation = i * 12;
          const opacity = 0.3 - i * 0.04;
          return (
            <div
              key={`hex-${i}`}
              className="absolute left-1/2 top-1/2"
              style={{
                width: `${size}%`,
                height: `${size}%`,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                border: `1px solid rgba(0,180,255,${opacity})`,
                boxShadow: `inset 0 0 20px rgba(0,140,255,${opacity * 0.3}), 0 0 8px rgba(0,160,255,${opacity * 0.4})`,
              }}
            />
          );
        })}

        {Array.from({ length: spokes }).map((_, i) => {
          const angle = (360 / spokes) * i + 30;
          return (
            <div
              key={`inner-spoke-${i}`}
              className="absolute left-1/2 top-1/2"
              style={{
                width: 1,
                height: "50%",
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                background: `linear-gradient(to bottom, transparent 5%, rgba(100,210,255,0.35) 30%, rgba(100,210,255,0.35) 70%, transparent 95%)`,
                boxShadow: "0 0 4px rgba(0,170,255,0.25)",
              }}
            />
          );
        })}

        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: 14,
            height: 14,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(180,230,255,0.9) 0%, rgba(0,170,255,0.5) 50%, transparent 70%)",
            boxShadow: "0 0 15px rgba(0,170,255,0.7), 0 0 30px rgba(0,140,255,0.4), 0 0 50px rgba(0,100,220,0.2)",
          }}
        />

        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: "120%",
            height: "120%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,140,255,0.1) 0%, transparent 50%)",
            filter: "blur(15px)",
          }}
        />
      </div>
    </div>
  );
}

export default function CrystalScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      <CrystalStar side="left" scrollY={scrollY} />
      <CrystalStar side="right" scrollY={scrollY} />
    </div>
  );
}
