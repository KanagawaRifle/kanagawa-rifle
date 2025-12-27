import type { MetadataRoute } from "next";
import { getFiscalYears } from "@/lib/competitions";
import { getRifleClassFiscalYears } from "@/lib/rifle-shooting-class";
import { siteConfig } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.baseUrl}/links`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.baseUrl}/projects`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    // Shooting Range
    {
      url: `${siteConfig.baseUrl}/shooting-range`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.baseUrl}/shooting-range/guide`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.baseUrl}/shooting-range/access`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    // Competitions
    {
      url: `${siteConfig.baseUrl}/competitions`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.baseUrl}/competitions/monthly`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.baseUrl}/competitions/monthly/results`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.baseUrl}/competitions/rifle-shooting-class`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.baseUrl}/competitions/rifle-shooting-class/results`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.baseUrl}/competitions/rank-list`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.baseUrl}/competitions/big-bore`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.baseUrl}/competitions/big-bore/results`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.baseUrl}/competitions/hunting`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.baseUrl}/competitions/hunting/results`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.baseUrl}/competitions/gp-final`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.baseUrl}/competitions/gp-final/results`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.baseUrl}/competitions/citizens/results`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Dynamic pages - Monthly results by year
  const monthlyYears = await getFiscalYears();
  const monthlyResultPages: MetadataRoute.Sitemap = monthlyYears.map((fy) => ({
    url: `${siteConfig.baseUrl}/competitions/monthly/results/${fy.year}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  // Dynamic pages - Rifle shooting class results by year
  const rifleClassYears = await getRifleClassFiscalYears();
  const rifleClassResultPages: MetadataRoute.Sitemap = rifleClassYears.map(
    (fy) => ({
      url: `${siteConfig.baseUrl}/competitions/rifle-shooting-class/results/${fy.year}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })
  );

  return [...staticPages, ...monthlyResultPages, ...rifleClassResultPages];
}
