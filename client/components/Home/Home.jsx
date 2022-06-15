import React from 'react'
import Cards from '../Cards/Cards'
import Create from '../Create/Create'
import NavBar from '../NavBar/NavBar'

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className='sgrid sgrid-cols-2'>

          <Cards />
        </div>
      </div>
  )
}
