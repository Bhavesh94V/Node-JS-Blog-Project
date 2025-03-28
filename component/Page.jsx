import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function Page() {
    const [article, setArticle] = useState('');
    const [author, setAuthor] = useState('');
    const [comment, setComment] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editArticle, setEditArticle] = useState('');
    const [editAuthor, setEditAuthor] = useState('');
    const [editComment, setEditComment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBlogs() {
            await loadBlogs();
        }
        fetchBlogs();
    }, []);

    async function loadBlogs() {
        const response = await axios.get('http://localhost:9999/blog');
        setBlogs(response.data);
        setFilteredBlogs(response.data);
    }

    async function addBlog(e) {
        e.preventDefault();
        await axios.post('http://localhost:9999/addblog', { author, article, comment });
        loadBlogs();
    }

    useEffect(() => {
        if (search === '') {
            setFilteredBlogs(blogs);
        } else {
            setFilteredBlogs(blogs.filter(el => el?.author?.toLowerCase().includes(search.toLowerCase())));
        }
    }, [search, blogs]);

    async function updateBlog(e) {
        e.preventDefault();
        await axios.put(`http://localhost:9999/updateblog/${editId}`, { author: editAuthor, article: editArticle, comment: editComment });
        loadBlogs();
        setEditId(null);
    }

    async function deleteBlog(id) {
        await axios.delete(`http://localhost:9999/deleteblog/${id}`);
        loadBlogs();
    }

    function logout() {
        navigate('/login');
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-6">Blogs</h2>
            <form onSubmit={addBlog} className="mb-8">
                <input
                    type="text"
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Article"
                    onChange={(e) => setArticle(e.target.value)}
                />
                <input
                    type="text"
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Author"
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <input
                    type="text"
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Comment"
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit" className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">Add Blog</button>
            </form>

            <input
                type="text"
                className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search by author name"
                onChange={(e) => setSearch(e.target.value)}
            />

            {blogs.length === 0 ? (
                <h2 className="text-center text-gray-500">No blogs available. Add a blog first.</h2>
            ) : (
                <div className="space-y-6">
                    {filteredBlogs.map((el, i) => (
                        <div key={i} className="bg-white rounded-lg shadow-lg p-6">
                            {editId === el._id ? (
                                <form onSubmit={updateBlog}>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={editArticle}
                                        onChange={(e) => setEditArticle(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={editAuthor}
                                        onChange={(e) => setEditAuthor(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={editComment}
                                        onChange={(e) => setEditComment(e.target.value)}
                                    />
                                    <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-6">Save</button>
                                    <button type="button" className="ml-3 bg-gray-500 text-white rounded-md py-2 px-6" onClick={() => setEditId(null)}>Cancel</button>
                                </form>
                            ) : (
                                <div>
                                    <h5 className="text-lg font-semibold text-blue-500">{el.article}</h5>
                                    <h6 className="text-gray-500">By: {el.author}</h6>
                                    <p className="text-gray-600">Comments: {el.comment}</p>
                                    <div className="mt-4 space-x-2">
                                        <button className="bg-yellow-500 text-white py-2 px-4 rounded-md" onClick={() => {
                                            setEditId(el._id);
                                            setEditArticle(el.article);
                                            setEditAuthor(el.author);
                                            setEditComment(el.comment);
                                        }}>Edit</button>
                                        <button className="bg-red-500 text-white py-2 px-4 rounded-md" onClick={() => deleteBlog(el._id)}>Delete</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <button className="w-full py-2 bg-red-500 text-white rounded-md mt-6 hover:bg-red-600 focus:outline-none" onClick={logout}>Log Out</button>
        </div>
    );
}
