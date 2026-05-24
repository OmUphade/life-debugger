"use client";

import { motion } from "framer-motion";

export default function SystemStatus() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-8 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-3 w-3 rounded-full bg-blue-400" />

          <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-75" />
        </div>

        <div>
          <p className="text-sm text-blue-300 uppercase tracking-widest">
            AI Investigation Active
          </p>

          <h3 className="text-white font-medium mt-1">
            Scanning behavioral signals across connected platforms...
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
