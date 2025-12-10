export default function ProjectLinks() {
  return (
    <div className="mb-6 flex gap-3 text-xs text-zinc-500 sm:mb-8 sm:gap-4 sm:text-sm">
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
  );
}
