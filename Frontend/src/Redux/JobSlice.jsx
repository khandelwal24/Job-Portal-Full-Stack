import { configureStore, createSlice } from "@reduxjs/toolkit";

const JobSlice = createSlice({
    name:'job',
    initialState:{
        alljobs:[],
        singleJob:null,
        alladminJobs:[],
        searchJobsByText:'',
        Allappliedjobs:[],
        searchQuery:'',
    },
    reducers:{
      setAlljobs:(state,action)=>{
        state.alljobs = action.payload;
      },
      setSinglejob:(state,action)=>{
        state.singleJob = action.payload;
      },
      setallAdminJobs:(state,action)=>{
        state.alladminJobs = action.payload;
      },
      setsearchJobsByText:(state,action)=>{
        state.searchJobsByText = action.payload;
      },
      setAllappliedJobs:(state,action)=>{
        state.Allappliedjobs = action.payload;
      },
      setSearchQuery:(state,action)=>{
        state.searchQuery = action.payload;
      }
    },
})
export const {setAlljobs,setSinglejob,setallAdminJobs,setsearchJobsByText,setAllappliedJobs,setSearchQuery} = JobSlice.actions
export default JobSlice.reducer;