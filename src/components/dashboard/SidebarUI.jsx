"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bars } from "@gravity-ui/icons";
import { Button, Drawer, DrawerContent, DrawerBody, DrawerHeader } from "@heroui/react";
import {
  Home,
  BookAIcon,
  Plus,
  Heart,
  ShoppingCart,
  User,
  Users2,
  FileText,
} from "lucide-react";

export default function SidebarUI({ role }) {
  const [open, setOpen] = useState(false);

  const dashboardItems = {
    user: [
      { icon: Home, label: "Overview", link: "/dashboard/user" },
      { icon: BookAIcon, label: "My Recipes", link: "/dashboard/my-recipe" },
      { icon: Plus, label: "Add Recipe", link: "/dashboard/add-recipe" },
      { icon: Heart, label: "My Favorites", link: "/dashboard/favorites" },
      { icon: ShoppingCart, label: "My Purchased Recipes", link: "/dashboard/purchased-recipe" },
      { icon: User, label: "Profile", link: "/dashboard/profile" },
    ],

    admin: [
      { icon: Home, label: "Overview", link: "/dashboard/admin" },
      { icon: Users2, label: "Total Users", link: "/dashboard/total-users" },
      { icon: BookAIcon, label: "Total Recipes", link: "/dashboard/total-recipes" },
      { icon: User, label: "Total Premium Members", link: "/dashboard/total-premium-members" },
      { icon: FileText, label: "Total Reports", link: "/dashboard/total-reports" },
    ],
  };

  const navItems = dashboardItems[role] || dashboardItems["user"];

  const NavLinks = () => (
    <nav className="flex flex-col gap-1.5 w-full">
      {navItems.map((item) => (
        <Link key={item.label} href={item.link} className="w-full" onClick={() => setOpen(false)}>
          <button
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-default-700 transition-all hover:bg-default-100 hover:text-orange-500 active:scale-95"
            type="button"
          >
            <item.icon size={20} className="text-default-500 transition-colors" />
            <span className="truncate">{item.label}</span>
          </button>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <header className="lg:hidden flex items-center justify-between p-4 bg-background border-b border-divider sticky top-0 z-40 w-full">
        <div className="flex flex-col">
          <span className="text-sm font-extrabold text-orange-500">RecipeHub</span>
          <span className="text-[10px] text-default-400 capitalize">{role} Dashboard</span>
        </div>
        <Button isIconOnly variant="light" onPress={() => setOpen(true)} className="text-default-600">
          <Bars className="w-6 h-6" />
        </Button>
      </header>

      <aside className="hidden lg:flex flex-col w-72 h-screen p-6 bg-background border-r border-divider fixed left-0 top-0 overflow-y-auto z-30">
        <div className="border-b border-divider pb-5 mb-5">
          <p className="font-extrabold text-2xl">
            <span className="text-orange-500">Recipe</span>Hub
          </p>
          <p className="text-xs text-default-400 font-medium mt-1 uppercase tracking-wider">
             {role} Dashboard
          </p>
        </div>
        <NavLinks />
      </aside>

      <Drawer isOpen={open} onOpenChange={setOpen} placement="left" size="xs">
        <DrawerContent className="p-2">
          {() => (
            <>
              <DrawerHeader className="border-b border-divider pb-4">
                <p className="font-extrabold text-xl">
                  <span className="text-orange-500">Recipe</span>Hub
                </p>
              </DrawerHeader>
              <DrawerBody className="pt-4 px-1">
                <NavLinks />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}