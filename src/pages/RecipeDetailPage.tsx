import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: string | null;
};

type RecipeResponses = {
  meals: Recipe[] | null;
};

function RecipeDetailPage() {
  const { recipeId } = useParams();
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
  const { data, loading, error } = useFetch<RecipeResponses>(url);

  if (loading) {
    return <p>Loading recipe...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const recipe = data?.meals?.[0];

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe?.[`strIngredient${i}`];
    const measure = recipe?.[`strMeasure${i}`];

    if (ingredient) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }
  return (
    <div>
      <h2>{recipe?.strMeal}</h2>

      <img src={recipe?.strMealThumb} alt={recipe?.strMeal} />

      <p>Category: {recipe?.strCategory}</p>
      <p>Area: {recipe?.strArea}</p>

      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <p>{recipe?.strInstructions}</p>
    </div>
  );
}

export default RecipeDetailPage;
