import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const SubmitReview = () => (
  <Link to="/addreview">
    <Button variant="primary">Submit Review</Button>
  </Link>
);

export default SubmitReview;
