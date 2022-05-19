import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getRecipeById } from "@services/api.js";
import axios from "axios";

import LoginContext from "@contexts/LoginContext";

import Loader from "@components/Loader";

export default function Favorites() {
  const { currentUser } = useContext(LoginContext);

  const [isRecipesLoading, setIsRecipesLoading] = useState(true);

  const [favoritesRecipes, setFavoritesRecipes] = useState([]);

  useEffect(async () => {
    setIsRecipesLoading(true);

    const { favorites } = currentUser;

    const favoritesId = favorites.map(
      (favorite) => favorite.recipe_id.split("_")[1]
    );

    await axios
      .all(favoritesId.slice(0, 9).map((id) => getRecipeById(id)))
      .then((data) => setFavoritesRecipes(data));

    setIsRecipesLoading(false);
  }, []);

  if (isRecipesLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen my-24">
      <h1 className="text-4xl dark:text-white title-font text-gray-900 text-center text-mada">
        My favorites <span className="text-atma font-bold">recipes...</span>
      </h1>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto mb-20">
          <div className="flex flex-wrap -m-4 justify-center">
            {favoritesRecipes.map((recipe) => (
              <div
                key={recipe.uri.split("_")[1]}
                className="lg:w-1/4 p-4 w-80 shadow-lg shadow-gray-400 m-4 rounded-lg duration-700 ease-in-out hover:scale-105"
              >
                <div className="block relative h-48 rounded overflow-hidden">
                  <Link to={`/recipe?id=${recipe.uri.split("_")[1]}`}>
                    <img
                      alt={recipe.label}
                      className="object-cover object-center w-full h-full block bg-gradient-to-br from-[#78B07C] to-[#ffdb20] p-2"
                      src={recipe.image}
                    />
                  </Link>
                </div>
                <div className="mt-4">
                  <h3 className="text-xs tracking-widest title-font mb-1 capitalize dark:text-white font-bold text-mada">
                    {recipe.label}
                  </h3>
                  <p className="text-gray-900 text-xl  capitalize dark:text-white font-bold text-atma text-gradient">
                    {recipe.cuisineType}
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
