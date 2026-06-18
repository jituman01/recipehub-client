export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-transparent">
      <div className="flex flex-1 overflow-hidden">
        {/* sidebar */}
      <div className="border border-2">
        Sidebar
      </div >
        {/* navbar */}
        <div className="flex flex-1 overflow-hidden">
          <div>
        navbar
      </div>

      <main className="p-5">
        {children}
          </main>
          </div>
      </div>
    </div>
  );
}