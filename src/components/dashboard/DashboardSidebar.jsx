'use client';

import React, { useState } from 'react';
import { Bars } from '@gravity-ui/icons';
import { Button, Drawer } from '@heroui/react';
import {
  BookAIcon,
  Heart,
  Home,
  Plus,
  ShoppingCart,
  User,
} from 'lucide-react';





export default function DashboardSidebar() {
  


  const dashboardItems = {
    "user": [
        {icon: Home,label: 'Overview',link:'/dashboard/user'},
        {icon: BookAIcon,label: 'My Recipes',link:'/dashboard/my-recipe'},
        {icon: Plus,label: 'Add Recipe',link:'/dashboard/add-recipe'},
        {icon: Heart,label: 'My Favorites',link:'/dashboard/favorites'},
        {icon: ShoppingCart,label: 'My Purchased Recipes',link:'/dashboard/purchased-recipe'},
        {icon: User,label: 'Profile',link:'/dashboard/profile'},
    ],

    "admin": [
      {icon: User,label: 'Total Users',link:'/dashboard/total-users'},
      {icon: User,label: 'Total Recipes',link:'/dashboard/total-recipes'},
      {icon: User,label: 'Total Premium Members',link:'/dashboard/total-premium-members'},
      {icon: User,label: 'Total Reports',link:'/dashboard/total-reports'},
    ]
  }



const navItems = [
  {
    icon: Home,label: 'Overview',
},
  {
    icon: BookAIcon,label: 'My Recipes',
  },
  {
    icon: Plus,label: 'Add Recipe',
  },
  {
    icon: Heart,label: 'My Favorites',
  },
  {
    icon: ShoppingCart,label: 'My Purchased Recipes',
  },
  {
    icon: User,label: 'Profile',
  },
];

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed left-4 top-4 z-50 lg:hidden">
        <Button
          isIconOnly
          variant="flat"
          onPress={() => setOpen(true)}
        >
          <Bars />
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden  w-72 shrink-0 border-r border-default-200 bg-content1 lg:flex lg:flex-col">
        <div className="border-b border-default-200 p-6">
          <p className="font-extrabold text-2xl "><span className="text-orange-500">Recipe</span>Hub</p>
          <p className="text-sm text-default-500">Private Dashboard</p>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-all hover:bg-default-100"
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="border-t border-default-200 p-4">
          <div className="rounded-xl bg-default-100 p-4">
            <h4 className="font-semibold">RecipeHub</h4>
            <p className="mt-1 text-xs text-default-500">
              Manage recipes, favorites and purchases.
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <Drawer isOpen={open} onOpenChange={setOpen}>
        <Drawer.Backdrop />
        <Drawer.Content placement="left" className="max-w-[300px]">
          <Drawer.Dialog>
            <Drawer.Header>
              <Drawer.Heading>RecipeHub</Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all hover:bg-default-100"
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>
    </>
  );
}