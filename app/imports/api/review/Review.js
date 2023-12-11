import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ReviewsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'Reviews';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      building: String,
      facilityType: {
        type: String,
        allowedValues: ['Restroom', 'Water fountain', 'Study space', 'Microwave'],
      },
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
    // Attach the schema to the collection, so all attempts to insert a document are checked against the schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ReviewsCollection.
 * @type {ReviewsCollection}
 */
export const Reviews = new ReviewsCollection();
