'use client'

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";

export default function Recipe() {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch details");
      }
      const data = await res.json();
      console.log(data);
      setRecipe(data.meals[0]);
    };

    if (id) {
      fetchRecipeDetails();
    }
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>{recipe.strMeal} - Recipe Details</title>
      </Head>
      <p>{recipe.strInstructions}</p>
    </div>
  );
}
