import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { registration } from "../../redux/slices/authSlice";
import styles from "./RegistrationForm.module.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const REGISTARATION_SCHEMA = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

function RegistrationForm(props) {
  const dispatch = useDispatch();

  const hendleSubmit = (values, formikbag) => {
    dispatch(registration(values));

    formikbag.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={hendleSubmit}
      validationSchema={REGISTARATION_SCHEMA}
    >
      <Form className={styles.wrapper}>
        <h1 className={styles.text}>Registration</h1>
        <Field
          name="firstName"
          placeholder="FirstName"
          className={styles.textInput}
        />
        <Field
          name="lastName"
          placeholder="LastName"
          className={styles.textInput}
        />
        <Field
          name="email"
          type="email"
          placeholder="Email"
          className={styles.textInput}
        />
        <Field
          name="password"
          type="password"
          placeholder="Password"
          className={styles.textInput}
        />
        <button type="submit" className={styles.btn}>
          Registration
        </button>
        <a href="/login">
          <button type="button" className={styles.btn}>Login</button>
        </a>
      </Form>
    </Formik>
  );
}

export default RegistrationForm;
