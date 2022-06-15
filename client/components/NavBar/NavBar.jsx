import React from 'react'
import {Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav class=" px-2 sm:px-4 py-2"
    style={{
      backgroundColor: '#16171c',
    }}
    >
      <div class="container flex flex-wrap justify-between items-center mx-auto">
      <p class="flex items-center">
        <span class="self-center text-xl font-semibold whitespace-nowrap text-white">JustPostIt!</span>
    </p>
    <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
      <Link to="/"><p class="block py-2 pr-4 pl-3 text-white "> Home</p></Link>
      <Link to="/create"><p class="block py-2 pr-4 pl-3 text-white"> Create</p></Link>
      <Link to="/createcategory"><p class="block py-2 pr-4 pl-3 text-white"> Create Category</p></Link>

    </ul>
      </div>
    </nav>


  )
}
