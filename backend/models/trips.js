const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
 departure: String,
 arrival: String,
 date: Date,
 price: Number,
 toBook: { type: Boolean, default: false },
 booked: { type: Boolean, default: false },
});

const Trip = mongoose.model('trips', tripSchema);

module.exports = Trip;