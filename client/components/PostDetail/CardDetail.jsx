import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { putComment } from '../../redux/actions'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarth, faShareFromSquare } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
import { getPost } from '../../redux/actions'



export default function CardDetail({ id }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPost(id))
  }
    , [dispatch, id])
    const postCard = useSelector(state => state.post)
    let createdAt = postCard.createdAt
    let comments = postCard.comments || [];
    const [viewMore, setViewMore] = useState(false)
    const [commentUser, setCommentUser] = useState('')
    const [error, setError] = useState("")
    const [post, setPost] = useState(postCard)
  
    const randomId = () => {
      let id = Math.floor(Math.random() * 10000)
      return id
    }
    let commentFinal = "User" + randomId() + ": " + commentUser;
    let commentToPost = { comments: [...comments, commentFinal] } || { comments: [commentFinal] }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      if (commentUser.length > 0) {
        dispatch(putComment(postCard.id, commentToPost))
        window.location.reload()
      }
      else {
        setError("You must write a comment.")
      }
    }
    const handleUserKeyPress = (e) => {
      console.log(e.key)
      if (e.key === "Enter" && !e.shiftKey) {
        handleSubmit(e);
      }
    };
    const commentsParsed = postCard.comments?.map((c, i) => {
      const user = c.split(":")[0]
      const comment = c.split(":")[1]
      const id = i
      const userComment = { user: user, comment: comment, id: id }
      return userComment
    } 
    ) || [];
    const [category, setCategory] = useState('')
    const changeCategory = (categoryname) => {
      setCategory(categoryname)
      dispatch(filterByCategory(category))
    }
  
  
    const switchViewMore = () => {
      setViewMore(!viewMore)
    }
    let timeAgoPost = ''
  
    const toDay = new Date();
    const HoyArgentina = toDay.toLocaleString("en-US", {timeZone: "America/Argentina/Buenos_Aires"})
  
    const date = new Date(HoyArgentina)
    const postDate = new Date(createdAt)
  
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
      <div className='' style={{
        width: '100%',
        height: '100%',
      }}>
        <div id={id} className="w-full bg-white rounded-lg border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 "
          style={{
            backgroundColor: '#242526',
            backgroundSize: 'cover'
          }}>
          <div className="flex justify-center mt-1">
          </div>
          <div className='flex'>
            {/* <FontAwesomeIcon icon={faUser} className='text-gray-300 w-10 inline mt-2 ml-2 mr-2' style={{ fontSize: "2.6vw" }} /> */}
            <img className='w-10 inline mt-2 ml-2 mr-2' src="https://i.ibb.co/3mHWrhT/letra-p.png" alt="" />
            <div className=''>
  
              <h1 className="mt-2 font-medium text-sm tracking-tight text-gray-400">Usuario 00{postCard.id}</h1>
  
              <Link to={`/post/${postCard.id}`} state={{ post }}><p className='text-gray-500 text-xs' >{timeAgoPost} • <FontAwesomeIcon icon={faEarth} /></p></Link>
            </div>
          </div>
          <div className='mx-4 mt-2'>
            <h1 className="text-gray-300 text-lg font-bold">{postCard.title}</h1>
  
            <p className="mb-3 font-normal" style={{ color: "#E3E3E3E3" }}>{postCard.content}</p>
          </div>
  
          <img className={`mt-3 w-full`}style={{ maxHeight: "auto" }} src={postCard.image} alt="" />
  
          <div className="px-3 pb-3" >
            <div className={`px-2 pb-2 ${postCard.image?.length>5? "visible":"invisible"}`} style={{
              borderBottom: '1px solid #ffffff1a',
              borderLeft: '1px solid #ffffff1a',
              borderRight: '1px solid #ffffff1a',
              borderBottomRightRadius: '10px',
              borderBottomLeftRadius: '10px',
            }}>
              <div className=''>
  
              </div>
            </div>
            <div className='mt-1 pb-2' style={{ borderBottom: "1px solid #ffffff1a" }}>
  
              <p className="text-right mr-2" style={{ color: "#E3E3E3E3" }}>{postCard.signature}.</p>
  
            </div>
            <div className='grid grid-cols-4 text-center mt-2' >{postCard.Categories?.map((category, i) => {
              return <span key={i} id="buttonCat" className='mr-2 p-2 mt-1 text-xs sm:text-base' style={{
                color: '#ffffff99',
                fontWeight: '500',
                border: '1px solid #ffffff1a',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
                onClick={() => changeCategory(category.name)}
              >
  
                {category.name}
  
              </span>
            })}
            </div>
  
            {/* <div >{postCard.comments?.map((c,i) => 
            (<div key={i} className='w-full text-gray-300'><span>{c.substr(0, 9)}</span><span>{c.substr(9)}</span></div>))}</div> */}
  
            <div className={`${viewMore ? `content` : `hidden`}`}>{commentsParsed?.map((c, i) => {
              return <div key={i}>
                <div className='w-full text-gray-300 rounded-xl p-1 my-2' style={{ border: "1px solid #ffffff1a" }}>
                  <p className="text-xs font-bold text-gray-500">{c.user}</p>
                  <p>{c.comment}</p>
                </div>
              </div>
            })}
            </div>
  
            {commentsParsed[commentsParsed.length - 3] ?
              <div className={`${viewMore? "hidden":"contents"}`}>
                <div className='w-full text-gray-300 rounded-xl p-2 my-2' style={{ border: "1px solid #ffffff1a" }}>
                  <div className=''>
                    <p className="text-xs font-bold text-gray-500">{commentsParsed[commentsParsed.length - 3].user}</p>
                    <p>{commentsParsed[commentsParsed.length - 3].comment}</p>
                  </div>
                </div>
              </div>
              : null}
            {commentsParsed[commentsParsed.length - 2] ?
              <div className={`${viewMore? "hidden":"contents"}`}>
                <div className='w-full text-gray-300 rounded-xl p-2 my-2' style={{ border: "1px solid #ffffff1a" }}>
                  <div className=''>
                    <p className="text-xs font-bold text-gray-500">{commentsParsed[commentsParsed.length - 2].user}</p>
                    <p>{commentsParsed[commentsParsed.length - 2].comment}</p>
                  </div>
                </div>
              </div>
              : null}
            {commentsParsed[commentsParsed.length - 1] ?
              <div className={`${viewMore? "hidden":"contents"}`}>
                <div className='w-full text-gray-300 rounded-xl p-2 my-2' style={{ border: "1px solid #ffffff1a" }}>
                  <div className=''>
                    <p className="text-xs font-bold text-gray-500">{commentsParsed[commentsParsed.length - 1].user}</p>
                    <p>{commentsParsed[commentsParsed.length - 1].comment}</p>
                  </div>
                </div>
              </div>
              : null}
            <div className={`text-right text-xs ${commentsParsed.length>3? "visible":"invisible"}`}><span onClick={switchViewMore} className='cursor-pointer text-gray-500'>view <span className={`${!viewMore ? `content` : `hidden`}`}>more...</span> <span className={`${viewMore ? `content` : `hidden`}`}>less</span></span></div>
  
  
            <div>
              <div className='w-full mt-4'>
                <textarea className="shadow appearance-none w-full text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                  style={{
                    backgroundColor: '#ffffff1a',
                    border: "none",
                    padding: "0.3rem",
                    borderRadius: "px",
                    color: '#E3E3E3E3',
                  }}
                  placeholder="Write a comment..."
                  onKeyDown={handleUserKeyPress}
                  type="text"
                  id='commentInput'
                  value={commentUser}
                  onChange={(e) => setCommentUser(e.target.value)}
                >
                </textarea>
  
  
                <p className='text-gray-300'>{error}</p>
  
                <div className="fb-share-button text-right" data-href="https://justpostit.vercel.app/" data-layout="button" data-size="small">
                  <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fjustpostit.vercel.app%2F&amp;src=sdkpreparse"
                    className="fb-xfbml-parse-ignore text-gray-500 text-xl"><FontAwesomeIcon icon={faShareFromSquare} /></a></div>
  
              </div>
            </div>
  
          </div>
        </div>
      </div>
  
  
    )
  }
  