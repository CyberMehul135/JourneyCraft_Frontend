const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export const getDestinationSuggestions = async (searchText) => {
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchText}&apiKey=${API_KEY}`,
  );

  const data = await response.json();

  return data.features;
};