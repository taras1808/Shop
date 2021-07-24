import Config from '../config.json'
import { handleResponse } from '../_utils/handle-response'
import { authHeader } from '../_utils/auth-header'

export const accountService = {
    getFavourite,
    addFavourite,
    removeFavourite,
}

function getFavourite(query) {
    return fetch(`${Config.HOST}/api/accounts/favourite${query ?? ''}`, { 
            headers: authHeader()
        })
        .then(handleResponse)
}

function addFavourite(item) {
    return fetch(`${Config.HOST}/api/accounts/favourite`, {
            method: 'POST',
            body: JSON.stringify({ productId: item[item.length - 1].id }),
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            }
        })
        .then(handleResponse)
}

function removeFavourite(item) {
    return fetch(`${Config.HOST}/api/accounts/favourite`, {
            method: 'DELETE',
            body: JSON.stringify({ productId: item[item.length - 1].id }),
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            }
        })
        .then(handleResponse)
}
