document.addEventListener('DOMContentLoaded', () => {
    const currentLanguage = document.getElementById('currentLanguage').value;
    fetchMarketInfo(currentLanguage);
});

function fetchMarketInfo(currentLanguage) {
    fetch('/marketInfo')
        .then(response => response.json())
        .then(data => {
            displayMarketInfo(data, currentLanguage);
        })
        .catch(error => {
            console.error('Error fetching market info:', error);
        });
}

function displayMarketInfo(marketInfos, currentLanguage) {
    const container = document.getElementById('marketInfo');
    container.innerHTML = '';

    marketInfos.forEach((info, index) => {
        const card = document.createElement('div');
        card.className = 'market-item';

        const carouselId = `carouselExample${index}`;
        const carousel = document.createElement('div');
        carousel.className = 'carousel slide';
        carousel.setAttribute('id', carouselId);
        carousel.setAttribute('data-ride', 'carousel');

        const carouselInner = document.createElement('div');
        carouselInner.className = 'carousel-inner';

        info.images.forEach((img, imgIndex) => {
            const imgDiv = document.createElement('div');
            imgDiv.className = `carousel-item ${imgIndex === 0 ? 'active' : ''}`;
            const imgTag = document.createElement('img');
            imgTag.className = 'd-block w-100';
            imgTag.src = img;
            imgDiv.appendChild(imgTag);
            carouselInner.appendChild(imgDiv);
        });

        const prevControl = document.createElement('a');
        prevControl.className = 'carousel-control-prev';
        prevControl.href = `#${carouselId}`;
        prevControl.setAttribute('role', 'button');
        prevControl.setAttribute('data-slide', 'prev');
        prevControl.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';

        const nextControl = document.createElement('a');
        nextControl.className = 'carousel-control-next';
        nextControl.href = `#${carouselId}`;
        nextControl.setAttribute('role', 'button');
        nextControl.setAttribute('data-slide', 'next');
        nextControl.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';

        carousel.appendChild(carouselInner);
        carousel.appendChild(prevControl);
        carousel.appendChild(nextControl);
        card.appendChild(carousel);

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const name = document.createElement('h5');
        name.className = 'card-title';
        name.innerText = info.names[currentLanguage];
        cardBody.appendChild(name);

        const description = document.createElement('p');
        description.className = 'card-text';
        description.innerText = info.descriptions[currentLanguage];
        cardBody.appendChild(description);

        card.appendChild(cardBody);
        container.appendChild(card);
    });
}





