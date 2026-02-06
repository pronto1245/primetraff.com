import { useState, useEffect, useRef } from "react";

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

  const starFloatY = Math.sin(scrollY * 0.003) * 20 - scrollY * 0.12;
  const starFloatX = Math.cos(scrollY * 0.002) * 10;
  const starRotate = scrollY * 0.04;
  const starScale = 1 + Math.sin(scrollY * 0.002) * 0.05;

  const iceFloatY = Math.cos(scrollY * 0.0025) * 25 - scrollY * 0.1;
  const iceFloatX = Math.sin(scrollY * 0.002) * 12;
  const iceRotate = scrollY * 0.025;
  const iceScale = 1 + Math.cos(scrollY * 0.003) * 0.04;

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      <div
        className="absolute"
        style={{
          left: "2%",
          top: "12%",
          width: 300,
          height: 300,
          transform: `translate(${starFloatX}px, ${starFloatY}px) rotate(${starRotate}deg) scale(${starScale})`,
          transition: "transform 0.1s linear",
          filter: "drop-shadow(0 0 30px rgba(0,140,255,0.4)) drop-shadow(0 0 60px rgba(0,100,220,0.2))",
        }}
      >
        <img
          src="/images/crystal-star.png"
          alt=""
          className="w-full h-full object-contain"
          style={{ mixBlendMode: "screen" }}
          draggable={false}
        />
      </div>

      <div
        className="absolute"
        style={{
          right: "3%",
          top: "8%",
          width: 240,
          height: 320,
          transform: `translate(${iceFloatX}px, ${iceFloatY}px) rotate(${iceRotate * 0.4}deg) scale(${iceScale})`,
          transition: "transform 0.1s linear",
          filter: "drop-shadow(0 0 25px rgba(0,150,255,0.35)) drop-shadow(0 0 50px rgba(0,120,220,0.15))",
        }}
      >
        <img
          src="/images/crystal-ice.png"
          alt=""
          className="w-full h-full object-contain"
          style={{ mixBlendMode: "screen" }}
          draggable={false}
        />
      </div>
    </div>
  );
}
