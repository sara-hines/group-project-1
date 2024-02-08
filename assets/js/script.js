var submitBtn = document.getElementById("submit-btn");
var results = document.getElementById("results-container");

var brewerySelectEl = document.getElementById("brewery-cities");
var breweryArvada = document.getElementById("brewery-arvada");
var breweryLakewood = document.getElementById("brewery-lakewood");
var breweryDenver = document.getElementById("brewery-denver");
// var breweryCities = document.querySelectorAll(".brewery-city");

var eventSelectEl = document.getElementById("event-cities");
var eventDenver = document.getElementById("event-denver");
var eventAurora = document.getElementById("event-aurora");
var eventBoulder = document.getElementById("event-boulder");

brewerySelectEl.addEventListener("click", function(event) {
    var breweryCity = event.target;
    // When user clicks a brewery city, it will appear selected until they click on a different brewery city. If they want to select multiple brewery cities, due to the functionality of the html option element, they will have to control + click to add an additional city past the first one. Current bug would be that if user clicks on a different brewery city after their first brewery city, it will appear to the user that their first brewery city has been un-selected, but in our code, it would still have the data-selected attribute value of selected.
    breweryCity.setAttribute("data-selected", "selected");
});

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    getBreweries();
    getEvents();
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
                var ul = document.querySelector("ul.brewery-results");
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
                var ul = document.querySelector("ul.brewery-results");
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
                var ul = document.querySelector("ul.brewery-results");
                ul.appendChild(li);
            }
        });
}

eventSelectEl.addEventListener("click", function(event) {
    var eventCity = event.target;
    // When user clicks a brewery city, it will appear selected until they click on a different brewery city. If they want to select multiple brewery cities, due to the functionality of the html option element, they will have to control + click to add an additional city past the first one. Current bug would be that if user clicks on a different brewery city after their first brewery city, it will appear to the user that their first brewery city has been un-selected, but in our code, it would still have the data-selected attribute value of selected.
    eventCity.setAttribute("data-selected", "selected");
});


var selectedEventCities = [];
function getEvents() {
    for (i = 0; i < 3; i++) {
        console.log("function getEvents was triggered!");
        var state = eventSelectEl.children[i].getAttribute("data-selected");
        if (state === "selected") {
            selectedEventCities.push(eventSelectEl.children[i]);
        }
        console.log(selectedEventCities);
    }
    for (i = 0; i < selectedEventCities.length; i++) {
        if (selectedEventCities[i] == eventDenver) {
            getEvent("Denver");
        } else if (selectedEventCities[i] == eventAurora) {
            getEvent("Aurora");
        } else if (selectedEventCities[i] == eventBoulder) {
            getEvent("Boulder");
        } else {
            return;
        }
    }
}

// Sort event from soonest to furthest out in future parameter was taken out, and is &sort=date,asc
function getEvent(city) {
    var requestURL = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=${city}&apikey=ZNzKLs0LgFjnzr7MbEoFJueWt1j24tfW`;
        console.log(requestURL);
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var eventData = data._embedded.events;
            localStorage.setItem(`event${city}Stored`, JSON.stringify(eventData));
            var retrievedEvent = JSON.parse(localStorage.getItem(`event${city}Stored`));
            var ul = document.querySelector("ul.event-results");
            var li = document.createElement("li");
            li.textContent = city;
            ul.appendChild(li);
            for (i = 0; i < retrievedEvent.length; i++) {
                var li = document.createElement("li");
                li.textContent = retrievedEvent[i].name;
                var ul = document.querySelector("ul.event-results");
                ul.appendChild(li);
            }
        });
}

function getEventAurora() {
    var requestURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=Aurora&apikey=ZNzKLs0LgFjnzr7MbEoFJueWt1j24tfW";
        console.log(requestURL);
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var eventAuroraData = data;
            // var ul = document.querySelector("ul.event-results");
            // var li = document.createElement("li");
            // li.textContent = retrievedEventAurora[i].name;
            localStorage.setItem("eventAuroraStored", JSON.stringify(eventAuroraData));
            var retrievedEventAurora = JSON.parse(localStorage.getItem("eventAuroraStored"));
            console.log(retrievedEventAurora);
            for (i = 0; i < retrievedEventAurora.length; i++) {
                var li = document.createElement("li");
                li.textContent = retrievedEventAurora[i].name;
                // var ul = document.querySelector("ul.event-results");
                ul.appendChild(li);
            }
        });
}

function getEventBoulder() {
    var requestURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=Boulder&apikey=ZNzKLs0LgFjnzr7MbEoFJueWt1j24tfW";
        console.log(requestURL);
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var eventBoulderData = data;
            localStorage.setItem("eventBoulderStored", JSON.stringify(eventBoulderData));
            var retrievedEventBoulder = JSON.parse(localStorage.getItem("eventBoulderStored"));
            console.log(retrievedEventBoulder);
            for (i = 0; i < retrievedEventBoulder.length; i++) {
                var li = document.createElement("li");
                li.textContent = retrievedEventBoulder[i].name;
                var ul = document.querySelector("ul.event-results");
                ul.appendChild(li);
            }
        });
}


