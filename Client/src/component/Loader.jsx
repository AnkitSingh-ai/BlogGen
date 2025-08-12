import React from 'react'

function Loader() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='animate-spin rounded-full h-16 w-16 border-t-white border-4 border-gray-700'></div>
    </div>
  )
}

export default Loader
