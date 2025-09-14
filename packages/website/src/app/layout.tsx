import './globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { ThemeProvider } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import { Noto_Sans_JP, Roboto } from 'next/font/google' // ← Roboto 追加
import '@fortawesome/fontawesome-svg-core/styles.css'
import React from 'react'

import Presenter from '@kanagawa-rifle/website/components/Presenter'
import { siteConfig } from '@kanagawa-rifle/website/site'
import theme from '@kanagawa-rifle/website/theme'

config.autoAddCss = false

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  weight: ['300'],
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['300'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s：${siteConfig.name}`,
  },
  description: siteConfig.description,
  formatDetection: { telephone: false },
  metadataBase: new URL(siteConfig.url),
  appleWebApp: {
    title: siteConfig.name,
  },
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
    <body className={`${notoSansJP.className} ${roboto.className} antialiased`}>
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <Presenter>{children}</Presenter>
      </ThemeProvider>
    </AppRouterCacheProvider>
    </body>
    </html>
  )
}
