'use client';

import React, { useState } from 'react';
import { Button, Input, Label, TextField } from '@heroui/react';
import { Plus, ArrowUpFromLine, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { imageUpload } from '@/lib/imageUpload';
import { addRecipe } from '@/lib/api/recipe';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function AddRecipeForm() {
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(session,user);
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    // console.log('formData',formData);
    const data = Object.fromEntries(formData.entries());
    // console.log("Recipe Data Submitting:", data);
    const image = await imageUpload(data.image);
    // console.log('image',image);

    const recipe = {
      ...data,
      image: image.url,
      authorName: user?.name,
    };

    const result = await addRecipe(recipe);
    // console.log(result);
    if (result && result.success === false) {
      setLoading(false);
      toast.error(result.msg || 'Free limit exceeded!');

      router.push('/pricing');
      return;
    }

    setTimeout(() => {
      setLoading(false);
      toast.success('Recipe added successfully!');
      e.target.reset();
    });
  };

  return (
    <div className="w-full bg-background border border-divider rounded-2xl p-4 sm:p-6 shadow-sm">
      <div className="border-b border-divider pb-4 mb-5">
        <h3 className="text-lg font-bold flex items-center gap-2 text-yellow-500">
          <Plus className="text-yellow-500 w-5 h-5" /> Add New Recipe
        </h3>
        <p className="text-xs text-default-400 mt-0.5">
          Fill out the form fields to create your recipe.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Recipe Name */}
          <TextField
            className="w-full"
            name="recipeName"
            isRequired
            variant="secondary"
          >
            <Label className="text-xs font-semibold text-yellow-500">
              Recipe Name
            </Label>
            <Input
              className="focus:outline-none focus:border-yellow-500"
              placeholder="e.g., Spicy Mustard Beef"
            />
          </TextField>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-yellow-500">
              Category
            </label>
            <select
              name="category"
              required
              className="w-full bg-default-100 border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-yellow-500 transition-colors cursor-pointer"
            >
              <option className="text-yellow-500" value="">
                Select Category
              </option>
              <option value="beef">Beef</option>
              <option value="chicken">Chicken</option>
              <option value="mutton">Mutton</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Cuisine Type */}
          <TextField
            className="w-full"
            name="cuisineType"
            isRequired
            variant="secondary"
          >
            <Label className="text-xs font-semibold text-yellow-500">
              Cuisine Type
            </Label>
            <Input
              className="focus:outline-none focus:border-yellow-500"
              placeholder="e.g., Bangladeshi, Indian"
            />
          </TextField>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-yellow-500">
              Upload Recipe Image
            </label>
            <label className="flex flex-col items-center justify-center w-full h-full min-h-[100px] border-2 border-dashed border-divider rounded-xl cursor-pointer bg-default-50 hover:bg-default-100 transition-all overflow-hidden relative group">
              <ArrowUpFromLine size={16} className="text-yellow-500" />
              <span>Input Recipe Image</span>
              <input type="file" name="image" />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Difficulty Level */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-yellow-500">
              Difficulty Level
            </label>
            <select
              name="difficulty"
              required
              className="w-full bg-default-100 border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-yellow-500 transition-colors"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Preparation Time */}
          <TextField
            className="w-full"
            name="prepTime"
            isRequired
            variant="secondary"
          >
            <Label className="text-xs font-semibold text-yellow-500">
              Preparation Time
            </Label>
            <Input placeholder="e.g., 45 mins" />
          </TextField>
        </div>

        <div className="space-y-4">
          {/* Ingredients */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-yellow-500">
              Ingredients
            </label>
            <textarea
              name="ingredients"
              required
              rows={3}
              placeholder="500g Beef&#10;2 tbsp Mustard Oil"
              className="w-full bg-default-100 border rounded-xl p-3 text-sm text-foreground focus:outline-none focus:border-yellow-500 transition-colors resize-y min-h-[80px]"
            />
          </div>

          {/* Instructions */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-yellow-500">
              Instructions / Cooking Steps
            </label>
            <textarea
              name="instructions"
              required
              rows={3}
              placeholder="Step 1: Marinate meat...&#10;Step 2: Cook nicely..."
              className="w-full bg-default-100 border rounded-xl p-3 text-sm text-foreground focus:outline-none focus:border-yellow-500 transition-colors resize-y min-h-[80px]"
            />
          </div>
        </div>

        <div className="border-t border-divider pt-4 flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Publish Recipe'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
