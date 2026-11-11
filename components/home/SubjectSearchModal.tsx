"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LuSearch, LuBook } from "react-icons/lu"

import { COURSE_CATALOG } from "@/config/courses"
import { cn, getAvatarImageSrc } from "@/lib/helpers"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NavLink } from "@/components/navigation/ProgramTree"

const SUBJECTS = Object.values(COURSE_CATALOG).map((course) => ({
  title: course.title,
  href: course.slug === "data-structures" ? "/notes" : `/notes?subject=${course.slug}`,
  snippet: course.shortSnippet,
  branchYear: `${course.branchTitle} ${course.yearTitle}`,
  keywords: course.keywords,
}))

export default function SubjectSearchModal({ modalOnly = false }: { modalOnly?: boolean }) {
  const router = useRouter()
  const [searchedInput, setSearchedInput] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const trimmed = searchedInput.trim().toLowerCase()
  const filteredResults = trimmed
    ? SUBJECTS.filter(
        (item) =>
          item.title.toLowerCase().includes(trimmed) ||
          item.snippet.toLowerCase().includes(trimmed) ||
          item.branchYear.toLowerCase().includes(trimmed) ||
          item.keywords.some((k) => k.includes(trimmed))
      )
    : SUBJECTS

  useEffect(() => {
    if (!modalOnly) return
    const handleOpen = () => setIsOpen(true)
    window.addEventListener("medinotes:open-search", handleOpen)
    return () => window.removeEventListener("medinotes:open-search", handleOpen)
  }, [modalOnly])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Enter" && filteredResults.length > 0) {
        router.push(filteredResults[0].href)
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filteredResults, router])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) {
          setTimeout(() => {
            setSearchedInput("")
          }, 200)
        }
      }}
    >
      {!modalOnly && (
        <DialogTrigger asChild>
          <div className="relative max-w-md flex-1 cursor-pointer" data-search-trigger>
            <LuSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500 dark:text-neutral-400" />
            <Input
              readOnly
              className="bg-background h-9 w-full rounded-md border pr-4 pl-10 text-sm shadow md:w-full cursor-pointer"
              placeholder="Search notes"
              type="search"
            />
          </div>
        </DialogTrigger>
      )}
      <DialogContent className="top-[45%] w-[calc(100vw-2rem)] max-w-sm overflow-hidden p-0 sm:top-[38%] sm:max-w-lg">
        <DialogTitle className="sr-only">Search</DialogTitle>
        <DialogDescription className="sr-only">
          Search for notes and resources
        </DialogDescription>
        <DialogHeader>
          <div className="border-b">
            <div className="flex items-center px-3 sm:px-4">
              <input
                value={searchedInput}
                onChange={(e) => setSearchedInput(e.target.value)}
                placeholder="Search subjects..."
                autoFocus
                className="h-12 sm:h-14 min-w-0 flex-1 bg-transparent text-[15px] outline-none"
              />
            </div>
          </div>
        </DialogHeader>

        {filteredResults.length === 0 && searchedInput.length >= 1 && (
          <div className="flex min-w-0 flex-col items-center gap-2 px-4 pt-4 text-center">
            <Image
              src={getAvatarImageSrc("/mascot/bud.webp")}
              alt=""
              width={96}
              height={96}
              className="h-20 w-auto object-contain sm:h-24"
              unoptimized
            />
            <p
              role="status"
              className="max-w-full break-words text-sm text-muted-foreground"
            >
              No subjects found for{" "}
              <span className="font-medium text-foreground">{`"${searchedInput}"`}</span>
            </p>
          </div>
        )}

        <ScrollArea className="max-h-[350px] w-full overflow-hidden">
          <div className="flex w-full min-w-0 flex-col items-start px-1 pt-1 pb-4 sm:px-3">
            {filteredResults.map((item) => (
              <DialogClose key={item.href} asChild>
                <NavLink
                  className={cn(
                    "flex w-full min-w-0 flex-col gap-0.5 rounded-sm p-3 text-[15px] transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                  )}
                  href={item.href}
                >
                  <div className="flex h-full items-center gap-x-2 min-w-0">
                    <LuBook className="h-[1.1rem] w-[1.1rem] text-neutral-700 dark:text-neutral-300 shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </div>
                  <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                    <span>{item.snippet}</span>
                    <span className="hidden sm:inline"> • {item.branchYear}</span>
                  </p>
                </NavLink>
              </DialogClose>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
