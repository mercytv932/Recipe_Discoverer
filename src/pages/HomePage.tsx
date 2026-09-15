import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
};

type CategoriesResponse = {
  categories: Category[];
};

function HomePage() {
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
  const { data, loading, error } = useFetch<CategoriesResponse>(url);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <h2>Discover Recipes</h2>
      <p>Find something delicious to make.</p>

      <div>
        {data?.categories?.map((category) => (
          <Link
            key={category.idCategory}
            to={`/category/${category.strCategory}`}
          >
            <img src={category.strCategoryThumb} alt={category.strCategory} />
            <h3>{category.strCategory}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
