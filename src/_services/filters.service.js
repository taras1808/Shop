import { handleResponse } from '../_utils/handle-response'
import Config from '../config.json'


export const filtersService = {
    getFilters,
    getFilterForCategory,
    getFilterOptions,
    createFilters,
    getFilter,
    updateFilter,
    deleteFilter,
}

function getFilters() {
    return fetch(`${Config.HOST}/api/filters/`)
        .then(handleResponse)
}

function getFilterForCategory(selectedCategory) {
    return fetch(`${Config.HOST}/api/filters/?categoryId=${selectedCategory.value}`)
        .then(handleResponse)
}

function getFilterOptions(filterId) {
    return fetch(`${Config.HOST}/api/filters/${filterId}/options/`)
        .then(handleResponse)
}

function createFilters(name, url, categories) {
    return fetch(`${Config.HOST}/api/filters/`, {
            method: 'POST',
            body: JSON.stringify({
                title: name,
                name: url,
                categories: categories ? categories.map(e => e.id) : []
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(handleResponse)
}

function getFilter(filterId) {
    return fetch(`${Config.HOST}/api/filters/${filterId}/`)
        .then(handleResponse)
}

function updateFilter(selectedFilter, name, url, categories) {
    return fetch(`${Config.HOST}/api/filters/${selectedFilter.id}/`, {
            method: 'PUT',
            body: JSON.stringify({
                title: name,
                name: url,
                categories: categories ? categories.map(e => e.value) : []
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(handleResponse)
}

function deleteFilter(selectedFilter) {
    return fetch(`${Config.HOST}/api/filters/${selectedFilter.id}/`, {
            method: 'DELETE'
        })
        .then(handleResponse)
}
