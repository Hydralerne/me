export default function Hero() {
  return (
    <div className="mb-6 text-center sm:mb-8">
      <h1 
        className="mb-4 text-5xl font-black tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl" 
        style={{ fontFamily: 'var(--font-geist-sans)', letterSpacing: '-0.05em' }}
      >
        ABDELHAMED<br />MOHAMED
      </h1>
      <p className="text-base text-white/60 sm:text-lg md:text-xl lg:text-2xl">
        Software Engineer · Founder @{" "}
        <a 
          href="https://oblien.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white transition-colors hover:text-white/80"
        >
          Oblien
        </a>
      </p>
    </div>
  );
}
