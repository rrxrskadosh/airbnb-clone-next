import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

// Components
import Navbar from '@/app/components/navbar/Navbar';
import ClientOnly from "./components/ClientOnly"
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone in Next',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        {/* Avoid Error Hydration in Loading */}
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        <div>{children}</div>
      </body>
    </html>
  )
}
