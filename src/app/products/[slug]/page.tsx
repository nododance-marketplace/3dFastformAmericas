import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import { ProductDetail } from "@/components/product/ProductDetail";

interface PageProps {
  params: { slug: string };
}

// Pre-render every (available) product page at build time.
export function generateStaticParams() {
  return products.filter((p) => !p.comingSoon).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: `${product.name} — ${product.specLine}. ${product.description}`,
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);
  if (!product || product.comingSoon) notFound();

  return <ProductDetail product={product} />;
}
