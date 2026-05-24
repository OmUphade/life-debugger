"use client";

import { motion } from "framer-motion";

import { useInvestigation } from "@/context/investigation-context";
import { investigations } from "@/lib/mockInvestigations";

export default function InvestigationTimeline() {
  const { currentMode } = useInvestigation();

  const currentData =
    investigations[currentMode as keyof typeof investigations];

  const events = currentData.timeline.map((item) => ({
    title: item,
    time: "LIVE",
    description: "Cross-source behavioral activity detected.",
  }));

  return (
    <div className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Investigation Timeline
          </h2>

          <p className="mt-1 text-white/50">
            Cross-platform behavioral correlation analysis
          </p>
        </div>
      </div>

      <div className="relative ml-4 space-y-8 border-l border-white/10">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.4,
            }}
            className="relative pl-10"
          >
            <div className="absolute -left-[18px] top-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/20 backdrop-blur-xl">
              <div className="h-3 w-3 rounded-full bg-blue-300" />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{event.title}</h3>

                <span className="text-xs text-white/40">{event.time}</span>
              </div>

              <p className="mt-3 leading-relaxed text-white/60">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
