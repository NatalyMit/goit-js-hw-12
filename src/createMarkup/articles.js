import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEL = document.querySelector('.gallery-images');
const lightbox = new SimpleLightbox('.gallery-images a', {
  captionDelay: 250,
});

export default function createGallery(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class = "list-item">
      <a href="${largeImageURL}" ><img class="search-image" src = "${webformatURL}" alt = "${tags}" ><div class="options">
      <p class="options-item"> likes:<span class="options-item-span">${likes}</span></p>
      <p class="options-item"> views:<span class="options-item-span">${views}</span></p>
      <p class="options-item"> comments:<span class="options-item-span">${comments}</span></p>
      <p class="options-item"> downloads:<span class="options-item-span">${downloads}</span></p></div>
    
      </a>
      
      </li>`
    )
    .join('');

  galleryEL.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
