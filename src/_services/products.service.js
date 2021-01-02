import { handleResponse } from '../_utils/handle-response'
import Config from '../config.json'


export const productsService = {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductOptions,
}

function getProducts(category) {
    return fetch(`${Config.HOST}/api/products/${category ? `?categoryId=${category}` : ''}`)
        .then(handleResponse)
}

function createProduct(formData) {
    return fetch(`${Config.HOST}/api/products`, {
            method: 'POST',
            body: formData
        })
        .then(handleResponse)
}

function getProduct(productId, opts) {
    return fetch(`${Config.HOST}/api/products/${productId}/`, opts)
        .then(handleResponse)
}

function updateProduct(product, formData) {
    return fetch(`${Config.HOST}/api/products/${product}/`, {
            method: 'PUT',
            body: formData
        })
        .then(handleResponse)
}

function getProductOptions(product) {
    return fetch(`${Config.HOST}/api/products/${product}/options/`)
        .then(handleResponse)
}

function deleteProduct(product) {
    return fetch(`${Config.HOST}/api/products/${product}/`, { 
            method: 'DELETE' 
        })
        .then(handleResponse)
}
