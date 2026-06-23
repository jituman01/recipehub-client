"use server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const updateProfileAction = async (userId, profileData) => {
    const res = await fetch(`${baseUrl}/users/${userId}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(profileData) 
    });
    
    if (res.ok) {
        return await res.json();
    }
    
    return { success: false, message: "Failed to update profile" };
};