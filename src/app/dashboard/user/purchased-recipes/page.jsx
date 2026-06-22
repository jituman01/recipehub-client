"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";
import { fetchPurchasedRecipesAction } from "@/lib/action/purchaseRecipe";

const MyPurchasedRecipePage = () => {
    const [purchasedRecipes, setPurchasedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const loadPurchasedRecipes = async () => {
        const currentUserId = user?.id || user?._id;
        if (!currentUserId) return;

        const data = await fetchPurchasedRecipesAction(currentUserId);
        setPurchasedRecipes(data || []);
        setLoading(false);
    };

    useEffect(() => {
        if (user?.id || user?._id) {
            loadPurchasedRecipes();
        }
    }, [user]);


    return (
        <div className="space-y-6 pb-10">
            <div>
                <h1 className="text-2xl font-black tracking-tight">My Purchased Recipes</h1>
                <p className="text-sm text-default-400">Premium recipes you have successfully unlocked</p>
            </div>
            
            
                <div className="w-full overflow-x-auto rounded-xl border border-divider bg-background shadow-sm">
                    <table className="w-full min-w-[800px] text-left border-collapse">
                        <thead>
                            <tr className="border-b border-divider text-[11px] font-bold text-default-400 uppercase bg-default-50/50">
                                <th className="py-4 px-6">Recipe</th>
                                <th className="py-4 px-6">Author</th>
                                <th className="py-4 px-6">Amount Paid</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-divider">
                            {purchasedRecipes.map((recipe) => (
                                <tr key={recipe._id} className="text-sm hover:bg-default-50/30 transition-colors">
                                    <td className="py-4 px-6 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-divider shrink-0">
                                            <img
                                                src={recipe.image}
                                                alt={recipe.recipeName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <span className="font-bold text-slate-800 dark:text-zinc-200">
                                            {recipe.recipeName}
                                        </span>
                                    </td>
                                    
                                    <td className="py-4 px-6 text-default-500 font-medium">
                                        {recipe.authorName}
                                    </td>
                                    
                                    <td className="py-4 px-6 font-black text-slate-900 dark:text-zinc-100">
                                        {recipe.amount ? `$${recipe.amount}` : "$4.99"}
                                    </td>
                                    
                      

                                    <td className="py-4 px-6 text-right">
                                        <Button
                                            size="sm"
                                            variant="bordered"
                                            className="font-bold text-xs border-default-200 bg-background transition-all rounded-lg hover:bg-default-100"
                                            
                                        >
                                            View Recipe
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            
        </div>
    );
};

export default MyPurchasedRecipePage;