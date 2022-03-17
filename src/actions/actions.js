//export const SET_AUTH_STATUS = 'SET_AUTH_STATUS'
//export const SET_REGISTERED_USER = 'SET_REGISTERED_USER'

export const Auth = {
    SET_AUTH_STATUS: 'SET_AUTH_STATUS',
    SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
    SET_REFRESH_TOKEN: 'SET_REFRESH_TOKEN'
}

export const AuthStatus = {
    LOG_IN: 'LOG_IN',
    LOG_OUT: 'LOG_OUT',
    FAILED_LOGIN: 'FAILED_LOGIN',
    UNINITIALIZED: 'UNINITIALIZED'
}

export const Registration = {
    SET_REGISTERED_USER_ID: 'SET_REGISTERED_USER_ID',
    SET_REGISTERED_USER_ROLE: 'SET_REGISTERED_USER_ROLE',
    SET_REGISTERED_USER_EMAIL: 'SET_REGISTERED_USER_EMAIL',
    SET_REGISTERED_USER_NAME: 'SET_REGISTERED_USER_NAME',
    SET_REGISTERED_USER_FIRST_NAME: 'SET_REGISTERED_USER_FIRST_NAME',
    SET_REGISTERED_USER_LAST_NAME: 'SET_REGISTERED_USER_LAST_NAME'
}

export const RegistrationStatus = {
    IS_REGISTERED: 'IS_REGISTERED'
}

/*
 * action creators
 */

export function setAuthStatus(status) {
    return {
        type: Auth.SET_AUTH_STATUS,
        status
    }
}

export function setAccessToken(text) {
    return {
        type: Auth.SET_ACCESS_TOKEN,
        text
    }
}

export function setRefreshToken(text) {
    return {
        type: Auth.SET_REFRESH_TOKEN,
        text
    }
}

export function setRegisteredUserId(text) {
    return {
        type: Registration.SET_REGISTERED_USER_ID,
        text
    }
}

export function setRegisteredUserRole(text) {
    return {
        type: Registration.SET_REGISTERED_USER_ROLE,
        text
    }
}

export function setRegisteredUserName(text) {
    return {
        type: Registration.SET_REGISTERED_USER_NAME,
        text
    }
}

export function setRegisteredUserFirstName(text) {
    return {
        type: Registration.SET_REGISTERED_USER_FIRST_NAME,
        text
    }
}

export function setRegisteredUserLastName(text) {
    return {
        type: Registration.SET_REGISTERED_USER_LAST_NAME,
        text
    }
}

export function setRegisteredUserEmail(text) {
    return {
        type: Registration.SET_REGISTERED_USER_EMAIL,
        text
    }
}