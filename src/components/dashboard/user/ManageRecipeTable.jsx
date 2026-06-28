'use client';

import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

const ManageRecipeTable = ({ recipes = [], onEdit, onDelete }) => {
  return (
    <div className="w-full bg-white dark:bg-black/10 border border-default-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left border-collapse ">
          <thead>
            <tr className="border-b border-gray-500 dark:border-white/10 bg-default-50/50 dark:bg-black">
              <th className="py-4 px-6 text-xs font-bold text-default-500 uppercase tracking-wider">
                Recipe
              </th>
              <th className="py-4 px-6 text-xs font-bold text-default-500 uppercase tracking-wider">
                Category
              </th>
              <th className="py-4 px-6 text-xs font-bold text-default-500 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="py-4 px-6 text-xs font-bold text-default-500 uppercase tracking-wider">
                Likes
              </th>
              <th className="py-4 px-6 text-xs font-bold text-default-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-4 px-6 text-xs font-bold text-default-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {recipes.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="py-8 text-center text-sm text-default-400 font-medium"
                >
                  No recipes found.
                </td>
              </tr>
            ) : (
              recipes.map(recipe => (
                <tr
                  key={recipe._id}
                  className="border-b border-default-100 dark:border-gray-600 dark:bg-black/10 hover:bg-default-50/50 dark:hover:bg-white/5 transition-colors duration-150 last:border-0"
                >
                  {/* Recipe Thumbnail & Info */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-default-100 relative border border-default-200 dark:border-white/10">
                        <Image
                          src={
                            recipe.image ||
                            recipe.imageUrl ||
                            '/recipe-placeholder.png'
                          }
                          fill
                          alt={recipe.title || 'Recipe Image'}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground line-clamp-1">
                          {recipe.title}
                        </span>
                        <span className="text-[11px] text-default-400 mt-0.5">
                          {recipe.createdAt
                            ? new Date(recipe.createdAt).toLocaleDateString(
                                'en-GB'
                              )
                            : '16/06/2026'}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category Pill */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-900/30">
                      {recipe.category || 'Breakfast'}
                    </span>
                  </td>

                  {/* Difficulty Pill */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 capitalize">
                      {recipe.difficulty || 'Hard'}
                    </span>
                  </td>

                  {/* Likes */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                      <span className="text-rose-500">❤️</span>
                      <span>{recipe.likesCount || 0}</span>
                    </div>
                  </td>

                  {/* Status Pill */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                      {recipe.status || 'Regular'}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/recipes/${recipe?._id}`}
                        className="w-full sm:w-auto"
                      >
                        <Button
                          variant="outline"
                          size="md"
                          className="font-bold rounded-xl gap-2 w-full"
                        >
                          View Details
                        </Button>
                      </Link>
                      <button
                        onClick={() => onEdit(recipe._id)}
                        className="px-3 py-1.5 text-xs font-bold rounded-lg bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950/30 dark:hover:bg-yellow-950/60 text-yellow-500 border border-yellow-200/40 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(recipe._id)}
                        className="px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-950/60 text-rose-500 border border-rose-200/40 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRecipeTable;
