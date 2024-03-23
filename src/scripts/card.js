// подключение модулей и функций
import {
  addNewCardToServer,
  deleteCardFromServer,
  deleteLikeOnCard,
  putLikeOnCard,
} from "./api.js";
import * as objects from "./index.js";
import { closePopup, openPopup } from "./modal.js";

// удаление карточки со страницы
export function deleteCard(evt) {
  evt.target.closest(".card").remove();
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
        .then((res) => (cardLikes.textContent = res.likes.length))
        .catch((res) => console.log("Error: " + res.status));
    } else {
      toggleLikeCard(evt);
      putLikeOnCard(cardId).then(
        (res) => (cardLikes.textContent = res.likes.length)
      );
    }
  });
  deleteButton.addEventListener("click", (evt) => {
    openPopup(objects.confirmDeleteCardPopup);
    // deleteCard(evt);
    // deleteCardFromServer(cardId).catch((res) => {
    //   return Promise.reject("Error: " + res.status);
    // });
  });

  if (!(cardOwnerId === objects.userId)) {
    deleteButton.style.display = "none";
    deleteButton.removeEventListener("click", (evt) => deleteCard(evt));
  }

  return card;
}

export function createNewCard(evt) {
  evt.preventDefault();
  addNewCardToServer(
    objects.addCardFormName.value,
    objects.addCardFormLink.value
  )
    .then((card) => {
      console.log(card);
      objects.cardsList.prepend(
        createCard(
          objects.addCardFormLink.value,
          objects.addCardFormName.value,
          card.likes,
          deleteCard,
          toggleLikeCard,
          handleImageClick
        )
      );
    })
    .catch((res) => console.log("Error: " + res.status));
  closePopup(objects.addPopup);
  objects.addCardForm.reset();
}
