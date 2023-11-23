import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

const formSchema = new SimpleSchema({
  typeOfFacility: String,
  buildingName: {
    type: String,
    allowedValues: ['Hamilton Library', 'Campus Center'],
  },
  floorNumber: {
    type: Number,
    min: 0,
  },
});
const bridge = new SimpleSchema2Bridge(formSchema);

const AddFacility = () => {
  const submit = (data, formRef) => {
    const { typeOfFacility, buildingName, floorNumber } = data;
    const owner = Meteor.user().username;
    Stuffs.collection.insert(
      { typeOfFacility, buildingName, floorNumber, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Facility added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Add a Facility</h2>
          </Col>
          <AutoForm ref={(ref) => { fRef = ref; }} schema={bridge} onSubmit={(data) => submit(data, fRef)}>
            <Card className="backgrnd" style={{ minHeight: '500px' }}>
              <Card.Body>
                <TextField name="typeOfFacility" />
                <SelectField name="buildingName" options={['Hamilton Library', 'Campus Center']} />
                <NumField name="floorNumber" decimal={null} />
                <button type="submit" value="Submit" className="btn btn-success">Submit</button>
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddFacility;
