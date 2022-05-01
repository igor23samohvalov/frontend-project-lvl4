import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { Container, Card, Row, Col, Form, Button, FloatingLabel, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hook/useAuth.js';
import logImage from '../assets/images/hexlet_chat.jpg';

function Loginpage() {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .required(t('required')),
      password: yup.string()
        .required(t('required')),
    }),
    onSubmit: (values) => {
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
          <Col className="text-center">
            <Image roundedCircle="true" src={logImage} />
          </Col>
          <Col className="text-center">
            <h1>{t('logIn')}</h1>
            <Form onSubmit={formik.handleSubmit} noValidate>
              <Form.Group md="4" controlId="validationFormikUsername">
                <FloatingLabel label={t('loginUsername')} className="mb-3">
                  <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    placeholder={t('loginUsername')}
                    isInvalid={formik.touched.username && formik.errors.username}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group md="4" controlId="validationFormikPassword">
                <FloatingLabel label={t('password')} className="mb-3">
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    placeholder={t('password')}
                    isInvalid={formik.touched.password && formik.errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="d-grid gap-2">
                <Button variant="outline-primary" size="md" type="submit">{t('logIn')}</Button>
                {/* {errors.length === 0 
                  ? null
                  : <Form.Control.Feedback>{errors.map((error) => error)}</Form.Control.Feedback>} */}
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row style={{ height: '15%', backgroundColor: '#f7f7f7' }} className="justify-content-md-center align-items-center">
          <Col md="auto">
            {t('noAcc')}<br />
            <NavLink to="/signup">{t('registration')}</NavLink>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}

export default Loginpage;
