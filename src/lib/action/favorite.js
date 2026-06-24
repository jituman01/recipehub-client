"use server"


const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;


export const addToFavoriteAction = async (userId, userEmail, recipeId) => {
    const response = await fetch(`${baseUrl}/user/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        userEmail,
        recipeId,
      }),
    });

    const data = await response.json();
    return data;

};




export const fetchFavoriteRecipesAction = async (userId) => {
    const res = await fetch(`${baseUrl}/user/favorites?userId=${userId}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json" 
        }
    });
    
    if (res.ok) {
        return await res.json();
    }
    
    return [];
};


export const removeFavoriteRecipeAction = async (userId, recipeId) => {

    const res = await fetch(`${baseUrl}/favorites/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, recipeId }),
    });

    if (res.ok) return await res.json();
    return { success: false, message: "Failed to remove favorite" };

};