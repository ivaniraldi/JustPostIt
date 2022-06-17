import axios from 'axios';

export function getPosts() {
    return function(dispatch) {
        axios.get('/post')
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
    return function(dispatch) {
        axios.get('/post/' + id)
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
        axios.post('/post', post)
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
        axios.delete('/post/' + id)
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
        axios.put('/post/' + post._id, post)
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
        axios.get('/categories')
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
        axios.post('/categories', category)
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
        axios.put(`/post/${id}`, comment)
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
