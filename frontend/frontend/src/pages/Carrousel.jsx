import React, { useState, useEffect, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";

import {
  addToFavorites,
  removeFavorites,
  getRecipesByIngredients,
} from "@services/api.js";

import FavoriteRecipes from "@components/FavoriteRecipes";
import LoginContext from "@contexts/LoginContext";

import noRecipeFoundWhite from "@assets/noRecipeFound_white.png";
import noRecipeFoundBlack from "@assets/noRecipeFound_black.png";
import SkeletonArticle from "../skeleton/SkeletonArticle";

import "../App.css";

export default function Carrousel() {
  const { currentUser, setCurrentUser } = useContext(LoginContext);
  // Hook permettant de récupérer les paramètre de la query string (?string1=ingrédient1&string2=ingrédient2...)
  const [queryString] = useSearchParams();

  const [mealRecipes, setMealRecipes] = useState([]);
  const [firstRecipe, setFirstRecipe] = useState();
  const [isRecipesLoading, setIsRecipesLoading] = useState(true);

  useEffect(() => {
    (async function getRecipe() {
      setIsRecipesLoading(true);
      // On récupère les ingredients s'ils sont présent dans la queryString,
      // Sinon on choisi un tableau vide  par défaut.

      const ingredients = queryString.get("ingredients")
        ? queryString.get("ingredients").split("%20")
        : [];

      const diet = queryString.get("health")
        ? queryString.get("health").split(" ")
        : [];

      const [firstRecipeData, ...recipes] = await getRecipesByIngredients(
        ingredients,
        diet
      );

      setMealRecipes(recipes);
      setFirstRecipe(firstRecipeData);
      setTimeout(() => {
        setIsRecipesLoading(false);
      }, 1500);
    })();
  }, []);

  if (isRecipesLoading) {
    return <SkeletonArticle />;
  }

  if (mealRecipes.length === 0) {
    return (
      <div className="max-w-xs mx-auto min-h-screen mt-48 text-center">
        <img
          src={noRecipeFoundBlack}
          alt="No recipes found"
          className="block dark:hidden"
        />
        <img
          src={noRecipeFoundWhite}
          alt="No recipes found"
          className="hidden dark:block"
        />
        <h3 className="text-center text-mada text-4xl dark:text-white mb-36">
          No{" "}
          <span className="text-[#8ddc93] dark:text-[#ffdb20] text-atma font-bold">
            Recipes
          </span>{" "}
          Found !
        </h3>
        <Link to="/">
          <button
            className="w-auto p-2 px-4 z-10 border-2 text-mada border-white dark:border-gray-800 dark:text-zinc-800 text-center bg-[#8ddc93] dark:bg-[#ffdb20] hover:bg-green-600 dark:hover:bg-yellow-500 text-2xl text-white rounded-3xl disabled:bg-gray-300 dark:disabled:bg-gray-300 drop-shadow"
            type="button"
          >
            Go back to the <span className="text-atma font-bold">kitchen</span>{" "}
            !
          </button>
        </Link>
      </div>
    );
  }

  const handleClick = async (recipe) => {
    // eslint-disable-next-line
    if (isFavorite(recipe)) {
      const favorite = currentUser.favorites.find(
        (fav) => fav.recipe_id === recipe.recipe.uri
      );

      removeFavorites(favorite.id);

      setCurrentUser({
        ...currentUser,
        favorites: currentUser.favorites.filter(
          (fav) => fav.recipe_id !== recipe.recipe.uri
        ),
      });
    } else {
      const favorite = await addToFavorites(currentUser.id, recipe.recipe.uri);
      setCurrentUser({
        ...currentUser,
        favorites: [...currentUser.favorites, favorite],
      });
    }
  };

  const isFavorite = (recipe) => {
    return (
      currentUser?.favorites?.find(
        (favorite) => favorite.recipe_id === recipe.recipe.uri
      ) !== undefined
    );
  };

  return (
    <div className="mx-auto w-[75%] min-h-screen mt-36">
      <h1 className="mt-4 mb-6 lg:text-5xl text-4xl md:text-3xl dark:text-white text-center text-mada">
        Choose your{" "}
        <span className="text-[#8ddc93] dark:text-[#ffdb20] text-atma font-bold">
          meal!
        </span>
      </h1>
      <div className="mx-auto my-auto w-full h-full max-w-sm max-h-sm">
        <div
          id="carouselExampleControls"
          className="carousel relative slide carousel-dark dark:carousel-light"
          data-carousel="static"
          data-bs-interval="false"
        >
          <div className="carousel-inner relative w-full overflow-hidden rounded-[80px]">
            <div className="carousel-item active relative float-left w-full p-5 duration-700 ease-in-out hover:scale-105">
              <Link to={`/recipe?id=${firstRecipe.recipe.uri.split("_")[1]}`}>
                <img
                  src={firstRecipe.recipe.image}
                  className="block w-full p-2 mb-2 bg-gradient-to-br from-[#78B07C] to-[#ffdb20] rounded-[80px] shadow-lg"
                  alt={firstRecipe.recipe.label}
                />
              </Link>
              <div className="flex flex-col p-6 rounded-lg max-w-sm w-full mx-auto">
                <h3 className="dark:text-white mb-4 md:text-4xl text-xl text-center text-mada">
                  {firstRecipe.recipe.label}
                </h3>
                <p className="capitalize dark:text-white font-bold mb-2 md:text-2xl text-lg text-center w-full text-atma text-[#8ddc93] dark:text-[#ffdb20]">
                  {firstRecipe.recipe.cuisineType}
                </p>
                {currentUser && (
                  <div className="flex justify-center mb-2">
                    <FavoriteRecipes
                      isFavorite={isFavorite(firstRecipe)}
                      // eslint-disable-next-line
                      handleClick={() => handleClick(firstRecipe)}
                    />
                  </div>
                )}
              </div>
            </div>
            {mealRecipes.slice(0, 9).map((item) => (
              <div
                key={item.recipe.uri.split("_")[1]}
                className="carousel-item relative float-left w-full p-5 duration-700 ease-in-out hover:scale-105"
              >
                <Link to={`/recipe?id=${item.recipe.uri.split("_")[1]}`}>
                  <img
                    src={item.recipe.image}
                    className="block w-full p-2 mb-2 bg-gradient-to-br from-[#78B07C] to-[#ffdb20] rounded-[80px] shadow-lg"
                    alt={item.recipe.label}
                  />
                </Link>
                <div className="flex flex-col p-6 rounded-lg max-w-sm w-full mx-auto">
                  <h3 className="dark:text-white mb-4 md:text-4xl text-xl text-center text-mada">
                    {item.recipe.label}
                  </h3>
                  <p className="capitalize dark:text-white font-bold mb-2 md:text-2xl text-lg text-center w-full text-atma text-[#8ddc93] dark:text-[#ffdb20]">
                    {item.recipe.cuisineType}
                  </p>
                  {currentUser && (
                    <div className="flex justify-center mb-2">
                      <FavoriteRecipes
                        isFavorite={isFavorite(item)}
                        // eslint-disable-next-line
                        handleClick={() => handleClick(item)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            className="absolute top-48 md:-left-1/4 -left-9 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span className="inline-block bg-no-repeat" aria-hidden="true">
              <i className="fa-solid fa-circle-chevron-left text-[#78B07C] dark:text-[#ffdb20] text-4xl xl:text-5xl hover:scale-110">
                {" "}
              </i>
            </span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="absolute top-48 md:-right-1/4 -right-9 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span className="inline-block bg-no-repeat" aria-hidden="true">
              <i className="fa-solid fa-circle-chevron-right text-[#78B07C] dark:text-[#ffdb20] text-4xl xl:text-5xl hover:scale-110">
                {" "}
              </i>
            </span>

            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}
