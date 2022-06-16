import React from 'react'
import { useState } from 'react'

export default function imageConverter() {
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const uploadImage = async (e) => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'ivansyko')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/ivansyko/image/upload',
            {
                method: 'POST',
                body: data,
                
            }
        )
        console.log(res)
        const file = await res.json()
        console.log(res)
        setImage(file.secure_url)
        setLoading(false)
    }


  return (
    <div className='flex justify-center'>
        <input type="file" onChange={uploadImage} />
        {loading ? <p>Loading...</p> : <img src={image} alt="Uploaded Images" />}
    </div>
  )
}
