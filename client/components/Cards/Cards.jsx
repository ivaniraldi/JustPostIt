import React from 'react'
import Card from '../Card/Card'
import { getPosts } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function Cards() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPosts())
    }
    , [dispatch])
    const posts = useSelector(state => state.posts)
  return (
    <div className='p-10'>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  
        {posts?.map(
          (post) => {
            return <Card title={post.title} content={post.content} signature={post.signature} categories={post.categories} image={post.image} id={post.id} />
          }
        )}
  
      </div>
    </div>
    )
}
