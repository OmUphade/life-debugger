"use client";

import { motion } from "framer-motion";

const logs = [
  "Scanning GitHub activity...",
  "Correlating Discord interruptions...",
  "Analyzing calendar overload...",
  "Matching Notion completion decline...",
  "Generating behavioral profile...",
];

export default function LiveActivity() {
  return (
    <div className="mt-10 rounded-3xl border border-white/10 bg-black/30 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Live Investigation Activity
      </h2>

      <div className="space-y-4">
        {logs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: index * 0.5,
              repeat: Infinity,
              repeatDelay: 4,
            }}
            className="flex items-center gap-3 text-sm text-blue-200"
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />

            {log}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
