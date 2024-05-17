fetch("http://localhost:3000/trips/booked")
    .then((res) => res.json())    
    //.then((data) => console.log(data))
    .then((data) => {
    if (data.trips != 0) {
      document.querySelector(".cart-container").innerHTML =
        "<div> My Booking</div>";

        for (let i = 0; i < data.trips.length; i++) {
        document.querySelector(".cart-container").innerHTML += `
            <div class="Item-cart">
                <div>${data.trips[i].departure} > ${data.trips[i].arrival}</div>
                <div>${moment(data.trips[i].date).format("LT")}</div>
                <div>${data.trips[i].price} €</div>
                <div>departure ${moment(data.trips[i].date).endOf('day').fromNow()}</div>
            </div> `;
        }
    document.querySelector(".cart-container").innerHTML +=
        "<div>Enjoy your travels with tickethack !</div>"
    }
})

