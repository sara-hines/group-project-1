var submitBtn = document.getElementById("submit-btn");
var results = document.getElementById("results-container");
var breweryArvada = document.getElementById("brewery-arvada");
var breweryLakewood = document.getElementById("brewery-lakewood");
var breweryDenver = document.getElementById("brewery-denver");
var brewerySelectEl = document.getElementById("brewery-cities");
var breweryCities = document.querySelectorAll(".brewery-city");


brewerySelectEl.addEventListener("click", function(event) {
    var breweryCity = event.target;
    // When user clicks a brewery city, it will appear selected until they click on a different brewery city. If they want to select multiple brewery cities, due to the functionality of the html option element, they will have to control + click to add an additional city past the first one. Current bug would be that if user clicks on a different brewery city after their first brewery city, it will appear to the user that their first brewery city has been un-selected, but in our code, it would still have the data-selected attribute value of selected.
    breweryCity.setAttribute("data-selected", "selected");
});

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    getBreweries();
});

var selectedBreweryCities = [];
function getBreweries() {
    for (i = 0; i < 3; i++) {
        console.log("function getBreweries was triggered!");
        var state = brewerySelectEl.children[i].getAttribute("data-selected");
        if (state === "selected") {
            selectedBreweryCities.push(brewerySelectEl.children[i]);
        }
        console.log(selectedBreweryCities);
    }
    for (i = 0; i < selectedBreweryCities.length; i++) {
        if (selectedBreweryCities[i] == breweryArvada) {
            getBreweryArvada();
        } else if (selectedBreweryCities[i] == breweryLakewood) {
            getBreweryLakewood();
        } else if (selectedBreweryCities[i] == breweryDenver) {
            getBreweryDenver();
        } else {
            return;
        }
    }
}

function getBreweryArvada() {
    var requestURL = "https://api.openbrewerydb.org/v1/breweries?by_city=Arvada";
        // console.log(requestURL);
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var breweryArvadaData = data;
            localStorage.setItem("breweryArvadaStored", JSON.stringify(breweryArvadaData));
            var retrievedBreweryArvada = JSON.parse(localStorage.getItem("breweryArvadaStored"));
            console.log(retrievedBreweryArvada);
            for (i = 0; i < retrievedBreweryArvada.length; i++) {
                var li = document.createElement("li");
                li.textContent = retrievedBreweryArvada[i].name + ":  " + retrievedBreweryArvada[i].address_1;
                var ul = document.querySelector("ul.results");
                ul.appendChild(li);
            }
        });
}

function getBreweryLakewood() {
    var requestURL = "https://api.openbrewerydb.org/v1/breweries?by_city=Lakewood";
        // console.log(requestURL);
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var breweryLakewoodData = data;
            localStorage.setItem("breweryLakewoodStored", JSON.stringify(breweryLakewoodData));
            var retrievedBreweryLakewood = JSON.parse(localStorage.getItem("breweryLakewoodStored"));
            console.log(retrievedBreweryLakewood);
            for (i = 0; i < retrievedBreweryLakewood.length; i++) {
                var li = document.createElement("li");
                li.textContent = retrievedBreweryLakewood[i].name + ":  " + retrievedBreweryLakewood[i].address_1;
                var ul = document.querySelector("ul.results");
                ul.appendChild(li);
            }
        });
}

function getBreweryDenver() {
    var requestURL = "https://api.openbrewerydb.org/v1/breweries?by_city=Denver";
        // console.log(requestURL);
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var breweryDenverData = data;
            localStorage.setItem("breweryDenverStored", JSON.stringify(breweryDenverData));
            var retrievedBreweryDenver = JSON.parse(localStorage.getItem("breweryDenverStored"));
            console.log(retrievedBreweryDenver);
            for (i = 0; i < retrievedBreweryDenver.length; i++) {
                var li = document.createElement("li");
                li.textContent = retrievedBreweryDenver[i].name + ":  " + retrievedBreweryDenver[i].address_1;
                var ul = document.querySelector("ul.results");
                ul.appendChild(li);
            }
        });
}

// // Music events in Denver 
// function getTicketMasterDenver() {
//     var requestURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=264&apikey=ZNzKLs0LgFjnzr7MbEoFJueWt1j24tfW";
//         // console.log(requestURL);
//     fetch(requestURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data)
//             }
//         );
// }

// submitBtn.addEventListener("click", getTicketMasterDenver());


// // Music events in Aurora, sorted by date from soonest to furthest out in future
// function getTicketMasterAurora() {
//     var requestURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=Aurora&sort=date,asc&apikey=ZNzKLs0LgFjnzr7MbEoFJueWt1j24tfW";
//         // console.log(requestURL);
//     fetch(requestURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data)
//             }
//         );
// }

// submitBtn.addEventListener("click", getTicketMasterAurora());

// function getEventbrite() {
//     var requestURL = "https://www.eventbriteapi.com/v3/subcategories/3001/?token=EAVHHX5PQPPI6TJ4XLP2";
//         console.log(requestURL);
//     fetch(requestURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data)
//             }
//         );
// }

// submitBtn.addEventListener("click", getEventbrite());



