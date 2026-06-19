import React from 'react'
import { useNavigate } from 'react-router-dom'



function BlogCard({ blog }) {
    const {title, subtitle, description, image, _id, category} = blog
    const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className='flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-5 cursor-pointer'
      role='button'
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          navigate(`/blog/${_id}`);
        }
      }}
    >
        <img src={image} alt={title} className='aspect-video w-full object-cover rounded-lg' />
        <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
        <div className='mt-4'>
          <h3 className='text-lg font-semibold'>{title}</h3>
          {subtitle && <p className='mt-1 text-sm font-medium text-gray-500'>{subtitle}</p>}
          <p className='mt-2 text-sm text-gray-600 line-clamp-3' dangerouslySetInnerHTML={{ __html: description.slice(0, 140) }}></p>

          <button
            type='button'
            onClick={() => navigate(`/blog/${_id}`)}
            className='mt-4 inline-flex items-center text-primary font-semibold hover:text-primary/80'
          >
            View
          </button>

        </div>

    </div>
  )
}

export default BlogCard
