import { combineReducers } from 'redux'

import {
    Auth,
    Registration
} from '../actions/actions'

//const initialState = {
//    username: '',
//    loggedIn: AuthStatus.SIGNED_OUT
//}

function auth(state = [], action) {
    switch (action.type) {
        case Auth.SET_AUTH_STATUS:
            return {
                ...state,
                loggedIn: action.status
            };
        case Auth.SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.text
            };
        case Auth.SET_REFRESH_TOKEN:
            return {
                ...state,
                refreshToken: action.text
            };            
        default:
            return state;
    }
}

function user(state = [], action) {
    switch (action.type) {
        case Registration.SET_REGISTERED_USER_ID:
            return {
                ...state,
                userId: action.text
            };
        case Registration.SET_REGISTERED_USER_ROLE:
            return {
                ...state,
                role: action.text
            };            
        case Registration.SET_REGISTERED_USER_NAME:
            return {
                ...state,
                username: action.text
            };
        case Registration.SET_REGISTERED_USER_EMAIL:
            return {
                ...state,
                email: action.text
            };
        case Registration.SET_REGISTERED_USER_FIRST_NAME:
            return {
                ...state,
                firstName: action.text
            };
        case Registration.SET_REGISTERED_USER_LAST_NAME:
            return {
                ...state,
                lastName: action.text
            };
        default:
            return state;
    }
}

const mainReducer = combineReducers({
    auth,
    user
})

export default mainReducer