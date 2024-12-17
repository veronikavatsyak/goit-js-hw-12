export function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `
    <li class="gallery-item">
    <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" width="360">
    <ul class="info-list">
    <li class="info-item">
    <h2 class="info-title">Likes</h2>
    <p class="info-text">${likes}</p>
    </li>
    <li class="info-item">
     <h2 class="info-title">Views</h2>
    <p class="info-text">${views}</p>
    </li>
    <li class="info-item">
     <h2 class="info-title">Comments</h2>
    <p class="info-text">${comments}</p>
    </li>
    <li class="info-item">
     <h2 class="info-title">Dowloads</h2>
    <p class="info-text">${downloads}</p>
    </li>
    </ul>
    </a>
    </li>`
    )
    .join('');
}
