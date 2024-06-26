// подключение модулей и функций
import {
  deleteCardFromServer,
  deleteLikeOnCard,
  putLikeOnCard,
} from "./api.js";
import * as objects from "./index.js";
import { openPopup, renderLoading, closePopup } from "./modal.js";

let currentDeleteButton = null;

// удаление карточки со страницы
export function deleteCard(card) {
  card.remove();
}

// смена состояния лайка
export function toggleLikeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function deleteCardFromServerAndPage(button, card_id) {
  deleteCardFromServer(card_id)
    .then(() => deleteCard(button.closest(".card")))
    .catch((err) => console.error("Проблема с удалением карточки: ", err))
    .finally(() => {
      closePopup(objects.confirmPopup);
    });
}

// создание карточки
export function createCard(
  link,
  name,
  likes, // массив лайков
  cardOwnerId, // id юзера
  cardId, // id карточки
  deleteCard,
  toggleLikeCard,
  handleImageClick
) {
  const card = objects.cardsTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardLikeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardLikes = card.querySelector(".card__like-counter");

  cardImage.src = link;
  cardImage.alt = cardTitle.textContent = name;
  cardLikes.textContent = likes.length;

  cardImage.addEventListener("click", objects.handleImageClick);
  cardLikeButton.addEventListener("click", (evt) => {
    // сократил дублирование из подсказки с ревью
    // очень крутой метод, спасибо!
    const likeMethod = evt.target.classList.contains(
      "card__like-button_is-active"
    )
      ? deleteLikeOnCard
      : putLikeOnCard;
    likeMethod(cardId)
      .then((res) => {
        cardLikes.textContent = res.likes.length;
        toggleLikeCard(evt);
      })
      .catch((err) =>
        console.log("Проблема постановки или снятия лайка: ", err)
      );
  });

  deleteButton.addEventListener("click", (evt) => {
    currentDeleteButton = evt.target;
    deleteCardFromServerAndPage(currentDeleteButton, cardId);
  });

  /* Удаление по попапу еще будет дорабатываться */

  likes.forEach((owner) => {
    if (owner._id === objects.userId)
      cardLikeButton.classList.add("card__like-button_is-active");
  });

  if (!(cardOwnerId === objects.userId)) {
    deleteButton.style.display = "none";
  }

  return card;
}
