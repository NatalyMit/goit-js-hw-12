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
};

const hiddenClass = 'is-hidden';

refs.formEl.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();

  refs.galleryEL.innerHTML = '';

  const form = event.currentTarget;
  const query = form.elements.query.value.trim();

  if (!query) {
    return;
  }

  try {
    const { hits } = await getGallery(query);

    createGallery(hits, refs.galleryEL);

    if (hits.length > 0) {
      refs.loadMoreEl.classList.remove(hiddenClass);
    } else {
      refs.loadMoreEl.classList.add(hiddenClass);
    }
  } catch (error) {
    console.log(err);
  } finally {
    form.reset();
  }
}
