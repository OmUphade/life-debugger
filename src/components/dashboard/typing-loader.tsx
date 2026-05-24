"use client";

export default function TypingLoader() {
  return (
    <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 animate-bounce rounded-full bg-blue-300" />
        <div className="h-2 w-2 animate-bounce rounded-full bg-blue-300 [animation-delay:0.2s]" />
        <div className="h-2 w-2 animate-bounce rounded-full bg-blue-300 [animation-delay:0.4s]" />
      </div>

      <p className="mt-4 text-sm text-blue-200">
        Correlating behavioral evidence across systems...
      </p>
    </div>
  );
}
