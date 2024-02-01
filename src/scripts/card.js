import * as objects from "./index.js";
import { closePopup, openPopup } from "./modal.js";

export function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function handleImageClick(evt) {
  objects.imagePopupPicture.src = evt.target.src;
  objects.imagePopupCaption.textContent = objects.imagePopupPicture.alt =
    evt.target.alt;
  openPopup(objects.imagePopup);
}

export function createCard(link, name, deleteCard, likeCard, handleImageClick) {
  const card = objects.cardsTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardLikeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  cardImage.src = link;
  cardImage.alt = cardTitle.textContent = name;
  cardImage.addEventListener("click", handleImageClick);
  cardLikeButton.addEventListener("click", likeCard);
  deleteButton.addEventListener("click", deleteCard);
  return card;
}

export function createNewCard(evt) {
  evt.preventDefault();
  objects.cardsList.prepend(
    createCard(
      objects.addCardFormLink.value,
      objects.addCardFormName.value,
      deleteCard,
      likeCard,
      handleImageClick
    )
  );
  closePopup(objects.addPopup);
  objects.addCardForm.reset();
}
