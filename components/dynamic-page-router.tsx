"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "./dashboard-layout"
import PowerBIEmbed from "./powerbi-embed"

interface Page {
  id: string
  title: string
  description: string
  embedUrl: string
  createdAt: string
}

interface DynamicPageRouterProps {
  pageId: string
}

export default function DynamicPageRouter({ pageId }: DynamicPageRouterProps) {
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadPage = () => {
      const pages: Page[] = JSON.parse(localStorage.getItem("adminPages") || "[]")
      const foundPage = pages.find((p) => p.id === pageId)

      if (foundPage) {
        setPage(foundPage)
      } else {
        // If page not found, redirect to first available page or performance dashboard
        if (pages.length > 0) {
          router.push(`/page/${pages[0].id}`)
        } else {
          router.push("/dashboard/performance")
        }
      }
      setLoading(false)
    }

    loadPage()
  }, [pageId, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
          <p className="text-gray-400">The requested page could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout title={page.title}>
      <PowerBIEmbed reportId={page.id} title={page.title} embedUrl={page.embedUrl} />
    </DashboardLayout>
  )
}
