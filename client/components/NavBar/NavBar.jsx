import React, { useState } from 'react'
import {Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faHouse,
  faGear,
 } from '@fortawesome/free-solid-svg-icons'
import s from './NavBar.module.css'
import { filterPosts } from '../../redux/actions'
import { useDispatch } from 'react-redux'


export default function NavBar() {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    setSearch(e.target.value)

    dispatch(filterPosts(e.target.value))
  }
  const postButton =  location.pathname === "/" ? true : false;
  console.log(postButton)
  return (
    <nav className="flex  px-2 sm:px-4 pt-1 fixed w-full "
    style={{
      backgroundColor: '#242526',
      borderBottom: '1px solid #ffffff1a',
    }}
    >
      <div className="container py-1 flex flex-wrap items-center ml-1">
      <p className="flex items-center ">
        <Link to="/" className="self-center text-xl font-semibold whitespace-nowrap text-gray-300"><img className='w-10 h-10' src="https://i.ibb.co/nnG99ZN/Logo.png" alt="" /></Link>
        <input className={s.searchBar} placeholder={' '} onChange={handleSearch} value={search}/>

    
    </p>

      </div>
      <ul id="navBarIcons" className="flex flex-row justify-between text-xl font-medium self-center">
      <li className="">      
        <Link to='/' className="text-gray-300 hover:text-gray-400"><FontAwesomeIcon icon={faHouse} /></Link>
      </li>
      <li className="">
        <Link to='/createcategory' className="text-gray-300 hover:text-gray-400"><FontAwesomeIcon icon={faGear} /></Link>
      </li>
      <li className="">

      <a href={postButton? "#create": "/"}><p className="text-gray-300 hover:text-gray-400"><FontAwesomeIcon icon={faPen} /></p></a>
      </li>
      
      {/* <Link to="/"><p className="block py-2 pr-4 pl-3 text-gray-300 "> Home</p></Link>

      <Link to="/createcategory"><p className="block py-2 pr-4 pl-3 text-gray-300"> Create Category</p></Link> */}

    </ul> 
    </nav> 



  )
}
