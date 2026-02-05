import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

export default function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  function newDate(paste){
    const dateString = paste.createdAt;
    const date = new Date(dateString);

    return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  }

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(paste) {
    const shareData = {
      title: paste.title,
      text: paste.content,
    };
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => toast.success("Shared successfully"))
        .catch((error) => {
          console.log("Error sharing", error);
          toast.error("Failed to share");
        });
    } else {
      console.log("Not available");
    }
  }

  return (
    <div>
      <input
        className="p-3 mt-3 ml-3 min-w-xl bg-cyan-950 border-2 rounded-3xl border-sky-600 "
        value={searchTerm}
        placeholder="search here..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-3 mt-5 ml-3">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                className="border-3 border-amber-400 bg-gray-800 p-3 mx-5 rounded-2xl"
                key={paste?._id}
              >
                <div className="font-bold text-xl text-blue-500">{paste.title}</div>
                <div className="text-lg mt-2">{paste.content}</div>
                <div className="flex flex-row gap-7 mr-3 place-content-end">
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>
                      <span className="material-symbols-outlined text-amber-500 hover:text-amber-700 duration-200 ease-in">
                        edit
                      </span>
                    </a>
                  </button>

                  <button>
                    <a href={`/pastes/${paste?._id}`}>
                      <span className="material-symbols-outlined text-amber-500 hover:text-amber-700 duration-200 ease-in cursor-pointer">
                        visibility
                      </span>
                    </a>
                  </button>

                  <button onClick={() => handleDelete(paste?._id)}>
                    <span className="material-symbols-outlined text-amber-500 hover:text-amber-700 duration-200 ease-in cursor-pointer">
                      delete
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard.");
                    }}
                  >
                    <span className="material-symbols-outlined text-amber-500 hover:text-amber-700 duration-200 ease-in cursor-pointer">
                      content_copy
                    </span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      handleShare(paste);
                    }}
                  >
                    <span className="material-symbols-outlined text-amber-500 hover:text-amber-700 duration-200 ease-in cursor-pointer">forward</span>
                  </button>
                </div>
                <div className="flex flex-row place-content-end mt-1 mr-3 text-green-400">{newDate(paste)}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
