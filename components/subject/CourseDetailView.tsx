'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import {
  LuFileText,
  LuCalendar,
  LuEye,
  LuShare2,
  LuCopy,
  LuCheck,
} from 'react-icons/lu'
import { PathTrail } from '@/components/subject/PathTrail'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { COURSE_CATALOG, getCourseBySlug, type CourseFileItem, type SyllabusUnit } from '@/config/courses'
import { getAvatarImageSrc } from '@/lib/helpers'

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

function parseUnitTitle(unitName: string, index: number) {
  if (!unitName) {
    const roman = `Unit ${romanNumerals[index] || index + 1}`
    return { roman, title: '', full: roman }
  }
  const trimmed = unitName.trim()
  const match = trimmed.match(/^(unit\s+[ivx0-9]+|module\s+[ivx0-9]+)\s*[:\-–]\s*(.*)$/i)
  if (match) {
    const roman = match[1].trim()
    const title = match[2].trim()
    return { roman, title, full: `${roman}${title ? `: ${title}` : ''}` }
  }
  const roman = `Unit ${romanNumerals[index] || index + 1}`
  return { roman, title: trimmed, full: `${roman}: ${trimmed}` }
}

function ActiveLearnersBadge({ initialCount = 12 }: { initialCount?: number }) {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    setCount(initialCount)
    const interval = setInterval(() => {
      setCount((prev) => {
        const diff = prev - initialCount
        if (diff >= 3) return prev - 1
        if (diff <= -3) return prev + 1
        const r = Math.random()
        if (r < 0.45) return prev + 1
        if (r < 0.9) return Math.max(1, prev - 1)
        return prev
      })
    }, 4500)

    return () => clearInterval(interval)
  }, [initialCount])

  return (
    <div
      className="inline-flex items-center justify-center gap-1.5 px-2.5 h-[22px] rounded-full bg-zinc-100/90 dark:bg-zinc-800/60 select-none border border-zinc-200/60 dark:border-zinc-700/50 leading-none align-middle text-xs font-medium"
      title={`${count} students active right now`}
    >
      <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
        <span
          className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-25 bg-emerald-400 dark:bg-[hsl(133_98%_35%)]"
          style={{ animationDuration: '3s' }}
        />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 dark:bg-[hsl(133_98%_35%)] shadow-[0_0_3px_rgba(16,185,129,0.35)] dark:shadow-[0_0_3px_hsl(133_98%_35%/0.45)]" />
      </span>
      <span className="text-foreground/85 font-semibold whitespace-nowrap">
        {count.toLocaleString()} online
      </span>
    </div>
  )
}

