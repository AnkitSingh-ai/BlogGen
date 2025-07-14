import React from 'react'
import { useNavigate } from 'react-router-dom'



function BlogCard({ blog }) {
    const {title, description, image, _id, category} = blog
    const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/blog/${_id}`)} className='flex flex-col cursor-pointer bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-5'>
        <img src={image} alt="" className='aspect-video w-full object-cover rounded-lg' />
        <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
        <div className='mt-4'>
          <h3 className='text-lg font-semibold'>{title}</h3>
          <p className='mt-2 text-sm text-gray-600' dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}></p>

        </div>

    </div>
  )
}

export default BlogCard
