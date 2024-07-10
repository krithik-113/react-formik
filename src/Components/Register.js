import { Formik, useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const validate = (values) => {
  
  const errors = {}
  if (values.userName === "") {
    errors.userName = "Required";
  } else if (values.userName.length < 10) {
    errors.userName = "Username must be atleast 10 characters";
  } else if (values.email === "") {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else if (values.password === "") {
    errors.password = "Required";
  } else if (values.confirmPassword === "") {
    errors.confirmPassword = "Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password do not match Actual password";
  }
  return errors;
}
const Register = ({ userID, setUserID }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      userID = {
           userName: values.userName,
           email: values.email,
           password: values.password,
           confirmPassword: values.confirmPassword
         }
      setUserID(userID);
      localStorage.setItem("userID",JSON.stringify(userID))
      values.userName = ''
      values.email = ''
      values.password = ''
      values.confirmPassword = ''
      console.log(userID)
      navigate('/');
    }
  })
  return (
    <form className="create-account">
      <h1>Create Account</h1>
      <div>
        <label htmlFor="email">Full Name</label>
        <input
          type="userName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userName}
          id="userName"
          name="userName"
          placeholder="ex: Krithik Roshan"
        />
        <p>{formik.errors.userName}</p>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          id="email"
          name="email"
          placeholder="name@example.com"
        />
        <p>{formik.errors.email}</p>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="***********"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <p>{formik.errors.password}</p>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="***********"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        <p>{formik.errors.confirmPassword}</p>
      </div>
      <div className="sign-up-btn">
        <button type="button" onClick={formik.handleSubmit}>
          Sign Up
        </button>
        <Link to="/">
          <p className="existing">Already Have Account</p>
        </Link>
      </div>
    </form>
  );
};


export default Register;
