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