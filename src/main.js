import { fetchData } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const form = document.querySelector('.form');
const loadBtn = document.querySelector('.load-more');

let page = 1;
let searchResult = '';

loadBtn.addEventListener('click', handleClick);
form.addEventListener('submit', handleSubmit);

function showError(message) {
  iziToast.error({
    position: 'topRight',
    message: message,
    messageColor: 'white',
    messageSize: '16px',
    messageLineHeight: '1.5',
    backgroundColor: 'red',
    iconColor: 'white',
  });
}

async function handleSubmit(event) {
  event.preventDefault();
  const { text } = event.target.elements;
  if (!text.value.trim()) {
    showError('Please, fill the field');
    return;
  }

  searchResult = text.value.trim();
  page = 1;
  loader.classList.remove('is-hidden');
  gallery.innerHTML = '';

  try {
    const response = await fetchData(searchResult, page);
    loader.classList.add('is-hidden');
    if (response.hits.length === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    } else {
      gallery.innerHTML = createMarkup(response.hits);
      lightbox.refresh();

      if (response.hits.length < 15 || page * 15 >= response.totalHits) {
        loadBtn.classList.add('load-more-hidden');
        showError("We're sorry, but you've reached the end of search results.");
      } else {
        loadBtn.classList.replace('load-more-hidden', 'load-more');
      }
    }
  } catch (error) {
    loader.classList.add('is-hidden');
    showError(error.message);
  }
  event.target.reset();
}

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

async function handleClick() {
  page += 1;
  loadBtn.disabled = true;
  loader.classList.remove('is-hidden');

  try {
    const response = await fetchData(searchResult, page);
    gallery.insertAdjacentHTML('beforeend', createMarkup(response.hits));
    lightbox.refresh();

    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    if (response.hits.length < 15 || page * 15 >= response.totalHits) {
      loadBtn.classList.replace('load-more', 'load-more-hidden');
      showError("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    showError(error.message);
  } finally {
    loadBtn.disabled = false;
    loader.classList.add('is-hidden');
  }
}
