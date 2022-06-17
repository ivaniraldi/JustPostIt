import React from 'react'
import { useSelector } from 'react-redux'
import CardDetail from './CardDetail'
import NavBar from '../NavBar/NavBar'
import { getPost } from '../../redux/actions'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function PostDetail() {
  let id = location.pathname.split('/')[2]
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPost(id))
  }
    , [dispatch, id])
  const post = useSelector(state => state.post)


  if (!post) {
    return <div>Loading...</div>
  }
  return (
    <div className=''>
      <NavBar />
      <div className="flex justify-center pt-16">
        <div className='w-1/2 '>
          <CardDetail id={post.id} {...post} comments={post.comments} />
        </div>

      </div>
    </div>
  )
}
