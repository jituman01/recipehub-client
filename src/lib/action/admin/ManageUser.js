"use server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAllUsersAction = async () => {
    const res = await fetch(`${baseUrl}/admin/users`, { cache: 'no-store' });
    if (res.ok) return await res.json();
    return { success: false, data: [] };
};

export const toggleUserStatusAction = async (userId, isBlocked) => {
    const res = await fetch(`${baseUrl}/admin/users/${userId}/toggle-status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBlocked })
    });
    if (res.ok) return await res.json();
    return { success: false, message: "Failed to update user status" };
};