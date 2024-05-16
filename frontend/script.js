function capitalMinuscule(string) {
  const newString =
    string[0].toUpperCase() + string.substring(1, string.length).toLowerCase();
  return newString;
}

let cart = [];

// Bouton search

if (document.querySelector(".search")) {
  document.querySelector(".search").addEventListener("click", function () {
    const departure = capitalMinuscule(
      document.querySelector("#departure").value
    );
    const arrival = capitalMinuscule(document.querySelector("#arrival").value);
    const date = document.querySelector("#date").value;
    //console.log(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)

    fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)
      .then((res) => res.json({}))
      .then((data) => {
        if (data.result) {
          document.querySelector(".Output-container").innerHTML = ``;
          for (let i = 0; i < data.trips.length; i++) {
            document.querySelector(".Output-container").innerHTML += `
                                <div class="Output-container-DATA noir">
                                  <div>${data.trips[i].departure} > ${data.trips[i].arrival} </div>
                                  <div>${data.trips[i].date}</div>
                                  <div>${data.trips[i].price}€</div>
                                  <button class="btn-book">Book</button>
                                 </div> 
                                `;
          }
        } else {
          document.querySelector(
            ".Output-container"
          ).innerHTML = `                
              <div  class="img train">
              <image src="./images/notfound.png"/>
              </div>
              <div  class="text noir">No trip found.</div>`;
        }

        BoutonCart();
      });
  });
}

//// Bouton Book

function BoutonCart() {
  let A = document.querySelectorAll(".btn-book");
  for (let i = 0; i < A.length; i++) {
    A[i].addEventListener("click", function () {
      
      const trajet = A[i].parentElement.childNodes[1].textContent;
      const date = A[i].parentElement.childNodes[3].textContent;
      const price = A[i].parentElement.childNodes[5].textContent;
      console.log(trajet, date, price);
      let trip = { departure, date, price };
      console.log(trip)
      cart.push(trip);
      //console.log("this is it",cart[0].trajet);
      window.location.assign("./cart.html");
      if (cart.length != 0) {
        console.log("element de cart : ", cart[0].trajet);
        
    document.querySelector(".cart-container").innerHTML = `
        <div class="Output-container-DATA noir">
        <div>test </div>
        <div>test  date</div>
        <div>$cart test€</div>
        <button class="btn-book">Book</button>
       </div> 
      `;

        /*
        document.querySelector(".cart-container").innerHTML = `
        <div class="Output-container-DATA noir">
        <div>${cart[0].trajet} </div>
        <div>${cart[0].date}</div>
        <div>${cart[0].price}€</div>
        <button class="btn-book">Book</button>
       </div> 
      `;
      */
      }
    });


  }

  
}
