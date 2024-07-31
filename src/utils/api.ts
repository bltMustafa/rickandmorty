import axios from "axios"

const BASE_URL = "https://rickandmortyapi.com/api"

export const getCharacters = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/character`)
    return response.data
  } catch (err) {
    console.error('Error fetching charecters', err);
    throw err
  }
}

export const getEpisode = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/episode`)
    return response.data
  } catch (err) {
    console.error('Error fetching episode', err)
    throw err
  }
}

export const getEpisodesBySeason = async (season) => {
  try {
    const response = await axios.get(`${BASE_URL}/episode`, {
      params: {
        episode: season,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};