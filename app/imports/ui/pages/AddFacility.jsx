import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { FilesCollection } from 'meteor/ostrio:files';
import { Facilities } from '../../api/facility/Facilities';

const FacilityImages = new FilesCollection({
  collectionName: 'FacilityImages',
  allowClientCode: false, // Disallow direct client file access
  onBeforeUpload(file) {
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.ext)) {
      return true;
    }
    return 'Please upload an image, with size equal or less than 10MB';
  },
});

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
    const { facilityType, building, floor, photos } = data;
    const owner = Meteor.user().username;

    // Check if photos is provided, otherwise set a default image
    const photosArray = photos || ['/images/cc.jpg'];

    const newRoute = Facilities.collection.insert(
      { facilityType, building, avgRating: 0, floor, photos: photosArray, statusUpdate: 'No issue', owner },
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

  // Function to handle file uploads
  const handleFileUpload = (file) => {
    const upload = FacilityImages.insert({
      file,
      streams: 'dynamic',
      chunkSize: 'dynamic',
      allowWebWorkers: true,
    });

    upload.on('end', (error, fileObj) => {
      if (!error) {
        // Set the photos field with the file URL
        // eslint-disable-next-line no-undef,no-unused-expressions
        formRef && formRef.onChange('photos', fileObj.link());
      }
    });

    upload.start();
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
                  <input type="file" onChange={(e) => handleFileUpload(e.target.files[0])} accept="image/*" />
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
