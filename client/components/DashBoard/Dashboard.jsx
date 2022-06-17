import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, filterByCategory, resetFilter  } from '../../redux/actions'

export default function Dashboard() {
  const dispatch = useDispatch()
   useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const categories = useSelector(state => state.categories)

  const handleFilter = (e) => {
    dispatch(filterByCategory(e))
  }
  const handleReset = () => {
    dispatch(resetFilter())
  }



  return (
    <div className=' fixed h-full mt-2' style={{width:"28vw", borderRight:"1px solid #ffffff1a"}}>

<div className='my-2 '>
              <div className=' mx-4 h-auto my-2'>

              <p id="pDash">Aun no</p>
              <p id="pDash">Implemente</p>
              <p id="pDash">Estas barras</p>
              <p id="pDash">Pero quedan</p>
              <p id="pDash">Super</p>
              <p id="pDash">Lindas uwu</p>

              </div>
        </div>

        <div className=' mx-4 mt-10 pb-2'>
            <div className=''>
                  <h1 className='text-white' style={{fontSize:"1.5vw", fontWeight:"bold"}}>Categories:</h1>
                <div className='grid grid-cols-2 text-sm'>
                <span onClick={() => handleReset()} id="buttonPost"  className='' style={{
                      fontWeight: '500',
                      textAlign: 'center',
                      marginRight: '1vw',
                      marginTop: '1.5vh',
                      border: '1px solid #ffffff1a',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}>        
                      Reset Filters       
                    </span>
                  {categories.map(category => (
                    <span key={category.id} onClick={() => handleFilter(category.name)} id="buttonCat" className='' style={{
                      color: '#ffffff99',
                      fontWeight: '500',
                      textAlign: 'center',
                      marginRight: '1vw',
                      marginTop: '1.5vh',
                      border: '1px solid #ffffff1a',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      padding: '0.2vw',
                    }}>        
                      {category.name}        
                    </span>))}
                </div>
            </div>
            </div>
            <div className='mx-4 mt-16 h-10'>
              <div className=' mx-4 h-auto '>
                </div>
              </div>
    </div>
  )
}
