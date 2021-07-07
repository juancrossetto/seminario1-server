const mongoose = require("mongoose");

const PlacesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  latitude: {
    type: Number,
    required: true,
    trim: true,
  },
  longitude: {
    type: Number,
    required: true,
    trim: true,
  },
});

const TravelSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  originAddress: {
    type: String,
    required: true,
    trim: true,
  },
  destinationAddress: {
    type: String,
    required: true,
    trim: true,
  },
  enterprise: {
    type: String,
    required: true,
    trim: true,
  },
  travelStatus: {
    type: String,
    required: true,
    trim: true,
  },
  paidMethod: {
    type: String,
    required: true,
    trim: true,
  },
  totalDistance: {
    type: Number,
    required: true,
    trim: true,
  },
});
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  prefix: {
    type: String,
    required: false,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    trim: true,
    required: false,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  image: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  fromGoogle: {
    type: Boolean,
    trim: true,
  },
  travels: {
    type: [TravelSchema],
    trim: true,
  },
  places: {
    type: [PlacesSchema],
    trim: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
