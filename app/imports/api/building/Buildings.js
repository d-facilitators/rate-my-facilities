import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The BuildingsCollection. It encapsulates state and variable values for a building.
 */
class BuildingsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'BuildingsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      buildingName: String,
      typeOfFacility: {
        type: String,
        allowedValues: ['Restroom', 'Study Area', 'Dining', 'Water Fountain'],
      },
      numOfReviews: SimpleSchema.Integer,
      facilityFloor: SimpleSchema.Integer,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the BuildingsCollection.
 * @type {BuildingsCollection}
 */
export const Buildings = new BuildingsCollection();
