import createGallery from './templates/articles.js';
import { getGallery } from './services/galleryApi.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  formEl: document.querySelector('.form-search'),
  galleryEL: document.querySelector('.gallery-images'),
  loadMoreEl: document.querySelector('[data-action="load-more"]'),
  preloader: document.getElementById('preloader'),
};
const lightbox = new SimpleLightbox('.gallery-images a', {
  captionDelay: 250,
});
const hiddenClass = 'is-hidden';
let query = '';
let page = 1;
let maxPage = 0;

refs.formEl.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();

  refs.galleryEL.innerHTML = '';
  page = 1;

  const form = event.currentTarget;
  query = form.elements.query.value.trim();

  if (!query) {
    iziToast.show({
      title: '❌',
      messageColor: 'white',
      message: 'Sorry, You have not entered any word.Please try again!',
      position: 'topRight',
      color: 'red',
    });
    return;
  }

  try {
    const { hits, totalHits } = await getGallery(query);
    if (!totalHits) {
      iziToast.show({
        title: '❌',
        messageColor: 'white',
        message:
          'Sorry, we dont have any pictures for your request.Please try again!',
        position: 'topRight',
        color: 'red',
      });
      return;
    }
    console.log(totalHits);
    maxPage = Math.ceil(totalHits / 40);
    console.log(maxPage);

    createGallery(hits, refs.galleryEL);
    lightbox.refresh();

    if (hits.length > 0 && hits.length !== totalHits) {
      refs.loadMoreEl.classList.remove(hiddenClass);
      refs.loadMoreEl.addEventListener('click', handleLoadMore);
    } else {
      refs.loadMoreEl.classList.add(hiddenClass);
    }
  } catch (error) {
    console.log(err);
  } finally {
    form.reset();
  }
}

async function handleLoadMore() {
  page += 1;
  refs.preloader.classList.remove(hiddenClass);
  refs.loadMoreEl.disabled = true;
  try {
    const { hits } = await getGallery(query, page);

    createGallery(hits, refs.galleryEL);
  } catch (error) {
    console.log(error);
  } finally {
    refs.preloader.classList.add(hiddenClass);
    refs.loadMoreEl.disabled = false;
    if (page === maxPage) {
      refs.loadMoreEl.classList.add(hiddenClass);
      refs.loadMoreEl.removeEventListener('click', handleLoadMore);
      iziToast.show({
        title: '❌',
        messageColor: 'white',
        message: 'No more pictures for your request!',
        position: 'bottomCenter',
        color: 'red',
      });
    }
  }
}
