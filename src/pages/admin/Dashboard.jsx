
import {assets} from '../../assets/assets'
import {useState} from 'react'
import { useEffect } from 'react'
import BlogTableItem from '../../component/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast'

function Dashboard() {
    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: [],
    });

    const {axios} = useAppContext();

    const fetchDashboard = async () => {
        try{
      const {data} = await axios.get('/api/admin/dashboard')
     data.success ? setDashboardData(data.dashboard) : toast.error(data.message)
        }
        catch(error){
       toast.error(error.message)
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>

        <div className='flex flex-wrap gap-4'>
            <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded-shadow cursor-pointer hover:scale-105 transition-all'>
                <img src={assets.dashboard_icon_1} alt="" />
                <div>
                    <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
                    <p className='text-gray-400 font-light'>Blogs</p>
                </div>
            </div>
            <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded-shadow cursor-pointer hover:scale-105 transition-all'>
                <img src={assets.dashboard_icon_2} alt="" />
                <div>
                    <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
                    <p className='text-gray-400 font-light'>Comments</p>
                </div>
            </div>
            <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded-shadow cursor-pointer hover:scale-105 transition-all'>
                <img src={assets.dashboard_icon_3} alt="" />
                <div>
                    <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
                    <p className='text-gray-400 font-light'>Drafts</p>
                </div>
            </div>

<div className='m-4 mt-10 text-gray-600'>
  <div className='flex items-center gap-3 mb-10'>
    <img src={assets.dashboard_icon_4} alt="" />
    <p className='text-gray-400 font-light text-lg'>Latest Blogs</p>
  </div>
  <div className='relative max-w-5xl mx-auto overflow-x-auto shadow-lg rounded-2xl bg-white p-4 mt-8'>
    <table className='w-full text-sm text-gray-700'>
      <thead className='text-xs text-gray-600 uppercase text-left bg-blue-50'>
        <tr>
          <th scope='col' className='px-4 py-4'>#</th>
          <th scope='col' className='px-4 py-4'>Blog Title</th>
          <th scope='col' className='px-4 py-4 max-sm:hidden'>Date</th>
          <th scope='col' className='px-4 py-4 max-sm:hidden'>Status</th>
          <th scope='col' className='px-4 py-4'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dashboardData.recentBlogs.map((blog, index) => (
          <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
        ))}
      </tbody>
    </table>
  </div>
</div>
</div>

    </div>
  )
}

export default Dashboard;
