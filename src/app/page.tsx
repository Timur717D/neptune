import { CategoryStrip } from "@/components/catalog/category-strip";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductSection } from "@/components/catalog/product-section";
import { categoryHref, formatPrice } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [
    categories,
    hqds,
    liquids,
    pods,
    coils,
    batteries,
    snuses,
  ] = await Promise.all([
    prisma.category.findMany({ orderBy: { id: "asc" } }),
    prisma.hqd.findMany({
      orderBy: { id: "asc" },
      include: { flavor: true },
    }),
    prisma.liquid.findMany({
      orderBy: { id: "asc" },
      include: { flavor: true },
    }),
    prisma.podSystem.findMany({
      orderBy: { id: "asc" },
      include: { color: true },
    }),
    prisma.coil.findMany({ orderBy: { id: "asc" } }),
    prisma.battery.findMany({ orderBy: { id: "asc" } }),
    prisma.snus.findMany({
      orderBy: { id: "asc" },
      include: { flavor: true },
    }),
  ]);

  const categoryLinks = categories.map((c) => ({
    id: c.id,
    name: c.name,
    href: categoryHref(c.name),
  }));

  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#070b14] text-slate-200">
      <header className="border-b border-white/10 bg-[#070b14]/95">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400/90">
            Catalog
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Neptune
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-slate-400">
            Browse categories and products from the database — vapes, liquids, pods,
            coils, batteries, and nicotine pouches.
          </p>
        </div>
      </header>

      <CategoryStrip categories={categoryLinks} />

      <main id="catalog" className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-20">
          {hqds.length > 0 ? (
            <ProductSection
              id="hqd"
              title="HQD & disposables"
              description="Disposable devices with puff count and nicotine strength."
            >
              {hqds.map((p) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  description={p.description}
                  image={p.image}
                  priceLabel={formatPrice(p.price)}
                  details={[
                    { label: "Flavor", value: p.flavor.name },
                    { label: "Nicotine", value: `${p.nikotin_strenth} mg` },
                    { label: "Puffs", value: String(p.puffs) },
                  ]}
                />
              ))}
            </ProductSection>
          ) : null}

          {liquids.length > 0 ? (
            <ProductSection
              id="liquids"
              title="E-liquids"
              description="Bottled e-liquid in various flavors and strengths."
            >
              {liquids.map((p) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  description={p.description}
                  image={p.image}
                  priceLabel={formatPrice(p.price)}
                  details={[
                    { label: "Flavor", value: p.flavor.name },
                    { label: "Nicotine", value: `${p.nikotin_strenth} mg` },
                  ]}
                />
              ))}
            </ProductSection>
          ) : null}

          {pods.length > 0 ? (
            <ProductSection
              id="pods"
              title="Pod systems"
              description="Refillable and compact pod devices by colorway."
            >
              {pods.map((p) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  description={p.description}
                  image={p.image}
                  priceLabel={formatPrice(p.price)}
                  details={[{ label: "Color", value: p.color.name }]}
                />
              ))}
            </ProductSection>
          ) : null}

          {coils.length > 0 ? (
            <ProductSection
              id="coils"
              title="Coils"
              description="Replacement coil heads for compatible tanks."
            >
              {coils.map((p) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  description={p.description}
                  image={p.image}
                  priceLabel={formatPrice(p.price)}
                  details={[]}
                />
              ))}
            </ProductSection>
          ) : null}

          {batteries.length > 0 ? (
            <ProductSection
              id="batteries"
              title="Batteries"
              description="Cells and built-in power options for mods."
            >
              {batteries.map((p) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  description={p.description}
                  image={p.image}
                  priceLabel={formatPrice(p.price)}
                  details={[]}
                />
              ))}
            </ProductSection>
          ) : null}

          {snuses.length > 0 ? (
            <ProductSection
              id="snus"
              title="Nicotine pouches"
              description="Smoke-free nicotine pouches by flavor and strength."
            >
              {snuses.map((p) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  description={p.description}
                  image={p.image}
                  priceLabel={formatPrice(p.price)}
                  details={[
                    { label: "Flavor", value: p.flavor.name },
                    { label: "Nicotine", value: `${p.nikotin_strenth} mg` },
                  ]}
                />
              ))}
            </ProductSection>
          ) : null}
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-600">
        Neptune · demo catalog
      </footer>
    </div>
  );
}
