import type { Metadata } from 'next'
import './globals.css'
import { ReduxProvider } from '@/store/ReduxProvider'

export const metadata: Metadata = {
    title: 'Music Hub - Your Ultimate Music Streaming Platform',
    description: 'Stream unlimited music, discover new artists, and enjoy your favorite songs',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <ReduxProvider>
                    {children}
                </ReduxProvider>
            </body>
        </html>
    )
}
