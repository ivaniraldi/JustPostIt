import Api from '../../interceptors/base';



export function getPosts() {
    return function(dispatch) {
        Api.get('/post')
            .then(response => {
                dispatch({
                    type: 'GET_POSTS',
                    payload: response.data
                });
            }
            )
            .catch(error => {
                console.log(error);
            }
            );
        }
}

export function getPost(id) {
    return async function(dispatch) {
        await Api.get('/post/' + id)
            .then(response => {
                dispatch({
                    type: 'GET_POST',
                    payload: response.data
                });
            }
            )
            .catch(error => {
                console.log(error);
            }
            );
        }
}

export function createPost(post) {
    return function(dispatch) {
        console.log(post)
        Api.post('/post', post)
            .then(response => {
                dispatch({
                    type: 'CREATE_POST',
                    payload: response.data
                });
            }
            )
            .catch(error => {
                console.log(error);
            }
            );
        }
}
export function deletePost(id) {
    return function(dispatch) {
        Api.delete('/post/' + id)
            .then(response => {
                dispatch({
                    type: 'DELETE_POST',
                    payload: id
                });
            }
            )
            .catch(error => {
                console.log(error);
            }
            );
        }
}
export function editPost(post) {
    return function(dispatch) {
        Api.put('/post/' + post._id, post)
            .then(response => {
                dispatch({
                    type: 'EDIT_POST',
                    payload: response.data
                });
            }
            )
            .catch(error => {
                console.log(error);
            }
            );
        }
}

export function getCategories() {
    return function(dispatch) {
        Api.get('/categories')
            .then(response => {
                dispatch({
                    type: 'GET_CATEGORIES',
                    payload: response.data
                });
            }
            )
            .catch(error => {
                console.log(error);
            }
            );
        }
}
export function createCategory(category) {
    return function(dispatch) {
        Api.post('/categories', category)
            .then(response => {
                dispatch({
                    type: 'CREATE_CATEGORY',
                    payload: response.data
                });
            }
            )
            .catch(error => {
                console.log(error);
            }
            );
        }
}
export function putComment(id, comment) {
    return function(dispatch) {
        Api.post(`/post/${id}/comments`, comment)
            .then(response => {
                dispatch({
                    type: 'PUT_COMMENT',
                    payload: response.data
                });
            }
            )
            .catch(error => {
                console.log(error);
            }
            );
        }
}

export function getComments(id) {
    return function(dispatch) {
        Api.get(`/post/${id}/comments`)
            .then(response => {
                dispatch({
                    type: 'GET_COMMENTS',
                    payload: response.data
                }); 
            }
            )
            .catch(error => {
                console.log(error);
            }
            );
        }
}


export function filterPosts(post) {
    return {
        type: 'FILTER_POSTS',
        payload: post
    }
}
export function resetPost(){
    return {
        type: 'RESET_POST'
    }
}
export function filterByCategory(category) {
    return {
        type: 'FILTER_BY_CATEGORY',
        payload: category
    }
}
export function resetFilter(){
    return {
        type: 'RESET_FILTER'
    }
}
export function filterById(){
    return {
        type: 'SORT_BY_ID'
    }
}

export function registerUser(user) {
    return function(dispatch) {
        Api.post('/user/register', user)
            .then(response => {
                dispatch({
                    type: 'REGISTER_USER',
                    payload: response.data
                });
            }
            )
            .catch(error => {
                console.log(error);
            }
            );
        }
}

export async function loginUser(user) {
    return function(dispatch) {
        Api.post('/user/login', user)
            .then(response => {
                localStorage.setItem('user', JSON.stringify(response.data.user))
                dispatch({
                    type: 'LOGIN_USER',
                    payload: response.data
                });
            }
            )
            .catch(error => {
                console.log(error);
            }
            );
        }
}

export function getUsers() {
    return function(dispatch) {
        Api.get('/user')
            .then(response => {
                dispatch({
                    type: 'GET_USERS',
                    payload: response.data
                });
            }
            )
            .catch(error => {
                console.log(error);
            }
            );
        }
}
export function getUser(id) {
    return function(dispatch) {
        Api.get('/user/' + id)
            .then(response => {
                dispatch({
                    type: 'GET_USER',
                    payload: response.data
                });
            }
            )
            .catch(error => {
                console.log(error);
            }
            );
        }
}