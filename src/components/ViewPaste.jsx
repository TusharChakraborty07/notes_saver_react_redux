import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MdEdit, MdContentCopy } from "react-icons/md";
import { toast } from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const allPastes = useSelector((state) => state.paste.pastes);

  const selectedPaste = allPastes.find((p) => p._id === id);

  if (!selectedPaste) {
    return (
      <div className="flex flex-col items-center justify-center py-28">
        <div className="text-7xl">📝</div>

        <h2 className="mt-5 text-3xl font-bold">Paste not found</h2>

        <p className="mt-2 text-gray-400">
          The paste you are looking for doesn't exist.
        </p>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedPaste.content);
    toast.success("Copied!");
  };

  const handleEdit = () => {
    navigate(`/?pasteId=${selectedPaste._id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div
        className="
          border
          rounded-3xl
          shadow-sm
          hover:shadow-lg
          transition
          overflow-hidden
        "
      >
        {/* Header */}
        <div
          className="
            px-8
            py-7
            border-b
            flex
            justify-between
            items-start
            gap-6
          "
        >
          <div className="flex-1">
            <input
              type="text"
              disabled
              value={selectedPaste.title}
              className="
                w-full
                bg-transparent
                text-4xl
                font-bold
                outline-none
              "
            />

            <div className="flex items-center gap-3 mt-3">
              <span className="text-gray-400">📅</span>

              <span className="text-sm text-gray-400">
                {new Date(selectedPaste.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>

              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  border
                  text-green-600
                  text-xs
                  font-semibold
                "
              >
                CODE
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleEdit}
              className="
                w-12
                h-12
                rounded-xl
                border
                flex
                items-center
                justify-center
                hover:bg-yellow-50
                transition
              "
            >
              <MdEdit size={22} />
            </button>

            <button
              onClick={handleCopy}
              className="
                w-12
                h-12
                rounded-xl
                border
                flex
                items-center
                justify-center
                hover:bg-green-50
                transition
              "
            >
              <MdContentCopy size={22} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <textarea
            disabled
            value={selectedPaste.content}
            className="
              w-full
              min-h-[200px]
              resize-none
              rounded-2xl
              border
              bg-gray-50
              p-6
              text-gray-700
              leading-8
              outline-none
            "
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
