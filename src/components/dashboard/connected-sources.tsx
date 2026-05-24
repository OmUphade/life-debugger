"use client";

const sources = ["Google Calendar", "GitHub", "Discord", "Notion", "Gmail"];

export default function ConnectedSources() {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {sources.map((source) => (
        <div
          key={source}
          className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300"
        >
          ● {source} Connected
        </div>
      ))}
    </div>
  );
}
