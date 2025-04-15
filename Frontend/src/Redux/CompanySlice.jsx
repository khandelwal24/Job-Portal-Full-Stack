import { createSlice, configureStore } from "@reduxjs/toolkit";
import { act } from "react";

const CompanySlice = createSlice({
    name:'company',
    initialState:{
        SingleCompany:null,
        AllRegComp:[],
        SearchViaText:'',
    },
    reducers:{
        setSingleCompany:(state,action) =>{
            state.SingleCompany = action.payload
        },
        setAllRegComp:(state,action)=>{
            state.AllRegComp = action.payload
        },
        setSearchViaText:(state,action)=>{
            state.SearchViaText = action.payload
        },
    },
})
export const {setSingleCompany,setAllRegComp,setSearchViaText} = CompanySlice.actions
export default CompanySlice.reducer;