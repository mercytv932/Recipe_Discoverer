import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import RecipeCard from "../components/RecipeCard";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type SearchResponse = {
  meals: Recipe[] | null;
};

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;
  const { data, loading, error } = useFetch<SearchResponse>(url);

  if (loading) {
    return <p>Searching recipes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <h2>Search Results for "{query}"</h2>

      {!data?.meals ? (
        <p>No recipe found.</p>
      ) : (
        <div>
          {data.meals.map((recipe) => (
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

export default SearchResultsPage;
