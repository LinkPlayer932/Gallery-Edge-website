import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

interface SizePriceRule {
  size: string;
  price: number;
  compareAtPrice?: number;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const {
      scope = "all", // "all" | "category"
      categorySlug,
      mode = "size-wise", // "size-wise" | "percentage" | "flat-base"
      sizeRules = [] as SizePriceRule[],
      basePrice,
      baseCompareAtPrice,
      percentageChange, // e.g. 10 for +10%, -15 for -15%
    } = body;

    const filter: Record<string, any> = {};
    if (scope === "category" && categorySlug) {
      filter.category = categorySlug;
    }

    const products = await Product.find(filter);
    if (!products.length) {
      return NextResponse.json({ message: "No products matched the filter", count: 0 });
    }

    let updatedCount = 0;

    for (const product of products) {
      if (mode === "size-wise") {
        const rulesMap = new Map<string, SizePriceRule>();
        sizeRules.forEach((r: SizePriceRule) => rulesMap.set(r.size.trim(), r));

        // Update existing sizeVariants or create from product.sizes
        const currentSizes = product.sizes?.length
          ? product.sizes
          : product.sizeVariants?.map((sv: any) => sv.size) || [];

        let newSizeVariants = currentSizes.map((sz: string) => {
          const rule = rulesMap.get(sz.trim());
          if (rule) {
            return {
              size: sz,
              price: Number(rule.price),
              compareAtPrice: rule.compareAtPrice ? Number(rule.compareAtPrice) : undefined,
            };
          }
          // keep old if exists
          const existing = product.sizeVariants?.find((sv: any) => sv.size === sz);
          return {
            size: sz,
            price: existing ? existing.price : Number(basePrice || product.price),
            compareAtPrice: existing?.compareAtPrice ?? (baseCompareAtPrice ? Number(baseCompareAtPrice) : undefined),
          };
        });

        // Lowest or base size variant becomes product base price
        const minVariantPrice = newSizeVariants.length
          ? Math.min(...newSizeVariants.map((v: any) => v.price))
          : undefined;

        product.sizeVariants = newSizeVariants;
        product.price = basePrice ? Number(basePrice) : (minVariantPrice ?? product.price);
        if (baseCompareAtPrice !== undefined) {
          product.compareAtPrice = baseCompareAtPrice ? Number(baseCompareAtPrice) : undefined;
        }

      } else if (mode === "percentage" && percentageChange) {
        const pct = Math.abs(Number(percentageChange));
        if (pct > 0 && pct < 100) {
          // Set compareAtPrice so that the discount badge shows exactly Save X%
          product.compareAtPrice = Math.round(product.price / (1 - pct / 100));

          if (product.sizeVariants?.length) {
            product.sizeVariants = product.sizeVariants.map((sv: any) => ({
              size: sv.size,
              price: sv.price,
              compareAtPrice: Math.round(sv.price / (1 - pct / 100)),
            }));
          }
        }
      } else if (mode === "flat-base") {
        if (basePrice) product.price = Number(basePrice);
        if (baseCompareAtPrice !== undefined) {
          product.compareAtPrice = baseCompareAtPrice ? Number(baseCompareAtPrice) : undefined;
        }
      }

      await product.save();
      updatedCount++;
    }

    try {
      revalidatePath("/", "page");
      revalidatePath("/shop", "page");
      revalidatePath("/categories", "page");
    } catch (revalidateError) {
      console.warn("Revalidation warning:", revalidateError);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully updated ${updatedCount} products`,
      count: updatedCount,
    });
  } catch (error) {
    console.error("POST /api/products/bulk-price error:", error);
    return NextResponse.json(
      { error: "Failed to bulk update product prices" },
      { status: 500 }
    );
  }
}
