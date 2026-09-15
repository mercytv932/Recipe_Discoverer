import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
import RecipeCard from "../components/RecipeCard";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

function FavoritesPage() {
  const favoritesContext = useContext(FavoritesContext);
  const { favorites } = favoritesContext!;

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const results = await Promise.all(
        favorites.map((id) =>
          fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
          ).then((response) => response.json()),
        ),
      );
      const favoriteRecipes = results
        .map((result) => result.meals?.[0])
        .filter(Boolean);

      setRecipes(favoriteRecipes);
      setLoading(false);
    };
    fetchFavorites();
  }, [favorites]);

  if (favorites.length === 0) {
    return (
      <div>
        <h2>My favorites</h2>
        <p>You don't have any favorite recipes yet.</p>
      </div>
    );
  }
  return (
    <div>
      <h2>My favorites</h2>
      {loading ? (
        <p>Loading favorites...</p>
      ) : (
        <div>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              id={recipe.idMeal}
              name={recipe.strMeal}
              image={recipe.strMealThumb}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
