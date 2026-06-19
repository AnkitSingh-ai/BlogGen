import React, { useState,useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { assets} from '../assets/assets';
import Navbar from '../component/Navbar';
import Moment from 'moment';
import Footer from '../component/Footer';
import Loader from '../component/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast'


function Blog() {

  const { id } = useParams();

  const {axios} = useAppContext();

  const [data , setData] = useState(null);
  const[comments , setComments] = useState([]);

  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const mergeComments = (incomingComments) => {
    if (!Array.isArray(incomingComments)) return;

    setComments((previousComments) => {
      const combined = [...incomingComments, ...previousComments];
      const uniqueComments = [];
      const seenIds = new Set();

      for (const comment of combined) {
        const key = comment?._id || `${comment?.name}-${comment?.content}-${comment?.createdAt}`;
        if (seenIds.has(key)) continue;
        seenIds.add(key);
        uniqueComments.push(comment);
      }

      return uniqueComments;
    });
  };

const fetchComments = async () => {
  try {
    const { data } = await axios.post('/api/blog/comments', { blogId: id });
    if (data.success) {
      mergeComments(data.comments);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/user-blog/${id}`);
      if (data.success) {
        setData(data.blog);
        mergeComments(data.comments);
      } else {
        toast.error(data.message);
      }
    }
    catch(error){
      toast.error(error.message)
    }
  };

  const addComment = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post('/api/blog/add-comment', {
      blog: id,
      name,
      content,
    });
    if (data.success) {
      toast.success('Comment added successfully!');
      setName('');
      setContent('');
      if (data.comment) {
        mergeComments([data.comment]);
      }
      await fetchBlogData();
      await fetchComments();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  useEffect(() => {
    const loadBlog = async () => {
      await fetchBlogData();
      await fetchComments();
    };

    loadBlog();
  }, []);
  return data ? (
    <div className='relative'>
        <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50'/>
      <Navbar />
      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subtitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>
          {data.authorName || data.author?.name || 'BlogGen Author'}
        </p>
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt="" className='rounded-3xl mb-5' />
        <div className='rich-text' dangerouslySetInnerHTML={{ __html: data.description }} />
      </div>

      {/* Comments section*/}
      <div className='mt-14 mb-10 mx-5 max-w-6xl md:mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-start'>
          <div>
            <p className='font-semibold mb-4'>Add your comment</p>
            <form onSubmit={addComment} className='flex flex-col item-start gap-4 max-w-xl'>
              <input value={name} onChange={(e) => setName(e.target.value)} type='text' className='w-full p-2 border border-gray-300 rounded outline-none' placeholder='Your Name' required />
              <textarea value={content} onChange={(e) => setContent(e.target.value)} className='w-full p-2 border border-gray-300 rounded outline-none h-48' rows={4} placeholder='Write your comment...' required />
              <button type='submit' className='bg-primary text-white py-2 px-8 rounded hover:scale-102 transition-all cursor-pointer'>Submit</button>
            </form>
          </div>

          <div>
            <p className='font-semibold mb-4'>Comments ({comments.length})</p>
            <div className='flex flex-col gap-4 max-h-[32rem] overflow-y-auto pr-2'>
              {comments.length === 0 ? (
                <div className='rounded border border-dashed border-gray-300 p-6 text-sm text-gray-500'>
                  No comments yet. Be the first to comment.
                </div>
              ) : (
                comments.map((item, index) => (
                  <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                    <div className='flex items-center gap-3 mb-2'>
                      <img src={assets.user_icon} alt="" className='w-6' />
                      <p className='font-semibold text-gray-800'>{item.name}</p>
                    </div>
                    <p className='text-sm max-w-md ml-8'> {item.content}</p>
                    <div>
                      <p className='absolute right-4 bottom-3 flex item-center gap-2 text-xs'>{Moment(item.createdAt).format('MMMM Do YYYY')}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Share Button */}
        <div className='my-24 max-w-3xl'>
          <p className='font-semibold my-4'>Share this blog on Social media</p>
          <div className='flex'>
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.googleplus_icon} alt="" />
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
  ) : <Loader />;
}

export default Blog;
