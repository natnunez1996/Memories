import * as actionType from '../constants/actionTypes'

const authReducer = (state = { authData: null, message: null }, action) => {
    switch (action.type) {
        case actionType.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
            return { ...state, authData: action?.payload };
        case actionType.LOGOUT:
            localStorage.clear();
            return { ...state, authData: null }
        case actionType.INVALID_CREDENTIALS:
            return { ...state, message: action.payload }

        case actionType.CLEAR_MESSAGE:
            return { ...state, message: null }
        default:
            return state;
    }
}

export default authReducer;
