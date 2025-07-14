import React, { use } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import BlogTableItem from '../../component/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast'

function ListBlog() {
  const [blogs, setBlogs] = useState([])
  const {axios} =useAppContext()

  const fetchBlogs = async ()=>{
    try {
      const {data} = await axios.get('/api/admin/blogs')
      if(data.success){
        setBlogs(data.blogs)
      }else {
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }
  , [])


  return (
    <div className='flex-1 pt-5 px-4 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <h1>All Blogs</h1>
      <div className='relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg bg-white scrollbar-hidden'>
        <table className='w-full h-4/5 text-sm  text-gray-500'>
            <thead className='text-xs text-gray-600 uppercase text-left'>
                <tr>
                    <th scope='col' className='px-2 py-4'>#</th>
                    <th scope='col' className='px-2 py-4'>Blog Title</th>
                    <th scope='col' className='px-2 py-4'>Date</th>
                    <th scope='col' className='px-2 py-4'>Status</th>
                    <th scope='col' className='px-2 py-4'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {blogs.map((blog, index) => {
                   return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1} />
                })}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListBlog
