export const fetchPurchasedRecipesAction = async (userId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/purchased-recipes?userId=${userId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
    });
    
    if (res.ok) {
        return await res.json();
    }
    return [];
};