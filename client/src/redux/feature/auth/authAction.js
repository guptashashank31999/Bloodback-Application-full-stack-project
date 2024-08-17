import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });

      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success(data.success);
        alert("Login Successfull", data.success);
        window.location.replace('/');
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//REGISTER
export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      role,
      email,
      password,
      orginisationName,
      hospitalName,
      website,
      address,
      phone,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        role,
        email,
        password,
        orginisationName,
        hospitalName,
        website,
        address,
        phone,
      });

      if(data.success){
       
        window.location.replace('/login');
        alert("Register Successfully");
      }
    } catch (error) {
      console.log("line 64",error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


//CURRENT USER
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async ({rejectWithValue}) => {
    try {
      const res = await API.get('/auth/current-user');

      if(res?.data){
        return res?.data;
      }
    } catch (error) {
      
      console.log("line 87",error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }

    }
  }
)