const API_KEY = '775097b65277e334568e642dd6af42d3';
const API_URL = 'https://api.themoviedb.org/3/person/popular';

document.addEventListener('DOMContentLoaded', () => {
  fetchActorsDisplay();
  if (!sessionStorage.getItem('formSent')) {
    fetchActors();
  }
});

async function fetchActors() {
  try {
    const response = await fetch(`${API_URL}?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    sendToPHP(data.results);
  } catch (error) {
    console.error('Error fetching actors:', error);
  }
}

async function fetchActorsDisplay() {
  try {
    const response = await fetch(`${API_URL}?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    displayActors(data.results);
  } catch (error) {
    console.error('Error fetching actors:', error);
  }
}

function displayActors(actors) {
  const container = document.getElementById('actors-container');
  container.innerHTML = '';

  actors.forEach((actor) => {
    const actorCard = document.createElement('div');
    actorCard.className = 'actor-card';

    const image = document.createElement('img');
    image.src = actor.profile_path
      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
      : 'https://via.placeholder.com/100';
    image.alt = actor.name;

    const info = document.createElement('div');
    const name = document.createElement('h2');
    name.textContent = actor.name;

    const knownFor = document.createElement('p');
    knownFor.textContent = `Known for: ${
      actor.known_for && actor.known_for.length > 0
        ? actor.known_for[0].title || actor.known_for[0].name
        : 'No known works'
    }`;

    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = 'Add to Favorites';
    favoriteButton.className = 'favorite-button';
    favoriteButton.addEventListener('click', () => addToFavorites(actor));

    const removefavoriteButton = document.createElement('button');
    removefavoriteButton.textContent = 'Favorilerden Çıkar';
    removefavoriteButton.className = 'remove-favorite-button';
    removefavoriteButton.addEventListener('click', () => removeFromFavoriteActors(actor));
    info.appendChild(removefavoriteButton);


    info.appendChild(name);
    info.appendChild(knownFor);
    info.appendChild(favoriteButton);
    info.appendChild(removefavoriteButton);

    actorCard.appendChild(image);
    actorCard.appendChild(info);
    container.appendChild(actorCard);
  });
}

function addToFavorites(actor) {
  const formData = new FormData();
  formData.append('name', actor.name);
  formData.append(
    'known_for',
    actor.known_for
      ? actor.known_for.map((item) => item.title || item.name).join(', ')
      : ''
  );

  fetch('../php/favorite_actors.php', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to add actor to favorites.');
      }
      return response.text();
    })
    .then((result) => {
      alert('Actor added to favorites successfully!');
      console.log(result);
    })
    .catch((error) => {
      console.error('Error adding to favorites:', error);
      alert('An error occurred while adding to favorites.');
    });
}

function sendToPHP(actors) {
  const form = document.createElement('form');
  form.action = '../php/actors.php';
  form.method = 'POST';

  actors.forEach((actor, index) => {
    const inputName = document.createElement('input');
    inputName.type = 'hidden';
    inputName.name = `actor[${index}][name]`;
    inputName.value = actor.name;
    form.appendChild(inputName);

    const inputKnownFor = document.createElement('input');
    inputKnownFor.type = 'hidden';
    inputKnownFor.name = `actor[${index}][known_for]`;
    inputKnownFor.value = actor.known_for
      ? actor.known_for.map((item) => item.title || item.name).join(', ')
      : '';
    form.appendChild(inputKnownFor);
  });

  document.body.appendChild(form);
  sessionStorage.setItem('formSent', 'true');
  form.submit();
}

// Favori aktörlerden çıkar
function removeFromFavoriteActors(actor) {
  const formData = new FormData();
  formData.append('name', actor.name);

  fetch('../php/remove_favorite_actor.php', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Aktör favorilerden çıkarılamadı.');
      }
      return response.text();
    })
    .then(result => {
      alert('Aktör favorilerden başarıyla çıkarıldı!');
      console.log(result);
    })
    .catch(error => {
      console.error('Favorilerden çıkarma hatası:', error);
      alert('Bir hata oluştu, lütfen tekrar deneyin.');
    });
}