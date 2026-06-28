import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/slice/pasteSlice";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const [searchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const allPaste = useSelector((state) => state.paste.pastes);

  const createPaste = () => {
    if (!title.trim() || !value.trim()) {
      toast.error("Title and content are required");
      return;
    }

    const paste = {
      _id: pasteId || Date.now().toString(36),
      title,
      content: value,
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    navigate("/pastes");
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <div className="flex gap-4 mb-5">
        <input
          required
          type="text"
          value={title}
          placeholder="Enter Title..."
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300"
        />

        <button
          onClick={createPaste}
          className={`px-6 py-3 rounded-xl text-white
          ${
            pasteId
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {pasteId ? "Update" : "Create"}
        </button>
      </div>

      <textarea
        required
        value={value}
        placeholder="Write your note here..."
        onChange={(e) => setValue(e.target.value)}
        rows={15}
        className="w-full rounded-xl border p-4"
      />
    </div>
  );
};

export default Home;
