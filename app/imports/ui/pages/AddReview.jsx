import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
// import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useParams } from 'react-router-dom';
import { Reviews } from '../../api/review/Review';
import { Facilities } from '../../api/facility/Facilities';
import LoadingSpinner from '../components/LoadingSpinner';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  username: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  review: String,
  facilityID: {
    type: String,
    optional: true,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddReview page for adding a document. */
const AddReview = () => {
  const { facilityID } = useParams();

  const updateFacilityAvgRating = (reviews) => {
    const totalRatings = reviews.reduce((total, r) => total + r.rating, 0);
    const newAvgRating = (reviews.length > 0 ? totalRatings / reviews.length : 0).toFixed(2);

    Facilities.collection.update({ _id: facilityID }, { $set: { avgRating: newAvgRating } });
  };

  const { ready, reviews, facility } = useTracker(() => {
    const subscription1 = Meteor.subscribe(Reviews.userPublicationName);
    const subscription2 = Meteor.subscribe(Facilities.userPublicationName);

    const facilityReviews = Reviews.collection.find({ facilityID }).fetch();
    const facilityData = Facilities.collection.findOne({ _id: facilityID });
    const rdy1 = subscription1.ready();
    const rdy2 = subscription2.ready();

    return {
      ready: rdy1 && rdy2,
      facility: facilityData,
      reviews: facilityReviews,
    };
  }, [facilityID]);

  const submit = (data, formRef) => {
    console.log(facility);
    const { username, rating, review } = data;
    const { building, facilityType } = facility;

    Reviews.collection.insert(
      { building, facilityType, username, rating, review, facilityID },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Review added successfully', 'success');
          updateFacilityAvgRating(reviews);
          formRef.reset();
        }
      },
    );
  };

  useEffect(() => {
    if (ready) {
      updateFacilityAvgRating(reviews);
    }
  }, [ready, reviews]);

  // Render the form.
  let fRef = null;
  return (ready ? (
    <Container className="py-3" id="add-review">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Review</h2></Col>
          <AutoForm ref={(ref) => { fRef = ref; }} schema={bridge} onSubmit={(data) => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="username" />
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
  ) : <LoadingSpinner />);
};

export default AddReview;
