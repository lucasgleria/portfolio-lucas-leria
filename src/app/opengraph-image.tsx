import { ImageResponse } from 'next/og'

export const alt = 'Lucas Leria — Full-stack Development, Automation and Databases'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%', padding: 90, background: '#080e0b', color: '#f3f4f6', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', color: '#6ee7b7', fontSize: 40, marginBottom: 35 }}>LL. / PORTFOLIO</div>
      <div style={{ display: 'flex', fontSize: 88 }}>Lucas Leria</div>
      <div style={{ display: 'flex', color: '#6ee7b7', fontSize: 34, marginTop: 28 }}>Full-stack Development · Automation · Databases</div>
    </div>, size,
  )
}
