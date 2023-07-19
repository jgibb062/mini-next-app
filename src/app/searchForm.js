'use client'
import { useState } from "react";

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
		<div>
		<div>
			<form onSubmit={fetchRecipes}>
				<label for="ingredient">Ingredient</label>
				<input 
				name="ingredient"
				type="text"
				placeholder="Enter an Ingredient"
				value={ingredient}
				onChange={handleIngredientChange}
				/>
				<button type='submit'>Search</button>
			</form>
		</div>
		<div>
			<ul>
				{recipes.map (recipe => (
				<li key={recipe.idMeal}>{recipe.strMeal}</li>
				))}
			</ul>
		</div>
		</div>
  )
}