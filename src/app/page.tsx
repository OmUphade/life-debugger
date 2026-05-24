import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/dashboard/header";
import InsightCard from "@/components/dashboard/insight-card";
import SystemStatus from "@/components/dashboard/system-status";
import InvestigationTimeline from "@/components/dashboard/investigation-timeline";
import InvestigationPanel from "@/components/dashboard/investigation-panel";
import EvidenceGraph from "@/components/dashboard/evidence-graph";
import CoralQuery from "@/components/dashboard/coral-query";
import ConnectedSources from "@/components/dashboard/connected-sources";
import LiveActivity from "@/components/dashboard/live-activity";
import ConfidenceScore from "@/components/dashboard/confidence-score";
import HeroSignal from "@/components/dashboard/hero-signal";
import AnomalyToast from "@/components/dashboard/anomaly-toast";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <section className="ml-64 flex-1 p-10 bg-gradient-to-br from-black via-zinc-950 to-zinc-900">
        <HeroSignal />
        <Header />
        <ConnectedSources />
        <SystemStatus />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <InsightCard
            title="Productivity anomaly detected"
            description="Meeting overload increased 42% between Tuesday and Thursday."
          />

          <InsightCard
            title="Late-night coding pattern"
            description="GitHub activity shifted after midnight across the last 5 days."
          />

          <InsightCard
            title="Focus interruptions detected"
            description="Discord activity strongly correlates with unfinished tasks."
          />

          <InsightCard
            title="Context switching overload"
            description="Rapid switching between tools reduced deep work sessions."
          />

          <InsightCard
            title="Burnout risk increasing"
            description="Calendar density and reduced sleep windows indicate fatigue patterns."
          />

          <InsightCard
            title="Task completion decline"
            description="Notion tasks completed dropped 31% after increased meetings."
          />
        </div>
        <InvestigationTimeline />
        <InvestigationPanel />
        <EvidenceGraph />
        <CoralQuery />
        <LiveActivity />
        <ConfidenceScore />
        <AnomalyToast />
      </section>
    </main>
  );
}
