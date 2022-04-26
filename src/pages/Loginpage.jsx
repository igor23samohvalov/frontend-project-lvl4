import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hook/useAuth.js';

function Loginpage() {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: yup.string()
        .min(4, 'Password must contain 4 characters or more')
        .required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      axios.post('/api/v1/login', values)
        .then((res) => {
          localStorage.setItem('userId', JSON.stringify(res.data));
          setErrors([]);
          logIn();
          navigate('/');
        })
        .catch(() => setErrors(['Password/login is incorrect']));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username">Ваш ник</label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.username}
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
      {errors.length === 0 ? null : <div>{errors.map((error) => error)}</div>}
    </form>
  );
}

export default Loginpage;
