// конфигурация запроса
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-10",
  headers: {
    authorization: "099009bb-f324-40eb-8de7-a3e92491c8ff",
    "Content-Type": "application/json",
  },
};

// функция автоматической проверки статуса ответа
function checkResponse(res) {
  if (!res.ok) {
    /* прокидываю ошибку со статусом ответа */
    throw new Error(res.status);
  } else {
    return res.json();
  }
}

// запрос данных юзера с сервера
export function getUsersInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

// запрос карточек с сервера
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

// // обновление данных юзера на сервере
export function patchUsersInfo(userName, userDescription) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userDescription,
    }),
  }).then((res) => checkResponse(res));
}

// добавлние новой карточки на сервер
export function addNewCardToServer(newCardName, newCardUrl) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: newCardName,
      link: newCardUrl,
    }),
  }).then((res) => checkResponse(res));
}

// удаление карточки с сервера
export function deleteCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

// добавляет юзера в список лайков на сервере
export function putLikeOnCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

// удаляет юзера из списка лайков на сервере
export function deleteLikeOnCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

// обновление аватара юзера на сервере
export function updateAvatarOnServer(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then((res) => checkResponse(res));
}
