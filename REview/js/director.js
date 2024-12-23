const API_KEY = '775097b65277e334568e642dd6af42d3';

function getRandomMovieIds(count, maxId) {
  const ids = new Set();
  while (ids.size < count) {
    const randomId = Math.floor(Math.random() * maxId) + 1;
    ids.add(randomId);
  }
  return Array.from(ids);
}

const randomMovieIds = getRandomMovieIds(40, 200000);

async function fetchDirectorPhoto(personId) {
  const url = `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.profile_path
    ? `https://image.tmdb.org/t/p/w500${data.profile_path}`
    : 'https://via.placeholder.com/150';
}

async function fetchMovieTitle(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.title;
}

async function fetchDirectorsFromMovies(movieIds) {
  const directorList = document.getElementById('directorList');

  for (const movieId of movieIds) {
    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        console.warn(`Film ID ${movieId} bulunamadı.`);
        continue;
      }

      const data = await response.json();
      const directors = data.crew.filter(member => member.job === 'Director');
      const movieTitle = await fetchMovieTitle(movieId);

      for (const director of directors) {
        const photoUrl = await fetchDirectorPhoto(director.id);

        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <img src="${photoUrl}" alt="${director.name}" width="50" height="50">
          <div class="director-info">
            <strong>${director.name}</strong>
            <p>Yönettiği Film: ${movieTitle}</p>
            <button class="favorite-button">Favorilere Ekle</button>
            <button class="remove-favorite-button">Favorilerden Çıkar</button>
          </div>
        `;
        sendToPHP(director, movieTitle);
        const favoriteButton = listItem.querySelector('.favorite-button');
        favoriteButton.addEventListener('click', () => addToFavorites(director, movieTitle));

        const removefavoriteButton = listItem.querySelector('.remove-favorite-button');
        removefavoriteButton.addEventListener('click', () => removeFavorites(director, movieTitle));

        directorList.appendChild(listItem);
      }
    } catch (error) {
      console.error(`Hata oluştu (Film ID: ${movieId}):`, error);
    }
  }
}

function addToFavorites(director, movieTitle) {
  const formData = new FormData();
  formData.append('name', director.name);
  formData.append('movie_title', movieTitle);

  fetch('../php/favorite_directors.php', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Yönetmen favorilere eklenemedi.');
      }
      return response.text();
    })
    .then(result => {
      alert('Yönetmen başarıyla favorilere eklendi!');
      console.log(result);
    })
    .catch(error => {
      console.error('Favorilere ekleme hatası:', error);
      alert('Bir hata oluştu, lütfen tekrar deneyin.');
    });
}

fetchDirectorsFromMovies(randomMovieIds);

function removeFavorites(director) {
    const formData = new FormData();
    formData.append('name', director.name);
  
    fetch('../php/remove_favorite_director.php', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Yönetmen favorilerden çıkarılamadı.');
        }
        return response.text();
      })
      .then(result => {
        alert('Yönetmen favorilerden başarıyla çıkarıldı!');
        console.log(result);
      })
      .catch(error => {
        console.error('Favorilerden çıkarma hatası:', error);
        alert('Bir hata oluştu, lütfen tekrar deneyin.');
      });
  }

  function sendToPHP(director, movieTitle) {
    const formData = new FormData();
    formData.append('name', director.name);
    formData.append('movie_title', movieTitle);
  
    fetch('../php/directors.php', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Yönetmen favorilere eklenemedi.');
        }
        return response.text();
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error('Favorilere ekleme hatası:', error);
        alert('Bir hata oluştu, lütfen tekrar deneyin.');
      });
  }