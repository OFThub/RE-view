fetch('../php/fromReviews.php')
.then(response => response.json())
.then(data => {
    const container = document.getElementById('reviewContainer');
    
    if (data.length > 0) {
        data.forEach(review => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            card.innerHTML = `
                <h3>${review.title}</h3>
                <p>Puan: ${review.rating}</p>
                <p>Eleştiri: ${review.review}</p>
            `;
            
            container.appendChild(card);
        });
    } else {
        container.innerHTML = '<p>Henüz film eklenmemiş.</p>';
    }
})
.catch(error => console.error('Hata:', error));

fetch('../php/fromWatchList.php')
.then(response => response.json())
.then(data => {
    const container = document.getElementById('listContainer');
    
    if (data.length > 0) {
        data.forEach(watchList => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            card.innerHTML = `
                <h3>${watchList.name}</h3>
            `;
            
            container.appendChild(card);
        });
    } else {
        container.innerHTML = '<p>Henüz film eklenmemiş.</p>';
    }
})
.catch(error => console.error('Hata:', error));