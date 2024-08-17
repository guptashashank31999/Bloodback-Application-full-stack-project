import React, { useEffect } from 'react'
import {useDispatch} from "react-redux"
import API from '../../services/api';
import { getCurrentUser } from '../../redux/feature/auth/authAction';
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {

    const dispatch = useDispatch();

    //get user
    const getUser = async () =>{ 
        try {
            const {data} = await API.get('/auth/current-user');
            if(data?.success){
                dispatch(getCurrentUser(data))
            }
        } catch (error) {
            localStorage.clear();
            console.log("line 20",error)
        }
    }

    useEffect(() => {
      
    getUser();
     
    }, [])
    
 if(localStorage.getItem('token')){
    return props.children
 }else{
    return <Navigate to="/login" />
 }
}

export default ProtectedRoute
