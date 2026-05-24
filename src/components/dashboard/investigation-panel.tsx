"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { Sparkles, AlertTriangle, Brain, ShieldCheck } from "lucide-react";

import TypingLoader from "./typing-loader";

import LiveDataPanel from "./live-data-panel";

import { useInvestigation } from "@/context/investigation-context";

type InvestigationData = {
  rootCause: string;
  observations: string[];
  recommendations: string[];
};

type LiveData = {
  late_commits: number;
  focus_score: number;
  interruptions: number;
  meeting_hours: number;
};

const quickQuestions = [
  {
    label: "Why have I been missing deadlines?",
    mode: "deadlines",
  },
  {
    label: "Am I approaching burnout?",
    mode: "burnout",
  },
  {
    label: "What is destroying my productivity?",
    mode: "productivity",
  },
];

export default function InvestigationPanel() {
  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);

  const [phase, setPhase] = useState("");

  const [data, setData] = useState<InvestigationData | null>(null);

  const [liveData, setLiveData] = useState<LiveData | null>(null);

  const { setCurrentMode } = useInvestigation();

  async function handleInvestigation(forcedQuestion?: string) {
    const activeQuestion = forcedQuestion || question;

    if (!activeQuestion) return;

    setData(null);

    if (activeQuestion.toLowerCase().includes("burnout")) {
      setCurrentMode("burnout");
    } else if (activeQuestion.toLowerCase().includes("productivity")) {
      setCurrentMode("productivity");
    } else {
      setCurrentMode("deadlines");
    }

    setLoading(true);

    setPhase("Connecting data sources...");

    setTimeout(() => {
      setPhase("Running SQL behavioral joins...");
    }, 1200);

    setTimeout(() => {
      setPhase("Generating behavioral intelligence...");
    }, 2400);

    try {
      const res = await fetch("/api/investigate", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          question: activeQuestion,
        }),
      });

      const result = await res.json();

      setLiveData(result.liveData);

      setPhase("Investigation complete.");

      setTimeout(() => {
        setData(result.data);

        setLoading(false);
      }, 700);
    } catch (error) {
      console.error(error);

      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-blue-500/20 p-3">
          <Sparkles className="text-blue-300" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Behavioral Intelligence Engine
          </h2>

          <p className="text-white/50">
            Behavioral intelligence through cross-source SQL analysis
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Why have I been missing deadlines recently?"
          className="flex-1 rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none placeholder:text-white/30"
        />

        <button
          onClick={() => handleInvestigation()}
          disabled={loading}
          className="rounded-2xl bg-blue-500 px-6 py-4 font-medium text-white transition-all hover:bg-blue-400 disabled:opacity-50"
        >
          {loading ? "Investigating..." : "Investigate"}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {quickQuestions.map((q) => (
          <button
            key={q.label}
            onClick={() => {
              setQuestion(q.label);

              setCurrentMode(q.mode);

              handleInvestigation(q.label);
            }}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10"
          >
            {q.label}
          </button>
        ))}
      </div>

      <LiveDataPanel liveData={liveData} />

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <div className="mt-4 text-sm text-cyan-300">{phase}</div>

            <TypingLoader />
          </motion.div>
        )}

        {!loading && data && (
          <motion.div
            key="result"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            className="mt-8 space-y-6"
          >
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
              <div className="mb-4 flex items-center gap-3">
                <AlertTriangle className="text-red-300" />

                <h3 className="text-xl font-semibold text-white">
                  Root Cause Analysis
                </h3>
              </div>

              <p className="leading-relaxed text-white/70">{data.rootCause}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <div className="mb-5 flex items-center gap-3">
                <Brain className="text-blue-300" />

                <h3 className="text-xl font-semibold text-white">
                  Behavioral Observations
                </h3>
              </div>

              <div className="space-y-4">
                {data.observations.map((observation, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-white/5 p-4 text-white/70"
                  >
                    {observation}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6">
              <div className="mb-5 flex items-center gap-3">
                <ShieldCheck className="text-green-300" />

                <h3 className="text-xl font-semibold text-white">
                  Recommended Actions
                </h3>
              </div>

              <div className="space-y-4">
                {data.recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-black/20 p-4 text-white/80"
                  >
                    {recommendation}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
