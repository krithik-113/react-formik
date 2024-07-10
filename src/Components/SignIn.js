import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

const validate = (values) => {
  const errors = {};
  if (Object.values(values.userID).length === 0) {
    errors.below = "Kindly register for new Account";
  } else if (!values.email) {
    errors.email = "*Required";
  } else if (!values.password) {
    errors.password = "*Required";
  } else if (values.email !== values.userID.email) {
    errors.email = "Username or Password incorrect";
  } else if (values.password !== values.userID.password) {
    errors.password = "Username or Password incorrect";
  }
  return errors;
};
const SignIn = ({ userID, SiginView }) => {
  console.log(userID.length);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userID: userID,
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      values.email = "";
      values.password = "";
      SiginView(); 
      navigate("/books");
    },
  });

  return (
    <section>
      <form>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="name@example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <p>{formik.errors.email}</p>
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="**********"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <p>{formik.errors.password}</p>
        </div>
        <div className="button">
          <button onClick={formik.handleSubmit} type="button">
            Sign in
          </button>
          <p>{formik.errors.below}</p>
        </div>
        <Link to="/register">Register</Link>
      </form>
    </section>
  );
};

export default SignIn;
