const initialState = {
    isLoading: false,
    posts: [],
    filteredPosts: [],
    categories: [],
    post: {},
}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_POSTS':
            return {
                ...state,
                isLoading: false,
                posts: action.payload,
                filteredPosts: action.payload
            }
        case 'GET_POST':
            return {
                ...state,
                isLoading: false,
                post: action.payload,
            }
        case 'CREATE_POST':
            return {
                ...state,
                isLoading: false,
                posts: [...state.posts, action.payload],
                filteredPosts: [...state.posts, action.payload]
            }
        case 'DELETE_POST':
            return {
                ...state,
                isLoading: false,
                posts: state.posts.filter(post => post._id !== action.payload),
                filteredPosts: state.posts.filter(post => post._id !== action.payload)
            }
        case 'EDIT_POST':
            return {
                ...state,
                isLoading: false,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
                filteredPosts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            }
        case "GET_CATEGORIES":
            return {
                ...state,
                isLoading: false,
                categories: action.payload,
            }
            
            
            

        default: return state;
    }
}

export default rootReducer;
