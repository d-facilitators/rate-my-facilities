import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const buildingNames = [
  'Bilger Hall',
  'Campus Center',
  'Hamilton Library',
  'Paradise Palms',
  'POST',
  'Shidler College of Business',
];
class ReviewsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'Reviews';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      username: String,
      buildingName: {
        type: String,
        allowedValues: buildingNames,
      },
      typeOfFacility: {
        type: String,
        allowedValues: ['Restroom', 'Water Fountain', 'Study Space'],
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      review: String,
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
