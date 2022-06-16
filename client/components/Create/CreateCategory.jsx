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
        
        <div className="flex justify-center pt-24 text-white">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="name">Create a category:</label>
                        <input className='mt-1 mb-2' type="text" id="name" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                        <button style={{
                            marginTop: '10px',
                            backgroundColor: '#9a6aff',
                        }}type="submit">Create</button>
                        </div>

                    </form>
            </div>
        </div>
    </div>
  )
}
