'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@heroui/react';
import { Users, BookOpen, Crown, AlertTriangle } from 'lucide-react';
import { getAdminStatsAction } from '@/lib/action/admin/adminAction';

const AdminOverviewPage = () => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const result = await getAdminStatsAction();
      if (result.success) {
        setStatsData(result.data);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 pb-10 mt-6 max-w-7xl mx-auto px-4 animate-pulse">
        <div className="space-y-2">
          <div className="h-7 w-44 bg-default-200 dark:bg-zinc-800 rounded-xl"></div>
          <div className="h-4 w-72 bg-default-100 dark:bg-zinc-900 rounded-lg"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border border-default-200/60 bg-background/60 p-5 h-32" radius="xl"></Card>
          ))}
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: statsData?.totalUsers || 0,
      icon: <Users size={24} className="text-blue-500" />,
      bg: "",
    },
    {
      title: "Total Recipes",
      value: statsData?.totalRecipes || 0,
      icon: <BookOpen size={24} className="text-emerald-500" />,
      bg: "bg-",
    },
    {
      title: "Premium Members",
      value: statsData?.totalPremium || 0,
      icon: <Crown size={24} className="text-amber-500" />,
      bg: "b",
    },
    {
      title: "Total Reports",
      value: statsData?.totalReports || 0,
      icon: <AlertTriangle size={24} className="text-rose-500" />,
      bg: "",
    },
  ];

  return (
    <div className="space-y-6 pb-10 mt-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground">
          Admin Overview
        </h1>
        <p className="text-sm text-default-400">
          Real-time summary of RecipeHub statistics
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className="border border-default-200/60 bg-background/60 backdrop-blur-md p-5 shadow-sm"
            radius="xl"
          >
            <div className={`p-3 rounded-xl ${stat.bg} flex items-center justify-center`}>
                {stat.icon}
              </div>
            <div className="flex items-center justify-center">
              <div className="space-y-1">
                <p className="text-xs font-bold text-default-400 uppercase tracking-wider">
                  {stat.title}
                </p>
                <h2 className="text-3xl flex items-center justify-center font-black tracking-tight text-foreground">
                  {stat.value}
                </h2>
              </div>
              
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminOverviewPage;