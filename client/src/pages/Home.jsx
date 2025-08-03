import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../features/blogSlice";
import { getAllBlogs } from "../services/blogApi";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    getAllBlogs().then(({ data }) => dispatch(setBlogs(data)));
  }, [dispatch]);

  return (
    <div>
      {user && (
        <Link
          to="/create"
          className="bg-green-600 text-white py-2 px-4 rounded mb-4 inline-block"
        >
          Create New Blog
        </Link>
      )}
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} currentUser={user} />
      ))}
    </div>
  );
};

export default Home;
