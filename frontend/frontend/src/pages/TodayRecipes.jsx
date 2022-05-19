import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getRecipesByIngredients, getIngredientsList } from "@services/api.js";

import Loader from "@components/Loader";

export default function BestRecipes() {
  const [isRecipesLoading, setIsRecipesLoading] = useState(true);

  const [recipes, setRecipes] = useState([]);
  const [getRandom, setGetRandom] = useState(false);

  const random = true;

  function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(async () => {
    setIsRecipesLoading(true);

    const ingredientList = await getIngredientsList();

    const randomIndex = getRandomIndex(ingredientList.length);
    const randomIngredient = [ingredientList[randomIndex].name];

    const result = await getRecipesByIngredients(randomIngredient, random);

    setRecipes(result);

    setIsRecipesLoading(false);
    setGetRandom(false);
  }, [getRandom]);

  if (isRecipesLoading) {
    return <Loader />;
  }

  return (
    <div className="my-24 min-h-screen">
      <h1 className="text-4xl dark:text-white title-font text-gray-900 text-center text-mada">
        Discover our <span className="text-atma font-bold"> new recipes!</span>
      </h1>
      <button
        type="button"
        className="flex text-xl font-medium text-mada dark:text-white underline hover:font-bold decoration-[#8ddc93] dark:decoration-[#ffdb20] decoration-2 mx-auto"
        onClick={() => setGetRandom(true)}
      >
        Get some more!
      </button>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto mb-20">
          <div className="flex flex-wrap -m-4 justify-center">
            {recipes.slice(0, 6).map((recipe) => (
              <div
                key={recipe.recipe.uri.split("_")[1]}
                className="lg:w-1/4 p-4 w-1/3 shadow-lg shadow-gray-400 m-4 rounded-lg"
              >
                <div className="block relative h-48 rounded overflow-hidden">
                  <Link to={`/recipe?id=${recipe.recipe.uri.split("_")[1]}`}>
                    <img
                      alt={recipe.recipe.label}
                      className="object-cover object-center w-full h-full block bg-gradient-to-br from-[#78B07C] to-[#ffdb20] p-2"
                      src={recipe.recipe.image}
                    />
                  </Link>
                </div>
                <div className="mt-4">
                  <h3 className="text-xs tracking-widest title-font mb-1 capitalize dark:text-white font-bold text-mada">
                    {recipe.recipe.label}
                  </h3>
                  <p className="text-gray-900 text-xl  capitalize dark:text-white font-bold text-atma text-gradient">
                    {recipe.recipe.cuisineType}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
