import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, getUsers, loginUser } from '../../../redux/actions'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from "./loginuser"
import { Navigate } from 'react-router-dom'


export default function Login() {
    const dispatch = useDispatch()
    const [user1, setUser1] = useState({
        password: '',
        email: ''
    })
    const [error, setError] = useState(" ")

    useEffect(() => {
        dispatch(getUsers())
    }, [])
    

    const users = useSelector(state => state.users)
    
    const validate = () => {

        if (user1.email.length < 5 || !user1.email.includes("@")) {
            setError("Email is required")
            return
        }
        if (user1.password.length < 4) {
            setError("Please enter a valid password")
            return
        }
        else {
            setError("")
            return true
        }}
    
    const handleChange = (e) => {
        setUser1({
            ...user1,
            [e.target.name]: e.target.value
        })
        validate()
    }
    const handleSubmit =async(e) => {
        validate()
        e.preventDefault()
        if (error === "") {
            await login(user1)
            .then((res) => {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("user", res.data.user.userId)
                localStorage.setItem("role" ,res.data.user.role)
                localStorage.setItem("email", res.data.user.email)
                localStorage.setItem("name", res.data.user.name)
                window.location.href = "/"

              })
              .catch((res) => alert(res));

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
                    <h1 style={{color:"#795eb0"}} className='text-left text-6xl font-bold'>JustPostIt</h1>
                    <h2 className='text-left text-xl bold'>Lo que facebook no te deja postear,  nosotros si. Unete!</h2>
                </div>
            </div>
        </div>
        <div className=''>
            <div className=" flex justify-center">
                <form action="submit" onSubmit={handleSubmit} style={{background:"#242526"}} className=" rounded-xl  my-2 sm:my-32 py-12 px-8">
                    <div className="flex justify-center">
                        
                        <input required type="email" style={{width:"350px"}} className="mx-4 rounded bg-white py-2 px-2 text-black" id="LoginInput" name="email" placeholder="Email adress" onChange={handleChange} />
                    </div>
                    <div className="flex justify-center mt-4">
                       
                        <input  required type="password" style={{width:"350px"}} className="mx-4 rounded bg-white py-2 px-2 text-black" id="LoginInput" name="password" placeholder="Password" onChange={handleChange} />
                    </div>
                    <div className='my-2 flex justify-center text-red-600 italic'>
                    {error}
                    </div>
                    <div className='flex justify-center mt-4'>

                    <button type="submit"style={{width:"350px", background:"#4e3d71"}} className="py-2 rounded-md font-bold text-lg">Log-In</button>

                    </div>
                    <div className="flex justify-center pt-4 pb-3 mx-4 text-sm text-blue-400" style={{borderBottom:"1px solid #272829"}}>
                    <p>Forgot password? jodete.</p>
                    </div>
                    <div className='flex justify-center'>

                <Link to={"/register"}><button style={{width:"100px", background:"#42b72a"}} className="py-1 mt-4 rounded-md font-bold text-lg">Sign-up</button></Link>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
  )
}
