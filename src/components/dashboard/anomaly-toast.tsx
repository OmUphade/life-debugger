"use client";

import { motion, AnimatePresence } from "framer-motion";

import { useEffect, useState } from "react";

const alerts = [
  "Burnout probability increased by 12%",
  "Deep-work fragmentation detected",
  "Late-night GitHub activity escalating",
  "Discord interruption cluster identified",
  "Task completion stability declining",
];

export default function AnomalyToast() {
  const [visible, setVisible] = useState(true);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % alerts.length);

        setVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={alerts[index]}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            className="rounded-2xl border border-red-500/20 bg-black/80 px-5 py-4 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-red-400 animate-pulse" />

              <div>
                <p className="text-sm font-medium text-white">
                  Behavioral anomaly detected
                </p>

                <p className="mt-1 text-sm text-white/60">{alerts[index]}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
