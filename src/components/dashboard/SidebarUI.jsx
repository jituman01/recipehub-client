"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";

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
  const pathname = usePathname();

  const dashboardItems = {
    user: [
      { icon: Home, label: "Overview", link: "/dashboard/user" },
      { icon: BookAIcon, label: "My Recipes", link: "/dashboard/user/my-recipes" },
      { icon: Plus, label: "Add Recipe", link: "/dashboard/user/add-recipe" },
      { icon: Heart, label: "My Favorites", link: "/dashboard/user/my-favourites" },
      { icon: ShoppingCart, label: "My Purchased Recipes", link: "/dashboard/user/purchased-recipes" },
      { icon: User, label: "Profile", link: "/dashboard/user/profile" },
    ],
    admin: [
      { icon: Home, label: "Overview", link: "/dashboard/admin" },
      { icon: Users2, label: "Manage Users", link: "/dashboard/manage-users" },
      { icon: BookAIcon, label: "Manage Recipes", link: "/dashboard/manage-recipes" },
      { icon: User, label: "Recipe Reports", link: "/dashboard/recipe-reports" },
      { icon: FileText, label: "Transactions", link: "/dashboard/transactions" },
    ],
  };

  const navItems = dashboardItems[role] || dashboardItems.user;

  const NavLinks = () => (
    <nav className="flex flex-col gap-1.5 w-full">
      {navItems.map((item) => {
        const isActive = pathname === item.link;
        return (
          <Link
            key={item.label}
            href={item.link}
            className="w-full"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-orange-500/10 text-orange-500 border-l-3 border-orange-500 rounded-l-none pl-3"
                  : "text-default-700 hover:bg-default-100 hover:text-orange-500"
              }`}
            >
              <item.icon
                size={20}
                className={`flex-shrink-0 transition-colors ${
                  isActive ? "text-orange-500" : "text-default-500"
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-divider z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div>
            <p className="font-extrabold text-lg">
              <span className="text-orange-500">Recipe</span>Hub
            </p>
            <p className="text-[10px] text-default-400 uppercase">
              {role} Dashboard
            </p>
          </div>
          <Button isIconOnly variant="light" onPress={() => setOpen(true)}>
            <Bars className="w-6 h-6" />
          </Button>
        </div>
      </header>

      <aside className="hidden lg:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-72 flex-col border-r border-divider bg-background p-6 z-40 shrink-0">
        <div className="border-b border-divider pb-5 mb-5">
          
          <p className="text-xs text-default-400 font-bold mt-1 uppercase tracking-wider">
            {role} Dashboard
          </p>
        </div>
        <NavLinks />
      </aside>

      <Drawer isOpen={open} onOpenChange={setOpen}>
        <Drawer.Backdrop>
          <Drawer.Content placement="left" className="max-w-[280px] bg-background">
            <Drawer.Dialog className="h-full flex flex-col p-6">
              <Drawer.CloseTrigger className="absolute right-4 top-4" />
              <Drawer.Header className="border-b border-divider pb-4 mb-4">
                <Drawer.Heading className="text-left">
                  <p className="font-extrabold text-xl">
                    <span className="text-orange-500">Recipe</span>Hub
                  </p>
                  <p className="text-[10px] text-default-400 uppercase mt-0.5">
                    {role} Dashboard
                  </p>
                </Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body className="px-0 py-2 overflow-y-auto flex-1">
                <NavLinks />
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}