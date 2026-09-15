import { Link } from "react-router-dom";

type RecipeCardProps = {
  id: string;
  name: string;
  image: string;
};

function RecipeCard({ id, name, image }: RecipeCardProps) {
  return (
    <Link to={`/recipe/${id}`}>
      <div>
        <img src={image} alt={name} />
        <h3>{name}</h3>
      </div>
    </Link>
  );
}

export default RecipeCard;
