import { createStore } from 'redux';

const initialState = {};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        // Define your Redux actions and reducers here...
        default:
            return state;
    }
}

const store = createStore(rootReducer);

export default store;
