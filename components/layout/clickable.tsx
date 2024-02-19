"use client";

import { useContext, useEffect, useState } from "react";

import { ThreadContext } from "@/hooks/threadContext";
import ThreadButton from "../thread/button";
import ThreadModal from "../thread/modal";

export default function LayoutClickable({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setThreads, setCurrentThread, threads } = useContext(ThreadContext);

  const onClickLayout = (e: React.MouseEvent) => {
    setCurrentThread({ x: e.clientX, y: e.clientY + 20, index: null });
  };

  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      const widthRatio = newWidth / dimensions.width;
      const heightRatio = newHeight / dimensions.height;

      setThreads(
        threads.map((thread) => ({
          ...thread,
          x: thread.x * widthRatio,
          y: thread.y * heightRatio,
        }))
      );

      setDimensions({ width: newWidth, height: newHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [threads]);

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
