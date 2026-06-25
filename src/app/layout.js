import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

// import dns from "node:dns";
// dns.setServers(['1.1.1.1', '1.0.0.1']);

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "RecipeHub — Recipe Sharing Platform",
  description: "Discover, Create & Share Your Favorite Recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.className} h-full antialiased`}>
      <body className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 transition-colors duration-500">
        
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>

          {/* backround glow */}
          <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden transition-colors duration-500">
            <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-white dark:bg-yellow-600/70 rounded-full blur-[150px] sm:blur-[300px] transition-all duration-500" />

            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white dark:bg-yellow-500/10 rounded-full blur-[150px] sm:blur-[300px] transition-all duration-500" />

            <div className="absolute top-1/3 -right-20 w-[700px] h-[700px] bg-white dark:bg-yellow-600/50 rounded-full blur-[150px] sm:blur-[300px] transition-all duration-500" />

            <div className="absolute -bottom-30 right-20 w-[600px] h-[600px] bg-white dark:bg-yellow-500/10 rounded-full blur-[150px] sm:blur-[220px] transition-all duration-500" />
          </div>

          <Navbar />
          
          <main className=" mx-auto px-2 min-h-screen">
            {children}
          </main>
          <Footer/>
           <Toaster/>

        </ThemeProvider>
      </body>
    </html>
  );
}