import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center text-white p-4">
      {/* Animated Orbiting Effect */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className="absolute w-40 h-40 border-2 border-yellow-500/30 rounded-full animate-spin-slow"></div>
        <div className="absolute w-52 h-52 border-t-4 border-orange-500 rounded-full animate-spin"></div>
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-yellow-400 to-orange-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          404
        </h1>
      </div>

      <div className="text-center mt-10 space-y-4">
        <h2 className="text-3xl text-black dark:text-white font-bold">Oh no! You're lost in space.</h2>
        <p className="text-slate-600 dark:text-gray-200 max-w-sm">
          The page you are looking for has vanished into a black hole or never existed in this galaxy.
        </p>
        
        <div className="pt-6">
          <Link 
            href="/" 
            className="group relative px-8 py-4 bg-yellow-500 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transition-all hover:bg-yellow-700"
          >
            <span className="relative z-10 font-semibold ">Return to Home</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}