import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
// import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Reviews } from '../../api/review/Review';

const buildingNames = [
  'Bilger Hall',
  'Campus Center',
  'Hamilton Library',
  'Paradise Palms',
  'POST',
  'Shidler College of Business',
];

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  username: String,
  buildingName: {
    type: String,
    allowedValues: buildingNames,
  },
  typeOfFacility: {
    type: String,
    allowedValues: ['Restroom', 'Water Fountain', 'Study Space'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  review: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddReview page for adding a document. */
const AddReview = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { username, buildingName, typeOfFacility, rating, review } = data;

    Reviews.collection.insert(
      { username, buildingName, typeOfFacility, rating, review },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Review added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form.
  let fRef = null;
  return (
    <Container className="py-3" id="add-review">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Review</h2></Col>
          <AutoForm ref={(ref) => { fRef = ref; }} schema={bridge} onSubmit={(data) => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="username" />
                <SelectField name="buildingName" />
                <SelectField name="typeOfFacility" />
                <NumField name="rating" />
                <TextField name="review" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddReview;
