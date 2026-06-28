import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const [searchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      {/* Top Section */}
      <div className="flex gap-4 mb-5">
        <input
          type="text"
          value={title}
          placeholder="Enter Title..."
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          className={`px-6 py-3 rounded-xl text-white font-medium transition
          ${
            pasteId
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {pasteId ? "Update" : "Create"}
        </button>
      </div>

      {/* Content Area */}
      <textarea
        value={value}
        placeholder="Write your note here..."
        onChange={(e) => setValue(e.target.value)}
        rows={15}
        className="w-full rounded-xl border border-gray-300
        p-4 resize-none focus:outline-none
        focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Home;
