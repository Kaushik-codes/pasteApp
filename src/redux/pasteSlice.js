import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const getInitialState = () => {
  try {
    const data = localStorage.getItem("pastes");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Invalid JSON in localStorage:", error);
    localStorage.removeItem("pastes");  //  cleanup corrupted data
    return [];
  }
};

const initialState = {
  pastes: getInitialState() //state value
};

export const pasteSlice = createSlice({
  name: 'paste', // slice name
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      const paste = action.payload;

      const existingPaste = state.pastes.find(item=> item.title===paste.title);
      if(existingPaste){
        toast.error('Paste with same title already exists.');
        return;
      }

      state.pastes.push(paste);  // for centralized storage
      localStorage.setItem("pastes", JSON.stringify(state.pastes)); // for localstorage
      toast.success('Paste Created Successfully.');
    },

    updateToPastes: (state,action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex(item => item._id === paste._id);
      if(index>=0){
        state.pastes[index] = paste;

        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Updated.");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes=[];

      localStorage.removeItem("pastes");
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      const index = state.pastes.findIndex(item => item._id === pasteId);

      if(index >= 0 ){
        state.pastes.splice(index,1);

        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Deleted");
      }
    },
  },
})

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer