import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen w-full bg-transparent overflow-hidden">
      
      <DashboardSidebar />

      <div className="flex flex-col flex-1 min-w-0 lg:pl-72 h-full">
        
        <div className="border-b border-divider p-4 w-full bg-transparent backdrop-blur-md sticky top-0 z-20">
          Navbar
        </div>

        <main className="flex-1 overflow-y-auto p-6 bg-transparent">
          {children}
        </main>

      </div>
    </div>
  );
}