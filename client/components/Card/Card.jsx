import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../../redux/actions'
import { Link } from 'react-router-dom'



export default function Card({ id, title, content, image, Categories, createdAt, signature }) {
  const postCard = {
    id: id,
    title: title,
    content: content,
    image: image,
    Categories: Categories,
    createdAt: createdAt,
    signature: signature

  }

  let todaysDate = new Date()
  let timePosted = new Date(postCard.createdAt)
  let timeDiff = Math.abs(todaysDate.getTime() - timePosted.getTime())
  //timeDiff to a string
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
  let diffHours = Math.ceil(timeDiff / (1000 * 3600))
  let diffMinutes = Math.ceil(timeDiff / (1000 * 60))
  let diffSeconds = Math.ceil(timeDiff / 1000)
  let timeAgo = ''
  if (diffDays > 0) {
    timeAgo = diffDays + ' days ago'
  }
  else if (diffHours > 0) {
    timeAgo = diffHours + ' hours ago'
  }
  else if (diffMinutes > 0) {
    timeAgo = diffMinutes + ' minutes ago'
  }
  else if (diffSeconds > 0) {
    timeAgo = diffSeconds + ' seconds ago'
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
        <img className='w-10 inline mt-2 ml-2 mr-2' src="https://i.ibb.co/3mHWrhT/letra-p.png" alt="" />
        <div className=''>

          <h1 className="mt-2 font-medium text-sm tracking-tight text-gray-400">Usuario 00{postCard.id}</h1>

          <p className='text-gray-500 text-xs' >{timeAgo} •<img className='inline w-3 ml-1 mb-1' src="https://i.ibb.co/PtR8YTc/world-map.png" alt="" /></p>
        </div>
      </div>
      <div className='mx-4 mt-2'>
        <h1 className="text-gray-300 text-lg font-bold">{postCard.title}</h1>

<p className="mb-3 font-normal" style={{ color: "#E3E3E3E3" }}>{postCard.content}</p>


</div>

      <img className="mt-3 w-full" src={postCard.image} alt="" />
      
      <div className="px-3 pb-3" >
        <div className='px-2 pb-2' style={{
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
        <div className='flex justify-around mt-2' >{postCard.Categories?.map((category) => {
          return <span key={category.id+1} className='px-5 py-1' style={{
            color: '#ffffff99',
            fontWeight: '500',
            border: '1px solid #ffffff1a',
            borderRadius: '10px',
          }}>

            {category.name}

          </span>
        })}
        </div>
      </div>
      </div>    </div>
    

  )
}
