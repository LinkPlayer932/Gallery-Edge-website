export interface Product {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  image: string;
  badge?: "Bestseller" | "New";
  rating: number;
  reviews: number;
  price: number;
  compareAtPrice?: number;
  description: string;
  sizes: string[];
  finishes: string[];
}

export const products: Product[] = [
  {
    slug: "islamic-calligraphy-gallery-set",
    name: "Islamic Calligraphy Gallery Set (5-Piece)",
    category: "Islamic Calligraphy",
    categorySlug: "islamic-calligraphy",
    image: "/product-images/islamic-calligraphy-gallery-set/main.jpeg",
    badge: "Bestseller",
    rating: 4.9,
    reviews: 58,
    price: 349,
    compareAtPrice: 420,
    description:
      "A curated 5-piece gallery wall set featuring elegant Arabic calligraphy, hand-framed in solid wood for a timeless, museum-quality display.",
    sizes: ["8x10", "11x14", "16x20"],
    finishes: ["Natural Walnut", "Dark Walnut", "Black"],
  },
  {
    slug: "trust-patience-duo",
    name: "Trust & Patience Duo Set",
    category: "Islamic Calligraphy",
    categorySlug: "islamic-calligraphy",
    image: "/product-images/trust-patience-duo/main.jpeg",
    rating: 4.8,
    reviews: 34,
    price: 149,
    description:
      "A minimalist two-panel set pairing calligraphy with meaning — Trust and Patience, framed in warm neutral tones.",
    sizes: ["11x14", "16x20"],
    finishes: ["Natural Walnut", "Honey Oak"],
  },
  {
    slug: "tasbeeh-set-trio",
    name: "Allahuakbar · Alhamdulillah · Subhanallah Trio",
    category: "Islamic Calligraphy",
    categorySlug: "islamic-calligraphy",
    image: "/product-images/tasbeeh-set-trio/main.jpeg",
    badge: "New",
    rating: 4.9,
    reviews: 27,
    price: 219,
    description:
      "A three-panel tasbeeh set, each piece hand-lettered and paired with subtle botanical accents.",
    sizes: ["11x14", "16x20", "18x24"],
    finishes: ["Black", "Natural Walnut"],
  },
  {
    slug: "sacred-names-trio",
    name: "Sacred Names Trio",
    category: "Islamic Calligraphy",
    categorySlug: "islamic-calligraphy",
    image: "/product-images/sacred-names-trio/main.jpeg",
    rating: 4.7,
    reviews: 19,
    price: 199,
    description:
      "Three elegant white-on-neutral calligraphy pieces, framed in natural oak for a soft, contemporary look.",
    sizes: ["16x20", "18x24"],
    finishes: ["Honey Oak", "Natural Walnut"],
  },
  {
    slug: "never-give-up-duo",
    name: "Never Give Up Duo",
    category: "Custom Frames",
    categorySlug: "custom-frames",
    image: "/product-images/never-give-up-duo/main.jpeg",
    rating: 4.6,
    reviews: 42,
    price: 129,
    description:
      "A botanical and motivational duo set — monstera leaf paired with a hand-lettered quote.",
    sizes: ["11x14", "16x20"],
    finishes: ["Black"],
  },
  {
    slug: "call-to-prayer-trio",
    name: "Call to Prayer Trio",
    category: "Islamic Calligraphy",
    categorySlug: "islamic-calligraphy",
    image: "/product-images/call-to-prayer-trio/main.jpeg",
    badge: "Bestseller",
    rating: 4.9,
    reviews: 71,
    price: 249,
    compareAtPrice: 300,
    description:
      "A warm, textured three-panel calligraphy set — Come to Success, Allah Muhammad, Come to Prayer.",
    sizes: ["11x14", "16x20", "18x24"],
    finishes: ["Natural Walnut", "Honey Oak"],
  },
  {
    slug: "vintage-chrysanthemum-print",
    name: "Vintage Chrysanthemum Print",
    category: "Single Frames",
    categorySlug: "single-frames",
    image: "/product-images/vintage-chrysanthemum-print/main.jpeg",
    rating: 4.8,
    reviews: 23,
    price: 179,
    description:
      "A moody, dark-academia floral still life in a slim gold frame — a striking single statement piece.",
    sizes: ["16x20", "18x24", "24x36"],
    finishes: ["Gold", "Black"],
  },
  {
    slug: "dandelion-duo",
    name: "Dandelion Duo",
    category: "Custom Frames",
    categorySlug: "custom-frames",
    image: "/product-images/dandelion-duo/main.jpeg",
    rating: 4.7,
    reviews: 51,
    price: 139,
    description:
      "A minimalist black-and-white dandelion duo, capturing motion and stillness side by side.",
    sizes: ["11x14", "16x20"],
    finishes: ["Black"],
  },
  {
    slug: "botanical-still-life-trio",
    name: "Botanical Still Life Trio",
    category: "Custom Frames",
    categorySlug: "custom-frames",
    image: "/product-images/botanical-still-life-trio/main.jpeg",
    rating: 4.8,
    reviews: 38,
    price: 259,
    description:
      "An earthy three-panel still-life set in soft neutral tones, framed in natural oak.",
    sizes: ["16x20", "18x24"],
    finishes: ["Honey Oak", "Natural Walnut"],
  },
  {
    slug: "sabr-shukr-duo",
    name: "Sabr & Shukr Duo",
    category: "Islamic Calligraphy",
    categorySlug: "islamic-calligraphy",
    image: "/product-images/sabr-shukr-duo/main.jpeg",
    badge: "New",
    rating: 4.9,
    reviews: 15,
    price: 159,
    description:
      "A textured duo exploring patience and gratitude, framed in contrasting black and walnut.",
    sizes: ["11x14", "16x20"],
    finishes: ["Black", "Dark Walnut"],
  },
  {
    slug: "abstract-geometric-trio",
    name: "Abstract Geometric Trio",
    category: "Single Frames",
    categorySlug: "single-frames",
    image: "/product-images/abstract-geometric-trio/main.jpeg",
    rating: 4.5,
    reviews: 29,
    price: 189,
    description:
      "Bold black-and-white geometric shapes, framed in natural oak for a modern gallery wall.",
    sizes: ["16x20", "18x24"],
    finishes: ["Honey Oak"],
  },
  {
    slug: "marble-ink-abstract",
    name: "Marble Ink Abstract",
    category: "Single Frames",
    categorySlug: "single-frames",
    image: "/product-images/marble-ink-abstract/main.jpeg",
    rating: 4.6,
    reviews: 17,
    price: 169,
    description:
      "A large-format abstract ink piece in charcoal and stone tones, framed in warm oak.",
    sizes: ["18x24", "24x36"],
    finishes: ["Honey Oak", "Natural Walnut"],
  },
  {
    slug: "verse-canvas-square",
    name: "Verse Canvas Square",
    category: "Islamic Calligraphy",
    categorySlug: "islamic-calligraphy",
    image: "/product-images/verse-canvas-square/main.jpeg",
    rating: 4.7,
    reviews: 22,
    price: 149,
    description:
      "A square canvas piece with a striking red calligraphy accent on a monochrome split background.",
    sizes: ["16x20", "18x24"],
    finishes: ["Black"],
  },
  {
    slug: "midnight-wildflower-trio",
    name: "Midnight Wildflower Trio",
    category: "Custom Frames",
    categorySlug: "custom-frames",
    image: "/product-images/midnight-wildflower-trio/main.jpeg",
    badge: "New",
    rating: 4.8,
    reviews: 33,
    price: 229,
    description:
      "A dramatic dark-blue wildflower field, spread across three panels for a bold statement wall.",
    sizes: ["16x20", "18x24"],
    finishes: ["Natural Walnut"],
  },
];

