"use client"
import { Button, Input } from '@heroui/react';
import { redirect } from 'next/navigation';
import React from 'react';

const SearchRecipe = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("searching...", e.target.search.value);
    
    redirect(`/recipes?search=${e.target.search.value}`)
  
}
  return (
    <div>
      <form onSubmit={onSubmit} >
        <Input className={'lg:w-sm  h-12 border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-orange-500'} name='search' type='search' placeholder='Search Recipe'></Input>
      <Button type='submit' className={'ml-2 bg-orange-500 '}>Search</Button>
      </form>
    </div>
  );
};

export default SearchRecipe;