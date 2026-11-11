import { LuArrowRight, LuArrowUpRight } from 'react-icons/lu'
import styles from './hub-highlights.module.css'

const resources = [
  {
    title: 'Study notes',
    label: 'Browse resources',
    artwork: (
      <svg aria-hidden="true" viewBox="0 0 180 96" className="h-24 w-44 max-w-[65%]">
        <rect x="39" y="25" width="99" height="58" rx="10" fill="currentColor" opacity=".1" />
        <g className={styles.notes}>
          <rect x="51" y="13" width="99" height="58" rx="10" fill="var(--card)" stroke="currentColor" strokeOpacity=".4" />
          <path d="M68 31h50M68 42h64M68 53h39" className={styles.noteLines} pathLength="1" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Previous year papers',
    label: 'Explore PYQs',
    artwork: (
      <svg aria-hidden="true" viewBox="0 0 180 96" className="h-24 w-44 max-w-[65%]">
        <rect x="51" y="8" width="78" height="78" rx="9" fill="var(--card)" stroke="currentColor" strokeOpacity=".4" />
        <path d="M82 29h29M82 47h29M82 65h29" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".35" />
        {[27, 45, 63].map((y) => (
          <path key={y} className={styles.check} d={`M64 ${y}l4 4 7-8`} pathLength="1" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </svg>
    ),
  },
  {
    title: 'AI Tutor',
    label: 'Find a subject',
    artwork: (
      <svg aria-hidden="true" viewBox="0 0 180 96" className="h-24 w-44 max-w-[65%]">
        <rect x="32" y="19" width="116" height="60" rx="12" fill="var(--card)" stroke="currentColor" strokeOpacity=".4" />
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
          {[12, 27, 37, 20, 31, 24, 13].map((height, index) => (
            <path key={index} className={styles.wave} d={`M${52 + index * 12} ${49 - height / 2}v${height}`} />
          ))}
        </g>
      </svg>
    ),
  },
  {
    title: 'Campus & ERP',
    label: 'Explore campus',
    artwork: (
      <svg aria-hidden="true" viewBox="0 0 180 96" className="h-24 w-44 max-w-[65%]">
        <path d="M37 34l32-10 42 12 32-10v41l-32 10-42-12-32 10Z" fill="var(--card)" stroke="currentColor" strokeOpacity=".45" strokeLinejoin="round" />
        <path d="M69 24v41m42-29v41" stroke="currentColor" strokeOpacity=".25" />
        <path d="M48 60l23-13 27 11 18-12" className={styles.route} pathLength="1" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <g className={styles.pin}>
          <path d="M116 47s-13-12-13-22a13 13 0 0 1 26 0c0 10-13 22-13 22Z" fill="currentColor" />
          <circle cx="116" cy="25" r="4" fill="var(--card)" />
        </g>
      </svg>
    ),
  },
]

const programs = ['B.Tech', 'B.Sc', 'BCA', 'BBA', 'B.Com', 'MBA', 'MCA']

const features = [
  {
    title: 'See what’s on the syllabus',
    description: 'Open the Syllabus tab on a subject page to check its units and topics before you plan your revision.',
  },
  {
    title: 'Generate a practice paper',
    description: 'Use the sample paper generator in the PYQs tab to download a practice PDF for your midterm or end-semester exam.',
  },
  {
    title: 'Ask the tutor by voice',
    description: 'Use the microphone in AI Tutor to ask a question out loud and get help with the subject you’re studying.',
  },
  {
    title: 'Share your study materials',
    description: 'Upload notes or a past paper to help other students find useful material under the right subject.',
  },
  {
    title: 'Pod',
    description: 'See your classrooms, upcoming activities, and attendance in one dashboard.',
  },
  {
    title: 'CodeTantra',
    description: 'Browse subject-wise coding exercises and reference solutions to review your lab work.',
  },
  {
    title: 'AI PowerPoint generator',
    description: 'Turn a topic into a slide outline and download an editable PowerPoint from Playground.',
  },
  {
    title: 'Exam timetable',
    description: 'Choose your program to see the published exam dates and times in one view.',
  },
]

export function HubHighlights() {
  return (
    <div className="mt-10 space-y-10 border-t border-border pt-8 pb-12 sm:mt-12 sm:space-y-12 sm:pb-16">
      <section aria-labelledby="welcome-resources">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Built for Medicaps students</p>
        <h2 id="welcome-resources" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">What you’ll find here</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">Start with your subject, work through past papers, or ask for help when a topic gets tricky.</p>
        <div className={`mt-5 ${styles.resourceGrid}`}>
          {resources.map(({ title, label, artwork }) => (
            <div key={title} aria-disabled="true" className={`flex min-w-0 flex-col rounded-2xl border border-border bg-card p-3 text-card-foreground cursor-default ${styles.resourceCard}`}>
              <div className="relative grid h-28 place-items-center overflow-hidden rounded-xl bg-muted/60 text-blue-600 dark:text-blue-400">
                {artwork}
              </div>
              <div className="flex flex-1 flex-col p-2 pt-4">
                <h3 className="text-base font-semibold tracking-tight">{title}</h3>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-semibold">
                  {label}<LuArrowRight aria-hidden="true" className="size-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="welcome-programs">
        <h2 id="welcome-programs" className="text-xl font-semibold tracking-tight">Find your program</h2>
        <p className="mt-2 text-sm text-muted-foreground">Choose a program to browse its notes and subjects.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {programs.map((label) => (
            <button key={label} type="button" disabled className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium cursor-default">
              {label}<LuArrowUpRight aria-hidden="true" className="size-3.5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="welcome-features">
        <h2 id="welcome-features" className="text-xl font-semibold tracking-tight sm:text-2xl">More ways to study</h2>
        <p className="mt-2 text-sm text-muted-foreground">Explore tools for revision, coursework, and keeping track of classes and exams.</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {features.map(({ title, description }) => (
            <li key={title} className="rounded-xl border border-border bg-card p-4">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="welcome-explore" className="rounded-3xl border border-border bg-card px-6 py-10 text-center sm:px-10 sm:py-14">
        <h2 id="welcome-explore" className="mx-auto max-w-md text-balance text-2xl font-semibold tracking-tight text-card-foreground sm:text-3xl">
          Looking for study notes or past exam papers?
        </h2>
        <button type="button" disabled className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground cursor-default">
          Explore Notes &amp; PYQs
        </button>
      </section>
    </div>
  )
}
