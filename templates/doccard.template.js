/**
 * 
 * @param {*} doctor 
 */
function generateDocCard(doctor) {
    let name = doctor['title'] + " " + doctor['first_name'] + " " + doctor['last_name'];
    let speciality = doctor['specialities'];
    let street = doctor['street'];
    let city = doctor['zipcode'] + " " + doctor['city'];
    let monday = doctor.opening_hours['monday'];
    let tuesday = doctor.opening_hours['tuesday'];
    let wednesday = doctor.opening_hours['wednesday'];
    let thursday = doctor.opening_hours['thursday'];
    let friday = doctor.opening_hours['friday'];
    let saturday = doctor.opening_hours['saturday'];
    let sunday = doctor.opening_hours['sunday'];
    let img = doctor['img'];

    return `
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

                    </div>`;
}