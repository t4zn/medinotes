"use client"

import { ComponentProps, useState, useMemo, useCallback } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { LuSearch, LuGlobe, LuChevronDown, LuChevronRight } from "react-icons/lu"

import { NAVIGATION_TREE, NavNode } from "@/config/courses"
import { cn } from "@/lib/helpers"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { SheetClose } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDrawerState } from "@/components/navigation/CourseSidebar"

type NavLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string
  absolute?: boolean
  activeClassName?: string
  disabled?: boolean
}

export function NavLink({
  href,
  absolute,
  className = "",
  activeClassName = "",
  disabled,
  children,
  ...props
}: NavLinkProps) {
  const path = usePathname()
  const searchParams = useSearchParams()
  const isExternal = href.startsWith("http://") || href.startsWith("https://")
  const currentSubject = searchParams.get("subject")
  const fullPath = path === "/notes" && currentSubject ? `${path}?subject=${currentSubject}` : path
  let isMatch = absolute
    ? href.split("/")[1] === path.split("/")[1]
    : fullPath === href

  if (isExternal) isMatch = false

  if (disabled) {
    return (
      <span aria-disabled="true" className={cn(className, "cursor-default")}>
        {children}
      </span>
    )
  }

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(className)}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={cn(className, isMatch && activeClassName)} {...props}>
      {children}
    </Link>
  )
}

function isRoute(
  item: NavNode
): item is Extract<NavNode, { title: string; href: string }> {
  return "title" in item && "href" in item
}

