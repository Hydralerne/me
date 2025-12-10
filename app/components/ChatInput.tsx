"use client";

import { useState } from "react";

export default function ChatInput() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message submission here
      console.log("Message:", message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="group relative flex items-center rounded-full border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 focus-within:border-zinc-600">
        <button
          type="button"
          className="flex h-14 w-14 items-center justify-center text-zinc-500 transition-colors hover:text-zinc-400"
          aria-label="Add attachment"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything"
          className="flex-1 bg-transparent py-4 pr-4 text-sm text-white placeholder-zinc-500 outline-none sm:text-base"
        />
        
        <button
          type="button"
          className="mr-2 flex h-10 w-10 items-center justify-center text-zinc-500 transition-colors hover:text-zinc-400"
          aria-label="Voice input"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
        
        <button
          type="submit"
          disabled={!message.trim()}
          className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all hover:bg-zinc-200 active:scale-95 disabled:opacity-50 disabled:hover:bg-white"
          aria-label="Send message"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </form>
  );
}
