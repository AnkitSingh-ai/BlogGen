import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
    const { axios, user, token } = useAppContext();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token || !user) {
            navigate('/user');
            return;
        }
        fetchDashboardData();
    }, [token, user, navigate]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/user-blog/user/dashboard');
            if (data.success) {
                setDashboardData(data.dashboard);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to fetch dashboard data');
            console.error('Dashboard error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
                    <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Blogs</p>
                                <p className="text-2xl font-semibold text-gray-900">{dashboardData.blogs}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Comments</p>
                                <p className="text-2xl font-semibold text-gray-900">{dashboardData.comments}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Draft Blogs</p>
                                <p className="text-2xl font-semibold text-gray-900">{dashboardData.drafts}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <button
                        onClick={() => navigate('/user/addBlog')}
                        className="bg-primary text-white p-6 rounded-lg hover:bg-primary/90 transition-colors text-center"
                    >
                        <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <p className="font-semibold">Create Blog</p>
                    </button>

                    <button
                        onClick={() => navigate('/user/listBlog')}
                        className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors text-center"
                    >
                        <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="font-semibold">Manage Blogs</p>
                    </button>

                    <button
                        onClick={() => navigate('/user/comments')}
                        className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors text-center"
                    >
                        <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="font-semibold">View Comments</p>
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition-colors text-center"
                    >
                        <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <p className="font-semibold">View Homepage</p>
                    </button>
                </div>

                {/* Recent Blogs */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Blogs</h2>
                    {dashboardData.recentBlogs.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No blogs created yet. Start by creating your first blog!</p>
                    ) : (
                        <div className="space-y-4">
                            {dashboardData.recentBlogs.map((blog) => (
                                <div key={blog._id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-900">{blog.title}</h3>
                                            <p className="text-sm text-gray-500">
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            blog.isPublished 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {blog.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                        <button
                                            onClick={() => navigate(`/blog/${blog._id}`)}
                                            className="text-primary hover:text-primary/80 text-sm font-medium"
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
