"use client"

import { createContext, useContext, useState, useEffect, useCallback, Suspense } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { LuAlignLeft } from "react-icons/lu"

import { Button } from "@/components/ui/button"
import { DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ProgramTree } from "@/components/navigation/ProgramTree"

interface DrawerStateContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  openSections: Record<string, boolean>
  toggleSection: (section: string) => void
}

const DrawerStateContext = createContext<DrawerStateContextType | undefined>(undefined)

export function DrawerStateProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)
  const defaultOpenSections: Record<string, boolean> = {
    "Resources-Program-/basic-setup": true,
  }
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(defaultOpenSections)

  useEffect(() => {
    try {
      const savedSections = localStorage.getItem("starter-sidebar-sections")
      if (savedSections) {
        const parsed = JSON.parse(savedSections)
        setOpenSections({ ...defaultOpenSections, ...parsed })
      }
    } catch {
      setOpenSections(defaultOpenSections)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("starter-sidebar-sections", JSON.stringify(openSections))
    } catch {
      // ignore storage errors
    }
  }, [openSections])

  const toggleSection = useCallback((section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }, [])

  return (
    <DrawerStateContext.Provider value={{ isOpen, setIsOpen, openSections, toggleSection }}>
      {children}
    </DrawerStateContext.Provider>
  )
}

export function useDrawerState() {
  const context = useContext(DrawerStateContext)
  if (context === undefined) {
    throw new Error("useDrawerState must be used within a DrawerStateProvider")
  }
  return context
}

const mobileNavItems = [
  { title: "Home", href: "/welcome", disabled: false },
  { title: "Leaderboard", href: "#", disabled: true },
  { title: "Playground", href: "#", disabled: true },
  { title: "Pod", href: "#", disabled: true },
  { title: "CodeTantra", href: "#", disabled: true },
]

export function CourseSidebar() {
  return (
    <aside
      className="sticky top-16 hidden h-[calc(100vh-4rem)] min-w-[230px] flex-[1] flex-col overflow-y-auto md:flex"
      aria-label="Page navigation"
    >
      <div className="p-4">
        <Suspense fallback={null}>
          <ProgramTree />
        </Suspense>
      </div>
    </aside>
  )
}

export function MobileCourseDrawer() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="flex cursor-pointer md:hidden">
          <LuAlignLeft className="!size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col gap-0 px-0" side="left">
        <DialogTitle className="sr-only">Menu</DialogTitle>
        <SheetHeader>
          <SheetClose asChild>
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image
                src="/images/brand/medinotes-logo-light-theme.svg"
                alt="Medinotes main logo"
                width={28}
                height={28}
                className="dark:hidden w-7 h-7 object-contain"
              />
              <Image
                src="/images/brand/medinotes-logo.svg"
                alt="Medinotes main logo"
                width={28}
                height={28}
                className="hidden dark:block w-7 h-7 object-contain"
              />
              <span className="text-sm font-semibold text-black dark:text-white">Medinotes</span>
            </Link>
          </SheetClose>
        </SheetHeader>
        <div
          className="flex-1 overflow-y-auto"
          style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
        >
          <div className="mx-0 mt-3 flex flex-col gap-2 px-5 pb-8">
            <div className="grid grid-cols-2 gap-1">
              {mobileNavItems.map((item) => {
                const active = pathname === item.href
                const cls = `flex items-center py-1 px-2 border-l-2 transition-all ${
                  active
                    ? "border-black dark:border-white bg-black/5 dark:bg-white/5 text-black dark:text-white font-bold"
                    : "border-transparent text-zinc-500 dark:text-zinc-400"
                }`

                return item.disabled ? (
                  <span key={item.title} aria-disabled="true" className={`${cls} cursor-default`}>
                    <span className="text-xs font-semibold truncate">{item.title}</span>
                  </span>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`${cls} hover:bg-zinc-50 dark:hover:bg-zinc-800/40`}
                  >
                    <span className="text-xs font-semibold truncate">{item.title}</span>
                  </Link>
                )
              })}
            </div>

            <Separator className="my-2" />
            <Suspense fallback={null}>
              <ProgramTree isSheet />
            </Suspense>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
