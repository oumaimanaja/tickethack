// CART - Afficher les trips avec un array

fetch('http://localhost:3000/trips/toBook')
    .then((res) => res.json())
    .then((data) => {
        if (data.trips!=0) {
            document.querySelector('.cart').innerHTML = '';
            for (let i=0; i<data.trips.length; i++) {
                document.querySelector('.cart').innerHTML += `
                <div class="Output-container-DATA noir">
                  <div>${data.trips[i].departure} > ${data.trips[i].arrival}</div>
                  <div>${data.trips[i].hour}</div>
                  <div>${data.trips[i].price}€</div>
                  <button class="btn-book">Book</button>
                </div> ` 
              };
        }

    })