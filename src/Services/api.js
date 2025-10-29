const API_KEY = "c5eb4a574605626d77b0d38598b27424";
const BASE_URL = "https://api.themoviedb.org/3"

// to send request to api
export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.status_message || "API Error");
  return data.results;
};

// to get result
export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.status_message || "API Error");
  return data.results;
};
