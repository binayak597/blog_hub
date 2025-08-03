import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getBlogById, deleteBlog } from "../services/blogApi";
import { useSelector, useDispatch } from "react-redux";
import { setBlogs } from "../features/blogSlice";
import { getAllBlogs } from "../services/blogApi";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getBlogById(id).then(({ data }) => setBlog(data));
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      await deleteBlog(blog._id);
      const { data } = await getAllBlogs();
      dispatch(setBlogs(data));
      navigate("/");
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
      <p className="text-gray-700 mb-2">{blog.content}</p>
      <p className="text-sm text-gray-500 mb-4">By {blog.author.name}</p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="text-white bg-gray-600 px-3 py-1 rounded"
        >
          Back
        </button>

        {user && user._id === blog.author._id && (
          <>
            <button
              onClick={() => navigate(`/edit/${blog._id}`)}
              className="text-white bg-blue-600 px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-white bg-red-600 px-3 py-1 rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
