const BASE_SERVER_URL = 'http://simon-besendorfer.developerakademie.com/PHP_DD/';
let doctors = [];

function load() {
    loadJSONFromServer()
        .then(function (result) { //then(function (variable vom server))
            console.log('Laden erfolgreich!', result);
            doctors = JSON.parse(result);            
        })
        .catch(function (error) { // Fehler
            console.error('Fehler beim laden!', error);
        });
}

function loadJSONFromServer() {
    return new Promise(function (resolve, reject) {
        let xhttp = new XMLHttpRequest();
        let proxy = 'https://cors-anywhere.herokuapp.com/';
        let serverURL = proxy + BASE_SERVER_URL + 'doctors.json';
        xhttp.open('GET', serverURL);

        xhttp.onreadystatechange = function (oEvent) {
            if (xhttp.readyState === 4) {
                if (xhttp.status >= 200 && xhttp.status <= 399) {
                    resolve(xhttp.responseText);
                } else {
                    reject(xhttp.statusText);
                }
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send();

    });
}

function search(){
    showDoctors();
}


function showAll(){
    let vCard = document.getElementById('vCard');
    vCard.innerHTML = "";
    for (let i = 0; i < doctors.length; i++) {
        let name = doctors[i]['title'] + " " + doctors[i]['first_name'] + " " + doctors[i]['last_name'];
        let speciality = doctors[i]['specialities'];
        let street = doctors[i]['street'];
        let city = doctors[i]['zipcode'] + " " + doctors[i]['city'];
        let open = doctors[i]['opening_hours'];
        let img = doctors[i]['img'];
        console.log(open);

        let DocCard= `
        <h3>${name}</h3>
        <div class="cardContainer">
                        <div class=cardLeft><img class="card_img" src="${img}"></div>
                        <div class=cardRight>
                            <h6>Spezialgebiet:</h6>
                            <p>${speciality}</p>
                            <h6>Adresse:</h6>
                            <p>${street}</p>
                            <p>${city}</p>
                            <h6>Öffnungszeiten:</h6>
                            <p>${open}</p>


                        </div>`
        vCard.insertAdjacentHTML("beforeend", DocCard); 
    }
}