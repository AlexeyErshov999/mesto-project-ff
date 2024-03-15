export const getUsersInfo = () => fetch('https://nomoreparties.co/v1/wff-cohort-8/users/me', {
    headers: {
        authorization: 'bbde8bf8-a634-4ece-bccd-5d9c5241c2de'
    }
})
    .then(response => response.json())
    .then(userInfo => console.log(userInfo))

export const getInitialCards = () => fetch('https://nomoreparties.co/v1/wff-cohort-8/cards', {
    headers: {
        authorization: 'bbde8bf8-a634-4ece-bccd-5d9c5241c2de'
    }
})
    .then(response => response.json())
    .then(startCards => console.log(startCards))

export const patchUsersInfo = () => fetch('https://nomoreparties.co/v1/wff-cohort-8/users/me', {
    method: 'PATCH', 
    headers: {
        authorization: 'bbde8bf8-a634-4ece-bccd-5d9c5241c2de',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'Alexey Ershov',
        about: 'Programmer'
    })
}) 