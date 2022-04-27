import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
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
    <Card style={{ width: '60rem', height: '30rem' }} className="shadow-sm">
      <Container fluid style={{ height: '100%', padding: '0px 12px'}}>
        <Row style={{ height: '85%' }} className="align-items-center">
          <Col>
          </Col>
          <Col>
            <h1 style={{ textAlign: 'center'}}>Войти</h1>
            <Form onSubmit={formik.handleSubmit} noValidate>
              <Form.Group md="4" controlId="validationFormikUsername">
                <FloatingLabel label="Ваш ник" className="mb-3">
                  <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    placeholder="Ваш ник"
                    isInvalid={formik.touched.username && formik.errors.username}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group md="4" controlId="validationFormikPassword">
                <FloatingLabel label="Пароль" className="mb-3">
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    placeholder="Пароль"
                    isInvalid={formik.touched.password && formik.errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="d-grid gap-2">
                <Button variant="outline-primary" size="md" type="submit">Войти</Button>
                {/* {errors.length === 0 
                  ? null
                  : <Form.Control.Feedback>{errors.map((error) => error)}</Form.Control.Feedback>} */}
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row style={{ height: '15%', backgroundColor: '#f7f7f7' }} className="justify-content-md-center align-items-center">
          <Col md="auto">
            Нет аккаунта? Регистрация
          </Col>
        </Row>
      </Container>
    </Card>
  );
}

export default Loginpage;
