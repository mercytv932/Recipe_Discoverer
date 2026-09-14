import { useEffect, useState } from "react";

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          setError("Something went wrong! Please try again later");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);
  return { data, loading, error };
}

export default useFetch;
