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
        <Input name='search' type='search' placeholder='Search Recipe'></Input>
      <Button type='submit' size='sm' className={'ml-2'}>Search</Button>
      </form>
    </div>
  );
};

export default SearchRecipe;