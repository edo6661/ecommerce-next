import { getAllProducts } from "@/services/product";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ecommerce-next-nu-ten.vercel.app";

  const products = await getAllProducts();

  const productsEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/product/${encodeURI(product.name)}`,
    // lastModified: new Date(product.updatedAt),
    // ! how often to change the page
    // changeFrequency
    // priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/cart`,
    },
    ...productsEntries,
  ];
}
