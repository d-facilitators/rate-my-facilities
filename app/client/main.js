// Start the app.
import '../imports/startup/client/Startup';
// Import the Bootstrap css.
import 'bootstrap/dist/css/bootstrap.min.css';
// Override the default bootstrap styles.
import './style.css';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Facilities } from './Facilities';

Meteor.methods({
  updateFacility: function (facilityId) {
    check(facilityId, String);
    Facilities.collection.update(
      { _id: facilityId, statusUpdate: { $in: ['No issue', 'Issue reported'] } },
      { $set: { statusUpdate: 'Issue confirmed' } },
    );
  },
});
