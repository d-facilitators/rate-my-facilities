import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Buildings } from '../../api/building/Buildings';
import { Facilities } from '../../api/facility/Facilities';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

const addBuilding = (building) => {
  console.log(`  Adding: ${building.buildingName}`);
  Buildings.collection.insert(building);
};

// Initialize the BuildingsCollection if empty.
if (Buildings.collection.find().count() === 0) {
  if (Meteor.settings.defaultBuildings) {
    console.log('Creating default buildings.');
    Meteor.settings.defaultBuildings.forEach(building => addBuilding(building));
  }
}

const addFacility = (facility) => {
  console.log(`  Adding: ${facility.building} ${facility.facilityType}`);
  Facilities.collection.insert(facility);
};

// Initialize the FacilitiesCollection if empty.
if (Facilities.collection.find().count() === 0) {
  if (Meteor.settings.defaultFacilities) {
    console.log('Creating default facilities.');
    Meteor.settings.defaultFacilities.forEach(facility => addFacility(facility));
  }
}
