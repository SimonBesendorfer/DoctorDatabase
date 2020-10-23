const BASE_SERVER_URL = 'http://simon-besendorfer.developerakademie.com/PHP_DD/';
let doctors = [];
let vCards = [];
let searched = [];

/**
 * load() is startet when opening search.html
 * it starts the function loadJSONFromServer()
 * when the file is loaded, it will fill parse the result into doctors Array
 * if there is an error, it will continue with the function error()
 */
function load() {
    document.getElementById("loading").classList.remove('d-none');
    loadJSONFromServer()
        .then(function (result) { //then(function (variable vom server))
            doctors = JSON.parse(result);
            document.getElementById("loading").classList.add('d-none');
        })
        .catch(function (error) { // Fehler
            document.getElementById("loading").classList.add('d-none');
            document.getElementById("error").classList.remove('d-none');
        });
}

/**
 * loadJSONFromServer() is a get request via proxy Server to the previously defined
 * BASE_SERVER_URL and gets the doctors.json file
 */
function loadJSONFromServer() {
    return new Promise(function (resolve, reject) {
        let xhttp = new XMLHttpRequest();
        let proxy = 'https://cors-anywhere.herokuapp.com/';
        let serverURL = proxy + BASE_SERVER_URL + 'get_doctors.php';
        xhttp.open('GET', serverURL);

        xhttp.onreadystatechange = function (oEvent) {
            if (xhttp.readyState === 4) {
                let response = JSON.parse(xhttp.responseText);
                if (response.status >= 200 || response.status <= 399) {
                    reject(response.error);
                } else {
                    resolve(xhttp.responseText);
                }

            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send();

    });
}

/**
 * determineProxySettings() contains some necessary information for working
 * on the document online or offline
 */
function determineProxySettings() {
    if (window.location.href.indexOf('.developerakademie.com') > -1) {
        return '';
    } else {
        return 'https://cors-anywhere.herokuapp.com/';
    }
}

/**
 * the function showAll() ist started by clicking on the Button "alle anzeigen"
 * it will empty the div with the id="vCard" and fills the previous definded vCards Array
 * afterwards it will start the function showVCard()
 */
function showAll() {
    vCards = [];
    let vCard = document.getElementById('vCard');
    vCard.innerHTML = "";
    for (let i = 0; i < doctors.length; i++) {
        let DocCard = generateDocCard(doctors[i]);
        vCards.push(DocCard);
    }
    showVCard(0);
}

/**
 * showVCard() shows the HTML which is in the function showAll() or showSearched()
 * it displays the content which is saved in vCards Array in the div id="vCard"
 */
function showVCard(a) {
    let vCard = document.getElementById('vCard');
    vCard.innerHTML = "";
    document.getElementById('previous').innerHTML = "";
    document.getElementById('next').innerHTML = "";
    vCard.insertAdjacentHTML("beforeend", vCards[a]);
    if (a > 0) {
        document.getElementById('previous').innerHTML = `<img class="next-prev-img" src="img/previous.png" onclick="showVCard(${a - 1})"></img>`;
    }
    if (a < vCards.length - 1) {
        document.getElementById('next').innerHTML = `<img class="next-prev-img" src="img/next.png"onclick="showVCard(${a + 1})"></img>`;
    }
}

/**
 * search() is a simply search function which checks for matches in
 * doctors Array for specialities and pushes the results in to the
 * searched Array
 */
function search() {
    searched = [];
    vCards = [];
    for (let i = 0; i < doctors.length; i++) {
        let needed = document.getElementById('speciality').value;
        if (doctors[i].specialities[0].includes(needed)) {
            searched.push(doctors[i]);
        }
    }
    showSearched();
}


/**
 * the function showSearched() ist started by clicking on the Button "Suche starten"
 * it will empty the div with the id="vCard" and fills the previous definded vCards Array
 * afterwards it will start the function showVCard()
 */
function showSearched() {
    let vCard = document.getElementById('vCard');
    vCard.innerHTML = "";
    
    for (let i = 0; i < searched.length; i++) {
        let DocCard = generateDocCard(doctors[i]);
        vCards.push(DocCard);
    }
    
    /**
     * for (let i = 0; i < searched.length; i++) {
     *  let DocCard = generateDocCard(doctors[i]);
     *  vCards.push(DocCard);
     *}
     * The function above replaces the function below because ther is the function generateDocCard() in the 
     * doccard.template.js file
     */

    
    /*for (let i = 0; i < searched.length; i++) {
        let name = searched[i]['title'] + " " + searched[i]['first_name'] + " " + searched[i]['last_name'];
        let speciality = searched[i]['specialities'];
        let street = searched[i]['street'];
        let city = searched[i]['zipcode'] + " " + searched[i]['city'];
        let monday = searched[i].opening_hours['monday'];
        let tuesday = searched[i].opening_hours['tuesday'];
        let wednesday = searched[i].opening_hours['wednesday'];
        let thursday = searched[i].opening_hours['thursday'];
        let friday = searched[i].opening_hours['friday'];
        let saturday = searched[i].opening_hours['saturday'];
        let sunday = searched[i].opening_hours['sunday'];
        let img = searched[i]['img'];

        let DocCard = `
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
    }**/
    showVCard(0);
}