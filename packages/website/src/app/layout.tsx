import '@/styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { ThemeProvider } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import { Noto_Sans_JP, Roboto } from 'next/font/google'
import '@fortawesome/fontawesome-svg-core/styles.css'
import React from 'react'

import Presenter from '@/components/Presenter'
import {env, app} from "@/config";
import QueryProvider from '@/providers/QueryProvider'
import theme from '@/theme'

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
    default: app.name,
    template: `%s：${app.name}`,
  },
  description: app.description,
  formatDetection: { telephone: false },
  metadataBase: new URL(env.APP_URL),
  appleWebApp: {
    title: app.name,
  },
  openGraph: { images: new URL(`/api/og?title=${app.name}`, env.APP_URL) },
  twitter: { images: new URL(`/api/og?title=${app.name}`, env.APP_URL) },
}

export default function Layout(
  {children}: Readonly<{children: React.ReactNode}>
) {
  return (
    <html lang="ja">
    <body className={`${notoSansJP.className} ${roboto.className} antialiased`}>
    <QueryProvider>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <Presenter>{children}</Presenter>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </QueryProvider>
    </body>
    </html>
  )
}
