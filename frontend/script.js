document.querySelector('.search').addEventListener('click',
    function () {
        const departure = document.querySelector('#departure').value;
        const arrival = document.querySelector('#arrival').value;
        const date = document.querySelector('#date').value;
        //console.log(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)

        fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)
            .then((res) => res.json({ }))
            .then((data) => {
                console.log(data)
            })
    }
);