const cardsContainer = document.querySelector('.cards');
const cardData = [
    'img-1.png', 'img-2.png', 'img-3.png', 'img-4.png', 'img-5.png', 'img-6.png',
    'img-5.png', 'img-6.png', 'img-1.png', 'img-2.png', 'img-3.png', 'img-4.png'
];

cardData.forEach((imgSrc, index) => {
    const cardElement = document.createElement('li');
    cardElement.className = 'card';

    const frontView = document.createElement('div');
    frontView.className = 'view front-view';
    const frontImg = document.createElement('img');
    frontImg.src = 'images/que_icon.svg';
    frontImg.alt = 'icon';
    frontView.appendChild(frontImg);

    const backView = document.createElement('div');
    backView.className = 'view back-view';
    const backImg = document.createElement('img');
    backImg.src = 'images/' + imgSrc;
    backImg.alt = 'card-img';
    backView.appendChild(backImg);

    cardElement.appendChild(frontView);
    cardElement.appendChild(backView);
    cardsContainer.appendChild(cardElement);
});
