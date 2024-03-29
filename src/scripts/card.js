// подключение модулей и функций
import {
  deleteCardFromServer,
  deleteLikeOnCard,
  putLikeOnCard,
} from "./api.js";
import * as objects from "./index.js";
import { openPopup, renderLoading, closePopup } from "./modal.js";

// удаление карточки со страницы
export function deleteCard(card) {
  card.remove();
}

// смена состояния лайка
export function toggleLikeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// открытие попапа-картинки
export function handleImageClick(evt) {
  objects.imagePopupPicture.src = evt.target.src;
  objects.imagePopupCaption.textContent = objects.imagePopupPicture.alt =
    evt.target.alt;
  openPopup(objects.imagePopup);
}

function deleteCardFromServerAndPage(button, card_id) {
  renderLoading(true);
  deleteCardFromServer(card_id)
    .then(() => deleteCard(button.closest(".card")))
    .catch((err) => console.error("Проблема с удалением карточки: ", err))
    .finally(() => {
      renderLoading(false);
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

  cardImage.addEventListener("click", handleImageClick);
  cardLikeButton.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card__like-button_is-active")) {
      toggleLikeCard(evt);
      deleteLikeOnCard(cardId)
        .then((res) => {
          cardLikes.textContent = res.likes.length;
        })
        .catch((err) => console.error("Проблема со снятием лайка: ", err));
    } else {
      toggleLikeCard(evt);
      putLikeOnCard(cardId)
        .then((res) => (cardLikes.textContent = res.likes.length))
        .catch((err) => console.error("Проблема с постановкой лайка: ", err));
    }
  });

  let currentDeleteButton = null;

  deleteButton.addEventListener("click", (evt) => {
    currentDeleteButton = evt.target;
    openPopup(objects.confirmPopup);

    objects.popupConfirmButton.addEventListener("click", function () {
      deleteCardFromServerAndPage(currentDeleteButton, cardId);
    });

    window.addEventListener("keydown", (evt) => {
      if (evt.key === "Enter") {
        evt.preventDefault();
        deleteCardFromServerAndPage(currentDeleteButton, cardId);
      }
    });
  });

  likes.forEach((owner) => {
    if (owner._id === objects.userId)
      cardLikeButton.classList.add("card__like-button_is-active");
  });

  if (!(cardOwnerId === objects.userId)) {
    deleteButton.style.display = "none";
  }

  return card;
}
