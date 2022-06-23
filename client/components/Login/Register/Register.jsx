import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, getUsers } from '../../../redux/actions'
import { useEffect } from 'react'
import { useState } from 'react'
import { register } from './registeruser'
import { Link } from 'react-router-dom'


export default function Register() {
    const dispatch = useDispatch()
    const [user1, setUser1] = useState({
        name: '',
        password: '',
        email: ''
    })
    const [error, setError] = useState(" ")

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    if (localStorage.getItem("user")) {
        window.location.href = "/"
    }

    const users = useSelector(state => state.users)

    const validate = () => {
        if (user1.name.length < 4) {
            setError("Username must be at least 5 characters")
            return
        }
        else if (user1.password.length < 4) {
            setError("Password must be at least 5 characters")
            return
        }
        else if (user1.email.length < 5 || user1.email.includes("@") === false) {
            setError("Email is required")
            return
        }
        else {
            setError("")
            return true
        }
    }

    const handleChange = (e) => {
        setUser1({
            ...user1,
            [e.target.name]: e.target.value
        })
        validate()
    }
    const handleSubmit = async (e) => {
        validate()
        e.preventDefault()
        if (error === "") {
            await register(user1)
                .then((res) => {
                    alert("User created successfully")
                    window.location.href = "/login"
                }).catch((res) => alert("Email or Username already exists"));

        }
        else {
            alert(error)
        }
    }



    return (
        <div className='text-white '>
            <div className='contents mx-6 sm:grid grid-cols-2'>
                <div className='flex justify-center sm:justify-end my-12 sm:my-40'>
                    <div className='flex '>
                        <div className=' '>
                            <h1 style={{ color: "#795eb0" }} className='text-left text-6xl font-bold'>JustPostIt</h1>
                            <h2 className='text-left text-xl bold'>Lo que facebook no te deja postear,  nosotros si. Unete!</h2>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div className=" flex justify-center">
                        <form action="submit" onSubmit={handleSubmit} style={{ background: "#242526" }} className=" rounded-xl  my-2 sm:my-32 py-12 px-8">
                            <div className="flex justify-center">
                                <input required type="text" style={{ width: "350px" }} className="mx-4 rounded bg-white py-2 px-2 text-black" id="LoginInput" name="name" placeholder="Username" onChange={handleChange} />
                            </div>
                            <div className="flex justify-center mt-4">

                                <input required type="email" style={{ width: "350px" }} className="mx-4 rounded bg-white py-2 px-2 text-black" id="LoginInput" name="email" placeholder="Email adress" onChange={handleChange} />
                            </div>
                            <div className="flex justify-center mt-4">

                                <input required type="password" style={{ width: "350px" }} className="mx-4 rounded bg-white py-2 px-2 text-black" id="LoginInput" name="password" placeholder="Password" onChange={handleChange} />
                            </div>
                            <div className='my-2 flex justify-center text-red-600 italic'>
                                {error}
                            </div>
                            <div className='flex justify-center mt-4'>

                                <button type="submit" style={{ width: "350px", background: "#4e3d71" }} className="py-2 rounded-md font-bold text-lg">Register</button>

                            </div>
                            <div className="flex justify-center pt-4 pb-3 mx-4 text-sm text-blue-400" style={{ borderBottom: "1px solid #272829" }}>
                                <p>Already have an account?</p>
                            </div>
                            <div className='flex justify-center'>

                                <Link to={"/login"}><button style={{ width: "100px", background: "#42b72a" }} className="py-1 mt-4 rounded-md font-bold text-lg">Sign-in</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
