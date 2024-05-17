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
/* GET - Récupérer les trajets dans la base de donnée "trips" en fonction de Arrival / Departure / Date */
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
        const date = data[i].date;
        const hourMin = moment(data[i].date).format('LT');
        const price = data[i].price;

        let newTrip = { departure: departure, arrival: arrival, date: date, hour: hourMin, price: price };
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
/* PUT - Mettre un ticket en toBook: true dans la BdD */
router.put("/addToCart/:departure/:arrival/:date", (req, res) => {
  const { departure, arrival, date } = req.params;
  
  Trip.updateMany(
    { departure: departure, arrival: arrival, date: date },
    { toBook: true }
  ).then(() => {
      Trip.find({departure: departure, arrival: arrival, date: date}).then(data => {
        console.log(data);
        res.json({data})
      });
  });
});

// PAGE CART
/* GET - Récupérer tous les trajets dont toBook: true */
router.get("/trips/toBook", (req, res) => {
  Trip.find({toBook: true}).then(data => {
    res.json({trips: data})
  });
});

module.exports = router;

// PAGE CART 
// PUT - Retirer un ticket du panier : mettre ToBook à false dans BdD : 
router.put("/RemoveFromCart/:departure/:arrival/:date", (req, res) => {
  const { departure, arrival, date } = req.params;
  console.log(departure, arrival,date)

  Trip.updateMany(
    { departure: departure, arrival: arrival, date: date },
    { toBook: false }
  ).then(() => {
      Trip.find({toBook: true}).then(data => {
        console.log(data)
        res.json({MyCart:data})
      });
  });
});