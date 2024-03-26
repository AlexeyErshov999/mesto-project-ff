const validationConfiguration = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function showInputError(formElement, formInput, errorMessage) {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(validationConfiguration.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfiguration.errorClass);
}

function hideInputError(formElement, formInput) {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(validationConfiguration.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationConfiguration.errorClass);
}

function isValid(formElement, formInput) {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
}

function hasInvalidInput(inputList) {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfiguration.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfiguration.inactiveButtonClass);
  }
}

function setEventListeners(formElement) {
  const inputsList = Array.from(
    formElement.querySelectorAll(validationConfiguration.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfiguration.submitButtonSelector
  );
  toggleButtonState(inputsList, buttonElement);
  inputsList.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(formElement, input);
      toggleButtonState(inputsList, buttonElement);
    });
  });
}

export function enableValidation() {
  const formList = Array.from(
    document.querySelectorAll(validationConfiguration.formSelector)
  );
  formList.forEach((form) => {
    setEventListeners(form);
  });
}

export function clearValidation(formElement) {
  const inputList = formElement.querySelectorAll(
    validationConfiguration.inputSelector
  );
  const buttonElement = formElement.querySelector(
    validationConfiguration.submitButtonSelector
  );
  inputList.forEach((input) => {
    hideInputError(formElement, input);
  });
  toggleButtonState(inputList, buttonElement);
}
