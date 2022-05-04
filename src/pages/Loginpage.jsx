import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { Container, Card, Row, Col, Form, Button, FloatingLabel, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from '../hook/useAuth.js';
import logImage from '../assets/images/hexlet_chat.jpg';

function Loginpage() {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const notify = (phrase) => toast.error(phrase);
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
          logIn();
          navigate('/');
        })
        .catch(() => notify('Login or password are incorrect'));
    },
  });

  return (
    <Row className="justify-content-center align-content-center h-100 m-0">
      <Col className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <Image roundedCircle="true" src={logImage} alt={t('logIn')} />
            </Col>
            <Form
              className="col-12 col-md-6 mt-3 mt-mb-0"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <h1 className="text-center mb-4">{t('logIn')}</h1>
              <Form.Group md="46" controlId="validationFormikUsername">
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
              <Form.Group md="6" controlId="validationFormikPassword">
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
              <Form.Group className="d-grid gap-2 w-100">
                <Button variant="outline-primary" size="md" type="submit">{t('logIn')}</Button>
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer className="p-4">
            <div className="text-center">
              <span>
                {t('noAcc')}
                {' '}
              </span>
              <NavLink to="/signup">{t('registration')}</NavLink>
            </div>
          </Card.Footer>
          <ToastContainer />
        </Card>
      </Col>
    </Row>
  );
}

export default Loginpage;
