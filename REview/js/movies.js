const API_KEY = '775097b65277e334568e642dd6af42d3';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const TRENDING_URL = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
const UPCOMING_URL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`;
const TOPRATED_URL = `${BASE_URL}/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`;
const NOWPLAYING_URL = `${BASE_URL}/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`;

const trendingMoviesContainer = document.getElementById('trending-movies-container');
const upcomingMoviesContainer = document.getElementById('upcoming-movies-container');
const topRatedMoviesContainer = document.getElementById('topRated-movies-container');
const nowPlayingMoviesContainer = document.getElementById('nowPlaying-movies-container');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await fetchMoviesIfNotSent(TRENDING_URL, '../php/trendingMovies.php', trendingMoviesContainer, 'trendingSent');
    await fetchMoviesIfNotSent(UPCOMING_URL, '../php/upcomingMovies.php', upcomingMoviesContainer, 'upcomingSent');
    await fetchMoviesIfNotSent(TOPRATED_URL, '../php/topRatedMovies.php', topRatedMoviesContainer, 'topRatedSent');
    await fetchMoviesIfNotSent(NOWPLAYING_URL, '../php/nowPlayingMovies.php', nowPlayingMoviesContainer, 'nowPlayingSent');
  } catch (error) {
    console.error('Bir hata oluştu:', error);
  }
});

async function fetchMoviesIfNotSent(url, phpEndpoint, container, sessionKey) {
  if (!sessionStorage.getItem(sessionKey)) {
    try {
      await fetchMoviesAndSendToPHP(url, phpEndpoint, container);
      sessionStorage.setItem(sessionKey, 'true');
    } catch (error) {
      console.error(`${sessionKey} işlemi başarısız oldu:`, error);
    }
  } else {
    // SessionStorage doluysa, sadece filmleri göster
    const response = await fetch(url);
    const data = await response.json();
    if (container) displayMovies(container, data.results);
  }
}

async function fetchMoviesAndSendToPHP(url, phpEndpoint, container) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${phpEndpoint} için veri getirme başarısız oldu`);

    const data = await response.json();
    if (container) displayMovies(container, data.results);

    const formData = new FormData();
    data.results.forEach((movie, index) => {
      formData.append(`movie[${index}][title]`, movie.title || 'N/A');
      formData.append(`movie[${index}][rating]`, movie.vote_average || 'N/A');
      formData.append(`movie[${index}][release_date]`, movie.release_date || 'N/A');
    });

    await fetch(phpEndpoint, { method: 'POST', body: formData });
  } catch (error) {
    alert('Hata:', error);
    if (container) container.innerHTML = `<p>Filmleri yüklerken bir hata oluştu.</p>`;
  }
}

function displayMovies(container, movies) {
  if (!movies || movies.length === 0) {
    container.innerHTML = '<p>Gösterilecek film yok.</p>';
    return;
  }

  container.innerHTML = ''; // Mevcut içerikleri temizle
  movies.forEach((movie) => {
    const movieButton = document.createElement('button');
    movieButton.className = 'movie-button';
    movieButton.innerHTML = `
      <img src="${movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'https://via.placeholder.com/200x300'}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Release Date: ${movie.release_date || 'N/A'}</p>
      <p>Rating: ${movie.vote_average || 'N/A'}</p>
    `;
    movieButton.addEventListener('click', () => {
      window.location.href = `film-detail.html?movieId=${movie.id}`;
    });
    container.appendChild(movieButton);
  });
}
