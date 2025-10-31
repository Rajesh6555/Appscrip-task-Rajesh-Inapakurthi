import ProductCard from "@/components/ProductCard";
import Filters from "@/components/Filters";
import { Product } from "@/lib/types";
import { SITE } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return { title: SITE.title, description: SITE.description };
}

async function fetchProducts(category?: string | null): Promise<Product[]> {
  const base = "https://fakestoreapi.com";
  const url = category
    ? `${base}/products/category/${encodeURIComponent(category)}`
    : `${base}/products`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

async function fetchCategories(): Promise<string[]> {
  const res = await fetch("https://fakestoreapi.com/products/categories", { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

function sortProducts(data: Product[], sort?: string | null): Product[] {
  if (!sort || sort === "relevance") return data;
  const arr = [...data];
  switch (sort) {
    case "price-asc": return arr.sort((a, b) => a.price - b.price);
    case "price-desc": return arr.sort((a, b) => b.price - a.price);
    case "title-asc": return arr.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc": return arr.sort((a, b) => b.title.localeCompare(a.title));
    default: return data;
  }
}

// Next.js 16: searchParams is a Promise
export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams;
  const category = typeof sp?.category === "string" ? sp.category : null;
  const sort = typeof sp?.sort === "string" ? sp.sort : null;

  const [categories, productsRaw] = await Promise.all([
    fetchCategories(),
    fetchProducts(category)
  ]);
  const products = sortProducts(productsRaw, sort);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `/#/product/${p.id}`,
      name: p.title
    }))
  };

  return (
    <main className="container">
      <h1 className="page-title">Shop</h1>
      <h2 className="visually-hidden">All Products</h2>
      <Filters categories={categories} currentCategory={category} currentSort={sort} />
      <section className="grid" aria-label="Product results">
        {products.map((p) => (<ProductCard key={p.id} product={p} />))}
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
    </main>
  );
}