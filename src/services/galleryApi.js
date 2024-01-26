import axios from 'axios';

const BASE_URL = 'https://pixabay.com';
const API_KEY = '41909271-8b5dab2225a1cd5a9757159a5';
const ENDPOINT = 'api/';
function getGallery({ query, page = 1, per_page }) {
  return axios
    .get(`${BASE_URL}/${ENDPOINT}`, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page,
        page,
      },
    })
    .then(({ data }) => data);
}

export { getGallery };
