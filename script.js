const BASE_SERVER_URL = 'http://simon-besendorfer.developerakademie.com/PHP_DD/';
let doctors = [];
let vCards =[];
let searched = [];

function load() {
    loadJSONFromServer()
        .then(function (result) { //then(function (variable vom server))
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

function showAll(){
    let vCard = document.getElementById('vCard');
    vCard.innerHTML = "";
    for (let i = 0; i < doctors.length; i++) {
        let name = doctors[i]['title'] + " " + doctors[i]['first_name'] + " " + doctors[i]['last_name'];
        let speciality = doctors[i]['specialities'];
        let street = doctors[i]['street'];
        let city = doctors[i]['zipcode'] + " " + doctors[i]['city'];
        let monday = doctors[i].opening_hours['monday'];
        let tuesday = doctors[i].opening_hours['tuesday'];
        let wednesday = doctors[i].opening_hours['wednesday'];
        let thursday = doctors[i].opening_hours['thursday'];
        let friday = doctors[i].opening_hours['friday'];
        let saturday = doctors[i].opening_hours['saturday'];
        let sunday = doctors[i].opening_hours['sunday'];
        let img = doctors[i]['img'];
        
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
                            <p>Montag: ${monday}</p>
                            <p>Dienstag: ${tuesday}</p>
                            <p>Mittwoch: ${wednesday}</p>
                            <p>Donnerstag: ${thursday}</p>
                            <p>Freitag: ${friday}</p>
                            <p>Samstag: ${saturday}<p>
                            <p>Sonntag: ${sunday}</p>

                        </div>`
        vCards.push(DocCard);       
    }
    showVCard(0);
}

function showVCard(a){
    let vCard = document.getElementById('vCard');
    vCard.innerHTML = "";
    document.getElementById('previous').innerHTML ="";
    document.getElementById('next').innerHTML ="";
    vCard.insertAdjacentHTML("beforeend", vCards[a]);
    if(a > 0){
    document.getElementById('previous').innerHTML = `<img class="next-prev-img" src="img/previous.png" onclick="showVCard(${a-1})"></img>`;
    }
    if(a < vCards.length-1){
    document.getElementById('next').innerHTML = `<img class="next-prev-img" src="img/next.png"onclick="showVCard(${a+1})"></img>`;
    }
}

function search(){
    
    for (let i = 0; i < doctors.length; i++){
        let needed = document.getElementById('speciality').value;
        if (doctors[i].specialities.includes(needed)){
            console.log(doctors[i].name);
        }
    }
}