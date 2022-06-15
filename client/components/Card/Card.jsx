import React from 'react'
import { useDispatch } from 'react-redux'
import { getPost } from '../../redux/actions'
import { Link } from 'react-router-dom'


export default function Card({ title, content, signature, categories, image, id }) {
  const dispatch = useDispatch()

  return (
    <div class="max-w-sm bg-white rounded-lg border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 "
    style={{
      backgroundColor: '#16171c',

      backgroundSize: 'cover',
    }}
    >
      <div class="flex justify-center mt-4">
      <img class="rounded w-1/2" src={image} alt="" />
      </div>
        <div class="p-5">
          <h1 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white text-center">{title}</h1>
          <p class="mb-3 font-normal"style={{color:"#E3E3E3E3"}}>{content}</p>
          <p class="text-sm  flex items-center" style={{color:"#E3E3E3E3"}}>{signature}</p>
          <p>{categories?.map(
            (category) => {
              return <span>{category.name}</span>
            }
          )}</p>
          </div>
          </div>
  )
}
