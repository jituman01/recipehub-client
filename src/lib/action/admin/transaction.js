"use server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAllTransactionsAction = async () => {

    const res = await fetch(`${baseUrl}/admin/transactions`, { 
      cache: 'no-store'
    });

    if (res.ok) {
      return await res.json();
    }
    
    return { success: false, message: "Failed to fetch transactions from server", data: [] };
  
};