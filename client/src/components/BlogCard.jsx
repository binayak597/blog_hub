import { Link, useNavigate } from "react-router-dom";
import { deleteBlog, getAllBlogs } from "../services/blogApi";
import { useDispatch } from "react-redux";
import { setBlogs } from "../features/blogSlice";

const BlogCard = ({ blog, currentUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      await deleteBlog(blog._id);
      const { data } = await getAllBlogs();
      dispatch(setBlogs(data));
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <h3 className="text-xl font-semibold">
        <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
      </h3>
      <p className="text-gray-600 mt-2">{blog.content.slice(0, 100)}…</p>
      <p className="text-sm text-gray-500 mt-1">By {blog.author.name}</p>

      <div className="flex gap-2 mt-3 flex-wrap">
        <Link
          to={`/blogs/${blog._id}`}
          className="text-white bg-blue-600 px-3 py-1 rounded"
        >
          Details
        </Link>

        {currentUser && currentUser._id === blog.author._id && (
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

export default BlogCard;
