import { handleResponse } from '../_utils/handle-response'
import Config from '../config.json'


export const searchService = {
    getFilters,
    getProducts
}

function getFilters(query) {
    return fetch(`${Config.HOST}/api/search/filters/${query}`)
        .then(handleResponse)
}

function getProducts(query) {
    return fetch(`${Config.HOST}/api/search/products/${query}`)
        .then(handleResponse)
}
