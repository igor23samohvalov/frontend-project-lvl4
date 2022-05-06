import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Card, Row, Col, Form, Button, FloatingLabel, Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from '../hook/useAuth.js';
import signImage from '../assets/images/signup.jpg';
import routes from '../routes.js';

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
      axios.post(routes.signup(), values)
        .then((res) => {
          localStorage.setItem('userId', JSON.stringify(res.data));
          logIn();
          navigate('/');
        })
        .catch(() => notify(t('networkError')));
    },
  });

  return (
    <Row className="justify-content-center align-content-center h-100 m-0">
      <Col className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <Image roundedCircle="true" src={signImage} alt={t('registration')} />
            </Col>
            <Form
              className="col-12 col-md-6 mt-3 mt-mb-0"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <h1 className="text-center mb-4">{t('registration')}</h1>
              <Form.Group md="4" controlId="username">
                <FloatingLabel label={t('signupUsername')} className="mb-3">
                  <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    placeholder={t('signupUsername')}
                    aria-label={t('signupUsername')}
                    isInvalid={formik.touched.username && formik.errors.username}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group md="4" controlId="password">
                <FloatingLabel label={t('password')} className="mb-3">
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    placeholder={t('password')}
                    aria-label={t('password')}
                    isInvalid={formik.touched.password && formik.errors.password}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group md="4" controlId="confirmPassword">
                <FloatingLabel label={t('confirmPassword')} className="mb-3">
                  <Form.Control
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    placeholder={t('confirmPassword')}
                    aria-label={t('confirmPassword')}
                    isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="d-grid gap-2">
                <Button variant="outline-primary" size="md" type="submit" aria-label={t('signup')}>{t('signup')}</Button>
              </Form.Group>
            </Form>
          </Card.Body>
          <ToastContainer />
        </Card>
      </Col>
    </Row>
  );
}

export default SignupPage;
