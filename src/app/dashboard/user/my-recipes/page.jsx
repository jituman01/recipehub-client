"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import ManageRecipeTable from "@/components/dashboard/user/ManageRecipeTable";
import EditRecipeModal from "@/components/dashboard/user/EditRecipeModal";
import { fetchMyRecipesAction, updateRecipeAction, deleteRecipeAction } from "@/lib/action/recipeActions";

const MyRecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editRecipeData, setEditRecipeData] = useState({ id: "", title: "", category: "", cookingTime: "", difficulty: "easy" });
    const [updating, setUpdating] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const loadRecipes = async () => {
        const currentUserId = user?.id || user?._id;
        if (!currentUserId) return;

        const data = await fetchMyRecipesAction(currentUserId);
        setRecipes(data);
        setLoading(false);
    };

    useEffect(() => {
        if (user?.id) {
            loadRecipes();
        }
    }, [user]);

    const handleEditClick = (recipeId) => {
        const targetRecipe = recipes.find(r => r._id === recipeId);
        if (targetRecipe) {
            setEditRecipeData({
                id: targetRecipe._id,
                title: targetRecipe.title || targetRecipe.name || "",
                category: targetRecipe.category || "",
                cookingTime: targetRecipe.cookingTime || "",
                difficulty: targetRecipe.difficulty || "easy"
            });
            setIsModalOpen(true); 
        }
    };

    const handleUpdateSubmit = async () => {
        setUpdating(true);
        
        const { ok, data } = await updateRecipeAction(editRecipeData.id, editRecipeData);
        setUpdating(false);

        if (ok && data.success) {
            alert("Recipe updated successfully!");
            setIsModalOpen(false); 
            loadRecipes();
        } else {
            alert("Update failed");
        }
    };

    const handleDeleteRecipe = async (recipeId) => {
        const { ok, data } = await deleteRecipeAction(recipeId);
        
        if (ok && data.success) {
            setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
            alert("Deleted successfully!");
        } else {
            alert("Delete failed");
        }
    };

    return (
        <div className="space-y-6 pb-10">
            <div>
                <h1 className="text-2xl font-black tracking-tight">Manage My Recipes</h1>
                <p className="text-sm text-default-400">View, update, or remove your published culinary arts.</p>
            </div>
            
            <ManageRecipeTable 
                recipes={recipes} 
                onEdit={handleEditClick} 
                onDelete={handleDeleteRecipe} 
            />

            <EditRecipeModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editRecipeData={editRecipeData}
                setEditRecipeData={setEditRecipeData}
                onSave={handleUpdateSubmit}
                updating={updating}
            />
        </div>
    );
};

    export default MyRecipesPage;