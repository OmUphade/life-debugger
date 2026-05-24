"use client";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import { useInvestigation } from "@/context/investigation-context";

import { investigations } from "@/lib/mockInvestigations";

const modeStyles = {
  deadlines: "from-amber-500/10 to-orange-500/5 border-amber-500/20",

  burnout: "from-red-500/10 to-red-900/10 border-red-500/20",

  productivity: "from-cyan-500/10 to-blue-500/5 border-cyan-500/20",
};

function randomDelta() {
  return Math.floor(Math.random() * 3) - 1;
}

export default function HeroSignal() {
  const { currentMode } = useInvestigation();

  const baseSignals =
    investigations[currentMode as keyof typeof investigations].signals;

  const [signals, setSignals] = useState(baseSignals);

  useEffect(() => {
    setSignals(baseSignals);

    const interval = setInterval(() => {
      setSignals((prev) => {
        const next = prev + randomDelta();

        const min = baseSignals - 3;

        const max = baseSignals + 4;

        if (next < min) return min;

        if (next > max) return max;

        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [baseSignals]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className={`mb-10 rounded-3xl border bg-gradient-to-br p-8 ${modeStyles[currentMode as keyof typeof modeStyles]}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            Behavioral Intelligence Engine
          </p>

          <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-tight text-white">
            Cross-source behavioral anomalies detected across your digital life.
          </h1>

          <p className="mt-5 max-w-xl text-lg text-white/60">
            Life Debugger correlates behavioral patterns through cross-source
            SQL analysis inspired by Coral.
          </p>
        </div>

        <div className="text-right">
          <motion.div
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-6xl font-bold text-white"
          >
            {signals}
          </motion.div>

          <p className="mt-2 text-sm text-white/50">Active Signals</p>
        </div>
      </div>
    </motion.div>
  );
}
