'use client';

import { useEffect, useState } from 'react';
import { Button, Card } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { fetchFavoriteRecipesAction, removeFavoriteRecipeAction } from '@/lib/action/favorite';

const MyFavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const currentUserId = user?.id || user?._id;

  const loadFavoriteRecipes = async () => {
    if (!currentUserId) return;
    const data = await fetchFavoriteRecipesAction(currentUserId);
    setFavoriteRecipes(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (currentUserId) {
      loadFavoriteRecipes();
    }
  }, [currentUserId]);

  const handleRemoveFavorite = async (recipeId) => {
    if (!currentUserId || !recipeId) return;


    setRemovingId(recipeId);

    const result = await removeFavoriteRecipeAction(currentUserId, recipeId);

    if (result.success) {
      setFavoriteRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
    } 
    setRemovingId(null);
  };

  return (
    <div className="space-y-6 pb-10 mt-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground">
          My Favorite Recipes
        </h1>
        <p className="text-sm text-default-400">
          Your personal collection of recipes you loved most
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-default-500 font-medium">
          Loading favorites...
        </div>
      ) : favoriteRecipes.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-divider rounded-xl text-default-400">
          No favorite recipes added yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteRecipes.map((recipe) => (
            <Card 
              key={recipe._id} 
              className="border border-default-200/60 bg-background/60 backdrop-blur-md shadow-sm overflow-hidden flex flex-col justify-between"
              radius="lg"
            >
              {/* img */}
              <div className="w-full h-48 overflow-hidden border-b border-divider bg-default-100">
                <img
                  src={recipe.image || recipe.recipeImage || "/placeholder.jpg"}
                  alt={recipe.recipeName}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-base text-orange-500 line-clamp-1">
                    {recipe.recipeName}
                  </h3>
                  
                  <div className="flex items-center gap-1 mt-1.5 font-bold text-sm">
                    <p>Total Like:</p>
                    <Heart className='text-red-500' size={14} fill="currentColor" />
                    <span>{recipe.likesCount || 0}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <Link href={`/recipes/${recipe._id}`} className="flex-1">
                    <Button
                      size="md"
                      className="w-full font-bold bg-neutral-900 dark:bg-zinc-200 text-white dark:text-black rounded-xl"
                    >
                      View Details
                    </Button>
                  </Link>
                  
                  <Button
                    size="md"
                    variant="flat"
                    color="danger"
                    isLoading={removingId === recipe._id}
                    onClick={() => handleRemoveFavorite(recipe._id)}
                    className="font-bold rounded-xl bg-rose-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavoritesPage;