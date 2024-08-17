import React, { useState } from "react";
import InputType from "./InputType";
import {Link} from 'react-router-dom'
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ submitBtn, formTitle, formType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [orginisationName, setOrginisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      <form onSubmit={(e) => {
        if(formType === 'login') return handleLogin(e , email , password , role)
        else if(formType === 'register') return handleRegister(e, name , role , email , password , orginisationName ,hospitalName ,website, address , phone)

      }}>
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <div className="d-flex mb-3">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              id="donarRadio"
              defaultChecked
            />
            <label htmlFor="donarRadio" className="form-check-label">
              Donar
            </label>
          </div>

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
              id="adminRadio"
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
              id="hospitalRadio"
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              value={"orginisation"}
              onChange={(e) => setRole(e.target.value)}
              id="orginisationNameRadio"
            />
            <label htmlFor="orginisationNameRadio" className="form-check-label">
              Orginisation
            </label>
          </div>
        </div>
        {(() => {
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={`Email`}
                    inputType={`email`}
                    name={`email`}
                    lableFor={`forEmail`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    className="mt-3"
                    labelText={`Password`}
                    inputType={`password`}
                    name={`password`}
                    lableFor={`forPassword`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  {(role === "admin" || role === "donar") && (
                    <InputType
                      className="mt-3"
                      labelText={`Name`}
                      inputType={`text`}
                      name={`name`}
                      lableFor={`forName`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  <InputType
                    labelText={`Email`}
                    inputType={`email`}
                    name={`email`}
                    lableFor={`forEmail`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    className="mt-3"
                    labelText={`Password`}
                    inputType={`password`}
                    name={`password`}
                    lableFor={`forPassword`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {role === "orginisation" && (
                    <InputType
                      className="mt-3"
                      labelText={`Orginisation Name`}
                      inputType={`text`}
                      name={`orginisation`}
                      lableFor={`forOrginisationName`}
                      value={orginisationName}
                      onChange={(e) => setOrginisationName(e.target.value)}
                    />
                  )}

                  {role === "hospital" && (
                    <InputType
                      className="mt-3"
                      labelText={`Hospital Name`}
                      inputType={`text`}
                      name={`hospitalName`}
                      lableFor={`forHospitalName`}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}

                  <InputType
                    className="mt-3"
                    labelText={`Website`}
                    inputType={`text`}
                    name={`website`}
                    lableFor={`forWebsite`}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />

                  <InputType
                    className="mt-3"
                    labelText={`Address`}
                    inputType={`text`}
                    name={`address`}
                    lableFor={`forAddress`}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />

                  <InputType
                    className="mt-3"
                    labelText={`Phone`}
                    inputType={`phone`}
                    name={`phone`}
                    lableFor={`forPhone`}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              );
            }
          }
        })()}

        <div className="d-flex justify-content-between">
        {formType === 'login' ? (<p>
          Not register yet ? Register
          <Link to="/register"> Here !</Link>
        </p>) : (
          <p>
          Already User
          <Link to="/login"> Login</Link>
        </p>
        )}
          <button className="btn btn-primary mt-3" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
