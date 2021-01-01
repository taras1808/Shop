import Config from '../config.json'
import { handleResponse } from '../_utils/handle-response'

export const accountService = {
    getFavourite,
    addFavourite,
    removeFavourite,
}

function getFavourite(currentUser, query) {
    return fetch(`${Config.HOST}/api/accounts/${currentUser.id}/favourite${query ?? ''}`)
        .then(handleResponse)
}

function addFavourite(currentUser, item) {
    return fetch(`${Config.HOST}/api/accounts/${currentUser.id}/favourite`, {
            method: 'POST',
            body: JSON.stringify({ productId: item[item.length - 1].id }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(handleResponse)
}

function removeFavourite(currentUser, item) {
    return fetch(`${Config.HOST}/api/accounts/${currentUser.id}/favourite`, {
            method: 'DELETE',
            body: JSON.stringify({ productId: item[item.length - 1].id }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(handleResponse)
}
