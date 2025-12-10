"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Hero from "./components/Hero";
import ProjectLinks from "./components/ProjectLinks";
import ChatInput from "./components/ChatInput";
import SocialLinks from "./components/SocialLinks";
import { ChatProvider, ChatCore, useChatContext } from "react-chat-agent";

// Custom confirmation modal
function ConfirmModal({ isOpen, onClose, onConfirm, title, message }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/90 p-6 shadow-2xl">
        <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
        <p className="text-white/60 text-sm mb-6">{message}</p>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-white text-black hover:bg-white/90 transition-colors"
          >
            Create New Session
          </button>
        </div>
      </div>
    </div>
  );
}

// Toast notification
function Toast({ message, isVisible, onClose }: {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="rounded-lg border border-white/10 bg-black/90 backdrop-blur-sm px-4 py-3 shadow-lg">
        <p className="text-sm text-white">{message}</p>
      </div>
    </div>
  );
}

// Generate or retrieve user fingerprint from localStorage
function getOrCreateFingerprint(): string {
  const FINGERPRINT_KEY = 'oblien_user_fingerprint';
  
  let fingerprint = localStorage.getItem(FINGERPRINT_KEY);
  
  if (!fingerprint) {
    // Generate a unique fingerprint
    fingerprint = `fp_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(FINGERPRINT_KEY, fingerprint);
  }
  
  return fingerprint;
}

// Store session in localStorage
function storeSession(sessionId: string, accessToken: string) {
  localStorage.setItem('oblien_session', JSON.stringify({
    sessionId,
    accessToken,
    timestamp: Date.now(),
  }));
}

// Retrieve session from localStorage
function getStoredSession(): { sessionId: string; accessToken: string } | null {
  try {
    const stored = localStorage.getItem('oblien_session');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error parsing stored session:', error);
  }
  return null;
}

// Chat Interface Component - integrates ChatCore with custom ChatInput
function ChatInterface({ onBackToHome, onCreateSession }: { onBackToHome: () => void; onCreateSession: () => void }) {
  const coreRef = useRef(null);
  const { sendMsg, isStreaming, abort } = useChatContext();
  const [isMounted, setIsMounted] = useState(false);

  // Delay mounting ChatCore to avoid flushSync issues
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = useCallback(async (messageData: { message: string }) => {
    await sendMsg(messageData);
    // Auto-scroll after sending
    setTimeout(() => {
      // @ts-ignore
      coreRef.current?.scrollToBottom();
    }, 100);
  }, [sendMsg]);

  return (
    <div className="relative h-full w-full flex flex-col">
      {/* Header with back button and logo */}
      <div className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-4">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>
        
        {/* Logo */}
        <div className="text-xs text-white/40 font-light tracking-wider">
          abdelhamed mohamed
        </div>
      </div>

      {/* Chat messages container */}
      <div className="flex-1 w-full max-w-3xl mx-auto overflow-hidden">
        {isMounted ? (
          <ChatCore
            ref={coreRef}
            isDark={true}
            allowEditMessage={false}
            className="h-full px-4 pt-20 pb-4"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Chat input at bottom */}
      <div className="w-full flex justify-center pb-8 px-4">
        <ChatInputWrapper onSendMessage={handleSendMessage} isStreaming={isStreaming} abort={abort} onNewSession={onCreateSession} />
      </div>
    </div>
  );
}

// Wrapper for custom ChatInput to handle message sending
function ChatInputWrapper({ onSendMessage, isStreaming, abort, onNewSession }: any) {
  const [message, setMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isStreaming) {
      onSendMessage({ message: message.trim() });
      setMessage("");
    }
  };

  const handleStop = () => {
    abort();
  };

  const handleNewSession = () => {
    setShowConfirmModal(true);
  };

  const confirmNewSession = () => {
    setShowConfirmModal(false);
    onNewSession();
  };

  const handleVoiceClick = () => {
    setShowToast(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl">
        <div className="group relative flex items-center rounded-full border border-white/10 bg-black/30 backdrop-blur-sm transition-all duration-300 hover:border-white/20 focus-within:border-white/30">
          <button
            type="button"
            onClick={handleNewSession}
            className="flex h-14 w-14 items-center justify-center text-white/50 transition-colors hover:text-white/80"
            aria-label="New chat session"
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
            disabled={isStreaming}
            className="flex-1 bg-transparent py-4 pr-4 text-sm text-white placeholder-white/30 outline-none sm:text-base disabled:opacity-50"
          />
          
          <button
            type="button"
            onClick={handleVoiceClick}
            className="mr-2 flex h-10 w-10 items-center justify-center text-white/50 transition-colors hover:text-white/80"
            aria-label="Voice input"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          
          {isStreaming ? (
            <button
              type="button"
              onClick={handleStop}
              className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 active:scale-95"
              aria-label="Stop generation"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!message.trim()}
              className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all hover:bg-white/90 active:scale-95 disabled:opacity-30 disabled:hover:bg-white"
              aria-label="Send message"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          )}
        </div>
      </form>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmNewSession}
        title="Create New Session"
        message="Current conversation will be saved. Are you sure you want to start a new session?"
      />

      <Toast
        message="🎤 Voice input coming soon!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [authConfig, setAuthConfig] = useState<{ sessionId: string; accessToken: string } | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(false);

  // Fetch or create guest session
  const fetchSession = async () => {
    try {
      const fingerprint = getOrCreateFingerprint();
      
      const res = await fetch('/api/session/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fingerprint }),
      });
      const data = await res.json();

      if (res.ok) {
        const config = {
          sessionId: data.sessionId,
          accessToken: data.accessToken,
        };
        setAuthConfig(config);
        storeSession(config.sessionId, config.accessToken);
        return config;
      } else {
        console.error('Failed to create session:', data.error);
        return null;
      }
    } catch (error) {
      console.error('Error creating session:', error);
      return null;
    }
  };

  // Create guest session when chat is opened
  const handleChatClick = async () => {
    setChatOpen(true);
    setIsLoadingSession(true);

    try {
      // First check if we have a stored session
      const stored = getStoredSession();
      if (stored) {
        // TODO: Verify the session is still valid
        setAuthConfig(stored);
      } else {
        // Create new session
        const config = await fetchSession();
        if (!config) {
          alert('Failed to create chat session. Please try again.');
          setChatOpen(false);
        }
      }
    } catch (error) {
      console.error('Error initializing chat:', error);
      alert('Failed to initialize chat. Please try again.');
      setChatOpen(false);
    } finally {
      setIsLoadingSession(false);
    }
  };

  const handleCreateSession = useCallback(async () => {
    // Create a new session (for "New Chat" button)
    try {
      const config = await fetchSession();
      if (config) {
        setAuthConfig(config);
        console.log('New session created:', config.sessionId);
        // Force remount of ChatProvider by toggling chatOpen
        setChatOpen(false);
        setTimeout(() => setChatOpen(true), 100);
      }
    } catch (error) {
      console.error('Error creating new session:', error);
    }
  }, []);

  const handleBackToHome = () => {
    setChatOpen(false);
    // Don't clear authConfig - keep session for when they return
  };

  if (chatOpen) {
    // Show loading state while creating session
    if (isLoadingSession || !authConfig) {
      return (
        <div className="fixed inset-0 h-screen w-screen bg-black flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/40">Creating chat session...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 h-screen w-screen bg-black">
        <ChatProvider 
          authConfig={authConfig}
        >
          <ChatInterface onBackToHome={handleBackToHome} onCreateSession={handleCreateSession} />
        </ChatProvider>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black px-4">
      {/* Main Content - Center */}
      <main className="relative z-10 flex flex-col items-center justify-center">
        <Hero />
        <ProjectLinks />
        <div onClick={handleChatClick} className="cursor-pointer">
          <ChatInput />
        </div>
      </main>

      {/* Social Links - Bottom Left on desktop, Bottom Center on mobile */}
      <SocialLinks />
    </div>
  );
}
