import '@globals/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Churras APP',
  description: 'My Churras APP',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
