"use client";

import { useContext } from "react";

import { ThreadContext } from "@/hooks/threadContext";
import ThreadButton from "../thread/button";
import ThreadModal from "../thread/modal";

export default function LayoutClickable({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setCurrentThread, threads } = useContext(ThreadContext);

  const onClickLayout = (e: React.MouseEvent) => {
    setCurrentThread({ x: e.clientX, y: e.clientY + 20, index: null });
  };

  return (
    <>
      <div className="cursor-comment h-full w-full" onClick={onClickLayout}>
        {children}
      </div>
      {threads.map((thread, index) => (
        <ThreadButton
          key={index}
          currentThread={{
            x: thread.x,
            y: thread.y,
            index,
          }}
        />
      ))}
      <ThreadModal />
    </>
  );
}
