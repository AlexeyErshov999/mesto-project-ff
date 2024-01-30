export function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  document.addEventListener("keydown", closePopupByEsc);
}

export function closePopup() {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup) {
    openedPopup.classList.remove("popup_is-animated");
    setTimeout(() => {
      openedPopup.classList.remove("popup_is-opened");
    }, 1);
    document.removeEventListener("keydown", closePopupByEsc);
  }
}

export function closePopupByEsc(evt) {
  if (evt.key === "Escape") closePopup();
}
