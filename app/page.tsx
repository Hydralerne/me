import Hero from "./components/Hero";
import ProjectLinks from "./components/ProjectLinks";
import ChatInput from "./components/ChatInput";
import SocialLinks from "./components/SocialLinks";

export default function Home() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black px-4">
      {/* Main Content - Center */}
      <main className="relative z-10 flex flex-col items-center justify-center">
        <Hero />
        <ProjectLinks />
        <ChatInput />
      </main>

      {/* Social Links - Bottom Left on desktop, Bottom Center on mobile */}
      <SocialLinks />
    </div>
  );
}
