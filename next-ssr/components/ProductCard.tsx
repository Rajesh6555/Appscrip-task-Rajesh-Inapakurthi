import Image from "next/image";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card" aria-label={`Product ${product.title}`}>
      <a href={`/#/product/${product.id}`} className="link" aria-label={`View details for ${product.title}`}>
        <div className="img-wrap">
          <Image
            src={product.image}
            alt={`${product.title} product image`}
            width={600}
            height={750}
            style={{ width: "100%", height: "auto" }}
            priority={false}
          />
        </div>
        <h3>{product.title}</h3>
        <p className="price">${product.price.toFixed(2)}</p>
      </a>
    </article>
  );
}
