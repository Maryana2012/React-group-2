import axios from 'axios';

const API_KEY = 'jL3gdZ5wGM969DV7XNbokkwsSg4yFJhjTbMyWTvK4ZOTdOZXZt5sdlzF';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const  getImages = async (query, page) => {
  const response = await axios.get(`search?query=${query}&page=${page}`)
  return response.data
};


