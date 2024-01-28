import * as objects from "./index.js";
import { closePopup } from "./modal.js";

export function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

export function createCard(link, name, deleteCard) {
  const card = objects.cardsTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  cardImage.src = link;
  cardImage.alt = cardTitle.textContent = name;
  deleteButton.addEventListener("click", function (evt) {
    deleteCard(evt);
  });
  return card;
}

export function createNewCard(evt, likeCard, openPopup) {
  evt.preventDefault();
  objects.cardsList.prepend(
    createCard(objects.addFormLink.value, objects.addFormName.value, deleteCard)
  );
  objects.addFormLink.value = objects.addFormName.value = "";
  closePopup();
}

export function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button"))
    evt.target.classList.toggle("card__like-button_is-active");
}
