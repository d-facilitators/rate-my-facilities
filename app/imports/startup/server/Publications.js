import { Meteor } from 'meteor/meteor';
import { Facilities } from '../../api/facility/Facilities';

// User-level publication.
// If logged in, then publish all facilities. Otherwise, publish nothing.
Meteor.publish(Facilities.userPublicationName, function () {
  if (this.userId) {
    return Facilities.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