function TreeBranchItem(
  props: NavNode & { level: number; isSheet: boolean; parentKey?: string }
) {
  const { openSections, toggleSection } = useDrawerState()

  const isRouteProps = isRoute(props)
  const parentKey = props.parentKey || ""
  const propTitle = isRouteProps ? props.title : ""
  const propHref = isRouteProps ? props.href : ""

  const sectionKey = useMemo(() => {
    if (!isRouteProps) return ""
    return `${parentKey}-${propTitle}-${propHref}`
  }, [parentKey, propTitle, propHref, isRouteProps])

  const isOpen = openSections[sectionKey] ?? false

  const handleToggle = useCallback(() => {
    toggleSection(sectionKey)
  }, [toggleSection, sectionKey])

  const nestedItems = useMemo(() => {
    if (!isRouteProps || !isRoute(props) || !props.items) return null

    return props.items.map((innerLink) => {
      if (!isRoute(innerLink)) return null

      const finalHref =
        innerLink.href.startsWith("/") || innerLink.href.startsWith("http")
          ? innerLink.href
          : `${props.href}${innerLink.href}`

      const modifiedItems = {
        ...innerLink,
        href: finalHref,
        level: props.level + 1,
        isSheet: props.isSheet,
        parentKey: sectionKey,
      }

      return <TreeBranchItem key={`${modifiedItems.title}-${modifiedItems.href}`} {...modifiedItems} />
    })
  }, [props, sectionKey, isRouteProps])

  if (!isRoute(props)) return null

  const { title, href, items, noLink, isSectionLink, disabled, level, isSheet } = props

  const Comp = (
    <NavLink
      activeClassName="text-primary text-sm font-semibold"
      href={href}
      disabled={disabled}
      className={cn(
        isSectionLink
          ? "text-primary font-bold sm:text-sm"
          : "text-foreground/85 hover:text-foreground transition-colors"
      )}
    >
      {title}
    </NavLink>
  )

  const titleOrLink = !noLink ? (
    isSheet && !disabled ? (
      <SheetClose asChild>{Comp}</SheetClose>
    ) : (
      Comp
    )
  ) : (
    <h2 className="text-primary font-bold sm:text-sm">{title}</h2>
  )

  if (!items) {
    return <div className="flex flex-col text-sm">{titleOrLink}</div>
  }

  return (
    <div className="flex w-full flex-col gap-1">
      <Collapsible open={isOpen} onOpenChange={handleToggle}>
        <CollapsibleTrigger asChild>
          <div className="mr-3 flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 rounded-md p-1 -m-1 transition-colors">
            {titleOrLink}
            <Button className="ml-auto h-6 w-6 pointer-events-none" variant="link" size="icon">
              {!isOpen ? (
                <LuChevronRight className="h-[0.9rem] w-[0.9rem]" />
              ) : (
                <LuChevronDown className="h-[0.9rem] w-[0.9rem]" />
              )}
              <span className="sr-only">Toggle</span>
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="CollapsibleContent">
          <div
            className={cn(
              "mt-2.5 flex flex-col items-start gap-3 border-l pl-4 text-sm",
              level > 0 && "ml-1 border-l pl-4"
            )}
          >
            {nestedItems}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

const BROWSE_PROGRAMS = [
  { slug: "btech", title: "B.Tech" },
  { slug: "bsc", title: "B.Sc" },
  { slug: "bba", title: "BBA" },
  { slug: "bca", title: "BCA" },
  { slug: "bcom", title: "B.Com" },
  { slug: "bpharm", title: "B.Pharm" },
  { slug: "mba", title: "MBA" },
]

const BTECH_BRANCHES = [
  { slug: "cse", title: "CSE" },
  { slug: "ai-ibm", title: "AI (IBM)" },
  { slug: "it", title: "IT" },
  { slug: "csbs", title: "CSBS" },
  { slug: "ece", title: "ECE" },
  { slug: "robotics", title: "Robotics" },
  { slug: "mechanical", title: "Mechanical" },
  { slug: "civil", title: "Civil" },
  { slug: "automobile", title: "Automobile" },
  { slug: "electrical", title: "Electrical" },
]

export function ProgramTree({ isSheet = false }: { isSheet?: boolean }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [program, setProgram] = useState("")
  const [branch, setBranch] = useState("")
  const [year, setYear] = useState("")

  const hasBranches = program === "btech"

  const years = useMemo(() => {
    if (!program) return []
    if (program === "btech") {
      if (branch === "__none") return [{ slug: "1st-year", title: "1st Year" }]
      if (branch) {
        return [
          { slug: "2nd-year", title: "2nd Year" },
          { slug: "3rd-year", title: "3rd Year" },
          { slug: "4th-year", title: "4th Year" },
        ]
      }
      return []
    }
    return [
      { slug: "1st-year", title: "1st Year" },
      { slug: "2nd-year", title: "2nd Year" },
      { slug: "3rd-year", title: "3rd Year" },
    ]
  }, [program, branch])

  const browseUrl = useMemo(() => {
    if (program === "btech" && branch === "cse" && year === "2nd-year") {
      return "/notes"
    }
    return null
  }, [program, branch, year])

  const handleBrowse = () => {
    if (!browseUrl) return
    router.push(browseUrl)
    setIsOpen(false)
    setProgram("")
    setBranch("")
    setYear("")
  }

  return (
    <div className="flex flex-col gap-3.5 pb-6">
      <div className="px-2 mb-4">
        <div className="relative flex items-center h-9 w-full rounded-md border bg-background shadow-xs transition-colors hover:border-neutral-400 dark:hover:border-neutral-600">
          <div
            className="flex flex-1 items-center h-full pl-3 pr-2 cursor-pointer select-none min-w-0"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("medinotes:open-search"))
            }}
          >
            <LuSearch className="h-4 w-4 text-neutral-500 dark:text-neutral-400 mr-2.5 flex-shrink-0 pointer-events-none" />
            <span className="text-sm text-muted-foreground">Search</span>
          </div>

          <div className="h-4 w-[1px] bg-border flex-shrink-0" />

          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="h-full px-2.5 flex items-center justify-center text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors rounded-r-md cursor-pointer flex-shrink-0"
                title="Browse subjects"
                aria-label="Browse subjects"
              >
                <LuGlobe className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-52 p-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800"
              align="end"
            >
              <div className="space-y-3">
                <div className="text-sm font-light text-black dark:text-white">
                  Browse Subjects
                </div>

                <div className="space-y-2">
                  <Select
                    value={program}
                    onValueChange={(val) => {
                      setProgram(val)
                      setBranch("")
                      setYear("")
                    }}
                  >
                    <SelectTrigger className="h-8 text-sm border-0 border-b border-gray-200 dark:border-gray-700 rounded-none bg-transparent focus:border-black dark:focus:border-white">
                      <SelectValue placeholder="Program" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                      {BROWSE_PROGRAMS.map((p) => (
                        <SelectItem key={p.slug} value={p.slug}>
                          {p.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {hasBranches && (
                    <Select
                      value={branch}
                      onValueChange={(val) => {
                        setBranch(val)
                        setYear("")
                      }}
                    >
                      <SelectTrigger className="h-8 text-sm border-0 border-b border-gray-200 dark:border-gray-700 rounded-none bg-transparent focus:border-black dark:focus:border-white">
                        <SelectValue placeholder="Branch (optional)" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                        <SelectItem value="__none">Common (No Branch)</SelectItem>
                        {BTECH_BRANCHES.map((b) => (
                          <SelectItem key={b.slug} value={b.slug}>
                            {b.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {program && (!hasBranches || branch) && years.length > 0 && (
                    <Select value={year} onValueChange={setYear}>
                      <SelectTrigger className="h-8 text-sm border-0 border-b border-gray-200 dark:border-gray-700 rounded-none bg-transparent focus:border-black dark:focus:border-white">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                        {years.map((y) => (
                          <SelectItem key={y.slug} value={y.slug}>
                            {y.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    className="flex-1 h-7 text-xs text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                    onClick={() => {
                      setProgram("")
                      setBranch("")
                      setYear("")
                    }}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className={`flex-1 h-7 text-xs transition-opacity ${
                      browseUrl
                        ? "bg-black dark:bg-white text-white dark:text-black hover:opacity-80 cursor-pointer"
                        : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-default"
                    }`}
                    onClick={handleBrowse}
                    disabled={!browseUrl}
                  >
                    Browse
                  </button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Separator className="my-2" />

      {NAVIGATION_TREE.map((item, index) => {
        if ("spacer" in item) {
          return <Separator key={`spacer-${index}`} className="my-2" />
        }
        return (
          <div key={item.title + index}>
            {item.heading && (
              <div className="mb-4 text-sm font-bold">{item.heading}</div>
            )}
            <TreeBranchItem
              {...{
                ...item,
                href: item.href,
                level: 0,
                isSheet,
                parentKey: item.heading || "",
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
