import * as objects from "./index.js";

function closePopupByOverlay(evt) {
  if (evt.target.classList.contains("popup")) closePopup();
}

export function closePopupByEsc(evt) {
  if (evt.key === "Escape") closePopup();
}

export function closePopupByButton(evt) {
  if (evt.target.classList.contains("popup__close")) closePopup();
}

export function openPopup(evt) {
  if (evt.target === objects.editButton) {
    objects.editPopup.classList.remove("popup_is-animated");
    objects.editPopup.classList.add("popup_is-opened");
  }
  if (evt.target === objects.addButton) {
    objects.addPopup.classList.remove("popup_is-animated");
    objects.addPopup.classList.add("popup_is-opened");
  }
  if (evt.target.classList.contains("card__image")) {
    objects.imagePopup.classList.remove("popup_is-animated");
    objects.imagePopup.classList.add("popup_is-opened");
    objects.imagePopupPicture.src = evt.target.src;
    objects.imagePopupCaption.textContent = evt.target.alt;
  }
  window.addEventListener("click", closePopupByOverlay);
}

export function closePopup() {
  objects.editPopup.classList.add("popup_is-animated");
  objects.editPopup.classList.remove("popup_is-opened");
  objects.addPopup.classList.add("popup_is-animated");
  objects.addPopup.classList.remove("popup_is-opened");
  objects.imagePopup.classList.add("popup_is-animated");
  objects.imagePopup.classList.remove("popup_is-opened");
  window.removeEventListener("click", closePopupByOverlay);
}
