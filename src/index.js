import { fetchPhoto } from './fetchPhoto';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightBox = new SimpleLightbox('.gallery a');

const searchForm = document.querySelector('#search-form');
const searchQuery = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let numberOfPicture = 0;
let currentPage = 0;
let totalHits = 0;

const searchPhotos = e => {
  e.preventDefault();
  gallery.innerHTML = '';
  currentPage = 1;
  loadMoreBtn.classList.remove('is-visible');
  renderSearchPhotos();
};

const renderSearchPhotos = async () => {
  try {
    const photos = await fetchPhoto(searchQuery.value, currentPage);
    if (photos.hits.length !== 0) {
      renderPhotoListItems(photos.hits, gallery, currentPage);      
      if (currentPage >= 1) {
        loadMoreBtn.classList.add('is-visible');
        Notify.success(`Hooray! We found ${photos.totalHits} images.`);
      }
      currentPage += 1;
      totalHits = photos.totalHits;
    } else {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      gallery.innerHTML = '';
    }
  } catch (error) {
    if (searchQuery.value.trim() !== '') {
      console.log(error.message);
      console.log('Something WRONG 0_o !?!');
    } else {
      Notify.failure('Empty search query. Please enter required images');
      gallery.innerHTML = '';
    }
  }
};

function checkEndOfHits() {
  numberOfPicture = document.querySelectorAll('.photo-card');

  if (totalHits > numberOfPicture.length) {
    renderSearchPhotos();
  } else {
    loadMoreBtn.classList.remove('is-visible');
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}

function renderPhotoListItems(hits, wrapper, page) { 
  const markup = hits
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `
      <div class="photo-card">
        <div class="photo-card__item">
          <a class="photo-card__link" href="${largeImageURL}">
            <img
              class="photo-card__image"
              src=${webformatURL}
              alt="${tags}"
              loading="lazy"
              >
            </a>
          </div>
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${likes}
          </p>
          <p class="info-item">
            <b>Views</b> ${views}
          </p>
          <p class="info-item">
            <b>Comments</b> ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${downloads}
          </p>
        </div>
        </div>
      `
    )
    .join('');
  wrapper.insertAdjacentHTML('beforeend', markup);

  lightBox.refresh(); 
  if (page >= 2) {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

searchForm.addEventListener('submit', searchPhotos);
loadMoreBtn.addEventListener('click', checkEndOfHits);