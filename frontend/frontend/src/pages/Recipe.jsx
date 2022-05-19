import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

import Loader from "@components/Loader";

import uuid from "react-uuid";

import { getRecipeById } from "@services/api.js";

export default function Recipes() {
  const navigate = useNavigate();

  async function handleSubmit() {
    navigate(-1);
  }

  const [queryString] = useSearchParams();

  const [recipe, setRecipe] = useState({});
  const [isRecipesLoading, setIsRecipesLoading] = useState(true);

  useEffect(() => {
    (async function getRecipe() {
      setIsRecipesLoading(true);

      const id = queryString.get("id");
      const recipeId = await getRecipeById(id);

      setRecipe(recipeId);

      setIsRecipesLoading(false);
    })();
  }, []);

  if (isRecipesLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col w-3/5 m-auto mt-36 min-h-screen">
      <button
        type="button"
        onClick={() => handleSubmit()}
        className="mb-6 py-1 text-mada w-2/5 md:w-1/5 mx-auto border-2 rounded-3xl border-[#78B07C] dark:border-[#ffdb20] text-sm text-black dark:text-white text-center shadow-sm duration-700 ease-in-out hover:scale-105"
      >
        <span>
          <i className="fa-solid fa-angles-left pr-1" />
        </span>{" "}
        Back...
      </button>
      <a href={recipe.url} target="_blank" rel="noreferrer">
        <img
          src={recipe.image}
          alt=""
          style={{ height: 300, width: 300 }}
          className="mx-auto mb-12 p-2 rounded-[80px] bg-gradient-to-br from-[#78B07C] to-[#ffdb20] shadow-lg duration-700 ease-in-out hover:scale-105"
        />
      </a>
      <h1 className="mb-6 text-center text-3xl dark:text-white text-mada font-bold">
        {recipe.label}
      </h1>
      <div className="flex flex-row mb-4 mx-auto text-2xl text-[#8ddc93] dark:text-[#ffdb20]">
        <h3 className="text-center px-4 capitalize decoration-solid text-atma font-bold">
          {recipe.cuisineType}
        </h3>
        <h3 className="text-center px-4 capitalize decoration-solid text-atma font-bold">
          {recipe.mealType}
        </h3>
      </div>
      <div className="flex flex-row mx-auto mb-6">
        <div className="flex flex-col text-center px-4 mx-4">
          <i className="fa-solid fa-clock text-3xl text-gray-500 dark:text-white" />
          <p className="dark:text-white text-lg text-mada">
            {recipe.totalTime} Mins
          </p>
        </div>
        <div className="flex flex-col text-center px-4 mx-6">
          <i className="fa-solid fa-utensils text-3xl text-gray-500 dark:text-white" />
          <p className="dark:text-white text-lg text-mada">
            Serves {recipe.yield}
          </p>
        </div>
      </div>
      <div className="text-center text-mada dark:text-white mb-36">
        <h3 className="text-2xl px-4 mb-4 decoration-solid underline decoration-2 decoration-black dark:decoration-white font-bold">
          Ingredient List :
        </h3>
        <ul>
          {recipe.ingredientLines.map((ingredient) => (
            <li key={uuid()} className="text-lg capitalize">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
