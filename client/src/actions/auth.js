import axios from 'axios';

import history from '../history';

export const openLogin = () => {
    return {
        type: "OPEN_LOGIN"
    }
}

export const closeLogin = () => {
    return {
        type: "CLOSE_LOGIN"
    }
}

export const logIn = (credentials) => {
    return async dispatch => {
        const response = await axios.post('/api/users/authenticate', credentials).then(response => response.data);
        if (response.success === true)
        {
            dispatch({
                type: "SUCCESFUL_LOG_IN",
                payload: response
            });
            history.push("/streams");
        }
        else
        {
            return dispatch({
                type: "UNSUCCESFUL_LOG_IN",
                payload: response
            });
        }
    }
}

export const signUp = (userInfo) => {
    return async dispatch => {
        const response = await axios.post('/api/users/new', userInfo).then(response => response.data);
        if (response.success === true)
        {
            dispatch({
                type: "SUCCESFUL_SIGN_UP",
                payload: response
            });
            history.push("/streams");
        }
        else
        {
            return dispatch({
                type: "UNSUCCESFUL_SIGN_UP",
                payload: response
            });
        }
    }
}

export const logOut = () => {
	return {
        type: "LOG_OUT"
    };
}
