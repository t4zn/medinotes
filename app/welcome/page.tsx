import Image from 'next/image'
import { PathTrail } from '@/components/subject/PathTrail'
import { HubHighlights } from '@/components/welcome/HubHighlights'

export default function WelcomePage() {
  return (
    <div className="flex items-start gap-10">
      <section className="flex-[3] min-w-0">
        <PathTrail paths={['welcome']} />

        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">
            Introduction to Medinotes
          </h1>
          <p className="text-sm text-muted-foreground hidden sm:block">
            Your comprehensive hub for study materials, notes, and PYQs for Medicaps University students.
          </p>
          <p className="text-sm text-muted-foreground sm:hidden">
            Your comprehensive hub for study materials, notes, and PYQs for Medicaps students.
          </p>
          <div className="w-full h-px bg-border my-4" />
        </div>

        {/* Video Banner */}
        <div className="mb-8 mt-6 overflow-hidden rounded-xl border border-border shadow-sm">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/branding/medinotes-video-poster.jpg"
            className="w-full h-auto"
          >
            <source src="/media/medinotes.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Meet Our Team Section */}
        <section className="my-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 my-4 sm:my-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <Image
                src="/images/founders/taizun-kaptan.webp"
                alt="Taizun Kaptan"
                width={64}
                height={64}
                className="w-10 h-10 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0 border border-border"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-xs sm:text-base truncate text-foreground">Taizun Kaptan</div>
                <div className="text-muted-foreground text-[10px] sm:text-xs">Founder</div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <Image
                src="/images/founders/vansh-singh.webp"
                alt="Vansh Singh"
                width={64}
                height={64}
                className="w-10 h-10 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0 border border-border"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-xs sm:text-base truncate text-foreground">Vansh Singh</div>
                <div className="text-muted-foreground text-[10px] sm:text-xs">Co-Founder</div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <Image
                src="/images/founders/sakina-hashmi.webp"
                alt="Sakina Hashmi"
                width={64}
                height={64}
                className="w-10 h-10 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0 border border-border"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-xs sm:text-base truncate text-foreground">Sakina Hashmi</div>
                <div className="text-muted-foreground text-[10px] sm:text-xs">Content Manager</div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <Image
                src="/images/founders/raina-sharma.webp"
                alt="Raina Sharma"
                width={64}
                height={64}
                className="w-10 h-10 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0 border border-border"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-xs sm:text-base truncate text-foreground">Raina Sharma</div>
                <div className="text-muted-foreground text-[10px] sm:text-xs">Community Manager</div>
              </div>
            </div>
          </div>
        </section>

        {/* Welcome Resources Directory */}
        <HubHighlights />
      </section>
    </div>
  )
}
