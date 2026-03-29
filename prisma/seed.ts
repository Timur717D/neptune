import "dotenv/config";
import { prisma } from "../src/lib/prisma";

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)]!;
}

function img(seed: string) {
  return `https://picsum.photos/seed/${seed}/400/400`;
}

async function main() {
  await prisma.hqd.deleteMany();
  await prisma.liquid.deleteMany();
  await prisma.snus.deleteMany();
  await prisma.podSystem.deleteMany();
  await prisma.coil.deleteMany();
  await prisma.battery.deleteMany();
  await prisma.category.deleteMany();
  await prisma.flavor.deleteMany();
  await prisma.color.deleteMany();

  await prisma.category.createMany({
    data: [
      { name: "Disposable vapes" },
      { name: "E-liquids" },
      { name: "Pod systems" },
      { name: "Coils & heads" },
      { name: "Batteries & mods" },
      { name: "Nicotine pouches" },
      { name: "Accessories" },
      { name: "Starter kits" },
    ],
  });

  await prisma.flavor.createMany({
    data: [
      { name: "Ice mint" },
      { name: "Mango passion" },
      { name: "Classic tobacco" },
      { name: "Blueberry ice" },
      { name: "Watermelon chill" },
      { name: "Vanilla custard" },
      { name: "Grape soda" },
      { name: "Lemon lime" },
    ],
  });

  await prisma.color.createMany({
    data: [
      { name: "Matte black" },
      { name: "Silver" },
      { name: "Rose gold" },
      { name: "Navy blue" },
      { name: "Forest green" },
      { name: "Coral red" },
    ],
  });

  const flavors = await prisma.flavor.findMany();
  const colors = await prisma.color.findMany();
  const flavorIds = flavors.map((f) => f.id);
  const colorIds = colors.map((c) => c.id);

  const hqds = [
    "HQD Cuvie Plus",
    "HQD Mega",
    "HQD Rosy",
    "HQD Wave",
    "HQD Box",
    "HQD Super",
    "HQD Max",
    "HQD Ultra",
  ];
  await prisma.hqd.createMany({
    data: hqds.map((name, i) => ({
      name,
      description: `Compact disposable with bold flavor. Batch mock #${i + 1}.`,
      image: img(`hqd-${i}`),
      price: randInt(12, 35) * 100,
      nikotin_strenth: pick([0, 3, 6, 12, 20]),
      puffs: pick([600, 800, 1200, 1500, 2500]),
      flavorId: pick(flavorIds),
    })),
  });

  const liquids = [
    "Cloud Chaser 50ml",
    "Salt Nic 30ml",
    "Berry Blast Shortfill",
    "Citrus Mix 60ml",
    "Dessert Line 100ml",
    "Menthol Freeze 50ml",
  ];
  await prisma.liquid.createMany({
    data: liquids.map((name, i) => ({
      name,
      description: `Premium e-liquid blend for sub-ohm or MTL. Mock ${i + 1}.`,
      image: img(`liq-${i}`),
      price: randInt(8, 28) * 100,
      nikotin_strenth: pick([0, 3, 6, 12, 18]),
      flavorId: pick(flavorIds),
    })),
  });

  const pods = [
    "PodStick Pro",
    "AirMini",
    "VapePen X",
    "NanoPod 2",
    "SlimDraw",
    "FlexPod Air",
  ];
  await prisma.podSystem.createMany({
    data: pods.map((name, i) => ({
      name,
      description: `Refillable pod system with USB-C. Mock unit ${i + 1}.`,
      image: img(`pod-${i}`),
      price: randInt(25, 85) * 100,
      colorId: pick(colorIds),
    })),
  });

  const coils = [
    "Mesh 0.4Ω",
    "Dual coil 0.6Ω",
    "Ceramic 1.0Ω",
    "RBA head",
    "Quad mesh 0.15Ω",
  ];
  await prisma.coil.createMany({
    data: coils.map((name, i) => ({
      name,
      description: `Replacement coil head for compatible tanks. Pack mock ${i + 1}.`,
      image: img(`coil-${i}`),
      price: randInt(5, 18) * 100,
    })),
  });

  const batteries = [
    "18650 3000mAh",
    "21700 4000mAh",
    "Built-in 2000mAh",
    "Dual 18650 sled",
  ];
  await prisma.battery.createMany({
    data: batteries.map((name, i) => ({
      name,
      description: `High-drain battery for regulated mods. Mock ${i + 1}.`,
      image: img(`bat-${i}`),
      price: randInt(10, 45) * 100,
    })),
  });

  const snusNames = [
    "Nord Frost",
    "Arctic Slim",
    "Berry White",
    "Citrus Strong",
    "Mint Extra",
    "Espresso",
  ];
  await prisma.snus.createMany({
    data: snusNames.map((name, i) => ({
      name,
      description: `Nicotine pouch in dry format. Mock ${i + 1}.`,
      image: img(`snus-${i}`),
      price: randInt(4, 12) * 100,
      nikotin_strenth: pick([4, 8, 12, 16, 20]),
      flavorId: pick(flavorIds),
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
