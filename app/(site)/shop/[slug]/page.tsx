import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getRelatedProducts } from "@/lib/db-products";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const related = await getRelatedProducts(product.categorySlug, product.slug);

  return (
    <main className="bg-[#FAF7F2] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-900">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-neutral-900">Shop</Link>
          <span>/</span>
          <span className="text-neutral-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <ProductGallery images={product.images || [product.image]} name={product.name} />
          <ProductInfo product={product} />
        </div>

        <ProductTabs product={product} />
        <RelatedProducts products={related} />
      </div>
    </main>
  );
}
