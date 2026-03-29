import Image from "next/image";

export type ProductCardProps = {
  name: string;
  description: string;
  image: string;
  priceLabel: string;
  details: { label: string; value: string }[];
};

export function ProductCard({
  name,
  description,
  image,
  priceLabel,
  details,
}: ProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] transition hover:border-cyan-400/30 hover:bg-white/[0.07]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900/80">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-snug text-white">
            {name}
          </h3>
          <span className="shrink-0 rounded-lg bg-cyan-500/15 px-2.5 py-1 text-sm font-semibold tabular-nums text-cyan-200">
            {priceLabel}
          </span>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">
          {description}
        </p>
        {details.length > 0 ? (
          <dl className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 border-t border-white/10 pt-3 text-xs text-slate-500">
            {details.map(({ label, value }) => (
              <div key={`${label}-${value}`} className="flex gap-1.5">
                <dt className="text-slate-600">{label}</dt>
                <dd className="font-medium text-slate-400">{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </article>
  );
}
