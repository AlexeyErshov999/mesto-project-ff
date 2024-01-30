import "../pages/index.css";
import { initialCards } from "./cards.js";
import {
  deleteCard,
  createCard,
  createNewCard,
  likeCard,
  handleImageClick,
} from "./card.js";
import { openPopup, closePopup, closePopupByEsc } from "./modal.js";

// SEARCHING REQUIRED OBJECTS
export const cardsList = document.querySelector(".places__list");
export const cardsTemplate = document.querySelector("#card-template").content;
const popups = document.querySelectorAll(".popup");
export const editPopup = document.querySelector(".popup_type_edit");
export const addPopup = document.querySelector(".popup_type_new-card");
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const closeButtons = document.querySelectorAll(".popup__close");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileForm = document.forms["edit-profile"];
export const profileFormName = profileForm.name;
export const profileFormDescription = profileForm.description;
export const addCardForm = document.forms["new-place"];
export const addCardFormName = addCardForm["place-name"];
export const addCardFormLink = addCardForm.link;
export const imagePopup = document.querySelector(".popup_type_image");
export const imagePopupPicture = imagePopup.querySelector(".popup__image");
export const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// ADD INITIAL CARDS
initialCards.forEach((card) => {
  cardsList.append(
    createCard(card.link, card.name, deleteCard, likeCard, handleImageClick)
  );
});

// SUBMIT EDIT FORM
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;
  closePopup(editPopup);
}

// LISTENERS
editButton.addEventListener("click", function () {
  profileFormName.value = profileTitle.textContent;
  profileFormDescription.value = profileDescription.textContent;
  openPopup(editPopup);
  document.addEventListener("keydown", closePopupByEsc);
});
addButton.addEventListener("click", function () {
  openPopup(addPopup);
  document.addEventListener("keydown", closePopupByEsc);
});
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) closePopup();
    if (evt.target.classList.contains("popup__close")) closePopup();
  });
  document.removeEventListener("keydown", closePopupByEsc);
});
profileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", createNewCard);
