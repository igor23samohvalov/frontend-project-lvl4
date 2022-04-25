import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

function Loginpage() {
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: yup.object({
      name: yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: yup.string()
        .min(4, 'Password must contain 4 characters or more')
        .required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Ваш ник</label>
      <input 
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
        onBlur={formik.handleBlur}
      />
      {formik.touched.name && formik.errors.name ? (
         <div>{formik.errors.name}</div>
       ) : null}
      <label htmlFor="password">Пароль</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        onBlur={formik.handleBlur}
      />
      {formik.touched.password && formik.errors.password ? (
         <div>{formik.errors.password}</div>
       ) : null}
      <button type="submit">Войти</button>
    </form>
  );
}

export default Loginpage;
