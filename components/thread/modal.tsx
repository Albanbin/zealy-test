"use client";

import data from "@emoji-mart/data";
import { useContext, useState } from "react";

import { ThreadContext } from "@/hooks/threadContext";
import ArrowUpFilledSvg from "@/public/arrow-up-filled.svg";
import SmileySvg from "@/public/smiley.svg";
import Picker from "@emoji-mart/react";
import { formatDistanceToNow } from "date-fns";

export default function ThreadModal() {
  const [commentValue, setCommentValue] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const { threads, setThreads, currentThread, setCurrentThread } =
    useContext(ThreadContext);

  const onSubmitComment = () => {
    if (!currentThread) return;

    const thread =
      currentThread.index !== null ? threads[currentThread.index] : null;

    if (thread) {
      setThreads((prev) => [
        ...prev.map((e) =>
          e.x === currentThread.x && e.y === currentThread.y
            ? {
                ...e,
                comments: [
                  ...e.comments,
                  {
                    date: new Date().toISOString(),
                    comment: commentValue,
                    reactions: [],
                  },
                ],
              }
            : e
        ),
      ]);
    } else {
      setThreads((prev) => [
        ...prev,
        {
          x: currentThread.x,
          y: currentThread.y,
          comments: [
            {
              date: new Date().toISOString(),
              comment: commentValue,
              reactions: [],
            },
          ],
        },
      ]);
      setCurrentThread(null);
    }
    setCommentValue("");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      onSubmitComment();
    }
  };

  const onClickOpenPicker = () => {
    setShowPicker((prev) => !prev);
  };

  const thread =
    currentThread && currentThread.index !== null
      ? threads[currentThread.index]
      : null;

  if (!currentThread) return null;
  return (
    <div
      className={`fixed gap-3 w-[300px] shadow-lg rounded-xl overflow-hidden bg-white rounded-tl-none`}
      style={{
        left: `${currentThread.x}px`,
        top: `${currentThread.y}px`,
      }}
    >
      {thread?.comments.map((comment, index) => (
        <p className="p-2 word-break text-sm break-words" key={index}>
          {comment.comment} -{" "}
          <span className="text-xs text-neutral-500">
            {formatDistanceToNow(new Date(comment.date), {
              addSuffix: true,
            })}
          </span>
        </p>
      ))}
      <form onSubmit={onSubmitComment}>
        <div className="flex border-b border-neutral-100">
          <textarea
            onKeyDown={onKeyDown}
            autoFocus
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            placeholder="Add a comment..."
            className="py-2 pl-4 pr-2 w-full h-full outline-none placeholder:text-sm resize-none text-sm"
          />
          <button
            className="text-blue-600 disabled:text-neutral-400 disabled:cursor-not-allowed px-2 transition-colors duration-300"
            type="submit"
            disabled={commentValue === ""}
          >
            <ArrowUpFilledSvg className="w-8 h-8" />
          </button>
        </div>
        <button
          className="px-2 flex items-center justify-center py-2 transition-colors text-neutral-400 hover:text-blue-500 duration-300"
          type="button"
          onClick={onClickOpenPicker}
        >
          <SmileySvg />
        </button>
        {showPicker && (
          <Picker
            data={data}
            onEmojiSelect={console.log}
            navPosition="none"
            previewPosition="none"
            skinTonePosition="none"
            searchPosition="none"
            emojiSize={20}
            emojiButtonSize={30}
          />
        )}
      </form>
    </div>
  );
}
