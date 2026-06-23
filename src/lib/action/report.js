"use server"

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const submitRecipeReportAction = async (reportData) => {

    const response = await fetch(`${baseUrl}/user/reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reportData),
    });

    const data = await response.json();
    return data;

};