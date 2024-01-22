import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const myApiKey = '41909271-8b5dab2225a1cd5a9757159a5';
axios.defaults.baseURL = 'https://pixabay.com/api';
axios.defaults.headers.common['header-name'] = myApiKey;
const searchParams = new URLSearchParams({
  _limit: 5,
  _sort: 'name',
});

axios
  .get('https://jsonplaceholder.typicode.com/images', {
    params: {
      _limit: 5,
      _sort: 'name',
    },
  })

  .then(res => console.log(res))
  .catch(console.error())
  .finally(console.log('happy'));

//   getBoundingClientRect();
