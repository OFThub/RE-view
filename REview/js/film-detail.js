const API_KEY = '775097b65277e334568e642dd6af42d3';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const movieContainer = document.getElementById('movie-container');
const moviePoster = document.getElementById('movie-poster');
const movieTitle = document.getElementById('movie-title');
const movieReleaseDate = document.getElementById('movie-release-date');
const movieRating = document.getElementById('movie-rating');
const movieDescription = document.getElementById('movie-description');
const commentText = document.getElementById('comment-text');
const submitCommentButton = document.getElementById('submit-comment');
const addToFavoritesButton = document.getElementById('add-to-favorites');
const removeFromFavoritesButton = document.getElementById('remove-from-favorites');

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');

async function fetchMovieDetails() {
  try {
      const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Film detayları alınamadı');
      }

      const data = await response.json();

      if (data) {
        moviePoster.src = data.poster_path ? IMAGE_BASE_URL + data.poster_path : 'https://via.placeholder.com/200x300';
        movieTitle.textContent = data.title || 'Başlık bulunamadı';
        movieReleaseDate.textContent = data.release_date || 'Bilinmiyor';
        movieRating.textContent = data.vote_average || 'Bilinmiyor';
        movieDescription.textContent = data.overview || 'Açıklama bulunamadı';

        document.getElementById('hidden-title').value = data.title || 'Başlık bulunamadı';
        document.getElementById('hidden-title-').value = data.title || 'Başlık bulunamadı';
        document.getElementById('hidden-title--').value = data.title || 'Başlık bulunamadı';
        document.getElementById('hidden-title---').value = data.title || 'Başlık bulunamadı';
        document.getElementById('hidden-title----').value = data.title || 'Başlık bulunamadı';
        document.getElementById('hidden-overview').value = data.overview || 'Başlık bulunamadı';
        document.getElementById('hidden-rating').value = data.vote_average || 'Başlık bulunamadı';
        document.getElementById('hidden-rating-').value = data.vote_average || 'Başlık bulunamadı';
        document.getElementById('hidden-rating--').value = data.vote_average || 'Başlık bulunamadı';
        document.getElementById('hidden-rating---').value = data.vote_average || 'Başlık bulunamadı';
      } else {
        movieContainer.innerHTML = '<p>Film bilgileri yüklenemedi.</p>';
      }
  } catch (error) {
    console.error('Hata:', error);
    movieContainer.innerHTML = '<p>Film bilgileri yüklenemedi.</p>';
  }
};


document.addEventListener('DOMContentLoaded', () => {
  fetchMovieDetails().then(() => {
      // Fetch reviews only after movie details have been fetched
      const hiddenTitle = document.getElementById('hidden-title').value;
      
        if (hiddenTitle) {
          // Favori sayısını al
          fetch('../php/totalFavory.php?title=' + encodeURIComponent(hiddenTitle))
          .then(response => response.json())
          .then(data => {
              const favoritesElement = document.getElementById('favorites');

              if (data.status === "success") {
                  favoritesElement.innerText = `Favori Sayısı: ${data.total_favory}`;
              } else {
                  favoritesElement.innerText = `Hata: ${data.message}`;
              }
          })
          .catch(error => {
              document.getElementById('favorites').innerText = `Bir hata oluştu: ${error}`;
          });
          fetch('../php/fromMovieReviews.php?title=' + encodeURIComponent(hiddenTitle))
              .then(response => response.json())
              .then(data => {
                  const container = document.getElementById('reviewContainer');
                  
                  if (data.length > 0) {
                      data.forEach(review => {
                          const card = document.createElement('div');
                          card.classList.add('card');
                          
                          // Kart içeriğini oluşturuyoruz
                          card.innerHTML = `
                          <h3>${review.title}</h3>
                          <p>Puan: ${review.rating}</p>
                          <p>Eleştiri: ${review.review}</p>

                          <!-- Favorilere Ekle Butonu -->
                          <form action="../php/favoryReview.php" method="post">
                              <input type="hidden" name="title" value="${review.title}">
                              <input type="hidden" name="rating" value="${review.rating}">
                              <input type="hidden" name="review" value="${review.review}">
                              <button type="submit">Favorilere Ekle</button>
                          </form>

                          <!-- Favorilerden Çıkar Butonu -->
                          <form action="../php/removeFavoryReview.php" method="post">
                              <input type="hidden" name="title" value="${review.title}">
                              <input type="hidden" name="rating" value="${review.rating}">
                              <input type="hidden" name="review" value="${review.review}">
                              <button type="submit">Favorilerden Çıkar</button>
                          </form>

                          <!-- Favorilerden Çıkar Butonu -->
                          <form action="../php/editReview.php" method="post">
                              <input type="hidden" name="title" value="${review.title}">
                              <input type="hidden" name="p_rating" value="${review.rating}">
                              <input type="hidden" name="p_review" value="${review.review}">
                                        <textarea id="comment-text" name="review"placeholder="Yorumunuzu buraya yazın..."></textarea>
          
                                        <div id="rating">
                                            <label><input type="radio" name="rating" value="1"> 1</label>
                                            <label><input type="radio" name="rating" value="2"> 2</label>
                                            <label><input type="radio" name="rating" value="3"> 3</label>
                                            <label><input type="radio" name="rating" value="4"> 4</label>
                                            <label><input type="radio" name="rating" value="5"> 5</label>
                                            <label><input type="radio" name="rating" value="6"> 6</label>
                                            <label><input type="radio" name="rating" value="7"> 7</label>
                                            <label><input type="radio" name="rating" value="8"> 8</label>
                                            <label><input type="radio" name="rating" value="9"> 9</label>
                                            <label><input type="radio" name="rating" value="10"> 10</label>
                                        </div>
                              <button type="submit">Yorumu Güncelle</button>
                          </form>
                            <form action="../php/deleteReview.php" method="post">
                              <input type="hidden" name="title" value="${review.title}">
                              <input type="hidden" name="rating" value="${review.rating}">
                              <input type="hidden" name="review" value="${review.review}">
                              <button type="submit">Yorumu Sil</button>
                          </form>
                      `;
                          
                          container.appendChild(card);
                      });
                  } else {
                  }
              })
              .catch(error => console.error('Hata:', error));
              
      }
  });
});

