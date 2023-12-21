import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { date } from "yup";
import authSvc from "../auth/auth.service";


export const getLoggedInUser = createAsyncThunk(
    "user/getLoggedInUser",
    async (data={},thunkAPI)=>{
        let token = localStorage.getItem("token") ?? null
        if(token){
            let userDetail =await authSvc.getLoggedInUser()
            console.log(userDetail)
            return userDetail.data.data;
        }else{
            throw "Token not set"
        }
    }
)

const UserSlicer = createSlice({
    name:"user",
    initialState:{
        loggedInUser : null
    },
    reducers:{
        setLoggedInUser: (state,action)=>{
            state.loggedInUser=action.payload
            console.log(action)
           
            
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getLoggedInUser.fulfilled,(state,action)=>{
            state.loggedInUser=action.payload
        })
        builder.addCase(getLoggedInUser.rejected,(state,action)=>{
            state.loggedInUser=null
        })
    }
})

export const{setLoggedInUser}= UserSlicer.actions;
export default UserSlicer.reducer;