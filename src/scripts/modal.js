export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.remove("popup_is-animated");
}

export function closePopup() {
  const openedPopup = document.querySelector(".popup_is-opened");
  openedPopup.classList.add("popup_is-animated");
  openedPopup.classList.remove("popup_is-opened");
}

export function closePopupByEsc(evt) {
  if (evt.key === "Escape") closePopup();
}
