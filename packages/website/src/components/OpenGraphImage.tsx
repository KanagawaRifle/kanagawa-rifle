import 'server-only';

import { ImageResponse } from 'next/og';
import { ReactElement } from 'react';

export const size = { width: 1200, height: 630 };

export function createOpengraphImage(title: string): {
  alt: string;
  size: { width: number; height: number };
  image: () => Promise<ImageResponse>;
} {
  return {
    alt: title,
    size: size,
    image: async function () {
      return new ImageResponse(
        (
          <div
            style={{
              background: 'linear-gradient(48deg, #288140 50%, #e37400 50%)',
              display: 'flex',
              height: '100%',
              width: '100%',
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
              }}
            >
              <div style={{ display: 'flex' }}>{title}</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', textAlign: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      fontWeight: 500,
                      fontSize: '1.75rem',
                      marginTop: '0.125rem',
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
        },
      );
    },
  };
}
