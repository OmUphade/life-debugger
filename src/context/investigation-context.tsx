"use client";

import { createContext, useContext, useState } from "react";

type InvestigationContextType = {
  currentMode: string;
  setCurrentMode: (mode: string) => void;
};

const InvestigationContext = createContext<InvestigationContextType>({
  currentMode: "deadlines",
  setCurrentMode: () => {},
});

export function InvestigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentMode, setCurrentMode] = useState("deadlines");

  return (
    <InvestigationContext.Provider
      value={{
        currentMode,
        setCurrentMode,
      }}
    >
      {children}
    </InvestigationContext.Provider>
  );
}

export function useInvestigation() {
  return useContext(InvestigationContext);
}
