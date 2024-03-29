import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class FacilitiesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'Facilities';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      building: String,
      facilityType: {
        type: String,
        allowedValues: ['Restroom', 'Water fountain', 'Study space', 'Microwave'],
      },
      avgRating: Number,
      photos: { type: Array, optional: false },
      'photos.$': { type: String },
      statusUpdate: {
        type: String,
        allowedValues: ['Issue confirmed', 'Issue reported', 'No issue'],
      },
      floor: Number,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {StuffsCollection}
 */
export const Facilities = new FacilitiesCollection();
