import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Facilities } from '../../api/facility/Facilities';
import { Buildings } from '../../api/building/Buildings';
import { Reviews } from '../../api/review/Review';

// User-level publication.
// If logged in, then publish all facilities. Otherwise, publish nothing.

Meteor.publish(Facilities.userPublicationName, function () {
  if (this.userId) {
    return Facilities.collection.find();
  }
  return this.ready();
});

Meteor.publish(Facilities.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Facilities.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Buildings.userPublicationName, function () {
  if (this.userId) {
    // regular users still have access to all building info
    return Buildings.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Buildings.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Buildings.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish(Reviews.userPublicationName, function () {
  if (this.userId) {
    return Reviews.collection.find();
  }
  return this.ready();
});
