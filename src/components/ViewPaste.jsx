import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToPastes, updateToPastes, resetAllPastes, removeFromPastes} from "/src/redux/pasteSlice";
import { useParams, useSearchParams } from "react-router-dom";


export default function ViewPaste() {
    const {id}= useParams();
    const allPastes = useSelector((state)=>state.paste.pastes);
    const paste = allPastes.filter((p)=> p._id === id)[0];
    console.log("Final paste: ",paste);

  return (
    <div>
      <div className="flex flex-row gap-7">
        <input
          className="p-4 text-xl ml-10 w-[80%] border mt-5 placeholder-gray-400 text-amber-400 rounded-4xl bg-gray-800 pl-5 cursor-text"
          type="text"
          disabled
          placeholder="enter title here"
          value={paste.title}
        />
      </div>
      <br />
      <div className="mt-8">
        <textarea
          className="mx-auto block w-1/2 bg-black rounded-lg min-w-[50%] p-4 placeholder:text-gray-400 border-3 border-amber-500 text-teal-400 cursor-text"
          rows={20}
          value={paste.content}
          disabled
          placeholder="enter content here"
        ></textarea>
      </div>
    </div>
  );
}
