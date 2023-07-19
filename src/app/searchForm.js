'use client'
import { useState } from "react";
import Image from "next/image";

export default function SearchForm() {
	const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);

	const fetchRecipes = async (e) => {
		setRecipes([]);
    e.preventDefault();
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
		if (!response.ok) {
			throw new Error('Failed to fetch data')
		}
    const data = await response.json();
		if (data.meals === null) {
			throw new Error(`No meals found with ${ingredient}.`)
		}
    setRecipes(data.meals);
  };
	
	const handleIngredientChange = (e) => {
		setIngredient(e.target.value);
	};

  return (
		<div style={{position: 'relative'}}>
		<div>
			<form onSubmit={fetchRecipes}>
				<label htmlFor="ingredient">Ingredient</label>
				<input 
				id="ingredient"
				name="ingredient"
				type="text"
				placeholder="Enter an Ingredient"
				value={ingredient}
				onChange={handleIngredientChange}
				/>
				<button type='submit'>Search</button>
			</form>
		</div>
		<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
				{recipes.map (recipe => (
				<div key={recipe.idMeal} style={{margin: '10px', width: '30%'}}>
				<h2>{recipe.strMeal}</h2>
				<Image
					src= {recipe.strMealThumb}
					width={200}
					height={200}
					alt= {`Picture of ${recipe.strMeal}`}				
				/>
				</div>
				))}
		</div>
		</div>
	)
}