import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  openGraph: { title: SITE.title, description: SITE.description, type: "website", url: SITE.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Product Listing Page",
    description: SITE.description,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Shop", item: "/" }
      ]
    }
  };

  return (
    <html lang="en">
      <body>
        <header>
          <div className="container header-inner">
            <a className="brand" href="/" aria-label="Shop Home">Appscrip Shop</a>
            <nav className="nav" aria-label="Primary">
              <a href="#">New</a>
              <a href="#">Men</a>
              <a href="#">Women</a>
              <a href="#">Electronics</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="container footer" role="contentinfo">
          <p>© 2025 Appscrip Demo. All rights reserved.</p>
        </footer>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}