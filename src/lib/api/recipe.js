import { authClient } from "../auth-client";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const addRecipe = async (recipe) => {
  const { data: token } = await authClient.token();
  console.log(token.token);
  

  const res = await fetch(`${baseUrl}/user/recipes`,
    {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        authorization: `Bearer ${token?.token}`
      },
      body: JSON.stringify(recipe),
    });
  
  const data = await res.json();
  return data;
  
};


export const getAllRecipes = async (search, category, page) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/recipes?search=${search}&category=${category}&page=${page}`;
  
  const res = await fetch(url, {
    cache: 'no-store',
  });

  if (!res.ok) return { data: [], totalPage: 0 };
  return res.json();
};


export const getRecipeById = async(id) =>{
  const res = await fetch(`${baseUrl}/recipe/${id}`);
  const data = await res.json();

  return data;
}