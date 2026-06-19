import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import BlogTableItem from '../../component/user/BlogTableItem';

function ListBlog() {
    const { axios, user, token, fetchBlogs: refreshHomepageBlogs } = useAppContext();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token || !user) {
            navigate('/user');
            return;
        }
        fetchBlogs();
    }, [token, user, navigate]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/user-blog/user/my-blogs');
            if (data.success) {
                setBlogs(data.blogs);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to fetch blogs');
            console.error('Fetch blogs error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (blogId) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) {
            return;
        }

        try {
            const { data } = await axios.delete(`/api/user-blog/${blogId}`);
            if (data.success) {
                toast.success('Blog deleted successfully!');
                fetchBlogs();
                refreshHomepageBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to delete blog');
        }
    };

    const handleTogglePublish = async (blogId, currentStatus) => {
        try {
            const { data } = await axios.patch(`/api/user-blog/${blogId}/toggle-publish`);
            if (data.success) {
                toast.success(`Blog ${!currentStatus ? 'published' : 'unpublished'} successfully!`);
                fetchBlogs();
                refreshHomepageBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to update blog status');
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
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Manage Blogs</h1>
                        <p className="text-gray-600 mt-2">View and manage all your blog posts</p>
                    </div>
                    <button
                        onClick={() => navigate('/user/addBlog')}
                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Blog
                    </button>
                </div>

                {/* Blogs Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Your Blogs</h2>
                    </div>
                    
                    {blogs.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No blogs yet</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by creating your first blog post.</p>
                            <div className="mt-6">
                                <button
                                    onClick={() => navigate('/user/addBlog')}
                                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                                >
                                    Create Blog
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Blog
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {blogs.map((blog) => (
                                        <BlogTableItem
                                            key={blog._id}
                                            blog={blog}
                                            onDelete={handleDelete}
                                            onTogglePublish={handleTogglePublish}
                                            onEdit={() => navigate(`/user/editBlog/${blog._id}`)}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListBlog;
