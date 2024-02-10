import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://ecommerce-next-nu-ten.vercel.app";

  return {
    rules: [
      {
        userAgent: "*", // ! Allow all robots
        allow: "/", // ! Allow all robots to index all pages
        disallow: ["/admin", "/edit", "/privacy", "/add-product"], // ! Disallow all robots to index the admin page
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`, // ! The location of the sitemap, which is the sitemap.xml file
  };
}
