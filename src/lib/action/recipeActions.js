export const fetchMyRecipesAction = async (userId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/my-recipes?userId=${userId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
    });
    
    if (res.ok) {
        return await res.json();
    }
    return [];
};

export const updateRecipeAction = async (recipeId, updatedData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/${recipeId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
    });

    const data = await res.json();
    return { ok: res.ok, data };
};

export const deleteRecipeAction = async (recipeId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/${recipeId}`, {
        method: "DELETE",
        credentials: "include"
    });

    const data = await res.json();
    return { ok: res.ok, data };
};