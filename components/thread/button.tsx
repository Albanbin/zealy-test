"use client";

import { useContext, useMemo } from "react";

import { ThreadContext } from "@/hooks/threadContext";
import { CurrentThreadType } from "@/types/thread";

export default function ThreadButton({
  currentThread,
}: Readonly<{
  currentThread: CurrentThreadType;
}>) {
  const { setCurrentThread, threads } = useContext(ThreadContext);

  const thread = useMemo(() => {
    return threads[currentThread.index || 0];
  }, [threads]);

  const onClick = () => {
    setCurrentThread(currentThread);
  };

  if (!thread) return null;
  return (
    <div>
      <button
        className="fixed"
        style={{
          left: `${thread.x}px`,
          top: `${thread.y}px`,
        }}
        onClick={onClick}
      >
        <div className="bg-white shadow-lg rounded-xl rounded-tl-none p-1 relative">
          <div className="text-base uppercase w-8 h-8 items-center justify-center flex bg-blue-500 rounded-full text-white">
            {thread.comments[0].comment[0]}
          </div>
          <div className="w-4 h-4 text-white bg-red-500 text-[8px] rounded-full absolute top-0 right-0 flex items-center justify-center">
            <span>{thread.comments.length}</span>
          </div>
        </div>
      </button>
    </div>
  );
}
