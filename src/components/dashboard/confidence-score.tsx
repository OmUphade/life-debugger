"use client";

export default function ConfidenceScore() {
  return (
    <div className="mt-10 rounded-3xl border border-green-500/20 bg-green-500/10 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Behavioral Confidence Score
          </h2>

          <p className="mt-2 text-white/50">
            Cross-source analysis reliability
          </p>
        </div>

        <div className="text-5xl font-bold text-green-300">94%</div>
      </div>
    </div>
  );
}
