import axios from 'axios';

export const fetchAllStreams = () => {
    return async dispatch => {
        const response = await axios.get('/api/streams').then(response => response.data);
        return dispatch({
            type: "FETCH_STREAMS",
            payload: response
        });
    }
}

export const createStream = (formValues) => {
    return async dispatch => {
        const response = await axios.post('/api/streams/new', formValues).then(response => response.data);
        return dispatch({
            type: "CREATE_STREAM",
            payload: response
        });
    }
}

export const fetchStream = (id) => {
    return async dispatch => {
        const response = await axios.get(`/api/streams/${id}`).then(response => response.data);
        return dispatch({
            type: "FETCH_STREAM",
            payload: response
        });
    }
}

export const updateStream = (id, formValues) => {
    return async dispatch => {
        const response = await axios.patch(`/api/streams/${id}`, formValues).then(response => response.data);
        return dispatch({
            type: "UPDATE_STREAM",
            payload: response
        });
    }
}

export const deleteStream = (id) => {
    return async dispatch => {
        const response = await axios.delete(`/api/streams/${id}`).then(response => response.data);
        return dispatch({
            type: "DELETE_STREAM",
            payload: response
        });
    }
}