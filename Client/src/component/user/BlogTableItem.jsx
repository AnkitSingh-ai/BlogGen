import React from 'react';
import { useNavigate } from 'react-router-dom';

function BlogTableItem({ blog, onDelete, onTogglePublish, onEdit }) {
    const navigate = useNavigate();

    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => navigate(`/blog/${blog._id}`)}>
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                        <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={blog.image}
                            alt={blog.title}
                        />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                        {blog.subtitle && (
                            <div className="text-sm text-gray-500">{blog.subtitle}</div>
                        )}
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    blog.isPublished 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                }`}>
                    {blog.isPublished ? 'Published' : 'Draft'}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(blog._id);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                    >
                        Edit
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onTogglePublish(blog._id, blog.isPublished);
                        }}
                        className={`${
                            blog.isPublished 
                                ? 'text-yellow-600 hover:text-yellow-900' 
                                : 'text-green-600 hover:text-green-900'
                        }`}
                    >
                        {blog.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(blog._id);
                        }}
                        className="text-red-600 hover:text-red-900"
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default BlogTableItem;
