"use server"; 

import { cookies } from "next/headers";

export const publishRecipe = async (recipeData) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, msg: "Unauthorized: No token found" };
    }

    const res = await fetch(`${baseUrl}/user/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recipeData),
    });

    const responseData = await res.json();

    if (res.status === 403) {
      return { success: false, limitReached: true, msg: responseData.msg };
    }

    if (res.ok && responseData.success) {
      return { success: true, data: responseData.result };
    }
    
    return { success: false, msg: responseData.msg || "Failed to publish recipe" };
  } catch (error) {
    console.error("Error in publishRecipe action:", error);
    return { success: false, msg: "Internal Server Error" };
  }
};




