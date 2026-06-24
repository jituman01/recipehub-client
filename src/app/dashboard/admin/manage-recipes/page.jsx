'use client';

import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableScrollContainer, 
  TableContent, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Avatar, 
  Chip, 
  Button, 
  Card 
} from '@heroui/react'; 
import { Star, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAllRecipesAction, deleteRecipeAction, toggleFeaturedAction } from '@/lib/action/admin/manageRecipe';

const ManageRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    const result = await getAllRecipesAction();
    if (result.success) {
      setRecipes(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;
    
    const result = await deleteRecipeAction(id);
    if (result.success) {
      toast.success(result.message);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
    } else {
      toast.error(result.message);
    }
  };

  const handleToggleFeatured = async (id, currentFeaturedStatus) => {
    const newStatus = !currentFeaturedStatus;
    const result = await toggleFeaturedAction(id, newStatus);
    
    if (result.success) {
      toast.success(result.message);
      setRecipes((prev) =>
        prev.map((recipe) =>
          recipe._id === id ? { ...recipe, isFeatured: newStatus } : recipe
        )
      );
    } else {
      toast.error(result.message);
    }
  };


  return (
    <div className="space-y-6 pb-10 mt-6 max-w-7xl mx-auto px-4">
      {/* header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          Manage Recipes 
        </h1>
        <p className="text-sm text-default-400">
          Monitor all recipes, toggle featured status, or remove items.
        </p>
      </div>

      <Card className="border border-default-200/60 bg-background/60 backdrop-blur-md shadow-sm p-2" radius="xl">
        <Table className="p-0 bg-transparent shadow-none">
          <TableScrollContainer>
            <TableContent aria-label="Recipe management table" className="min-w-[700px]">
              
              <TableHeader>
                <TableColumn isRowHeader>RECIPE</TableColumn>
                <TableColumn>AUTHOR</TableColumn>
                <TableColumn>CATEGORY</TableColumn>
                <TableColumn>FEATURED</TableColumn>
                <TableColumn className="text-right">ACTIONS</TableColumn>
              </TableHeader>

              <TableBody emptyContent={"No recipes found"}>
                {recipes.map((item) => (
                  <TableRow key={item._id} className="border-b border-default-100 last:border-none">
                    
                    <TableCell>
                      <div className="flex items-center gap-3 py-1">
                        <Avatar radius="md" size="md" className="w-12 h-12 min-w-12 border border-default-200 overflow-hidden">
                          <img 
                            src={item.image || item.recipeImage} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=150&h=150&q=80";
                            }}
                          />
                        </Avatar>
                        
                      </div>
                    </TableCell>

                    <TableCell className="font-medium text-sm text-default-600">
                      {item.authorName}
                    </TableCell>

                    <TableCell>
                      <span className="text-xs bg-default-100 px-2 py-1 rounded-md font-bold text-default-600 capitalize">
                        {item.category}
                      </span>
                    </TableCell>
                    
                    <TableCell>
                      <Chip
                        className="capitalize border-none text-black dark:text-white text-xs px-2 shadow-sm"
                        color={item.isFeatured ? 'warning' : 'warning'}
                        size="sm"
                        variant="secondary"
                      >
                        {item.isFeatured ? '🌟Featured' : 'Not Featured'}
                      </Chip>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-5">
                        <Button
                          size="sm"
                          isIconOnly
                          radius="md"
                          className={`font-bold ${
                            item.isFeatured 
                              ? "bg-amber-100 text-amber-500 dark:bg-amber-950/40 dark:text-amber-400" 
                              : "bg-transparent text-yellow-500"
                          }`}
                          onClick={() => handleToggleFeatured(item._id, item.isFeatured)}
                          title="Toggle Featured"
                        >
                          <Star size={16} fill={item.isFeatured ? "currentColor" : "none"} />
                        </Button>

                        <Button
                          size="sm"
                          isIconOnly
                          radius="md"
                          className="bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 font-bold"
                          onClick={() => handleDelete(item._id)}
                          title="Delete Recipe"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>

            </TableContent>
          </TableScrollContainer>
        </Table>
      </Card>
    </div>
  );
};

export default ManageRecipe;