import { Suspense } from 'react'
import type { Metadata } from 'next'
import CourseDetailView from '@/components/subject/CourseDetailView'

export const metadata: Metadata = {
  title: 'Subject Notes, PYQs & Syllabus | Medinotes',
  description: 'Browse unit-wise notes, previous year question papers, and curriculum syllabus on Medinotes.',
}

export default function NotesPage() {
  return (
    <Suspense fallback={null}>
      <CourseDetailView />
    </Suspense>
  )
}

