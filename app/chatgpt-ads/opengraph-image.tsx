import { ImageResponse } from 'next/og'

export const alt = 'ChatGPT Ads. Invite only. Prism.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function ChatGptAdsOpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#F6F5F1',
          color: '#0D0D0D',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          padding: '64px 72px',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '58%',
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 18,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#6B6B6B',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                background: '#10A37F',
              }}
            />
            Invite only
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div
              style={{
                fontSize: 92,
                lineHeight: 0.9,
                letterSpacing: '-0.07em',
                fontWeight: 500,
              }}
            >
              ChatGPT Ads
            </div>
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.35,
                color: '#5C5C5C',
                maxWidth: 560,
              }}
            >
              Ads inside the conversation. For selected businesses only.
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              color: '#6B6B6B',
              letterSpacing: '-0.02em',
            }}
          >
            Prism × OpenAI
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '42%',
            height: '100%',
            borderRadius: 28,
            border: '1px solid rgba(13,13,13,0.10)',
            background: '#FFFEFB',
            padding: 28,
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', fontSize: 18, color: '#8A8A8A' }}>
            ChatGPT
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-end',
                background: '#EFEDE6',
                borderRadius: 18,
                padding: '12px 16px',
                fontSize: 20,
                maxWidth: 320,
              }}
            >
              Who should I call for a dentist nearby?
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                border: '1px solid rgba(16,163,127,0.35)',
                borderRadius: 18,
                padding: 16,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  color: '#10A37F',
                  fontSize: 14,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                }}
              >
                Sponsored
              </div>
              <div style={{ display: 'flex', fontSize: 24, fontWeight: 500 }}>
                Your business, in the answer.
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
