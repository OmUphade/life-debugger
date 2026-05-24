"use client";

import { motion } from "framer-motion";

import { useInvestigation } from "@/context/investigation-context";
import { investigations } from "@/lib/mockInvestigations";

export default function EvidenceGraph() {
  const { currentMode } = useInvestigation();

  const currentData =
    investigations[currentMode as keyof typeof investigations];

  const nodes = currentData.evidence.map((item) => ({
    title: item,
    description: "Cross-source behavioral signal detected",
  }));

  return (
    <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Cross-Source Evidence Graph
        </h2>

        <p className="mt-2 text-white/50">
          Behavioral correlations detected across connected systems
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {nodes.map((node, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.15,
            }}
            className="relative"
          >
            <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-black/30 p-5 hover:bg-white/5 transition-all">
              <div className="rounded-2xl bg-blue-500/20 p-4">
                <div className="h-3 w-3 rounded-full bg-blue-300" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">
                  {node.title}
                </h3>

                <p className="mt-1 text-white/50">{node.description}</p>
              </div>
            </div>

            {index !== nodes.length - 1 && (
              <div className="ml-8 h-8 w-[2px] bg-gradient-to-b from-blue-400/70 to-transparent" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
