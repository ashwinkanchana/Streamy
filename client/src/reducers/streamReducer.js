import _ from 'lodash';
import {
    CREATE_STREAM,
    DELETE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    EDIT_STREAM
} from '../actions/types'


const streamReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') }
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload}
        case DELETE_STREAM:
            return _.omit(state, action.payload)
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        default:
            return state;
    }
}

export default streamReducer;