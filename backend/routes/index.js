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
router.get('/trips', (req, res) => {
  Trip.find().then(trips => {
    console.log(trips)
    //res.json({ trips: trips })
  });
});

module.exports = router;
