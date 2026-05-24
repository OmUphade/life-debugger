"use client";

import { motion } from "framer-motion";

const query = `
SELECT
  calendar.meeting_count,
  github.commit_activity,
  discord.interruptions,
  notion.completed_tasks
FROM calendar.events calendar

JOIN github.activity github
ON github.date = calendar.date

JOIN discord.messages discord
ON discord.timestamp >= github.last_commit_time

JOIN notion.tasks notion
ON notion.updated_at = calendar.date

WHERE calendar.meeting_count > 5
ORDER BY github.last_commit_time DESC;
`;

export default function CoralQuery() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6 backdrop-blur-2xl"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Coral Cross-Source Query
          </h2>

          <p className="mt-1 text-white/50">
            Unified behavioral investigation across connected systems
          </p>
        </div>

        <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
          LIVE QUERY
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-5">
        <pre className="text-sm leading-7 text-cyan-200">
          <code>{query}</code>
        </pre>
      </div>
    </motion.div>
  );
}
