import type { ReactNode } from "react";

type ProductSectionProps = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function ProductSection({
  id,
  title,
  description,
  children,
}: ProductSectionProps) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-8 flex flex-col gap-2 border-b border-white/10 pb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm text-slate-400 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}
