import { CurrentThreadType, ThreadType } from "@/types/thread";
import { createContext } from "react";

export const ThreadContext = createContext<{
  currentThread: CurrentThreadType | null;
  setCurrentThread: React.Dispatch<
    React.SetStateAction<CurrentThreadType | null>
  >;
  threads: ThreadType[];
  setThreads: React.Dispatch<React.SetStateAction<ThreadType[]>>;
}>({
  currentThread: null,
  setCurrentThread: () => {},
  threads: [],
  setThreads: () => {},
});
