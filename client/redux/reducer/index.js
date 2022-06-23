const initialState = {
    isLoading: false,
    posts: [],
    filteredPosts: [],
    categories: [],
    post: {},
    totalUsers: 0,
    user: {},
    comments: [],
    users: [],
    user: {},
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
        case "CREATE_CATEGORY":
            return {
                ...state,
                isLoading: false,
                categories: [...state.categories, action.payload],
            }
        case "FILTER_POSTS":
            return {
                ...state,
                isLoading: false,
                filteredPosts: state.posts.filter(post => 
                    post.title.toLowerCase().includes(action.payload.toLowerCase()) ||
                    post.content.toLowerCase().includes(action.payload.toLowerCase()) ||
                    post.signature.toLowerCase().includes(action.payload.toLowerCase())),
                
            }
        case "RESET_POST":
            return {
                ...state,
                isLoading: false,
                post: {},
            }
        case "FILTER_BY_CATEGORY":
            return {
                ...state,
                isLoading: false,
                filteredPosts: state.posts.filter(post => post.Categories?.filter(category => category.name.toLowerCase().includes(action.payload.toLowerCase())).length > 0),
            }
        case "RESET_FILTER":
            return {
                ...state,
                isLoading: false,
                filteredPosts: state.posts,
            }
        case "SORT_BY_ID":
            return {
                ...state,
                isLoading: false,
                filteredPosts: state.filteredPosts.sort((a, b) => 
                {
                    return b.id - a.id
                })
            }
        case "REGISTER_USER":
            return {
                ...state,
                isLoading: false,
                totalUsers: state.totalUsers + 1,
            }
        case "LOGIN_USER":
            return {
                ...state,
                isLoading: false,
                user: action.payload,
            }
        case "GET_USERS":
            return {
                ...state,
                isLoading: false,
                users: action.payload,
            }
        case "GET_COMMENTS":
            return {
                ...state,
                isLoading: false,
                comments: action.payload,
            }
        case "GET_USER":
            return {
                ...state,
                isLoading: false,
                user: action.payload,
            }


            

            
            

        default: return state;
    }
}

export default rootReducer;
