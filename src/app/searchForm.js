"use client";
import styles from './page.module.css'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SearchForm() {
  const [ingredient, setIngredient] = useState("");
  const [category, setCategory] = useState("");
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async (e) => {
    e.preventDefault();
    setRecipes([]);

    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?`;
    if (ingredient) {
      url += `i=${ingredient}`;
    } else if (category) {
      url += `c=${category}`;
    } else {
      throw new Error ('Please provide either ingredient or category.');
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    if (data.meals === null) {
      throw new Error(`No meals found with ${ingredient}.`);
    }
    setRecipes(data.meals);
  };

  const handleIngredientChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    setIngredient("");
    setCategory("");
  }, [recipes]);

  return (
    <div>
      <div className={styles.searchBar}>
        <form onSubmit={fetchRecipes} className="form-inline my-2 my-lg-0">
          <label htmlFor="ingredient">Ingredient</label>
          <input
            id="ingredient"
            name="ingredient"
            type="text"
            placeholder="Enter an Ingredient"
            value={ingredient}
            onChange={handleIngredientChange}
            className='form-control mr-sm-2'
          />

          {/* <label htmlFor='category'>Category</label>
          <select
            id='category'

            name='category'
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Select a Category</option>
            <option value="Beef">Beef</option>
            <option value="Chicken">Chicken</option>
            <option value="Seafood">Seafood</option>
          </select> */}

          <button type="submit">Search</button>
        </form>

      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} style={{ margin: "10px", width: "30%" }}>
            <h2>{recipe.strMeal}</h2>
            <Link href={`/recipes/${recipe.idMeal}`}>              
                <Image
                  src={recipe.strMealThumb}
                  width={200}
                  height={200}
                  alt={`Picture of ${recipe.strMeal}`}
                />              
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
