"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bars } from "@gravity-ui/icons";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
} from "@heroui/react";

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
      {
        icon: BookAIcon,
        label: "My Recipes",
        link: "/dashboard/user/my-recipes",
      },
      {
        icon: Plus,
        label: "Add Recipe",
        link: "/dashboard/user/add-recipe",
      },
      {
        icon: Heart,
        label: "My Favorites",
        link: "/dashboard/favorites",
      },
      {
        icon: ShoppingCart,
        label: "My Purchased Recipes",
        link: "/dashboard/purchased-recipe",
      },
      {
        icon: User,
        label: "Profile",
        link: "/dashboard/profile",
      },
    ],

    admin: [
      { icon: Home, label: "Overview", link: "/dashboard/admin" },
      {
        icon: Users2,
        label: "Total Users",
        link: "/dashboard/total-users",
      },
      {
        icon: BookAIcon,
        label: "Total Recipes",
        link: "/dashboard/total-recipes",
      },
      {
        icon: User,
        label: "Total Premium Members",
        link: "/dashboard/total-premium-members",
      },
      {
        icon: FileText,
        label: "Total Reports",
        link: "/dashboard/total-reports",
      },
    ],
  };

  const navItems = dashboardItems[role] || dashboardItems.user;

  const NavLinks = () => (
    <nav className="flex flex-col gap-1.5 w-full">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.link}
          className="w-full"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-default-700 transition-all hover:bg-default-100 hover:text-orange-500"
          >
            <item.icon
              size={20}
              className="text-default-500 flex-shrink-0"
            />

            <span className="truncate">{item.label}</span>
          </button>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile Header */}
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

          <Button
            isIconOnly
            variant="light"
            onPress={() => setOpen(true)}
          >
            <Bars className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 flex-col border-r border-divider bg-background p-6 z-40">
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

      {/* Mobile Drawer */}
      <Drawer
        isOpen={open}
        onOpenChange={setOpen}
        placement="left"
        size="xs"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="border-b border-divider">
                <div>
                  <p className="font-extrabold text-xl">
                    <span className="text-orange-500">Recipe</span>Hub
                  </p>

                  <p className="text-[10px] text-default-400 uppercase">
                    {role} Dashboard
                  </p>
                </div>
              </DrawerHeader>

              <DrawerBody className="pt-4">
                <NavLinks />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}