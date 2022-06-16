import React from 'react'
import Card from '../Card/Card'
import { getPosts } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Create from '../Create/Create'

export default function Cards() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    const postsMapped = useSelector(state => state.filteredPosts)
  return (
    <div className=''>
      <Create />
      <div className='my-4' style={{border:"1px dotted #2c2c2c"}}/>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4">
    
        {postsMapped?.map(
          (p, i) => {
            return <Card key={i} id={p.id} {...p}/>
          }
        )}
  
      </div>
    </div>
    )
}
