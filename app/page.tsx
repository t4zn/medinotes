import Link from "next/link"
import type { Metadata } from "next"
import Image from "next/image"
import { Upload } from "lucide-react"
import SubjectSearchModal from "@/components/home/SubjectSearchModal"
import { getAvatarImageSrc, PREDEFINED_AVATARS } from "@/lib/helpers"

export const metadata: Metadata = {
  title: "Medinotes | Medicaps University Notes & Study Materials",
  description: "The #1 platform for Medicaps University. Download free Medicaps notes, PYQs, pod.ai attendance info & AI tutoring for 10,000+ students.",
  openGraph: {
    title: "Medinotes | Medicaps University Notes & Study Materials",
    description: "Free Medicaps notes, PYQs, pod.ai attendance tracker & AI tutoring for 10,000+ Medicaps University students.",
    url: "https://medinotes.in",
    siteName: "Medinotes",
    images: [
      {
        url: "/images/social/medinotes-mascots-open-graph.png",
        width: 1200,
        height: 630,
        alt: "Medinotes - Medicaps Notes & Study Materials Platform for Medicaps University Students"
      }
    ],
    locale: "en_US",
    type: "website"
  }
}

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="hero-section px-4 pt-4 pb-4 md:pt-10 md:pb-4 lg:pt-12 xl:pt-16 lg:pb-4 relative z-10 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="text-center md:grid md:grid-cols-[1fr_1.3fr] md:items-center md:gap-6 md:text-left lg:gap-8">
            <div className="hero-image-container relative mx-auto w-full max-w-[460px] select-none md:col-start-2 md:row-start-1 md:-mt-8 md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
              <Image
                src="/images/hero/medinotes-hero-peekaboo.webp"
                alt="Bud peeking out from between the books on a study shelf"
                width={1536}
                height={1024}
                sizes="(max-width: 767px) min(460px, 100vw), (max-width: 1279px) 56vw, 720px"
                className="pointer-events-none h-auto w-full dark:hidden"
                draggable={false}
                priority
              />
              <Image
                src="/images/hero/medinotes-hero-peekaboo-dark.webp"
                alt="Bud peeking out from between the books on a study shelf"
                width={1536}
                height={1024}
                sizes="(max-width: 767px) min(460px, 100vw), (max-width: 1279px) 56vw, 720px"
                className="pointer-events-none hidden h-auto w-full dark:block"
                draggable={false}
                priority
              />
            </div>

            {/* Left Column - Content */}
            <div className="space-y-5 md:space-y-6 relative z-10 md:col-start-1 md:row-start-1 md:pl-4 lg:pl-6">
              {/* Main Headline */}
              <h1 className="fluid-display font-sans font-semibold">
                Study smarter.
                <br />
                Achieve more.
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto md:mx-0">
                <span className="md:hidden">
                  Find study materials for Medicaps University.
                  <br />
                  Get AI tutoring for any subject.
                </span>
                <span className="hidden md:inline">
                  Find notes, PYQs and study materials for Medicaps University.
                  <br />
                  Get instant AI tutoring help for any subject.
                </span>
              </p>

              {/* Search Bar */}
              <div className="w-full max-w-md mx-auto md:mx-0">
                <SubjectSearchModal />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
                <Link
                  href="/welcome"
                  className="inline-block px-6 xs:px-8 py-2.5 xs:py-3 bg-black dark:bg-white text-white dark:text-black text-xs xs:text-sm font-medium hover:opacity-80 active:opacity-60 transition-opacity touch-manipulation rounded-lg"
                >
                  Get Started
                </Link>
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 cursor-default py-1 text-xs xs:text-sm"
                >
                  <Upload className="w-3 h-3" />
                  Upload Notes
                </button>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="mt-10 md:mt-12 lg:mt-16 flex justify-center">
            <div className="inline-flex items-center gap-4 md:gap-6">
              {/* Downloads */}
              <div className="flex items-center gap-1.5 md:gap-2">
                <svg className="w-6 h-4 md:w-10 md:h-6 flex-shrink-0" viewBox="0 0 200 100" fill="none">
                  <defs>
                    <linearGradient id="downloadGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="rgb(34, 197, 94)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 70 C 10 68, 15 65, 20 63 C 25 61, 30 62, 35 64 C 40 66, 45 63, 50 60 C 55 57, 60 58, 65 59 C 70 60, 75 56, 80 53 C 85 50, 90 51, 95 52 C 100 53, 105 49, 110 46 C 115 43, 120 44, 125 45 C 130 46, 135 42, 140 38 C 145 34, 150 35, 155 36 C 160 37, 165 32, 170 28 C 175 24, 180 22, 185 20 C 190 18, 195 15, 200 12 L 200 100 L 0 100 Z"
                    fill="url(#downloadGradient)"
                  />
                  <path
                    d="M 0 70 C 10 68, 15 65, 20 63 C 25 61, 30 62, 35 64 C 40 66, 45 63, 50 60 C 55 57, 60 58, 65 59 C 70 60, 75 56, 80 53 C 85 50, 90 51, 95 52 C 100 53, 105 49, 110 46 C 115 43, 120 44, 125 45 C 130 46, 135 42, 140 38 C 145 34, 150 35, 155 36 C 160 37, 165 32, 170 28 C 175 24, 180 22, 185 20 C 190 18, 195 15, 200 12"
                    stroke="rgb(34, 197, 94)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="200" cy="12" r="3.5" fill="rgb(34, 197, 94)" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-sm md:text-lg font-semibold text-black dark:text-white whitespace-nowrap leading-tight">
                    142,850
                  </span>
                  <span className="hidden md:block text-xs text-gray-600 dark:text-gray-400 leading-tight mt-0.5">
                    Notes Accessed
                  </span>
                </div>
              </div>

              <div className="w-px h-6 md:h-8 bg-gray-300 dark:bg-gray-700" />

              {/* Active students */}
              <div className="flex items-center gap-1.5 md:gap-2">
                <div aria-hidden="true" className="flex h-5 w-13 flex-nowrap items-end -space-x-1 md:h-7 md:w-[5.875rem] md:-space-x-1.5">
                  {PREDEFINED_AVATARS.map((mascot, index) => (
                    <Image
                      key={mascot}
                      src={getAvatarImageSrc(mascot)}
                      alt=""
                      width={28}
                      height={28}
                      unoptimized
                      className={`relative h-5 w-5 shrink-0 object-contain object-bottom md:h-7 md:w-7 ${index === 3 ? "hidden md:block" : ""}`}
                      style={{ zIndex: 3 - index }}
                    />
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm md:text-lg font-semibold text-black dark:text-white whitespace-nowrap leading-tight">
                    10,420
                  </span>
                  <span className="hidden md:block text-xs text-gray-600 dark:text-gray-400 leading-tight mt-0.5">
                    Active Students
                  </span>
                </div>
              </div>

              <div className="w-px h-6 md:h-8 bg-gray-300 dark:bg-gray-700" />

              {/* Study Materials */}
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="relative w-7 h-5 md:w-10 md:h-7 flex-shrink-0">
                  <div className="absolute left-0 top-0.5 w-4 h-5 md:w-6 md:h-7 bg-white dark:bg-gray-800 rounded shadow-sm transform -rotate-12 origin-bottom-left flex items-center justify-center">
                    <Image
                      src="https://ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_document_x128.png"
                      alt="DOC"
                      width={16}
                      height={16}
                      className="w-2 h-2 md:w-4 md:h-4"
                      unoptimized
                    />
                  </div>
                  <div className="absolute left-1.5 top-0 w-4 h-5 md:w-6 md:h-7 bg-white dark:bg-gray-800 rounded shadow-md transform rotate-0 z-10 flex items-center justify-center">
                    <Image
                      src="https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png"
                      alt="Drive"
                      width={16}
                      height={16}
                      className="w-2 h-2 md:w-4 md:h-4"
                      unoptimized
                    />
                  </div>
                  <div className="absolute right-0 top-0.5 w-4 h-5 md:w-6 md:h-7 bg-white dark:bg-gray-800 rounded shadow-sm transform rotate-12 origin-bottom-right z-5 flex items-center justify-center">
                    <svg className="w-2 h-2 md:w-4 md:h-4" viewBox="0 0 48 48" fill="none">
                      <circle cx="24" cy="24" r="22" fill="#D24726" />
                      <path d="M18 14h8c3.314 0 6 2.686 6 6s-2.686 6-6 6h-4v8h-4V14zm4 4v6h4c1.105 0 2-.895 2-2s-.895-2-2-2h-4z" fill="white" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm md:text-lg font-semibold text-black dark:text-white whitespace-nowrap leading-tight">
                    1,840
                  </span>
                  <span className="hidden md:block text-xs text-gray-600 dark:text-gray-400 leading-tight mt-0.5">
                    Study Materials
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
