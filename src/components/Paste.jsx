import React, { useState } from "react";
import {
  MdSearch,
  MdEdit,
  MdDelete,
  MdContentCopy,
  MdVisibility,
  MdShare,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/slice/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Paste = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const pastes = useSelector((state) => state.paste.pastes);

  // Search filter
  const filterData = pastes.filter(
    (paste) =>
      paste.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paste.content.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Functions
  const handleEdit = (pasteId) => {
    navigate(`/?pasteId=${pasteId}`);
  };

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  // const handleShare = (pasteId) => {
  //   console.log("Share:", pasteId);
  // };

  const handleView = (pasteId) => {
    navigate(`/paste/${pasteId}`);
  };

  const handleCopy = (pasteId) => {
    const selectedPaste = pastes.find((paste) => paste._id === pasteId);

    if (selectedPaste) {
      navigator.clipboard.writeText(selectedPaste.content);
      toast.success("Copied!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      {/* Search */}
      <div className="relative mb-10">
        <MdSearch
          className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-2xl
            text-gray-400
          "
        />

        <input
          type="text"
          placeholder="Search your pastes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full
            pl-14
            pr-5
            py-4
            rounded-2xl
            border
            shadow-sm
            focus:ring-2
            focus:ring-indigo-500
            outline-none
          "
        />
      </div>

      {/* Paste Cards */}
      <div className="space-y-6">
        {filterData.length > 0 ? (
          filterData.map((paste) => (
            <div
              key={paste._id}
              className="
                bg-white
                border
                rounded-3xl
                p-6
                shadow-sm
                hover:shadow-xl
                transition
              "
            >
              {/* Header */}
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{paste.title}</h2>

                  <p className="text-sm text-gray-400 mt-1">
                    {paste.createdAt}
                  </p>
                </div>
              </div>

              {/* Content */}
              <p
                className="
                  mt-4
                  text-gray-600
                  line-clamp-3
                  leading-7
                "
              >
                {paste.content}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={() => handleEdit(paste._id)}
                  className="
                    p-3
                    rounded-xl
                    bg-yellow-100
                    text-yellow-700
                    hover:bg-yellow-200
                  "
                >
                  <MdEdit size={20} />
                </button>

                <button
                  onClick={() => handleDelete(paste._id)}
                  className="
                    p-3
                    rounded-xl
                    bg-red-100
                    text-red-700
                    hover:bg-red-200
                  "
                >
                  <MdDelete size={20} />
                </button>

                {/* <button
                  onClick={() => handleShare(paste._id)}
                  className="
                    p-3
                    rounded-xl
                    bg-purple-100
                    text-purple-700
                    hover:bg-purple-200
                  "
                >
                  <MdShare size={20} />
                </button> */}

                <button
                  onClick={() => handleCopy(paste._id)}
                  className="
                    p-3
                    rounded-xl
                    bg-green-100
                    text-green-700
                    hover:bg-green-200
                  "
                >
                  <MdContentCopy size={20} />
                </button>

                <button
                  onClick={() => handleView(paste._id)}
                  className="
                    p-3
                    rounded-xl
                    bg-blue-100
                    text-blue-700
                    hover:bg-blue-200
                  "
                >
                  <MdVisibility size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            className="
              rounded-3xl
              border
              bg-white
              py-20
              text-center
            "
          >
            <div className="text-7xl">📝</div>

            <h3
              className="
                text-2xl
                font-semibold
                mt-4
              "
            >
              No Paste Found
            </h3>

            <p className="text-gray-400 mt-2">Create your first paste.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
