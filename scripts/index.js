// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const addCard = (link, name, cardDelete) => {
  const card = cardsTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');

  let cardImage = card.querySelector('.card__image');
  cardImage.src = link;

  let cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = name;

  deleteButton.addEventListener('click', function(evt) {
    cardDelete(evt);
  });

  return card;
}

const cardDelete = evt => {
  let actionTarget = evt.target.closest('.places__item');
  actionTarget.remove();
}

initialCards.forEach((card) => {
  cardsList.append(addCard(card.link, card.name, cardDelete));
});