import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, getPosts } from '../../redux/actions'
import Card from '../Card/Card'
import NavBar from '../NavBar/NavBar'

export default function Profile() {
    const id = location.pathname.split('/')[2]
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUser(id))
        dispatch(getPosts())
    }
        , [])
        const user = useSelector(state => state.user)
        const postsList = useSelector(state => state.posts)
        const postsUser = postsList.filter(post => post.userId == id)
        let posts
     if (postsUser){
        posts = postsUser
     }
     console.log(user)
    
     let timeAgoPost = ''
     const toDay = new Date();
     const HoyArgentina = toDay.toLocaleString("en-US", {timeZone: "America/Argentina/Buenos_Aires"})
     const date = new Date(HoyArgentina)
     const postDate = new Date(user.createdAt)
     const diffTime = Math.abs(date - postDate)
     const diffSeconds = Math.floor(diffTime / 1000)
     if (diffSeconds < 60) {
       timeAgoPost = diffSeconds + " seconds ago"
     }
     else if (diffSeconds < 3600) {
       timeAgoPost = Math.floor(diffSeconds / 60) + " minutes ago"
     }
     else if (diffSeconds < 86400) {
       timeAgoPost = Math.floor(diffSeconds / 3600) + " hours ago"
     }
     else if (diffSeconds < 604800) {
       timeAgoPost = Math.floor(diffSeconds / 86400) + " days ago"
     }
     else if (diffSeconds < 2419200) {
       timeAgoPost = Math.floor(diffSeconds / 604800) + " weeks ago"
     }
     else if (diffSeconds < 31536000) {
       timeAgoPost = Math.floor(diffSeconds / 2419200) + " months ago"
     }
     else {
       timeAgoPost = Math.floor(diffSeconds / 31536000) + " years ago"
     }


  return (
    <div>
        <NavBar></NavBar>
        <div className='grid grid-cols-2 pt-16 mx-16'>
        <div className='text-white'>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <h3>{user.phone}</h3>
            <h3>Member since {timeAgoPost}</h3>
            <h3>{posts.length} posts</h3>
        </div>
        <div>

            {posts.map((post,i) => (
                <div className='mt-6'>
                <Card key={i} id={post.postId} comentarios={post.Comments} name={post.User.name} {...post}></Card>
            </div>
            ))}
            </div>
        </div>
    </div>
  )
}
