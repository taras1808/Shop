import { handleResponse } from '../_utils/handle-response'
import Config from '../config.json'
import { authHeader } from '../_utils/auth-header'


export const optionsService = {
    createOption,
    getOption,
    updateOption,
    deleteOption,
}

function createOption(value, filterId) {
    return fetch(`${Config.HOST}/api/options`, {
            method: 'POST',
            body: JSON.stringify({
                value,
                filter: filterId
            }),
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            }
        })
        .then(handleResponse)
}

function getOption(optionId) {
    return fetch(`${Config.HOST}/api/options/${optionId}/`)
        .then(handleResponse)
}

function updateOption(selectedOption, value, filter) {
    return fetch(`${Config.HOST}/api/options/${selectedOption.id}/`, {
            method: 'PUT',
            body: JSON.stringify({
                value,
                filter: filter.value
            }),
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            }
        })
        .then(handleResponse)
}

function deleteOption(selectedOption) {
    return fetch(`${Config.HOST}/api/options/${selectedOption.id}/`, {
            method: 'DELETE',
            headers: authHeader()
        })
        .then(handleResponse)
}
