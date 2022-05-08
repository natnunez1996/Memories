import * as actionType from '../constants/actionTypes'

const postsReducer = (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case actionType.START_LOADING:
            return { ...state, isLoading: true }
        case actionType.END_LOADING:
            return { ...state, isLoading: false }
        case actionType.FETCH_ALL:
            return {
                ...state, posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPage
            };
        case actionType.FETCH_POST:
            return { ...state, post: action.payload }
        // case actionType.FETCH_BY_SEARCH:
        //     return { ...state, posts: action.payload }
        case actionType.FETCH_BY_SEARCH:
            return { ...state, searchedPosts: action.payload }
        case actionType.CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case actionType.DELETE:
            return ({ ...state, posts: state.posts.filter(post => post._id !== action.payload) })
        case actionType.UPDATE:
        case actionType.LIKE:
            return ({ ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) })
        case actionType.COMMENT:
            return ({
                ...state, posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                )
            })
        default:
            return state;
    }
}

export default postsReducer;