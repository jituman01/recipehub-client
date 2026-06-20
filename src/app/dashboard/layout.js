import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-transparent">
      <DashboardSidebar />

      <div className="flex flex-col min-w-0 lg:pl-72 pt-16 lg:pt-0">
        <div className="hidden lg:block border-b border-divider p-4 bg-background/80 backdrop-blur-md sticky top-0 z-20">
          Navbar
        </div>

        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}