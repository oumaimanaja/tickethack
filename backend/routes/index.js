var express = require("express");
var router = express.Router();

require("../models/connection");
const Trip = require("../models/trips");

const moment = require("moment");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// PAGE HOME
/* POST/GET - Récupérer les trajets dans la base de donnée "trips" en fonction de Arrival / Departure / Date */
router.get("/trips/:departure/:arrival/:date", (req, res) => {
  const { departure, arrival, date } = req.params;
  const startDay = moment(new Date(date)).format();
  const endDay = moment(new Date(startDay)).add(1, "days").format();

  Trip.find({departure: departure, arrival: arrival, date: {$gte: startDay, $lt: endDay}})
    .then((data) => {
      const result = [];
      for (let i = 0; i < data.length; i++) {
        const departure = data[i].departure;
        const arrival = data[i].arrival;
        const hourMin = moment(data[i].date).format('LT');
        const price = data[i].price;

        let newTrip = { departure: departure, arrival: arrival, date: hourMin, price: price };
        result.push(newTrip);
      }
      if (result.length!=0){
        res.json({ result:true , trips: result})
      }
      else{
        res.json({result:false})
      }
      
    })
  });
;



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
