import createGallery from './createMarkup/articles.js';
import { getGallery } from './js/galleryApi.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  formEl: document.querySelector('.form-search'),
  galleryEL: document.querySelector('.gallery-images'),
  loadMoreEl: document.querySelector('[data-action="load-more"]'),
  preloader: document.getElementById('preloader'),
  loaderGallery: document.querySelector('.loader-gallery'),
};

const hiddenClass = 'is-hidden';

let query = '';
let page = 1;
let maxPage = 0;

refs.formEl.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();

  refs.galleryEL.innerHTML = '';
  refs.loadMoreEl.classList.add(hiddenClass);
  refs.loaderGallery.classList.remove(hiddenClass);

  page = 1;

  const form = event.currentTarget;
  query = form.elements.query.value.trim();

  if (!query) {
    refs.loaderGallery.classList.add(hiddenClass);
    refs.loadMoreEl.classList.add(hiddenClass);
    iziToast.show({
      title: '❌',
      messageColor: 'white',
      message: 'Sorry, You have not entered any word.Please try again!',
      position: 'topRight',
      color: 'yellow',
    });
    return;
  }

  try {
    const { hits, totalHits } = await getGallery(query);
    if (hits.length === 0) {
      refs.loadMoreEl.classList.add(hiddenClass);
      iziToast.show({
        title: '❌',
        messageColor: 'white',
        message:
          'Sorry, we dont have any pictures for your request.Please try again!',
        messageSize: '25',
        position: 'topRight',
        color: 'yellow',
      });
      return;
    }

    maxPage = Math.ceil(totalHits / 40);

    createGallery(hits);

    if (hits.length > 0 && hits.length !== totalHits) {
      refs.loadMoreEl.classList.remove(hiddenClass);
      refs.loadMoreEl.addEventListener('click', handleLoadMore);
    } else {
      refs.loadMoreEl.classList.add(hiddenClass);
    }
  } catch (error) {
    console.log(err);
  } finally {
    refs.loaderGallery.classList.add(hiddenClass);
    form.reset();
  }
}
async function handleLoadMore() {
  page += 1;

  refs.preloader.classList.remove(hiddenClass);
  refs.loadMoreEl.classList.add(hiddenClass);
  refs.loadMoreEl.disabled = true;

  const getHeightImgCard = document
    .querySelector('.list-item')
    .getBoundingClientRect();

  try {
    const { hits } = await getGallery(query, page);

    createGallery(hits);
  } catch (error) {
    console.log(error);
  } finally {
    window.scrollBy({
      top: getHeightImgCard.height * 2,
      left: 0,
      behavior: 'smooth',
    });

    refs.preloader.classList.add(hiddenClass);
    refs.loadMoreEl.disabled = false;
    refs.loadMoreEl.classList.remove(hiddenClass);

    if (page === maxPage) {
      refs.loadMoreEl.classList.add(hiddenClass);
      refs.loadMoreEl.removeEventListener('click', handleLoadMore);
      iziToast.show({
        title: 'Finish',
        messageColor: 'white',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomCenter',
        color: 'blue',
      });
    }
  }
}
