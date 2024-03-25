// TODO: валидация
// TODO: деплой
// TODO: проверка действительности изображения
// TODO: РЕФАКТОРИНГ ВСЕХ ФАЙЛОВ!!!
// FIXME: сохранение состояния лайка
// FIXME: hover значок редактирования аватара



// подключение модулей и функций
import "../pages/index.css"; // импорт главного файла стилей для webpack
import {
  deleteCard,
  createCard,
  createNewCard,
  handleImageClick,
  toggleLikeCard,
} from "./card.js";
import { openPopup, closePopup, renderLoading } from "./modal.js";
import {
  addNewCardToServer,
  checkImageUrl,
  deleteCardFromServer,
  getInitialCards,
  getUsersInfo,
  patchUsersInfo,
  updateAvatarOnServer,
} from "./api.js";
import { enableValidation } from "./validation.js";

// поиск объектов DOM
export const cardsList = document.querySelector(".places__list");
export const cardsTemplate = document.querySelector("#card-template").content;
const popups = document.querySelectorAll(".popup");
export const editPopup = document.querySelector(".popup_type_edit");
export const addPopup = document.querySelector(".popup_type_new-card");
export const confirmPopup = document.querySelector(
  ".popup_type_confirm-card-delete"
);
export const confirmDeleteButton =
  confirmPopup.querySelector(".popup__button");
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
const avatarForm = document.forms["new-avatar"];
const avatarFormUrl = avatarForm["avatar-url"];
export const imagePopup = document.querySelector(".popup_type_image");
export const imagePopupPicture = imagePopup.querySelector(".popup__image");
export const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const profileImage = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup_type_change-profile-photo");
export const popupSaveButtons = document.querySelectorAll(".popup__button");
export const popupConfirmButton = confirmPopup.querySelector(".popup__confirm-button");
export const confirmForm = document.forms["confirm-form"];


export let userId = null; // Запоминаем id пользователя

// проверяем что данные пользователя и массив карточек точно пришли
Promise.all([getUsersInfo(), getInitialCards()]).then(
  ([usersInfo, cardsData]) => {
    userId = usersInfo._id; // получаем id юзера
    profileTitle.textContent = usersInfo.name; // вставляем в шапку информацию о пользователе
    profileDescription.textContent = usersInfo.about;
    profileImage.style.backgroundImage = `url('${usersInfo.avatar}')`;

    // добавляем карточки с сервера
    cardsData.forEach((card) => {
      cardsList.append(
        createCard(
          card.link,
          card.name,
          card.likes, // массив лайков
          card.owner._id, // id создателя
          card._id, // id карточки
          deleteCard,
          toggleLikeCard,
          handleImageClick
        )
      );
    });
  }
);
// TODO: обработать ошибку

// отправка формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  patchUsersInfo(profileFormName.value, profileFormDescription.value)
    // TODO: обработать ошибку
    .finally(() => {
      renderLoading(false);
      closePopup(editPopup);
    });
  profileTitle.textContent = profileForm.name.value; /* заполняем данные шапки 
  из полей формы, чтоб не запрашивать данные с сервера */
  profileDescription.textContent = profileForm.description.value;
}

// отправка формы смены аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  profileImage.style.backgroundImage = `url("${avatarFormUrl.value}")`;
  updateAvatarOnServer(avatarFormUrl.value)
    // TODO: обработать ошибку
    .finally(() => {
      renderLoading(false);
      closePopup(avatarForm);
    });
}

// отправка формы добавления карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  addNewCardToServer(addCardFormName.value, addCardFormLink.value)
    .then((card) => {
      cardsList.prepend(
        createCard(
          addCardFormLink.value,
          addCardFormName.value,
          card.likes,
          card.owner._id,
          card._id,
          deleteCard,
          toggleLikeCard,
          handleImageClick
        )
      );
    })
    // TODO: обработать ошибку
    .finally(() => {
      renderLoading(false);
      addCardForm.reset();
      closePopup(addCardForm);
    });
}

// слушатели
// открытие/отправка формы профиля
editButton.addEventListener("click", function () {
  profileFormName.value = profileTitle.textContent;
  profileFormDescription.value = profileDescription.textContent;
  openPopup(editPopup);
});
profileForm.addEventListener("submit", handleProfileFormSubmit);

// открытие/отправка формы создания карточки
addButton.addEventListener("click", function () {
  openPopup(addPopup);
});
addCardForm.addEventListener("submit", handleNewCardFormSubmit);

// открытие/отправка формы смены аватара
profileImage.addEventListener("click", function () {
  openPopup(avatarPopup);
});
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// отправка формы подтверждения удаления

// слушатель закрытия попапов по оверлею, кнопке
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) closePopup();
    if (evt.target.classList.contains("popup__close")) closePopup();
  });
});

enableValidation();
