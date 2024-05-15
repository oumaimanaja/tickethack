var express = require("express");
var router = express.Router();

require("../models/connection");
const Trip = require("../models/trips");

const moment = require("moment");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/// Fonction Get Time from Date
function GetTimeFromDate(date) {
  date = moment(date).format();
  date = String(date);
  console.log(date);
  date = new Date(date);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  /*console.log(
    `${hours % 12}:${minutes < 10 ? "0" : ""}${minutes} ${
      hours >= 12 ? "PM" : "AM"
    }`
  );*/
  return `${hours % 12}:${minutes < 10 ? "0" : ""}${minutes} ${
    hours >= 12 ? "PM" : "AM"
  }`;
}


// PAGE HOME
/* POST/GET - Récupérer les trajets dans la base de donnée "trips" en fonction de Arrival / Departure / Date */
router.get("/trips/:departure/:arrival/:date", (req, res) => {
  const { departure, arrival, date } = req.params;
  const startDay = moment(new Date(date)).format();
  const endDay = moment(new Date(startDay)).add(1, "days").format();

  Trip.find({
    departure: departure,
    arrival: arrival,
    //date: { $gte: startDay, $lt: endDay },
  }).then((data) => {
    const result = data;

    for (let i = 0; i < data.length; i++) {
      result[i].dateFormated = GetTimeFromDate(data[i].date);
      console.log(result[i].dateFormated);
    }
    console.log(data)
    res.json({data});
  });
;
})

console.log(GetTimeFromDate(new Date("2024-05-13T18:10:55.985Z")));
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
