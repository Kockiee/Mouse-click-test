import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Teste de Velocidade de Click | CPS Teste',
  description: 'Teste sua velocidade nos click em nosso teste de clicks por segundo. Será que você consegue atigir o recorde mundial de click ?',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-slate-900 text-gray-100 font-medium`}>{children}</body>
    </html>
  )
}
