"use server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAllRecipesAction = async () => {
    const res = await fetch(`${baseUrl}/admin/recipes`, { cache: 'no-store' });
    if (res.ok) return await res.json();
    return { success: false, data: [] };
};



export const deleteRecipeAction = async (id) => {
    const res = await fetch(`${baseUrl}/admin/recipes/${id}`, { method: "DELETE" });
    if (res.ok) return await res.json();
    return { success: false, message: "Failed to delete recipe" };
};


export const toggleFeaturedAction = async (id, isFeatured) => {
    const res = await fetch(`${baseUrl}/admin/recipes/${id}/toggle-featured`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured })
    });
    if (res.ok) return await res.json();
    return { success: false, message: "Failed to update featured status" };
};