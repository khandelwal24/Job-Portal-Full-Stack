import { createSlice } from "@reduxjs/toolkit";

const ApplicationSlice = createSlice({
    name:'jobApplication',
    initialState:{
        applicants:[],
        STATUS:'',
    },
    reducers:{
        setApplicants:(state,action) => {
            state.applicants = action.payload
        },
        setStatus:(state,action)=>{
            state.STATUS = action.payload;
        },
    }
})

export const {setApplicants,setStatus} = ApplicationSlice.actions;
export default ApplicationSlice.reducer;
