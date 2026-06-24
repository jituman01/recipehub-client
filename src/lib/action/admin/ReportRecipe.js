"use server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAllReportsAction = async () => {
  const res = await fetch(`${baseUrl}/admin/reports`, { cache: 'no-store' });
  if (res.ok) return await res.json();
  return { success: false, data: [] };
};

export const removeRecipeAndReportAction = async (recipeId, reportId) => {
  const res = await fetch(`${baseUrl}/admin/reports/remove-recipe/${recipeId}/${reportId}`, {
    method: "DELETE"
  });
  if (res.ok) return await res.json();
  return { success: false, message: "Failed to remove recipe" };
};

export const dismissReportAction = async (reportId) => {
  const res = await fetch(`${baseUrl}/admin/reports/dismiss/${reportId}`, {
    method: "DELETE"
  });
  if (res.ok) return await res.json();
  return { success: false, message: "Failed to dismiss report" };
};