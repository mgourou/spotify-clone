import Sidebar from '@/components/Sidebar'
import Player from '@/components/Player'

import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'

import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

import './globals.css'

import getSongsByUserId from '@/actions/getsSongsByUserId'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'
import { Song } from '@/types'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music',
}

export const  revalidate = 0;

export default async function RootLayout({
  children,
  songs
}: {
  children: React.ReactNode
  songs: Song[]
}) {

  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices()

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products}/>
              <Sidebar songs={userSongs}>
                {children}
              </Sidebar>
              <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
