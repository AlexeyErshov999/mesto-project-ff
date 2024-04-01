import { profileFormSubmitButton } from "./index.js"

function showInputError(formElement, formInput, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError(formElement, formInput, validationConfig) {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationConfig.errorClass);
}

function isValid(formElement, formInput, validationConfig) {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, formInput, validationConfig);
  }
}

function hasInvalidInput(inputList) {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

function setEventListeners(formElement, validationConfig) {
  const inputsList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  /* проверка для того, чтобы при открытии попапа редактирования
  профиля кнопка была активна */
  if (buttonElement !== profileFormSubmitButton)
    toggleButtonState(inputsList, buttonElement, validationConfig);
  inputsList.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(formElement, input, validationConfig);
      toggleButtonState(inputsList, buttonElement, validationConfig);
    });
  });
}

export function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((form) => {
    setEventListeners(form, validationConfig);
  });
}

export function clearValidation(formElement, validationConfig) {
  const inputList = formElement.querySelectorAll(
    validationConfig.inputSelector
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  inputList.forEach((input) => {
    hideInputError(formElement, input, validationConfig);
  });
  toggleButtonState(inputList, buttonElement, validationConfig);
}