function CurriculumList({ units }: { units: SyllabusUnit[] }) {
  const [copiedUnitIdx, setCopiedUnitIdx] = useState<number | null>(null)

  const copyUnit = (idx: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedUnitIdx(idx)
    setTimeout(() => setCopiedUnitIdx(null), 1800)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold">Curriculum</h2>
      </div>

      {!units || units.length === 0 ? (
        <div className="py-12 text-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Curriculum not available for this subject yet.
        </div>
      ) : (
        <div className="space-y-5 sm:space-y-8 pt-1">
          {units.map((unit, idx) => {
            const parsed = parseUnitTitle(unit.unitName, idx)
            const isCopied = copiedUnitIdx === idx
            const numStr = String(idx + 1).padStart(2, '0')

            return (
              <div
                key={idx}
                className="group relative pb-5 sm:pb-8 border-b border-zinc-200/80 dark:border-zinc-800 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-3 sm:gap-6">
                  <div className="flex items-start gap-3 sm:gap-6 flex-1 min-w-0">
                    <span className="text-2xl sm:text-4xl font-mono font-black text-zinc-300 dark:text-zinc-700/70 select-none shrink-0 tracking-tight leading-none pt-0.5 sm:pt-1">
                      {numStr}
                    </span>
                    <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
                      {parsed.title && (
                        <h3 className="text-[13px] sm:text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">
                          {parsed.title}
                        </h3>
                      )}
                      <p className="text-xs sm:text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {unit.content}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyUnit(idx, `${parsed.full}\n${unit.content}`)}
                    className="opacity-60 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-opacity p-1 sm:p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded cursor-pointer shrink-0"
                    title="Copy unit"
                  >
                    {isCopied ? (
                      <LuCheck className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <LuCopy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function FileBadges({ file }: { file: CourseFileItem }) {
  return (
    <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 font-medium py-1">
      <LuFileText className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500 flex-shrink-0" />
      <span>
        {file.page_count} {file.page_count === 1 ? 'page' : 'pages'}
      </span>
    </div>
  )
}

export default function CourseDetailView() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('subject') || 'data-structures'
  const subject = getCourseBySlug(slug) || COURSE_CATALOG['data-structures']
  const [activeTab, setActiveTab] = useState('notes')
  const [showShareToast, setShowShareToast] = useState(false)

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setShowShareToast(true)
      setTimeout(() => setShowShareToast(false), 2500)
    }
  }

  const renderFileList = (files: CourseFileItem[]) => (
    <div className="space-y-4">
      <div className="space-y-2 sm:space-y-3">
        {files.map((file) => (
          <div key={file.id} className="relative transition-all duration-200">
            <Card className="hover:shadow-sm transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary">
              <CardContent className="p-3 sm:p-4">
                <div className="flex sm:hidden items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-2">
                      <LuFileText className="h-4 w-4 text-red-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm break-words leading-tight">
                          {file.original_name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="size-3 shrink-0 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                          <Image
                            src={getAvatarImageSrc(file.uploader_avatar)}
                            alt={file.uploader_name}
                            width={12}
                            height={12}
                            unoptimized
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="truncate">{file.uploader_name}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-start">
                      <div className="flex items-center gap-1">
                        <FileBadges file={file} />
                        <Button
                          onClick={handleShare}
                          variant="ghost"
                          size="sm"
                          className="h-6 px-1 text-muted-foreground hover:text-black dark:hover:text-white transition-colors"
                          title="Share"
                        >
                          <LuShare2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button
                      disabled
                      size="sm"
                      className="h-7 px-3 text-xs flex-shrink-0 disabled:opacity-100 disabled:pointer-events-auto cursor-default hover:bg-primary"
                    >
                      <LuEye className="h-3 w-3 mr-1 !text-white dark:!text-black" />
                      View
                    </Button>
                  </div>
                </div>

                <div className="hidden sm:flex sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-2">
                      <LuFileText className="h-5 w-5 text-red-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                      <h3 className="font-medium break-words leading-tight">
                        {file.original_name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <LuCalendar className="h-3 w-3" />
                        <span className="truncate">{formatDate(file.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="size-4 shrink-0 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                          <Image
                            src={getAvatarImageSrc(file.uploader_avatar)}
                            alt={file.uploader_name}
                            width={16}
                            height={16}
                            unoptimized
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="truncate">{file.uploader_name}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-start">
                      <div className="flex items-center gap-1">
                        <FileBadges file={file} />
                        <Button
                          onClick={handleShare}
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-muted-foreground hover:text-black dark:hover:text-white hover:bg-transparent transition-colors"
                          title="Share"
                        >
                          <LuShare2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      disabled
                      size="sm"
                      className="disabled:opacity-100 disabled:pointer-events-auto cursor-default hover:bg-primary"
                    >
                      <LuEye className="h-4 w-4 mr-2 !text-white dark:!text-black" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="container mx-auto pt-2 sm:pt-4 pb-8 px-4 max-w-4xl">
      <div className="hidden sm:block">
        <PathTrail paths={[subject.programTitle, subject.yearTitle, subject.name]} />
      </div>

      <div className="mb-8">
        <div className="space-y-4">
          <div>
            <h1 className="mb-3 text-3xl font-bold">{subject.name}</h1>
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <Badge variant="outline">{subject.program.toUpperCase()}</Badge>
              <Badge variant="secondary">{subject.code}</Badge>
              <ActiveLearnersBadge initialCount={subject.onlineCount} />
            </div>
          </div>

          <div className="max-w-2xl space-y-2">
            <p className="text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-none">
              {subject.description}
            </p>
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/80 cursor-default font-medium pt-0.5"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Claude_AI_symbol.svg"
                alt=""
                width={14}
                height={14}
                unoptimized
                className="size-3.5 shrink-0 opacity-70"
              />
              <span>Need help? Ask AI</span>
            </button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="notes">
            <span>Notes</span>
          </TabsTrigger>
          <TabsTrigger value="pyqs">
            <span>PYQs</span>
          </TabsTrigger>
          <TabsTrigger value="syllabus">
            <span>Syllabus</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Notes</h2>
          </div>
          {renderFileList(subject.notes)}
        </TabsContent>

        <TabsContent value="pyqs" className="space-y-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold">
              <span className="hidden sm:inline">Previous Year Questions</span>
              <span className="sm:hidden">PYQs</span>
            </h2>
          </div>
          {renderFileList(subject.pyqs)}
        </TabsContent>

        <TabsContent value="syllabus" className="space-y-6">
          <CurriculumList units={subject.units} />
        </TabsContent>
      </Tabs>

      {showShareToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-white dark:bg-gray-800 text-black dark:text-white text-sm font-medium rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-2">
          Link copied to clipboard!
        </div>
      )}
    </div>
  )
}
