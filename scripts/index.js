// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const deleteCard = evt => {
  const actionTarget = evt.target.closest('.places__item');
  actionTarget.remove();
}

const cardsTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const createCard = (link, name, deleteCard) => {
  const card = cardsTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');

  const cardImage = card.querySelector('.card__image');
  cardImage.src = link;
  // добавление alt
  cardImage.alt = name;

  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = name;

  deleteButton.addEventListener('click', function(evt) {
    deleteCard(evt);
  });

  return card;
}

initialCards.forEach((card) => {
  cardsList.append(createCard(card.link, card.name, deleteCard));
});