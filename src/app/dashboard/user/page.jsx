"use client"; 

import { useEffect, useState } from "react";
import { Button, Card } from "@heroui/react";
import { ChefHat, Crown, Heart, ThumbsUp } from "lucide-react"; 
import { authClient } from "@/lib/auth-client"; 
import Link from "next/link";

const UserOverviewPage = () => {

    const isPremium = false;

    const [stats, setStats] = useState({ totalRecipes: 0, totalFavorites: 0, totalLikesReceived: 0 });
    const [loading, setLoading] = useState(true);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        const fetchOverviewData = async () => {
            try {
                const currentUserId = user?.id || user?._id; 

                if (!currentUserId) return; 

                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/overview?userId=${currentUserId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        setStats(data.stats);
                    }
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };

        if (user?.id || user?._id) {
            fetchOverviewData();
        }
    }, [user]);

    return (
        <div className="space-y-6 mt-6 bg-transparent text-foreground">
            <h1 className="text-2xl font-black tracking-tight">My Overview Page</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Total Recipes Card */}
                <Card className="glass border-default-200/50 bg-background/60 backdrop-blur-md shadow-sm" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-default-500 text-xs font-bold uppercase tracking-wider">Total Recipes</span>
                            <h2 className="text-3xl font-extrabold text-orange-500">
                                {loading ? "..." : stats.totalRecipes}
                            </h2>
                        </div>
                        <div className="p-3.5 bg-orange-500/10 text-orange-500 rounded-2xl border border-orange-500/20">
                            <ChefHat size={24} />
                        </div>
                    </div>
                </Card>

                {/* Total Favorites Card */}
                <Card className="glass border-default-200/50 bg-background/60 backdrop-blur-md shadow-sm" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-default-500 text-xs font-bold uppercase tracking-wider">Total Favorites</span>
                            <h2 className="text-3xl font-extrabold text-foreground dark:text-white">
                                {loading ? "..." : stats.totalFavorites}
                            </h2>
                        </div>
                        <div className="p-3.5 bg-rose-500/10 text-rose-500 rounded-2xl border border-rose-500/20">
                            <Heart size={24} />
                        </div>
                    </div>
                </Card>

                {/* Likes Received Card */}
                <Card className="glass border-default-200/50 bg-background/60 backdrop-blur-md shadow-sm" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-default-500 text-xs font-bold uppercase tracking-wider">Likes Received</span>
                            <h2 className="text-3xl font-extrabold text-foreground dark:text-white">
                                {loading ? "..." : stats.totalLikesReceived}
                            </h2>
                        </div>
                        <div className="p-3.5 bg-blue-500/10 text-blue-500 rounded-2xl border border-blue-500/20">
                            <ThumbsUp size={24} />
                        </div>
                    </div>
                </Card>

            </div>

            {!isPremium && (
                <Card className="border border-orange-500/20 bg-gradient-to-r from-orange-500/5 via-amber-600/5 to-orange-500/5 dark:to-transparent relative overflow-hidden shadow-sm" radius="lg">
                    <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-foreground dark:text-white flex items-center gap-2">
                                <Crown className="text-orange-500 dark:text-orange-400 w-5 h-5" /> Unlock Unlimited Recipe Publishing
                            </h3>
                            <p className="text-default-500 dark:text-slate-400 text-xs max-w-xl leading-relaxed">
                                Free tier accounts are limited to <strong>2 recipes</strong>. Upgrade to our Pro Package to share unlimited culinary creations with the community.
                            </p>
                        </div>
                        <Link href='/pricing'>
                        <Button className="bg-orange-500 hover:bg-orange-600 dark:hover:bg-orange-400 text-white dark:text-white font-bold h-11 px-6 shadow-md shadow-orange-500/20 shrink-0" radius="lg">
                            Upgrade to Pro
                            </Button>
                        </Link>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default UserOverviewPage;