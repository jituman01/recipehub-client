"use client";

import { Button, Input } from "@heroui/react";

const EditRecipeModal = ({ isOpen, onClose, editRecipeData, setEditRecipeData, onSave, updating }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-white dark:bg-slate-950 rounded-2xl border border-default-200 dark:border-white/10 p-6 space-y-5 shadow-2xl">
                <div>
                    <h3 className="text-xl font-bold text-foreground">Update Recipe Details</h3>
                </div>
                <div className="space-y-4">
                    <Input 
                        label="Recipe Title" 
                        variant="bordered"
                        value={editRecipeData.title}
                        onChange={(e) => setEditRecipeData({ ...editRecipeData, title: e.target.value })}
                    />
                    <Input 
                        label="Category" 
                        variant="bordered"
                        value={editRecipeData.category}
                        onChange={(e) => setEditRecipeData({ ...editRecipeData, category: e.target.value })}
                    />
                    <Input 
                        label="Cooking Time (mins)" 
                        type="number"
                        variant="bordered"
                        value={editRecipeData.cookingTime}
                        onChange={(e) => setEditRecipeData({ ...editRecipeData, cookingTime: e.target.value })}
                    />
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-default-600 pl-1">Difficulty</label>
                        <select 
                            className="w-full h-12 px-3 rounded-xl border-2 border-default-200 bg-transparent text-sm font-medium dark:border-white/10 dark:bg-slate-900 text-foreground"
                            value={editRecipeData.difficulty}
                            onChange={(e) => setEditRecipeData({ ...editRecipeData, difficulty: e.target.value })}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                    <Button variant="flat" color="danger" onClick={onClose}>Cancel</Button>
                    <Button className="bg-orange-500 text-white font-bold" isLoading={updating} onClick={onSave}>Save Changes</Button>
                </div>
            </div>
        </div>
    );
};

export default EditRecipeModal;