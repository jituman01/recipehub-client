"use server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAdminStatsAction = async () => {
    const res = await fetch(`${baseUrl}/admin/overview-stats`, {
        cache: 'no-store'
    });
    if (res.ok) {
        return await res.json();
    }
    return { success: false, data: { totalUsers: 0, totalRecipes: 0, totalPremium: 0, totalReports: 0 } };
};