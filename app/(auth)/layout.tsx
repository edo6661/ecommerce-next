import type { Metadata } from 'next'
import { Logo } from './_components/logo'

export const metadata: Metadata = {
    title: 'Auth',
    description: 'Generated by create next app',
}

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='h-screen fl-col-center mt-8 gap-4'>
            <Logo />
            {children}
        </div>
    )
}
