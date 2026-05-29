import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ElementData } from "@/app/types/element";
import ElementDetailClient from "@/app/components/ElementDetailClient";

interface PageProps {
  params: Promise<{ name: string }>;
}

// Fetch all elements directly from elements.json
function getElements(): ElementData[] {
  const filePath = path.join(process.cwd(), "public", "elements.json");
  const fileContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContent);
}

// Generate static parameters for all 118 elements at build time
export async function generateStaticParams() {
  const elements = getElements();
  return elements.map((el) => ({
    name: el.name.toLowerCase(),
  }));
}

// Generate dynamic metadata for proper SEO search indexing
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const decodedName = decodeURIComponent(resolvedParams.name);
  const elements = getElements();
  
  const element = elements.find(
    (el) => el.name.toLowerCase() === decodedName.toLowerCase()
  );

  if (!element) {
    return {
      title: "Element Not Found | Periodic Table",
      description: "The requested chemical element could not be found in our periodic table dataset.",
    };
  }

  return {
    title: `${element.name} (${element.symbol}) - Chemical Element Details | Periodic Table WTF`,
    description: `Detailed chemical and physical properties of ${element.name} (${element.symbol}). Atomic number ${element.number}, atomic mass ${element.atomic_mass}, block ${element.block}, category ${element.category}. ${element.summary.substring(0, 150)}...`,
    keywords: [
      element.name,
      element.symbol,
      `atomic number ${element.number}`,
      element.category,
      `${element.block} block`,
      "periodic table",
      "chemical element",
      "science",
      "chemistry data",
    ],
  };
}

export default async function ElementPage({ params }: PageProps) {
  const resolvedParams = await params;
  const decodedName = decodeURIComponent(resolvedParams.name);
  const elements = getElements();

  const element = elements.find(
    (el) => el.name.toLowerCase() === decodedName.toLowerCase()
  );

  if (!element) {
    notFound();
  }

  return <ElementDetailClient element={element} />;
}
