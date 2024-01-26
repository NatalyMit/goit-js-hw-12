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

const queryParams = {
  query: '',
  page: 1,
  maxPage: 0,
  per_page: 40,
};

refs.formEl.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();

  refs.galleryEL.innerHTML = '';
  queryParams.page = 1;

  const form = event.currentTarget;
  queryParams.query = form.elements.query.value.trim();

  if (!queryParams.query) {
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
    const { hits, totalHits } = await getGallery(queryParams);
    if (!totalHits) {
      refs.loadMoreEl.classList.add(hiddenClass);
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

    queryParams.maxPage = Math.ceil(totalHits / queryParams.pageSize);

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

  async function handleLoadMore() {
    queryParams.page += 1;
    refs.preloader.classList.remove(hiddenClass);
    refs.loadMoreEl.disabled = true;
    try {
      const { hits } = await getGallery(queryParams);

      createGallery(hits, refs.galleryEL);
    } catch (error) {
      console.log(error);
    } finally {
      refs.preloader.classList.add(hiddenClass);
      refs.loadMoreEl.disabled = false;
      if (queryParams.page === queryParams.maxPage) {
        refs.loadMoreEl.classList.add(hiddenClass);

        iziToast.show({
          title: 'Finish',
          messageColor: 'white',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'bottomCenter',
          color: 'blue',
        });
        refs.loadMoreEl.removeEventListener('click', handleLoadMore);
      }
    }
  }
}
