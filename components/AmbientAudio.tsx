"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Sparkles, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [showControls, setShowControls] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 1. Generate gentle warm rain / cafe background pink noise
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Low pass filter for soothing cafe hum
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(650, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start(0);
      noiseSourceRef.current = whiteNoise;

      // 2. Vinyl crackle / warm coffee house warmth modulation
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(0.2, ctx.currentTime); // slow breathing wave
      oscGain.gain.setValueAtTime(150, ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(filter.frequency);
      osc.start();
      lfoRef.current = osc;

    } catch (err) {
      console.warn("Ambient audio error", err);
    }
  };

  const togglePlay = () => {
    if (!audioCtxRef.current) {
      initAudio();
    }
    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
      }
      setIsPlaying(false);
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.2);
      }
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current && isPlaying) {
      gainNodeRef.current.gain.setTargetAtTime(newVol, audioCtxRef.current.currentTime, 0.1);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2">
        <button
          onClick={togglePlay}
          onMouseEnter={() => setShowControls(true)}
          className={`flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-bold transition duration-300 border ${
            isPlaying
              ? "bg-accent text-primary border-accent shadow-lg shadow-accent/25 glow-gold-sm"
              : "bg-white/70 text-primary hover:bg-white border-primary/10 dark:bg-white/10 dark:text-white dark:border-white/10 dark:hover:bg-white/20"
          }`}
          aria-label={isPlaying ? "Mute cafe ambience" : "Play soothing cafe ambience"}
        >
          {isPlaying ? (
            <>
              <Volume2 className="h-4 w-4 animate-pulse text-primary" />
              <span className="hidden sm:inline">Cafe Ambience ON</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </>
          ) : (
            <>
              <VolumeX className="h-4 w-4 text-accent" />
              <span className="hidden sm:inline">Cafe Ambience</span>
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            onMouseLeave={() => setShowControls(false)}
            className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-accent/20 bg-white/95 p-4 shadow-2xl backdrop-blur-xl dark:bg-[#1A0F0A]/95 dark:border-white/10 z-50 text-xs"
          >
            <div className="flex items-center justify-between font-bold text-primary dark:text-white mb-2">
              <span className="flex items-center gap-1.5 text-accent">
                <Music className="h-3.5 w-3.5" />
                Lo-Fi Cafe Rain
              </span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-[#D49B53] cursor-pointer"
            />
            <p className="mt-2 text-[11px] text-cafe-muted dark:text-white/60 leading-relaxed">
              Synthesized warm ambient sound for reading & soul relaxation.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
