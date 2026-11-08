import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://musafircafe.com";
  const routes = [
    "",
    "/menu",
    "/about",
    "/gallery",
    "/events",
    "/stories",
    "/contact",
    "/cart"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" || route === "/menu" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/menu" ? 0.9 : 0.7
  }));
}

