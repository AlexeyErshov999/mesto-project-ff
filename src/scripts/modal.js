import * as objects from "./index.js";

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.remove("popup_is-animated");
}

export function closePopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.remove("popup_is-opened");
}

function closePopupByOverlay(evt) {
  if (evt.target.classList.contains("popup")) closePopup();
}

export function closePopupByEsc(evt) {
  if (evt.key === "Escape") closePopup();
}

export function closePopupByButton(evt) {
  if (evt.target.classList.contains("popup__close")) closePopup();
}
