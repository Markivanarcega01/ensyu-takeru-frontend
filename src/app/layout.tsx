import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ensyu Takeru Rubber Inc.',
  description: 'Quality Assurance Change point monitoring system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="bg-blue-500 p-10 text-white relative">
          <p className="text-2xl">Ensyu Takeru Rubber Industries Inc.</p>
          <p className="text-sm pl-5">Quality Assurance Monitoring</p>
        </div>
        {children}</body>
    </html>
  )
}