export const categories = [
  { name: "Islamic Calligraphy", count: "20 styles", image: "/category-images/islamic-calligraphy/islamic-calligraphy-1.jpeg", slug: "islamic-calligraphy" },
  { name: "Birthday & Wedding Gift Frames", count: "16 styles", image: "/category-images/birthday-wedding-gift/wedding-gift-1.jpeg", slug: "birthday-wedding-gift" },
  { name: "Animal Photo Frames", count: "14 styles", image: "https://picsum.photos/seed/animalframe/700/500", slug: "animal-photo" },
  { name: "Car Frames", count: "10 styles", image: "/category-images/car-frames/car-frames-1.jpeg", slug: "car-frames" },
  { name: "Single Frames", count: "18 styles", image: "/category-images/single-frames/single-frame-1.jpeg", slug: "single-frames" },
  { name: "Bestselling Frames", count: "22 styles", image: "/category-images/bestselling/bestselling-1.jpeg", slug: "bestselling" },
  { name: "Custom Frames", count: "12 styles", image: "/category-images/custom-frames/custom-frame-1.jpeg", slug: "custom-frames" },
  { name: "Nikkah Frames", count: "9 styles", image: "/category-images/nikkah-frames/nikkah-frame-1.jpeg", slug: "nikkah-frames" },
  { name: "Wedding Boards", count: "11 styles", image: "/category-images/wedding-boards/wedding-board-1.jpeg", slug: "wedding-boards" },
];