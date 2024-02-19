"use client";

import { ThreadContext } from "@/hooks/threadContext";
import { CurrentThreadType, ThreadType } from "@/types/thread";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [currentThread, setCurrentThread] = useState<CurrentThreadType | null>(
    null
  );

  return (
    <ThreadContext.Provider
      value={{
        threads,
        setThreads,
        currentThread,
        setCurrentThread,
      }}
    >
      {children}
    </ThreadContext.Provider>
  );
}
