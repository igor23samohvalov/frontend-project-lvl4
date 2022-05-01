import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Form, Button, FloatingLabel, Image } from 'react-bootstrap';
import useAuth from '../hook/useAuth.js';
import signImage from '../assets/images/hexlet_chat.jpg';

function SignupPage() {
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .min(3, 'Minimum length is 3 letters')
        .max(20, 'Maximum length is 3 letters')
        .required('Обязательное поле'),
      password: yup.string()
        .min(6, 'Password must contain 6 letters or more')
        .required('Обязательное поле'),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Обязательное поле'),
    }),
    onSubmit: (values) => {
      axios.post('/api/v1/signup', values)
        .then((res) => {
          localStorage.setItem('userId', JSON.stringify(res.data));
          logIn();
          navigate('/');
        });
    },
  });
  return (
    <Card style={{ width: '60rem', height: '30rem' }} className="shadow-sm">
      <Container fluid style={{ height: '100%', padding: '0px 12px' }}>
        <Row style={{ height: '100%' }} className="align-items-center">
          <Col className="text-center">
            <Image roundedCircle="true" src={signImage} />
          </Col>
          <Col className="text-center">
            <h1>Регистрация</h1>
            <Form onSubmit={formik.handleSubmit} noValidate>
              <Form.Group md="4" controlId="validationFormikUsername">
                <FloatingLabel label="Имя пользователя" className="mb-3">
                  <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    placeholder="Имя пользователя"
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
              <Form.Group md="4" controlId="validationFormikPassword">
                <FloatingLabel label="Подтвердите пароль" className="mb-3">
                  <Form.Control
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    placeholder="Подтвердите пароль"
                    isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="d-grid gap-2">
                <Button variant="outline-primary" size="md" type="submit">Зарегистрироваться</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}

export default SignupPage;
