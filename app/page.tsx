const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/abdelhamed",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/abdelhamed-mohamed",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/abdelhamed",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:hi@hydralerne.me",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black px-4">
      {/* Main Content - Center */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center">
        <h1 
          className="mb-4 text-5xl font-black tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl" 
          style={{ fontFamily: 'var(--font-geist-sans)', letterSpacing: '-0.05em' }}
        >
          ABDELHAMED<br />MOHAMED
        </h1>
        <p className="text-base text-zinc-400 sm:text-lg md:text-xl lg:text-2xl">
          Software Engineer · Founder @{" "}
          <a 
            href="https://oblien.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white transition-colors hover:text-zinc-300"
          >
            Oblien
          </a>
        </p>
        <div className="mt-4 flex gap-3 text-xs text-zinc-500 sm:mt-6 sm:gap-4 sm:text-sm">
          <a 
            href="https://blurs.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-400"
          >
            Blurs
          </a>
          <span>·</span>
          <a 
            href="https://onvo.me" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-400"
          >
            ONVO
          </a>
        </div>
      </main>

      {/* Social Links - Bottom Left on desktop, Bottom Center on mobile */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-5 sm:left-8 sm:translate-x-0 sm:gap-4 md:bottom-8">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition-all hover:border-zinc-600 hover:bg-zinc-900 hover:text-white active:scale-95"
            aria-label={link.name}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
