import axios from 'axios';

async function getGallery(query, page = 1) {
  const BASE_URL = 'https://pixabay.com';
  const API_KEY = '41909271-8b5dab2225a1cd5a9757159a5';
  const ENDPOINT = 'api/';
  try {
    const response = await axios.get(`${BASE_URL}/${ENDPOINT}`, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
        page,
      },
    });

    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      titleSize: '30',
      messageSize: '25',
      message: 'Sorry! Try later! Server not working',
    });
    console.error(error.message);
  }
}

export { getGallery };
