import React from 'react'
import Cards from '../Cards/Cards'
import Create from '../Create/Create'
import Dashboard from '../DashBoard/Dashboard'
import NavBar from '../NavBar/NavBar'

export default function Home() {
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
            <div className='mx-24'>

        <Cards/>
            </div>
          </div>
        </div>
      </div>

      <div id="mobile" className='contents sm:hidden'>
        <div className='flex justify-center'>
        <NavBar />
          <div className='m-10'>
        <Cards/>

          </div>

        </div>
      </div>


    </div>
  )
}
