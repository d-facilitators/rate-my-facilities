import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Facilities } from '../../api/facility/Facilities';

const buildingNames = [
  'Bilger Hall',
  'Campus Center',
  'Hamilton Library',
  'Paradise Palms',
  'POST',
  'Shidler College of Business',
];

const buildingNamesOptions = buildingNames.map(name => ({ label: name, value: name }));

const AddFacility = () => {
  const [redirect, setRedirect] = useState(false);
  const [route, setRoute] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const formSchema = new SimpleSchema({
    facilityType: String,
    building: {
      type: String,
      allowedValues: buildingNames,
    },
    floor: {
      type: Number,
      min: 0,
    },
    photos: {
      type: Array,
      optional: true,
    },
    'photos.$': { type: String },
  });

  const bridge = new SimpleSchema2Bridge(formSchema);

  const submit = (data, formRef) => {
    // eslint-disable-next-line no-unused-vars
    const { facilityType, building, floor, photos } = data;
    const owner = Meteor.user().username;

    // Check if photos are provided, otherwise set a default image
    const photosArray = selectedImage ? [selectedImage] : ['/images/cc.jpg'];
    const newRoute = Facilities.collection.insert(
      { facilityType, building, avgRating: 0, floor, photos: photosArray, statusUpdate: false, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Facility added successfully', 'success');
          formRef.reset();
        }
      },
    );
    setRoute(newRoute);
    setRedirect(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Use FileReader to read the selected image as a data URL
      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        setSelectedImage(readerEvent.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  let fRef = null;
  return redirect ? (<Navigate to={`/facility/${route}`} />) :
    (
      <Container className="py-3" id="add-facility">
        <Row className="justify-content-center">
          <Col xs={5}>
            <Col className="text-center">
              <h2>Add a Facility</h2>
            </Col>
            <AutoForm ref={(ref) => { fRef = ref; }} schema={bridge} onSubmit={(data) => submit(data, fRef)}>
              <Card className="backgrnd" style={{ minHeight: '500px' }}>
                <Card.Body>
                  <TextField name="facilityType" />
                  <SelectField name="building" options={buildingNamesOptions} />
                  <NumField name="floor" decimal={null} />
                  {/* Use a file input for image uploads */}
                  <input type="file" onChange={handleFileUpload} accept="image/*" />
                  {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                  <ErrorsField />
                  <button type="submit" value="Submit" className="btn btn-success">Submit</button>
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      </Container>
    );
};

export default AddFacility;
