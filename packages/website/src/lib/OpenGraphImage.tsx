import { ImageResponse } from 'next/og'
import React, { ReactElement } from 'react'

export const size = { width: 1200, height: 630 }

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error('failed to load font data')
}

export function createOpengraphImage(title: string): {
  alt: string
  size: { width: number; height: number }
  image: () => Promise<ImageResponse>
} {
  return {
    alt: title,
    size: size,
    image: async function () {
      // タイトルと表示する日本語テキストを含めてフォントを読み込み
      const allText = `${title}神奈川県ライフル射撃協会`

      return new ImageResponse(
        (
          <div
            style={{
              background: 'linear-gradient(48deg, #288140 50%, #e37400 50%)',
              backgroundColor: 'red',
              display: 'flex',
              height: '100%',
              width: '100%',
              fontFamily: 'Noto Sans JP',
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                color: '#212124',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                fontSize: '56px',
                fontWeight: 900,
                justifyContent: 'space-between',
                margin: '24px',
                padding: '48px',
                fontFamily: 'Noto Sans JP',
              }}
            >
              <div style={{ display: 'flex', fontFamily: 'Noto Sans JP' }}>{title}</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', textAlign: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      fontWeight: 500,
                      fontSize: '1.75rem',
                      marginTop: '0.125rem',
                      fontFamily: 'Noto Sans JP',
                    }}
                  >
                    <span style={{ color: '#288140' }}>神奈川県</span>
                    <span style={{ color: '#e37400' }}>ライフル射撃</span>
                    <span style={{ color: '#4285f4' }}>協会</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) as ReactElement,
        {
          ...size,
          fonts: [
            {
              name: 'Noto Sans JP',
              data: await loadGoogleFont('Noto+Sans+JP:wght@400;500;900', allText),
              style: 'normal',
            },
          ],
        },
      )
    },
  }
}
