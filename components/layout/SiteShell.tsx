'use client'

import { ThemeProvider } from 'next-themes'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { CourseSidebar, DrawerStateProvider } from '@/components/navigation/CourseSidebar'
import SubjectSearchModal from '@/components/home/SubjectSearchModal'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showSidebar = pathname !== '/'

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <DrawerStateProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <SubjectSearchModal modalOnly />
          <div className="flex-1">
            {showSidebar ? (
              <div className="flex items-start gap-10 px-5 sm:px-8 pt-10 overflow-hidden">
                <CourseSidebar />
                <main className="flex-1 md:flex-[6] h-auto min-w-0">{children}</main>
              </div>
            ) : (
              <main className="h-auto px-5 sm:px-8">{children}</main>
            )}
          </div>
          <SiteFooter />
        </div>
      </DrawerStateProvider>
    </ThemeProvider>
  )
}

