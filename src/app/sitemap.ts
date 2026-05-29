import fs from "fs";
import path from "path";
import { MetadataRoute } from "next";
import { ElementData } from "@/app/types/element";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use environment variable or default domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://periodictable.wtf";

  // 1. Root homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  try {
    // 2. Read the elements data source
    const filePath = path.join(process.cwd(), "public", "elements.json");
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const elements: ElementData[] = JSON.parse(fileContent);

      // 3. Map elements to dynamic routes
      const elementRoutes = elements.map((element) => ({
        url: `${baseUrl}/element/${element.name.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

      routes.push(...elementRoutes);
    }
  } catch (error) {
    console.error("Error generating sitemap dynamic routes:", error);
  }

  return routes;
}
