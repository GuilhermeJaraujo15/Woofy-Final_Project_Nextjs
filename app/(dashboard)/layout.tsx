import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />
      <main className="min-h-0 min-w-0 flex-1 overflow-y-auto lg:ml-64 pt-16 lg:pt-0">
        <div className="min-w-0 p-4 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
