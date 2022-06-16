import React from 'react'
import { useDispatch } from 'react-redux'
import { getPost } from '../../redux/actions'
import { Link } from 'react-router-dom'



export default function Card({ title, content, signature, categories, image, id }) {
  let categoriasTest = [
    { id: 1, name: 'test' },
    { id: 2, name: 'test2' },
    { id: 3, name: 'test3' },
  ]
  const dispatch = useDispatch()

  return (
    <div id={id} className="max-w-xl bg-white rounded-lg border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 "
      style={{
        backgroundColor: '#242526',

        backgroundSize: 'cover',
      }}
    >
      <div className="flex justify-center mt-1">
      </div>
      <div className='flex'>

        <img className='w-10 inline mt-2 ml-2 mr-2' src="https://i.ibb.co/3mHWrhT/letra-p.png" alt="" />

        <div className=''>
          <h1 className="mt-2 font-medium text-sm tracking-tight text-gray-400">{title}</h1>
          <p className='text-gray-500 text-xs' >1 d •<img className='inline w-3 ml-1 mb-1' src="https://i.ibb.co/PtR8YTc/world-map.png" alt="" /></p>
        </div>

      </div>
      <img className="mt-3" src={image} alt="" />
      <div className="px-3 pb-3" >
        <div className='px-2 pb-2' style={{
          borderBottom: '1px solid #ffffff1a',
          borderLeft: '1px solid #ffffff1a',
          borderRight: '1px solid #ffffff1a',
          borderBottomRightRadius: '10px',
          borderBottomLeftRadius: '10px',
        }}>

          <div className=''>
          <p className="mb-3 font-normal" style={{ color: "#E3E3E3E3" }}>{content}</p>
          </div>
        </div>
        <div className='mt-1 pb-2' style={{ borderBottom:"1px solid #ffffff1a" }}>
          <p className="text-right mr-2" style={{ color: "#E3E3E3E3" }}>{signature}</p>
        </div>
          <div className='flex justify-around my-2' >{categoriasTest?.map(
            (category) => {
              return <span className='px-5 py-1' style={{ 
                color: '#ffffff99',
                fontWeight: '500',
                border: '1px solid #ffffff1a',
                borderRadius: '10px',
              }}>{category.name}</span>
            }
            )}</div>
        <div className='mt-1' style={{ borderTop:"1px solid #ffffff1a" }}>
            <p className="text-sm ml-2 mt-1 flex items-center" style={{ color: "#E3E3E3E3" }}>{signature}</p>
        </div>
      </div>
    </div>
  )
}
