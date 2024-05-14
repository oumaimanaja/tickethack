function capitalMinuscule(string) {
    const newString = string[0].toUpperCase() + string.substring(1, string.length).toLowerCase();
    return newString ;
}

document.querySelector('.search').addEventListener('click',
    function () {
        const departure = capitalMinuscule(document.querySelector('#departure').value); 
        const arrival = capitalMinuscule(document.querySelector('#arrival').value);
        const date = document.querySelector('#date').value;
        //console.log(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)

        fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)
            .then((res) => res.json({ }))
            .then((data) => {
                document.querySelector('.Output-container').innerHTML =
                    `<div class="Output-container">
                      <div class="Output-container-DATA noir">
                        <div>${data.trips[0].departure} > ${data.trips[0].arrival} </div>
                        <div>${data.trips[0].date}</div>
                        <div>${data.trips[0].price}$</div>
                        <button class="btn-book">Book</button>
                      </div>`
            })
    }
);

