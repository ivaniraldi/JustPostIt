import React, { useState } from 'react'
import { createPost, getCategories } from '../../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

export default function Create() {
    const dispatch = useDispatch()
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [categories, setCategories] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {
        dispatch(getCategories())
    }
        , [])
        const user = useSelector(state => state.user)
    const categoriesList = useSelector(state => state.categories)
    function searchCategory( id ) {
        const category = categoriesList.find(category => category.categoryId == id)
        return category.name

    }
    const User = JSON.parse(localStorage.getItem('user')) || {}
    

    const post = {
        title: title,
        content: content,
        categories: categories,
        image: image,
        comments: [],
        userId: User

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title.length < 1 || content.length < 1) {
            setError('Please fill out all fields')
        }
        else if (content.includes("<script>" || "<script/>")) {
            setError('What are you doing? Remove that script tag.')
        }
        else {
            dispatch(createPost(post))
            alert('Post created')
            window.location.reload()
            setTitle('')
            setContent('')
            setCategories([])
            setImage('')
            setError('')
        }
    }
    const removeCategory = (e) => {
        const category = e.target.value
        setCategories(categories.filter(cat => cat != category))
    }
    const handleChange = (e) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value)
        } else if (e.target.name === 'content') {
            setContent(e.target.value)
        }
        else if (e.target.name === 'categories') {
            if (!categories.includes(e.target.value)) {
                setCategories([...categories, e.target.value])
            }
        }
    }


    const uploadImage = async (e) => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'ivansyko')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/ivansyko/image/upload',
            {
                method: 'POST',
                body: data,

            }
        )
        const file = await res.json()
        setImage(file.secure_url)
        alert('Image uploaded')
        setLoading(false)
    }
    const removeImage = () => {
        setImage('')
    }



    return (
        <div>
            <div className='hidden sm:content'>
                <NavBar></NavBar>
            </div>
            <div className='' style={{
                width: '100%',
                height: '100%',
            }}>
               
                <form
                    className='mt-5 rounded'
                    style={{
                        // backgroundColor: '#242526',
                    }}
                    onSubmit={handleSubmit}
                >
                    <input className="shadow appearance-none w-full text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        style={{
                            backgroundColor: '#ffffff1a',
                            border: "none",
                            padding: "0.3vw",
                            borderRadius: "5px",
                            color: '#E3E3E3E3',
                        }}
                        placeholder="Title"
                        type="text"
                        name="title"
                        required
                        value={title}
                        onChange={handleChange}
                    />
                    <label className="block text-gray-300 text-sm font-bold mb-1"></label>
                    <textarea
                        style={{
                            backgroundColor: '#ffffff1a',
                            border: "none",
                            padding: "0.3vw",
                            borderRadius: "5px",
                            color: '#E3E3E3E3',
                        }}
                        className="shadow appearance-none border w-full text-gray-300 leading-tight focus:outline-none focus:shadow-outline h-32 text-xs"
                        name="content"
                        value={content}
                        placeholder="Share a thought..."
                        onChange={handleChange}
                        required={true}
                        cols="30"
                        rows="10"
                    />
                    <div className='grid grid-cols-2'>
                        <select
                            className="block mt-3 bg-white border hover:border-gray-500 rounded shadow leading-tight focus:outline-none text-sm focus:shadow-outline"
                            name="categories"
                            style={{
                                backgroundColor: '#ffffff1a',
                                border: "none",
                                padding: "0.3vw",
                                borderRadius: "5px",
                                color: '#E3E3E3E3',
                            }}

                            onChange={handleChange}

                        >
                            <option value="" selected disabled>Select a category</option>
                            {categoriesList.map(category => (
                                <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                            ))}
                        </select>
                        <label htmlFor="inputImage"
                            className="block mt-3 ml-1
                         bg-white border hover:border-gray-500 rounded shadow leading-tight focus:outline-none text-sm focus:shadow-outline"
                            style={{
                                backgroundColor: '#ffffff1a',
                                border: "none",
                                padding: "0.3vw",
                                borderRadius: "5px",
                                color: '#E3E3E3E3',
                                textAlign: 'center',
                            }}
                        >
                            <FontAwesomeIcon icon={faCamera} />
                            <input id="inputImage" onChange={uploadImage} className="hidden" type="file" />
                        </label>
                    </div>
                    <div className='block'>

                        <div className='grid grid-cols-3 gap-1'>

                            {post.categories.map((c,i) => (

                                <button
                                    className="block mt-3 bg-white border hover:border-gray-500 rounded shadow leading-tight focus:outline-none text-sm focus:shadow-outline"
                                    style={{
                                        backgroundColor: '#ffffff1a',
                                        border: "none",
                                        padding: "0.3vw",
                                        borderRadius: "5px",
                                        color: '#E3E3E3E3',
                                        textAlign: 'center',
                                    }}
                                    key={i}
                                    type="button"
                                    onClick={removeCategory}
                                    value={c}
                                >{searchCategory(c)}</button>


                            ))}
                        </div>
                        {post.categories.length > 0 && <div className='flex justify-center'><p className="text-gray-600 text-xs italic mt-2">Click to remove</p></div>}
                    </div>


                    <div className='grid grid-cols-2 mt-2'>
                        <div className='flex justify-center'>
                            <button onClick={removeImage} className="hidden" type="button" id='removeImage' />
                            {loading ? <p>Loading...</p> : <div className='mx-5' style={{ width: "10vw" }}><label htmlFor="removeImage"><img id="imgError" src={image || null} alt="No image." /></label></div>}
                        </div>
                        <button id="buttonPost" className="shadow appearance-none leading-tight py-1 focus:outline-none h-10 focus:shadow-outline" type="submit">Post it!</button>
                    </div>
                    <p className="text-gray-700 text-xs italic mt-2">{error}</p>
                </form>
            </div>
        </div>
    )
}
