import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import {} from "redux";
import { login } from "../../redux/slices/authSlice";
import styles from './LoginForm.module.scss';

const LOGIN_SCHEMA = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const initialValues = {
  email: "Ibrahfefeim2@mail.com",
  password: "12345sometext",
};

function LoginForm(props) {
  const dispatch = useDispatch();

  const hendleSubmit = (values, formikbag) => {
    dispatch(login(values));

    formikbag.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={hendleSubmit}
      validationSchema={LOGIN_SCHEMA}
    >
      <Form className={styles.wrapper}>
        <h1 className={styles.text}>Login</h1>
        <Field name="email" type="email" placeholder="Email" className={styles.textInput}/>
        <Field name="password" type="password" placeholder="Password" className={styles.textInput}/>
        <button type="submit" className={styles.btn}>Login</button>
      </Form>
    </Formik>
  );
}

export default LoginForm;
