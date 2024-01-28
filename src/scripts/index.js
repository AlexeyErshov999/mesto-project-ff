import "../pages/index.css";
import { initialCards } from "./cards.js";
import { deleteCard, createCard, createNewCard, likeCard } from "./card.js";
import {
  openPopup,
  closePopup,
  closePopupByEsc,
  closePopupByButton,
} from "./modal.js";

// SEARCHING REQUIRED OBJECTS
export const cardsList = document.querySelector(".places__list");
export const cardsTemplate = document.querySelector("#card-template").content;
export const editPopup = document.querySelector(".popup_type_edit");
export const addPopup = document.querySelector(".popup_type_new-card");
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const closeButton = document.querySelector(".popup__close");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const editForm = document.forms["edit-profile"];
export const editFormName = editForm.name;
export const editFormDescription = editForm.description;
export const addForm = document.forms["new-place"];
export const addFormName = addForm["place-name"];
export const addFormLink = addForm.link;
export const imagePopup = document.querySelector(".popup_type_image");
export const imagePopupPicture = imagePopup.querySelector(".popup__image");
export const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// ADD INITIAL CARDS
initialCards.forEach((card) => {
  cardsList.append(createCard(card.link, card.name, deleteCard));
});

// INITIAL INFORMATION IN EDIT FORM
editFormName.value = profileTitle.textContent;
editFormDescription.value = profileDescription.textContent;

// SUBMIT EDIT FORM
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editFormName.value;
  profileDescription.textContent = editFormDescription.value;
  closePopup();
}

// LISTENERS
document.addEventListener("click", openPopup);
document.addEventListener("keydown", closePopupByEsc);
document.addEventListener("click", closePopupByButton);
document.addEventListener("click", likeCard);
editForm.addEventListener("submit", handleFormSubmit);
addForm.addEventListener("submit", createNewCard);
