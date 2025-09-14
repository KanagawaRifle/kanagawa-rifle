import type { Metadata } from 'next'

export type SiteConfig = {
  name: string
  description: string
  url: string
  social: {
    twitter: string
    facebook: string
    instagram: string
  }
  sitemap: string
}

export const siteConfig: SiteConfig = {
  name: process.env.NEXT_PUBLIC_APP_SITE_NAME || '神奈川県ライフル射撃協会',
  description:
    process.env.NEXT_PUBLIC_APP_SITE_DESCRIPTION ||
    'ライフル競技に興味のある方へ向けて、大会の開催・運営や普及活動を行い、スポーツ振興と子どもの健全育成を目指しています。',
  url: process.env.NEXT_PUBLIC_APP_SITE_URL || 'http://kanagawa-rifle.test',
  social: {
    twitter: process.env.NEXT_PUBLIC_APP_TWITTER || 'https://twitter.com/KanagawaRifle',
    facebook: process.env.NEXT_PUBLIC_APP_FACEBOOK || 'https://www.facebook.com/KanagawaRifle',
    instagram: process.env.NEXT_PUBLIC_APP_INSTAGRAM || 'https://www.instagram.com/KanagawaRifle',
  },
  sitemap: process.env.NEXT_PUBLIC_APP_SITE_SITEMAP || 'http://kanagawa-rifle.test/sitemap.xml',
}

export type MenuItem = { name: string; href: string; shortName?: string; }
export type PageInfo = {
  title: string
  description: string
}

export const defaultPageInfo: PageInfo = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export function createMetadata(info: PageInfo): Metadata {
  return {
    title: info.title,
    description: info.description.replace(/[\r\n]+/g, ''),
  }
}
