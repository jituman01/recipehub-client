"use client";

import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { LogoFacebook } from "@gravity-ui/icons";
import { CgTwitter } from "react-icons/cg";
import { BiLogoGithub, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";
import { usePathname } from "next/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const pathname = usePathname();
    if (pathname.includes('dashboard')) {
      return null;
    }

  return (
    <footer className="w-full border-t border-slate-200/60 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* 1. BRAND & LOGO SECTION */}
          <div className="space-y-4">
            <Link href="/">
              <p className="font-extrabold text-2xl tracking-tight">
                <span className="text-orange-500">Recipe</span>
                <span className="text-slate-900 dark:text-white">Hub</span>
              </p>
            </Link>
            <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
              Discover, cook, and share amazing home-cooked recipes from passionate food lovers around the world.
            </p>
          </div>

          {/* 2. QUICK LINKS SECTION */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-zinc-400">
              <li>
                <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500 transition-colors">Browse Recipes</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* 3. CONTACT INFORMATION SECTION */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-zinc-400">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="truncate">support@recipehub.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* 4. SOCIAL LINKS SECTION */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">
              Stay updated with our weekly popular dishes and updates.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 text-slate-600 dark:text-zinc-400 transition-all active:scale-95 border border-slate-200/40 dark:border-zinc-800/50">
                <LogoFacebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 text-slate-600 dark:text-zinc-400 transition-all active:scale-95 border border-slate-200/40 dark:border-zinc-800/50">
                <BiLogoTwitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 text-slate-600 dark:text-zinc-400 transition-all active:scale-95 border border-slate-200/40 dark:border-zinc-800/50">
                <BiLogoInstagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Github" className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 text-slate-600 dark:text-zinc-400 transition-all active:scale-95 border border-slate-200/40 dark:border-zinc-800/50">
                <BiLogoGithub className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* 5. COPYRIGHT SECTION */}
        <div className="border-t border-slate-200/60 dark:border-zinc-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-500">
          <p>© {currentYear} <span className="font-semibold text-orange-500">RecipeHub</span>. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Cookies Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;