import './fonts.css';
import asset0 from "./assets/soc-29-face.png";

import React from 'react';

export default function GlassHoursPromo() {
  return (
    <div className="w-full h-full bg-[#0a0a0a] overflow-hidden flex flex-col relative justify-between">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={asset0} 
          alt="Close up face" 
          className="w-full h-full object-cover object-center grayscale contrast-125 brightness-90 opacity-90"
        />
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay">
          <svg className="w-full h-full">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
        {/* Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent h-[40%]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent w-[30%]"></div>
      </div>

      {/* Top Details */}
      <div className="relative z-10 p-10 flex justify-between items-start text-[#a0a0a0] uppercase tracking-widest text-[10px] font-['Inter']">
        <div className="flex flex-col gap-1">
          <span className="opacity-60">A Film By</span>
          <span className="text-[#dedede] font-semibold tracking-[0.25em]">Jonathan Crane</span>
        </div>
        <div className="text-right flex flex-col items-end gap-1">
          <span className="opacity-60">Official Selection</span>
          <div className="flex items-center gap-2">
            <span className="text-[#dedede] font-semibold tracking-[0.25em]">Midnight Festival</span>
          </div>
        </div>
      </div>

      {/* Center Title & Bottom */}
      <div className="relative z-10 flex flex-col items-center pb-12 pt-20">
        {/* Title */}
        <div className="flex flex-col items-center px-4 w-full">
          <h1 
            className="font-['Playfair_Display'] text-[160px] leading-[0.8] tracking-[-0.03em] text-[#f4f4f4] text-center"
            style={{ textShadow: '0 10px 40px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8)' }}
          >
            GLASS<br/>HOURS
          </h1>
        </div>

        {/* Small Credits Block */}
        <div className="mt-12 text-[#888] font-['Inter'] text-[9px] uppercase tracking-[0.25em] max-w-[640px] text-center leading-[1.8]">
          <p>
            Starring <span className="text-[#d0d0d0]">Elias Thorne</span> & <span className="text-[#d0d0d0]">Maeve Lin</span>
            &nbsp;&nbsp;•&nbsp;&nbsp; Director of Photography <span className="text-[#d0d0d0]">Arthur Reed</span>
            <br />
            Original Score by <span className="text-[#d0d0d0]">Kavinsky</span>
            &nbsp;&nbsp;•&nbsp;&nbsp; Edited by <span className="text-[#d0d0d0]">Sarah Vance</span>
          </p>
          <p className="mt-3 text-[7px] opacity-40 tracking-[0.1em]">
            Produced by Aethelgard Pictures in association with Midnight Sun Films. 
            Copyright © 2026. All Rights Reserved.
          </p>
        </div>

        {/* Now Showing Bar */}
        <div className="mt-10 px-8 py-3 border border-[#444] bg-black/60 backdrop-blur-md">
          <span className="font-['Inter'] text-[#eaeaea] uppercase tracking-[0.4em] text-[11px] font-semibold">
            In Theaters This Fall
          </span>
        </div>
      </div>
    </div>
  );
}
