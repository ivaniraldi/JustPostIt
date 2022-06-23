import React from 'react'
import { useSelector } from 'react-redux'
import CardDetail from './CardDetail'
import NavBar from '../NavBar/NavBar'
import { getPost } from '../../redux/actions'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function PostDetail() {
  const id = location.pathname.split('/')[2]

  return (
    <div className=''>
      <NavBar />
      <div className="flex justify-center pt-16">
        <div className='sm:w-1/2 mx-2 '>
          <CardDetail id={id} />
        </div>

      </div>
    </div>
  )
}
