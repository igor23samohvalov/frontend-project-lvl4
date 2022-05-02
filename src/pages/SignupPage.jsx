import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Form, Button, FloatingLabel, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from '../hook/useAuth.js';
import signImage from '../assets/images/hexlet_chat.jpg';

function SignupPage() {
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const { t } = useTranslation();
  const notify = (phrase) => toast.error(phrase);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .min(3, t('errorMinThree'))
        .max(20, t('errorMaxTwenty'))
        .required(t('required')),
      password: yup.string()
        .min(6, t('errorMinSix'))
        .required(t('required')),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], t('errorPasswordMatch'))
        .required(t('required')),
    }),
    onSubmit: (values) => {
      axios.post('/api/v1/signup', values)
        .then((res) => {
          localStorage.setItem('userId', JSON.stringify(res.data));
          logIn();
          navigate('/');
        })
        .catch(() => notify(t('networkError')));
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
            <h1>{t('registration')}</h1>
            <Form onSubmit={formik.handleSubmit} noValidate>
              <Form.Group md="4" controlId="validationFormikUsername">
                <FloatingLabel label={t('signupUsername')} className="mb-3">
                  <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    placeholder={t('signupUsername')}
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
              <Form.Group md="4" controlId="validationFormikPassword">
                <FloatingLabel label={t('confirmPassword')} className="mb-3">
                  <Form.Control
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    placeholder={t('confirmPassword')}
                    isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="d-grid gap-2">
                <Button variant="outline-primary" size="md" type="submit">{t('signup')}</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Card>
  );
}

export default SignupPage;
