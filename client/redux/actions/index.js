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