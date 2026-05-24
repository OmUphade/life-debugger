"use client";

type Props = {
  liveData: {
    late_commits: number;
    focus_score: number;
    interruptions: number;
    meeting_hours: number;
  } | null;
};

export default function LiveDataPanel({ liveData }: Props) {
  if (!liveData) return null;

  const cards = [
    {
      label: "Meeting Hours",
      value: liveData.meeting_hours,
    },
    {
      label: "Discord Interruptions",
      value: liveData.interruptions,
    },
    {
      label: "Late-night Commits",
      value: liveData.late_commits,
    },
    {
      label: "Focus Score",
      value: liveData.focus_score,
    },
  ];

  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-white/10 bg-black/30 p-5"
        >
          <p className="text-sm text-white/50">{card.label}</p>

          <h3 className="mt-3 text-3xl font-bold text-white">{card.value}</h3>
        </div>
      ))}
    </div>
  );
}
