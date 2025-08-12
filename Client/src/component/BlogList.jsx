import React from 'react'
import { motion } from "motion/react"
import { useState } from 'react'
import BlogCard from './BlogCard'
import { blogCategories, blog_data } from '../assets/assets'
import { useAppContext } from '../context/AppContext'


function BlogList() {

    const [menu , setMenu] = useState('All')
   const { blog, input } = useAppContext();

const filteredBlogs = () => {
  if (input === ' ') {
    return blog || [];
  }
  return (blog || []).filter((b) =>
    b.title.toLowerCase().includes(input.toLowerCase()) ||
    b.category.toLowerCase().includes(input.toLowerCase())
  );
};
  return (
    <div>
      <div className='flex flex-row justify-center gap-4 sm:gap-8 my-10 relative'>
        {blogCategories.map((item)=>(
            <div key={item} className='relative'>
                <button onClick={() => setMenu(item)} className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 pt-0.5'}`}>
                    {item}
                    {menu === item && (
                      <motion.div
                        layoutId='underline'
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'
                      ></motion.div>
                    )}
                </button>
            </div>
        ))}
      </div >
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 x1:grid-cols-4 gap-6 mx-8 sm:mx-16 x1:mx-40'>
     {filteredBlogs().filter((blog) => menu === 'All' || blog.category === menu).map((blog) => (
        <div key={blog._id} className='max-w-2xl mx-auto mb-8'>
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
    </div>
  )

}

export default BlogList;
