import {combineReducers} from 'redux';
import jwtDecode from 'jwt-decode';
import { reducer as formReducer } from 'redux-form';


function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
};

const loginOpenReducer = (state=false, action) => {
    switch (action.type)
    {
        case "OPEN_LOGIN": {
            return true;
        }

        case "CLOSE_LOGIN": {
            return false;
        }

        default: {
            return state
        }
    }
}
 
const streamsReducer = (state=[], action) => {
    switch (action.type)
    {
        case "FETCH_STREAMS": {
            return convertArrayToObject(action.payload, "_id");
        }
        default: {
            return state;
        }
    }
}

const streamReducer = (state=null, action) => {
    switch (action.type)
    {
        case "FETCH_STREAM": {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}

const authReducer = (state=null, action) => {
    switch (action.type)
    {
        case "SUCCESFUL_LOG_IN": {
            return jwtDecode(action.payload.token);
        }

        case "UNSUCCESFUL_LOG_IN": {
            return state;
        }
        case "SUCCESFUL_SIGN_UP": {
            return jwtDecode(action.payload.token);
        }

        case "UNSUCCESFUL_SIGN_UP": {
            return state;
        }
        case "LOG_OUT": {
            delete_cookie("authToken");
            return null;
        }
        default: {
            return state;
        }
    }
}

const errorMsgReducer = (state=null, action) => {
    switch (action.type)
    {
        case "SUCCESFUL_LOG_IN": {
            return null;
        }

        case "UNSUCCESFUL_LOG_IN": {
            return action.payload.message;
        }
        case "SUCCESFUL_SIGN_UP": {
            return state;
        }

        case "UNSUCCESFUL_SIGN_UP": {
            return action.payload.message
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({
    streams: streamsReducer,
    stream: streamReducer,
    auth: authReducer,
    loginOpen: loginOpenReducer,
    errorMsg: errorMsgReducer,
    form: formReducer
});