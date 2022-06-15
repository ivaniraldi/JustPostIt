import React, { useState } from 'react'
import { createPost, getCategories } from '../../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import NavBar from '../NavBar/NavBar'

export default function Create() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [signature, setSignature] = useState('')
    const [categories, setCategories] = useState([])
    const [image, setImage] = useState('')
    const [error, setError] = useState('')
    useEffect(() => {
        dispatch(getCategories())
    }
        , [])
    const categoriesList = useSelector(state => state.categories)
    function searchCategory(id) {
        console.log(id)
        const category = categoriesList.find(category => category.id == id)

        return category.name

    }
    const post = {
        title: title,
        content: content,
        signature: signature,
        categories: categories,
        image: image
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title.length < 1 || content.length < 1 || signature.length < 1 || categories.length < 1 || image.length < 1) {
            setError('Please fill out all fields')
            console.log(post)
        }

        else if (!image.startsWith('http')) {
            setError('Please enter a valid image url')
        }
        else if (content.includes("<script>" || "<script/>")) {
            setError('What are you doing? Remove that script tag.')
        }
        else {
            console.log(post)
            dispatch(createPost(post))
            alert('Post created')

            setTitle('')
            setContent('')
            setSignature('')
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
        } else if (e.target.name === 'signature') {
            setSignature(e.target.value)
        }
        else if (e.target.name === 'image') {
            setImage(e.target.value)
        }
        else if (e.target.name === 'categories') {
            if (!categories.includes(e.target.value)) {
                setCategories([...categories, e.target.value])
            }
        }
    }


    return (
        <div >
            <NavBar />
            <div className='flex justify-center mt-4' >
                <div className='w-full max-w-xs'
                >
                    <form
                        className='shadow-md rounded px-8 pt-6 pb-8 mb-4'
                        style={{
                            backgroundColor: '#16171c',
                        }}
                        onSubmit={handleSubmit}
                    >
                        <label className="block text-gray-300 text-sm font-bold mb-2">Title:</label>
                        <input className="shadow appearance-none border rounded w-full text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                            style={{
                                backgroundColor: '#26272e',
                                borderColor: '#26272e',
                                color: '#E3E3E3E3',
                            }}
                            type="text"
                            name="title"
                            value={title}
                            onChange={handleChange}
                        />
                        <label className="block text-gray-300 text-sm font-bold mb-2">Content:</label>
                        <textarea
                            style={{
                                backgroundColor: '#26272e',
                                borderColor: '#26272e',
                                color: '#E3E3E3E3',
                            }}
                            className="shadow appearance-none border rounded w-full text-gray-300 leading-tight focus:outline-none focus:shadow-outline h-32 text-xs"
                            name="content"
                            value={content}
                            onChange={handleChange}
                            cols="30"
                            rows="10"
                        />
                        <label className="block text-gray-300 text-sm font-bold mb-2">Signature:</label>
                        <input style={{
                            backgroundColor: '#26272e',
                            borderColor: '#26272e',
                            color: '#E3E3E3E3',
                        }} className="shadow appearance-none border rounded w-full text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="signature"
                            value={signature}
                            onChange={handleChange}
                        />
                        <label className="block text-gray-300 text-sm font-bold mb-2">Categories:</label>
                        <select
                            className="block  w-full bg-white border border-gray-400 hover:border-gray-500 rounded shadow leading-tight focus:outline-none text-sm focus:shadow-outline"
                            name="categories"
                            style={{
                                backgroundColor: '#26272e',
                                borderColor: '#26272e',
                                color: '#E3E3E3E3',
                            }}

                            onChange={handleChange}
                            value={categories}
                        >
                            <option value="">Select a category</option>
                            {categoriesList.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <div className='block'>

                            {post.categories.length > 0 && <div className='flex justify-center'><p className="text-gray-600 text-xs italic mt-2">Click to remove</p></div>}
                            <div className='grid grid-cols-2 gap-1'>

                                {post.categories.map(c => (

                                    <button
                                        className="shadow appearance-none border rounded text-gray-300 leading-tight focus:outline-none text-sm focus:shadow-outline "
                                        key={c}
                                        type="button"
                                        onClick={removeCategory}
                                        value={c}
                                    >{searchCategory(c)}</button>


                                ))}
                            </div>
                        </div>
                        <label className="block text-gray-300 text-sm font-bold mb-2">Image URL:</label>
                        <input style={{
                            backgroundColor: '#26272e',
                            borderColor: '#26272e',
                            color: '#E3E3E3E3',
                        }} className="shadow appearance-none border rounded w-full text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="image"
                            value={image}
                            onChange={handleChange}
                        />
                        <div className='flex justify-center mt-2'>
                            <button className="border text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                style={{
                                    backgroundColor: '#9a6aff',
                                    borderColor: '#26272e',
                                    color: '#1e2029',
                                }} type="submit">Submit</button>
                        </div>
                        <p className="text-gray-700 text-xs italic mt-2">{error}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}
