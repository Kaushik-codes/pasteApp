import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToPastes, updateToPastes, resetAllPastes, removeFromPastes} from "/src/redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [title, setTitle] = useState("");
  const [value,setValue] = useState();
  const [searchParams,setSearchParams] = useSearchParams(); // read and modify the query string parameters in a URL (the part after the ? symbol)
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();


  const allPastes = useSelector((state) => state.paste.pastes);
    useEffect(()=>{
      if(pasteId){
        const paste = allPastes.find((p)=> p._id === pasteId);
        setTitle(paste.title);
        setValue(paste.content);
      }
    },[pasteId]);


  function createPaste(){
    const paste ={
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }
    
    if(pasteId){
      //update
      dispatch(updateToPastes(paste));
    }
    else{
      //create
      dispatch(addToPastes(paste));
    }

    //after creation or deletion
    setTitle('');
    setValue('');
    setSearchParams({});
  };
  return (
    <div>
    <div className="flex flex-row gap-7">
      <input className="p-4 text-xl ml-10 w-[80%] border mt-5 placeholder-gray-400 text-amber-400 rounded-4xl bg-gray-800 pl-5"
        type="text"
        placeholder="Enter title here"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
     
      <button className="p-1 border rounded-4xl w-[10%] mt-5 text-amber-400 bg-gray-900 hover:text-amber-300 duration-300 ease-in-out font-bold" onClick={createPaste}>
        {
          pasteId? "Update Paste" : "Create My Paste"
        }
      </button>
        </div>
        <br/>
      <div className="mt-8">
        <textarea
        className="mx-auto block w-1/2 bg-black rounded-lg min-w-[50%] p-4 placeholder:text-gray-400 border-3 border-amber-500 text-teal-400"
        rows={20}
        value={value}
        placeholder="enter content here"
        onChange={(e)=>{
          setValue(e.target.value)
        }}
        >
        </textarea>
      </div>
      </div>
  );
}
