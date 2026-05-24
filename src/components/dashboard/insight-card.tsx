"use client";

import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function InsightCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(255,255,255,0.2)",
      }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="bg-yellow-500/20 p-3 rounded-xl">
          <AlertTriangle className="text-yellow-400" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>

          <p className="text-white/60 mt-2 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
