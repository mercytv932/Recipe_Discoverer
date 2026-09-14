import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [favorites, setFavorites] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(favorites));
  }, [key, favorites]);
  return [favorites, setFavorites] as const;
}

export default useLocalStorage;
