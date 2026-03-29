/** Seed stores prices in minor units (e.g. kopecks). */
export function formatPrice(minorUnits: number) {
  const major = minorUnits / 100;
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(major);
}

/** Map DB category names to in-page section anchors. */
export function categoryHref(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("disposable")) return "#hqd";
  if (n.includes("liquid") || n.includes("e-liquid")) return "#liquids";
  if (n.includes("pod")) return "#pods";
  if (n.includes("coil") || n.includes("head")) return "#coils";
  if (n.includes("batter")) return "#batteries";
  if (n.includes("nicotine") || n.includes("pouch")) return "#snus";
  return "#catalog";
}
