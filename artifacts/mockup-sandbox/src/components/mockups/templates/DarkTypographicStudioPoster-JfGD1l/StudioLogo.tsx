import './fonts.css';
import asset0 from "./assets/pos-03-studio-art.png";

import React from "react";

export function StudioLogo() {
  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="relative overflow-hidden bg-zinc-950 text-zinc-50 flex flex-col justify-between p-12"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={asset0}
          className="w-full h-full object-cover opacity-55 scale-105"
          alt="Abstract Studio Art"
        />
        {/* Gradients for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/40 to-zinc-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-zinc-950/30" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start">
        <div className="font-['Space_Mono'] text-xs tracking-[0.2em] uppercase text-zinc-400">
          EST. 2024
        </div>
        <div className="font-['Space_Mono'] text-xs tracking-[0.2em] uppercase text-right text-zinc-400 leading-relaxed">
          TOKYO<br />
          BERLIN<br />
          NEW YORK
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-end h-full mt-auto">
        <div className="mb-8">
          <h2 className="font-['Space_Mono'] text-[10px] tracking-[0.3em] uppercase text-zinc-400 mb-6">
            ART DIRECTION • INDUSTRIAL DESIGN • DIGITAL EXPERIENCES
          </h2>

          <h1 className="font-['Bebas_Neue'] text-[140px] leading-[0.85] tracking-tight mb-6">
            FORM<br />
            FOLLOWS<br />
            <span className="text-zinc-300">FICTION.</span>
          </h1>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end border-t border-zinc-800/80 pt-8 mt-4">
          <div className="font-['Space_Mono'] text-2xl font-bold tracking-[0.2em]">
            STUDIO / NØVA
          </div>
          <div className="flex items-center gap-4">
            <div className="font-['Space_Mono'] text-xs tracking-widest text-zinc-500">
              VOL. 01
            </div>
            <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center">
              <div className="w-2 h-2 bg-zinc-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
