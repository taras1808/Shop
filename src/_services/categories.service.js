import { handleResponse } from '../_utils/handle-response'
import Config from '../config.json'
import { authHeader } from '../_utils/auth-header'


export const categoriesService = {
    getCategories,
    saveCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    getCategoryRoots,
    getRoots,
    saveOrder,
    getProducts,
    getFilters,
    getFiltersOrder,
    getFiltersForCategory,
    
}

function getCategories() {
    return fetch(`${Config.HOST}/api/categories`)
        .then(handleResponse)
}

function saveCategory(formData) {
    return fetch(`${Config.HOST}/api/categories`, {
            method: 'POST',
            body: formData,
            headers: authHeader()
        })
        .then(handleResponse)
}

function getCategory(categoryId) {
    return fetch(`${Config.HOST}/api/categories/${categoryId}/`)
        .then(handleResponse)
}

function updateCategory(categoryId, formData) {
    return fetch(`${Config.HOST}/api/categories/${categoryId}/`, {
            method: 'PUT',
            body: formData,
            headers: authHeader()
        })
        .then(handleResponse)
}

function deleteCategory(categoryId) {
    return fetch(`${Config.HOST}/api/categories/${categoryId}/`, {
            method: 'DELETE',
            headers: authHeader()
        })
}

function getCategoryRoots(category) {
    return fetch(`${Config.HOST}/api/categories/${category.id}/roots`)
        .then(handleResponse)
}

function getRoots(categoryId) {
    return fetch(`${Config.HOST}/api/categories/roots${categoryId ? `?categoryId=${categoryId}` : ''}`)
        .then(handleResponse)
}

function saveOrder(treeCategories) {
    return fetch(`${Config.HOST}/api/categories/`, {
            method: 'PUT',
            body: JSON.stringify({
                categories: treeCategories.map(e => e.id)
            }),
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            }
        })
        .then(handleResponse)
}

function getProducts(categoryId, query) {
    return fetch(`${Config.HOST}/api/categories/${categoryId}/products${query ?? ''}`)
        .then(handleResponse)
}

function getFilters(categoryId, query) {
    return fetch(`${Config.HOST}/api/categories/${categoryId}/fitlers${query ?? ''}`)
        .then(handleResponse)
}

function getFiltersOrder(categoryId, treeFilters) {
    return fetch(`${Config.HOST}/api/categories/${categoryId}/fitlers`, {
            method: 'PUT',
            body: JSON.stringify({
                filters: treeFilters.map(e => e.id)
            }),
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            }
        })
        .then(handleResponse)
}

function getFiltersForCategory(category) {
    return fetch(`${Config.HOST}/api/filters?categoryId=${category.id}`)
        .then(handleResponse)
}
