"use server"


const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const toggleLikeAction = async (recipeId) => {

    const response = await fetch(`${baseUrl}/recipes/${recipeId}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
};