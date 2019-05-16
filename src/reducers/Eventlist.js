import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
    excerciselist: [],
    eventData: [],
    eventFilterData: []

};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ActionTypes.GET_EVENT_FILTER:
            console.log('event_filter', action);
            return Object.assign({}, state, {
                eventFilterData: action,
            });
        case ActionTypes.GET_EVENT_LIST:
            console.log('GET_EVENT_LIST', action);

            return Object.assign({}, state, {
                eventData: action,
            });

        default:
            return state
    }
}
