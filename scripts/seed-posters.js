require("dotenv").config({ path: ".env.local" });
const path = require("path");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

cloudinary.config({ secure: true });

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const SizeVariantSchema = new mongoose.Schema(
  { size: String, price: Number, compareAtPrice: Number },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, default: 0 },
    compareAtPrice: { type: Number },
    stock: { type: Number, default: 0 },
    badge: { type: String, enum: ["Bestseller", "New", "None"], default: "None" },
    sizes: { type: [String], default: [] },
    sizeVariants: { type: [SizeVariantSchema], default: [] },
    finishes: { type: [String], default: [] },
    images: { type: [String], default: [] },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    status: { type: String, enum: ["Active", "Draft"], default: "Active" },
    collection: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const posters = [
  { file: "1-islamic-calligraphy.jpg", name: "Islamic Calligraphy Carpet Poster", category: "islamic-calligraphy" },
  { file: "2-porsche-911-gt3r.jpg", name: "Porsche 911 GT3 R Poster", category: "car-posters" },
  { file: "3-porsche-911-gt3rs-journal.jpg", name: "Porsche 911 GT3 RS – Supercar Journal", category: "car-posters" },
  { file: "4-porsche-911-spec-sheet.jpg", name: "Porsche 911 GT3 RS – Spec Sheet", category: "car-posters" },
  { file: "5-porsche-split-red.jpg", name: "Porsche – Split Red Edition", category: "car-posters" },
  { file: "6-mercedes-amg-g63.jpg", name: "Mercedes AMG G63 – Black Beast", category: "car-posters" },
  { file: "7-defender-bw.jpg", name: "Land Rover Defender – Black & White", category: "car-posters" },
  { file: "8-defender-split.jpg", name: "Land Rover Defender – Split Edition", category: "car-posters" },
  { file: "9-defender-110-framed.jpg", name: "Land Rover Defender 110 – Framed", category: "car-posters" },
];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  for (const poster of posters) {
    const localPath = path.join(__dirname, "poster-images", poster.file);

    try {
      const uploadResult = await cloudinary.uploader.upload(localPath, {
        folder: "products/posters",
      });

      let baseSlug = slugify(poster.name);
      let slug = baseSlug;
      let count = 1;
      while (await Product.findOne({ slug })) {
        slug = `${baseSlug}-${count}`;
        count++;
      }

      await Product.create({
        name: poster.name,
        slug,
        category: poster.category,
        description: "",
        price: 0,
        stock: 999,
        images: [uploadResult.secure_url],
        collection: "poster",
        status: "Active",
      });

      console.log(`✅ Created: ${poster.name}`);
    } catch (err) {
      console.error(`❌ Failed: ${poster.name}`, err.message);
    }
  }

  await mongoose.disconnect();
  console.log("Done.");
}

run();