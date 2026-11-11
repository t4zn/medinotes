"use client"

import type { MouseEvent } from "react"
import { flushSync } from "react-dom"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Home } from "lucide-react"
import { LuUser } from "react-icons/lu"
import { GiCrown } from "react-icons/gi"
import { FaGithub } from "react-icons/fa6"
import { RxMoon, RxSun } from "react-icons/rx"
import { MobileCourseDrawer } from "@/components/navigation/CourseSidebar"

function ThemeSwitcher({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark"
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme(nextTheme)
      return
    }

    const root = document.documentElement
    if (root.classList.contains("theme-reveal")) return

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    root.style.setProperty("--theme-reveal-origin", `${x}px ${y}px`)
    root.style.setProperty("--theme-reveal-radius", `${radius}px`)
    root.classList.add("theme-reveal")

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(nextTheme))
    })
    const cleanup = () => {
      root.classList.remove("theme-reveal")
      root.style.removeProperty("--theme-reveal-origin")
      root.style.removeProperty("--theme-reveal-radius")
    }
    void transition.ready.catch(() => {})
    void transition.finished.then(cleanup, cleanup)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer ${className || ""}`}
    >
      <RxSun className="h-4 w-4 hidden [html.dark_&]:block" />
      <RxMoon className="h-4 w-4 block [html.dark_&]:hidden" />
    </button>
  )
}

export function Header() {
  const pathname = usePathname()

  const navigations = [
    { title: "🏠", href: "/welcome", disabled: false },
    { title: "Leaderboard", href: "#", disabled: true },
    { title: "Playground", href: "#", disabled: true },
    { title: "Pod", href: "#", disabled: true },
    { title: "CodeTantra", href: "#", disabled: true },
  ]

  return (
    <nav
      className="sticky top-0 z-50 mx-auto flex h-16 w-full items-center justify-between bg-white/80 dark:bg-black/80 backdrop-blur-md px-4 md:px-6 border-b border-gray-200/50 dark:border-gray-800/50"
      style={{ willChange: "transform" }}
    >
      <div className="flex items-center gap-4">
        <MobileCourseDrawer />

        <div className="flex items-center gap-8">
          <Link
            href="/"
            title="Medinotes main logo"
            aria-label="Medinotes main logo"
            className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/brand/medinotes-logo-light-theme.svg"
              alt="Medinotes main logo"
              width={28}
              height={28}
              priority
              className="dark:hidden w-7 h-7 object-contain"
            />
            <Image
              src="/images/brand/medinotes-logo.svg"
              alt="Medinotes main logo"
              width={28}
              height={28}
              priority
              className="hidden dark:block w-7 h-7 object-contain"
            />
            <span className="text-sm font-semibold text-black dark:text-white">
              Medinotes
            </span>
          </Link>

          <div className="hidden items-center gap-6 text-sm font-normal text-gray-600 dark:text-gray-400 md:flex md:flex-wrap">
            {navigations.map((item) => {
              const isActive = pathname === item.href
              return item.disabled ? (
                <span
                  key={item.title}
                  aria-disabled="true"
                  className="cursor-default select-none"
                >
                  {item.title}
                </span>
              ) : (
                <Link
                  key={item.title}
                  href={item.href}
                  aria-label={item.title === "🏠" ? "Home" : item.title}
                  className={`flex items-center gap-1 transition-colors hover:text-black dark:hover:text-white ${
                    isActive ? "text-black dark:text-white font-medium" : ""
                  }`}
                >
                  {item.title === "🏠" ? <Home className="h-4 w-4" /> : item.title}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <a
          href="https://github.com/t4zn/medinotes"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Star Medinotes on GitHub"
          className="hidden sm:inline-flex items-center gap-1.5 h-8 px-2.5 text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
        >
          <FaGithub className="h-3.5 w-3.5" />
          <span>Star</span>
        </a>

        <button
          type="button"
          disabled
          className="inline-flex items-center justify-center gap-1.5 h-8 w-8 sm:w-auto px-0 sm:px-3 text-sm font-semibold text-white shadow-sm rounded-sm relative overflow-hidden cursor-default"
          style={{ backgroundColor: "#e5a008" }}
        >
          <GiCrown className="h-4 w-4 sm:h-3.5 sm:w-3.5 relative z-10" />
          <span className="hidden sm:inline relative z-10">Premium</span>
        </button>

        <button
          type="button"
          disabled
          className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium text-gray-600 dark:text-gray-400 cursor-default"
        >
          <LuUser className="h-3.5 w-3.5 sm:mr-1.5" />
          <span className="hidden sm:inline">Sign In</span>
          <span className="sm:hidden ml-1">Login</span>
        </button>

        <ThemeSwitcher />
      </div>
    </nav>
  )
}

export default Header
