function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`${inputElement.id}-error`);
    console.log(errorElement)
    inputElement.classList.add('popup__input_type-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type-error');
    errorElement.textContent = '';
    errorElement.classList.remove('form__input-error_active');
}

function isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement);
    } else {
        hideInputError(formElement, inputElement);
    }
}

function setEventListeners(formElement) {
    const inputsList = formElement.querySelectorAll('.popup__input');
    inputsList.forEach(input => {
        input.addEventListener('input', () => {
            isValid(formElement, input);
        })
    })
}

export function enableValidation() {
    const formsList = document.querySelectorAll('.popup__form');
    formsList.forEach((form) => {
        setEventListeners(form);
    })
}