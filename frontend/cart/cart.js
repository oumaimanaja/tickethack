// CART - Afficher les trips avec un array

fetch("http://localhost:3000/trips/toBook")
  .then((res) => res.json())
  .then((data) => {
    if (data.trips != 0) {
      document.querySelector(".cart-container").innerHTML =
        "<div> My Cart</div>";
        let total=0;
      for (let i = 0; i < data.trips.length; i++) {

        document.querySelector(".cart-container").innerHTML += `
            <div class="Item-cart">
                <div>${data.trips[i].departure}</div> >
                <div>${data.trips[i].arrival}</div>
                <div>${moment(data.trips[i].date).format("LT")}</div>
                <div>${data.trips[i].price} €</div>
                <div class='none-visible'>${data.trips[i].date}</div>
                <button class="btn-delete">X</button>
            </div> `;
          total+=data.trips[i].price
      }
      document.querySelector(".cart-container").innerHTML += `
              <div class="total-box">
              <div class="total"> Total :${total} € </div>
              <button id="purchase" class="btn-book">Purchase</button>
             </div>`;
    }
    Remove();
    purchase();

  
  })

function Remove() {
  let A = document.querySelectorAll(".btn-delete");

  for (let i = 0; i < A.length; i++) {
    A[i].addEventListener("click", function () {
      const departure = this.parentElement.childNodes[1].textContent;
      const arrival = this.parentElement.childNodes[3].textContent;
      const date = this.parentElement.childNodes[9].textContent;
      //total-=Number(this.parentElement.childNodes[7].textContent.slice(0,-1));
      this.parentElement.remove();
      
      

      fetch(`http://localhost:3000/RemoveFromCart/${departure}/${arrival}/${date}`, {
        method: "PUT",
      }).then(res=>res.json()).then(data=>{
        UpdateTotal(data)
      }
      );

    });
  }
}

function UpdateTotal(data){
  let total=0 ; 
  for (let i=0; i<data.MyCart.length;i++){
    total+=data.MyCart[i].price
  }
  document.querySelector(".total").textContent=`Total :${total} €`
  if (total==0){
    document.querySelector(".cart-container").innerHTML =
    `<div class="cart">
    <p class="noir">No Ticket in your cart.</p>
    <p class="noir">Why not plan a trip ?</p>
    </div>`
  }
}

function purchase() {
  if(document.querySelector('#purchase')) {
    document.querySelector('#purchase').addEventListener('click', function () {
      fetch('http://localhost:3000/booked', {method: "PUT"})
      .then(()=>{
        window.location.assign("../booking/booking.html");
      })
    })
  };
}



