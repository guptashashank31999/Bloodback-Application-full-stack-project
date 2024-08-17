import { userLogin, userRegister } from "../redux/feature/auth/authAction";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("Fill Form Correctly");
    }
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log("line 12",error);
  }
};

export const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  orginisationName,
  hospitalName,
  website,
  address,
  phone
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        orginisationName,
        hospitalName,
        website,
        address,
        phone,
      })
    );
  } catch (error) {
    console.log("line 44",error);
  }
};
