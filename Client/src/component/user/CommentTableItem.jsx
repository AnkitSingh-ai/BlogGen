import React from 'react';

function CommentTableItem({ comment, onDelete }) {
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4">
                <div className="text-sm text-gray-900 max-w-xs truncate">
                    {comment.content}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                    {comment.blog?.title || 'Blog not found'}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{comment.authorName}</div>
                <div className="text-sm text-gray-500">{comment.authorEmail}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                    onClick={() => onDelete(comment._id)}
                    className="text-red-600 hover:text-red-900"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default CommentTableItem;
