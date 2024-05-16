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

    fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)
      .then((res) => res.json({}))
      .then((data) => {
        if (data.result) {
          document.querySelector(".Output-container").innerHTML = ``;
          for (let i = 0; i < data.trips.length; i++) {
            document.querySelector(".Output-container").innerHTML += `
                                <div class="Output-container-DATA noir">
                                  <div>${data.trips[i].departure}</div>
                                  <div>${data.trips[i].arrival}</div>
                                  <div>${data.trips[i].hour}</div>
                                  <div>${data.trips[i].price}€</div>
                                  <div class='none-visible'>${data.trips[i].date}</div>
                                  <button class="btn-book">Book</button>
                                 </div> 
                                `;
          }
        } else {
          document.querySelector(
            ".Output-container"
          ).innerHTML = `                
              <div  class="img train">
              <image src="../images/notfound.png"/>
              </div>
              <div  class="text noir">No trip found.</div>`;
        }
      BoutonCart();
      })
  });
}

//// Bouton Book

function BoutonCart() {
  let A = document.querySelectorAll(".btn-book");
  
  for (let i = 0; i < A.length; i++) {
    A[i].addEventListener("click", function () {
      const departure = this.parentElement.childNodes[1].textContent;
      const arrival = this.parentElement.childNodes[3].textContent;;
      const date = this.parentElement.childNodes[9].textContent;

      console.log(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)
      
      fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`,{
        method: 'PUT',
      })

      window.location.assign("../cart/cart.html");
    }
  )};
}