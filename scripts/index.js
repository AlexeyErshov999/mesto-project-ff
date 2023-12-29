function deleteCard(evt) {
  const actionTarget = evt.target.closest('.places__item');
  actionTarget.remove();
};

const cardsTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const createCard = (link, name, deleteCard) => {
  const card = cardsTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');

  const cardImage = card.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;

  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = name;

  deleteButton.addEventListener('click', function(evt) {
    deleteCard(evt);
  });

  return card;
};

initialCards.forEach((card) => {
  cardsList.append(createCard(card.link, card.name, deleteCard));
});

/* searching popups */
const editProfilePopup = document.querySelector('.popup_type_edit');
const createNewCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

/* searching image popup fields*/
let imagePopupPicture = document.querySelector('.popup__image');
let imagePopupDescription = document.querySelector('.popup__caption');

/* open popup function */
const openPopup = evt => {
  if (evt.target.classList.contains('profile__edit-button')) {
    editProfilePopup.classList.add('popup_is-opened');
  }
  if (evt.target.classList.contains('profile__add-button')) {
    createNewCardPopup.classList.add('popup_is-opened');
  }
  if (evt.target.classList.contains('card__image')) {
    // console.log(evt.name);
    imagePopup.classList.add('popup_is-opened');
    // imagePopupPicture = evt.src;
    // imagePopupDescription = evt.textContent;
  }
};

/* close popup function */
const closePopup = () => {
    imagePopup.classList.remove('popup_is-opened');
    createNewCardPopup.classList.remove('popup_is-opened');
    editProfilePopup.classList.remove('popup_is-opened');
}

/* information in profile popup */
/* searching profile form and profile form fields */
const editProfileForm = document.forms['edit-profile'];

const profileNameField = editProfileForm.name;
const profileDescriptionField = editProfileForm.description;

/* searching name and description values */
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

/* add name and description values to edit profile form */
profileNameField.value = profileName.textContent;
profileDescriptionField.value = profileDescription.textContent;

/* edit profile information */
// Находим форму в DOM
const formElement = editProfileForm;// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = profileNameField;// Воспользуйтесь инструментом .querySelector()
const jobInput = profileDescriptionField;// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function profileEditFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  let enteredName = nameInput.value;
  let enteredJob = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
  profileName.textContent = enteredName;
  profileDescription.textContent = enteredJob;

  closePopup();
}

// function openImagePopup(evt) {
//   imagePopupPicture.src = evt.link;

// }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', profileEditFormSubmit); 

/* creating a new card and adding it to front */
const creatingNewCardForm = document.forms['new-place'];

function creatingNewCardFormSubmit(evt, likeCard) {
  evt.preventDefault();

  const newPlaceNameField = creatingNewCardForm['place-name'];
  const newPlaceImageLinkField = creatingNewCardForm['link'];

  let enteredPlaceName = newPlaceNameField.value;
  let enteredImageLink = newPlaceImageLinkField.value;

  cardsList.prepend(createCard(enteredImageLink, enteredPlaceName, deleteCard));

  newPlaceNameField.value = '';
  newPlaceImageLinkField.value = '';

  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
creatingNewCardForm.addEventListener('submit', creatingNewCardFormSubmit);

/* like card function */
const likeButton = document.querySelector('.card__like-button');

const likeCard = evt => {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
};

/* listeners */

document.addEventListener('click', openPopup);

document.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup__close')) {
    closePopup();
  }
});

document.addEventListener('keypress', function(evt) {
  if (evt.key === '1') {
    closePopup();
  }
});/* CHECK!!! */

document.addEventListener('click', likeCard);