import createGallery from './templates/articles.js';
import { getGallery } from './services/galleryApi.js';

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

const queryParams = {
  query: '',
  page: 1,
  maxPage: 0,
};

refs.formEl.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();

  refs.galleryEL.innerHTML = '';

  refs.loaderGallery.classList.remove(hiddenClass);

  queryParams.page = 1;

  const form = event.currentTarget;
  queryParams.query = form.elements.query.value.trim();

  if (!queryParams.query) {
    refs.loaderGallery.classList.add(hiddenClass);
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
    const { hits, totalHits } = await getGallery(queryParams);
    if (!totalHits) {
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

    queryParams.maxPage = Math.ceil(totalHits / 40);

    createGallery(hits, refs.galleryEL);

    if (hits.length > 0 && hits.length !== totalHits) {
      refs.loadMoreEl.classList.remove(hiddenClass);
    } else if (!hits.length) {
      refs.loadMoreEl.classList.add(hiddenClass);

      iziToast.error({
        title: 'Error',
        titleSize: '30',
        messageSize: '25',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      refs.loadMoreEl.classList.add(hiddenClass);
    }
  } catch (error) {
    console.log(err);
  } finally {
    refs.loaderGallery.classList.add(hiddenClass);
    form.reset();
  }

  refs.loadMoreEl.addEventListener('click', async function handleLoadMore() {
    if (queryParams.page === queryParams.maxPage) {
      refs.loadMoreEl.classList.add(hiddenClass);
      refs.loadMoreEl.removeEventListener('click', handleLoadMore);
      iziToast.show({
        title: 'Finish',
        messageColor: 'white',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomCenter',
        color: 'blue',
      });
      return;
    }
    queryParams.page += 1;
    refs.preloader.classList.remove(hiddenClass);
    refs.loadMoreEl.classList.add(hiddenClass);
    refs.loadMoreEl.disabled = true;

    const getHeightImgCard = document
      .querySelector('.list-item')
      .getBoundingClientRect();

    try {
      const { hits } = await getGallery(queryParams);

      createGallery(hits, refs.galleryEL);
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
    }
  });
}
