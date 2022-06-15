import React from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../NavBar/NavBar'

export default function PostDetail() {
  const post = useSelector(state => state.post)
  return (
    <div>
      <NavBar></NavBar>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.signature}</p>
      <p>{post.categories}</p>
      <img style={{ width:"100px",height:"100px"}} src={post.image} alt={post.title} />
        
    </div>
  )
}
