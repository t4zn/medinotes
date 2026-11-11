import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAvatarImageSrc } from '@/lib/helpers'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Medinotes',
  description:
    'The page you are looking for does not exist. Browse our study materials, notes, and PYQs for Medicaps University students.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="mx-auto flex min-h-[75dvh] max-w-md flex-col items-center justify-center px-5 py-12 text-center"
    >
      <Image
        src={getAvatarImageSrc('/mascot/bud.webp')}
        alt=""
        width={144}
        height={144}
        unoptimized
        className="mb-5 size-28 object-contain sm:size-36"
      />
      <p className="text-xs font-medium text-muted-foreground">404</p>
      <h1
        id="not-found-title"
        className="mt-2 font-serif text-3xl tracking-tight text-foreground sm:text-4xl"
      >
        Page not found
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        We couldn&apos;t find the page you were looking for.
      </p>
      <Link
        href="/welcome"
        className="mt-6 inline-flex min-h-10 items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Browse notes
      </Link>
    </section>
  )
}
