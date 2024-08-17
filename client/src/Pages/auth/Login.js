import React from "react";
import bannerImage from "../../Image/banner1.jpg";
import "../../App.css";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

const Login = () => {
 const {loading , error} = useSelector(state => state.auth)
  return (
    <>
    {error && <span>{alert(error)}</span>}
    {
      loading ? <Spinner/> : (
        <div className="row g-0">
        <div className="col-md-8 form-banner">
          <img src={bannerImage} alt="bannerimage" />
        </div>

        <div className="col-md-4 form-container">
            <Form submitBtn={`Login`} formTitle={`Login Page`} formType={'login'}/>
        </div>
      </div>
      )
    }
      
    </>
  );
};

export default Login;
