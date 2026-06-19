
import { useState } from 'react'
import { useEffect } from 'react'
import CommentTableItem from '../../component/admin/CommentTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast'

function Comments() {

  const [comments, setComments] = useState([]);
  const [filter , setFilter] = useState('Not Approved'); // 'all', 'approved', 'pending'

  const { axios } = useAppContext();
  
const fetchComments = async () => {
  try {
    const { data } = await axios.get('/api/admin/comments');
    if (data.success) {
      setComments(Array.isArray(data.comments) ? data.comments : []);
    } else {
      toast.error(data.message);
      setComments([]); // fallback to empty array on error
    }
  } catch (error) {
    toast.error(error.message);
    setComments([]); // fallback to empty array on error
  }
};

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className='flex-1 pt-5 px-4 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <div className='flex justify-between item-center max-w-3xl'>
        <h1 className='text-lg font-semibold text-gray-700'>Comments</h1>
        
        <div className='flex gap-4'>
          <button
  className={'shadow-custom-sm border rounded-full px-4 py-2 text-xs cursor-pointer ' + (filter === 'Approved' ? 'text-primary' : 'text-gray-700')}
  onClick={() => setFilter('Approved')}
>
  Approved
</button>
<button
  className={'shadow-custom-sm border rounded-full px-4 py-2 text-xs cursor-pointer ' + (filter === 'Not Approved' ? 'text-primary' : 'text-gray-700')}
  onClick={() => setFilter('Not Approved')}
>
  Not Approved
</button>
        </div>
      </div>

      <div className='relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg bg-white scrollbar-hide'>
        <table className='w-full h-4/5 text-sm text-gray-500'>
          <thead className='text-xs text-gray-600 uppercase text-left'>
            <tr>
              <th scope='col' className='px-6 py-3'>Blog Title & Comments</th>
              <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
              <th scope='col' className='px-2 py-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.filter((comment) => {
  if (filter === 'Approved') return comment.isApproved === true;
  if (filter === 'Not Approved') return comment.isApproved === false;
  return true; // for 'all'
             
            }).map((comment, index) => {
              return (
                <CommentTableItem key={comment._id} comment={comment} index={index + 1} fetchComments={fetchComments} />
              )
            })}
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default Comments;
