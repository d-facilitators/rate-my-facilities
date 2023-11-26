import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Image, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { EnvelopeFill, KeyFill } from 'react-bootstrap-icons';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // Handle Signin submission using Meteor's account mechanism.
  const submit = (doc) => {
    // console.log('submit', doc, redirect);
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
    // console.log('submit2', email, password, error, redirect);
  };

  // Render the signin form.
  // console.log('render', error, redirect);
  // if correct authentication, redirect to page instead of login screen
  if (redirect) {
    return (<Navigate to="/" />);
  }
  // Otherwise return the Login form.
  return (
    <Container id="signin-page" fluid className="py-3" style={{ height: '760px' }}>
      <Row className="justify-content-center align-items-center h-100">
        <Col sm={2} md={6}>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card className="signUp shadow-lg">
              <Card.Body>
                <div className="text-center"><h2>Welcome Back</h2></div>
                <Row className="justify-conetent-center  align-items-center">
                  <Col style={{ maxWidth: '50%' }}>
                    <div className="d-flex flex-row align-items-center py-2">
                      <EnvelopeFill size={30} />
                      <TextField id="signin-form-email" name="email" placeholder="E-mail Address" className="px-2 w-100" />
                    </div>
                    <div className="d-flex flex-row align-items-center py-2">
                      <KeyFill size={30} />
                      <TextField id="signin-form-password" name="password" placeholder="Password" type="password" className="px-2 w-100" />
                    </div>
                    <ErrorsField />
                    <div className="py-3"><SubmitField id="signin-form-submit" /></div>
                    <Alert variant="light">
                      <Link to="/signup">Click here to Register</Link>
                    </Alert>
                    {error === '' ? (
                      ''
                    ) : (
                      <Alert variant="danger">
                        <Alert.Heading>Login was not successful</Alert.Heading>
                        {error}
                      </Alert>
                    )}
                  </Col>
                  <Col className="text-center">
                    <Image src="/images/signin-art.webp" fluid width="500px" />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
