import { useState, useEffect } from "react";
import { createBlog, updateBlog, getBlogById } from "../services/blogApi";

import { addBlog } from "../features/blogSlice";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const CreateBlog = ({ editMode }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (editMode && id) {
      getBlogById(id).then(({ data }) => {
        setTitle(data.title);
        setContent(data.content);
      });
    }
  }, [editMode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateBlog(id, { title, content });
      } else {
        const res = await createBlog({ title, content });
        dispatch(addBlog(res.data));
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">
        {editMode ? "Edit" : "Create"} Blog
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Content"
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          {editMode ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
