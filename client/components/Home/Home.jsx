import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cards from '../Cards/Cards'
import Create from '../Create/Create'
import Dashboard from '../DashBoard/Dashboard'
import NavBar from '../NavBar/NavBar'
import { filterById, resetFilter, resetPost } from '../../redux/actions'

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetPost())
    dispatch(filterById())
  }
    , [dispatch])
  return (
    <div id="create">
      <div id="desktop" className='hidden sm:contents'>
        <NavBar />
        <div  className="pt-28 md:pt-24 lg:pt-12 xl:pt-12 2xl:pt-12">
        </div>
        <div id='contenedor'>
          <div id='sidebar' > 
        <Dashboard/>
          </div>

          <div id='principal'>
            <div className='mx-40'>

        <Cards/>
            </div>
          </div>
        </div> 
      </div>

      <div id="mobile" className='contents sm:hidden'>
        <div className='flex justify-center'>
        <NavBar />
          <div className='mx-4 mt-12'>
        <Cards/>

          </div>

        </div>
      </div>


    </div>
  )
}
