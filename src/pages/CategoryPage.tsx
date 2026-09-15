import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type RecipeResponse = {
  meals: Recipe[] | null;
};
function CategoryPage() {
  const { categoryName } = useParams();
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
  const { data, loading, error } = useFetch<RecipeResponse>(url);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2> {categoryName} Recipes</h2>

      <div>
        {data?.meals?.map((recipe) => (
          <div key={recipe.idMeal}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>{recipe.strMeal}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
