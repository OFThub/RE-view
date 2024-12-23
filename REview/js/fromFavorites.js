fetch('../php/fromFavorites.php')
.then(response => response.json())
.then(data => {
    const container = document.getElementById('filmContainer');
    
    if (data.length > 0) {
        data.forEach(film => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            card.innerHTML = `
                <h3>${film.title}</h3>
                <p>Puan: ${film.rating}</p>
            `;
            
            container.appendChild(card);
        });
    } else {
        container.innerHTML = '<p>Henüz film eklenmemiş.</p>';
    }
})
.catch(error => console.error('Hata:', error));

// Aktörler için veri çekme ve ekleme
fetch('../php/fromActors.php')
.then(response => response.json())
.then(data => {
    const container = document.getElementById('actorContainer');
    
    if (data.length > 0) {
        data.forEach(actor => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            card.innerHTML = `
                <h3>${actor.actor_name}</h3>
                <p>Known For: ${actor.known_for}</p>
            `;
            
            container.appendChild(card);
        });
    } else {
        container.innerHTML = '<p>Henüz aktör eklenmemiş.</p>';
    }
})
.catch(error => console.error('Hata:', error));

// Yönetmenler için veri çekme ve ekleme
fetch('../php/fromDirectors.php')
.then(response => response.json())
.then(data => {
    const container = document.getElementById('directorContainer');
    
    if (data.length > 0) {
        data.forEach(director => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            card.innerHTML = `
                <h3>${director.director_name}</h3>
                <p>Filmleri: ${director.directed_movie}</p>
            `;
            
            container.appendChild(card);
        });
    } else {
        container.innerHTML = '<p>Henüz yönetmen eklenmemiş.</p>';
    }
})
.catch(error => console.error('Hata:', error));