import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-transparent">
      
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        
        <div className="hidden lg:block border-b border-divider p-4 bg-background/80 backdrop-blur-md sticky top-0 z-20">
          Navbar
        </div>

        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto h-screen pt-20 lg:pt-6 w-full">
          <div className="max-w-5xl w-full mx-auto">
            {children}
          </div>
        </main>
        
      </div>
    </div>
  );
}