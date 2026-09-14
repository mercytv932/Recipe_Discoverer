import { createContext, type ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type FavoritesContextType = {
  favorites: number[];
  addFavorite: (recipeId: number) => void;
  removeFavorite: (recipeId: number) => void;
  isFavorite: (recipeId: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);
function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<number[]>(
    "favoriteRecipes",
    [],
  );

  const addFavorite = (recipeId: number) => {
    setFavorites((current) => [...current, recipeId]);
  };

  const removeFavorite = (recipeId: number) => {
    setFavorites((current) => current.filter((id) => id !== recipeId));
  };

  const isFavorite = (recipeId: number) => {
    return favorites.includes(recipeId);
  };
  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export { FavoritesContext, FavoritesProvider };
