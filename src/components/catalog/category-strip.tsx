type CategoryStripProps = {
  categories: { id: number; name: string; href: string }[];
};

export function CategoryStrip({ categories }: CategoryStripProps) {
  return (
    <nav
      className="sticky top-0 z-20 border-b border-white/10 bg-[#070b14]/90 backdrop-blur-md"
      aria-label="Categories"
    >
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
        {categories.map((c) => (
          <a
            key={c.id}
            href={c.href}
            className="shrink-0 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white"
          >
            {c.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
