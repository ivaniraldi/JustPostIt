import React from 'react'
import NavBar from '../NavBar/NavBar'
import { createCategory } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

export default function CreateCategory() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const categories = useSelector(state => state.categories)
    const category = {
        name: name
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (name.length < 1) {
            setError('Please fill out all fields')
        }
        else if (categories.find(category => category.name == name)) {
            setError('Category already exists')
        }
        else {
            dispatch(createCategory(category))
            alert('Category created')
            setName('')
            setError('')
        }
    }


  return (
    <div>
        <NavBar></NavBar>
        
        <div className="flex justify-center pt-16 text-white">
            <div className='flex justify-center mb-5 mx-10'>
                <h1 className='text-center font-bold sm:text-2xl'>Oh! It seems that you cannot access this{<br/>} function! but hey! here's a hug</h1>
            </div>
        </div>
                <div className='flex justify-center'>
                <img className="sm:w-1/4 w-1/2" src='https://media1.giphy.com/media/gHKnFHkGPUmG4GTzUt/giphy.gif?cid=790b76116cb4b409382caef7322fd59ff371632363d4d292&rid=giphy.gif&ct=g'/>
                </div>
    </div>
  )
}
