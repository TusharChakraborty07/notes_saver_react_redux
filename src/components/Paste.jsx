import React, { useState } from "react";
import {
  MdSearch,
  MdEdit,
  MdDelete,
  MdContentCopy,
  MdVisibility,
} from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/slice/pasteSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Paste = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const pastes = useSelector((state) => state.paste.pastes);

  // Search
  const filterData = pastes.filter(
    (paste) =>
      paste.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paste.content.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Actions
  const handleEdit = (id) => {
    navigate(`/?pasteId=${id}`);
  };

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  const handleView = (id) => {
    navigate(`/paste/${id}`);
  };

  const handleCopy = (id) => {
    const selectedPaste = pastes.find((item) => item._id === id);

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
            outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
        />
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {filterData.length > 0 ? (
          filterData.map((paste) => (
            <div
              key={paste._id}
              className="
                border
                rounded-3xl
                p-6
                shadow-sm
                hover:shadow-xl
                transition-all
              "
            >
              <div className="flex justify-between gap-8">
                {/* LEFT */}
                <div className="flex-1">
                  <h2 className="text-4xl font-bold mb-3">{paste.title}</h2>

                  <p
                    className="
                      text-gray-500
                      leading-7
                      line-clamp-3
                    "
                  >
                    {paste.content}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col justify-between">
                  {/* Icons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(paste._id)}
                      className="
                        w-11
                        h-11
                        border
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        hover:bg-gray-100
                      "
                    >
                      <MdEdit size={20} />
                    </button>

                    <button
                      onClick={() => handleDelete(paste._id)}
                      className="
                        w-11
                        h-11
                        border
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        hover:bg-red-50
                      "
                    >
                      <MdDelete size={20} />
                    </button>

                    <button
                      onClick={() => handleCopy(paste._id)}
                      className="
                        w-11
                        h-11
                        border
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        hover:bg-green-50
                      "
                    >
                      <MdContentCopy size={20} />
                    </button>

                    <button
                      onClick={() => handleView(paste._id)}
                      className="
                        w-11
                        h-11
                        border
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        hover:bg-blue-50
                      "
                    >
                      <MdVisibility size={20} />
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-end gap-4 mt-10">
                    <div className="flex items-center gap-2 text-gray-400">
                      <span>📅</span>

                      <span className="text-sm">
                        {new Date(paste.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    {/* <div
                      className="
                        px-4
                        py-1
                        rounded-full
                        border
                        text-green-600
                        font-medium
                      "
                    >
                      CODE
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="
              rounded-3xl
              border
              py-20
              text-center
            "
          >
            <div className="text-7xl">📝</div>

            <h2 className="text-2xl font-semibold mt-4">No Paste Found</h2>

            <p className="text-gray-400 mt-2">Create your first paste</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
