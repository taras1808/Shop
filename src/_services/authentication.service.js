import { BehaviorSubject } from 'rxjs'
import Config from '../config.json'
import { handleResponse } from '../_utils/handle-response'

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')))

export const authenticationService = {
    register,
    authenticate,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
}

function register(firstName, lastName, email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password })
    }

    return fetch(`${Config.HOST}/api/accounts/register`, requestOptions)
        .then(handleResponse)
}

function authenticate(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }

    return fetch(`${Config.HOST}/api/accounts/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user))
            currentUserSubject.next(user)

            return user
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser')
    currentUserSubject.next(null)
}
