import axios from 'axios';
import createGallery from './templates/articles';
import { getGallery } from './services/galleryApi';

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
    return;
  }

  try {
    const { hits, totalHits } = await getGallery(query);
    console.log(totalHits);
    maxPage = Math.ceil(totalHits / 40);
    console.log(maxPage);
    createGallery(hits, refs.galleryEL);

    if (hits.length > 0) {
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
    console.log(err);
  } finally {
    refs.preloader.classList.add(hiddenClass);
    refs.loadMoreEl.disabled = false;
    if (page === maxPage) {
      refs.loadMoreEl.classList.add(hiddenClass);
    }
  }
}
