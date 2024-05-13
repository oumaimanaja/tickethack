var express = require('express');
var router = express.Router();

require('../models/connection');
const Trip = require('../models/trips');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// PAGE HOME
/* POST/GET - Récupérer les trajets dans la base de donnée "trips" en fonction de Arrival / Departure / Date */
router.get('/trips/:departure/:arrival/:date', (req, res) => {
  const { departure, arrival, date } = req.params;
  Trip.find({departure: departure, arrival: arrival, date: date}).then(data => res.json({trips: data}));
});

/*router.get('/trips', (req, res) => {
  Trip.find().then(data => {
    res.json({ trips: data })
  });
});*/

// PAGE HOME
/* POST - Ajoute un trip
router.post('/new', (req, res) => {
  const newTrip = new Trip ({
    departure: 'Toulouse',
    arrival: 'Paris',
    date: new Date(),
    price: 125,
   });
   newTrip.save().then(data => res.json({trip: data}));
})*/

module.exports = router;
