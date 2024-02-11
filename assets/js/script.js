var submitBtn = document.getElementById("submit-btn");
var results = document.getElementById("results-container");

var brewerySelectEl = document.getElementById("brewery-cities");
var breweryArvada = document.getElementById("brewery-arvada");
var breweryLakewood = document.getElementById("brewery-lakewood");
var breweryDenver = document.getElementById("brewery-denver");

var eventSelectEl = document.getElementById("event-cities");
var eventDenver = document.getElementById("event-denver");
var eventAurora = document.getElementById("event-aurora");
var eventBoulder = document.getElementById("event-boulder");

var breweryModalLink = document.getElementById("brewery-modal-link");
var breweryModal = document.getElementById("brewery-modal");
var closeBreweryModal = document.getElementsByClassName("modal-close")[0];
breweryModalLink.onclick = function() {
    breweryModal.style.display = "block";
}
closeBreweryModal.onclick = function() {
    breweryModal.style.display = "none";
}

var eventModalLink = document.getElementById("event-modal-link");
var eventModal = document.getElementById("event-modal");
var closeEventModal = document.getElementsByClassName("modal-close")[1];
eventModalLink.onclick = function() {
    eventModal.style.display = "block";
}
closeEventModal.onclick = function() {
    eventModal.style.display = "none";
}

// The below works on classes shared by the brewery modal and event modal, and closes out of the modal if the user clicks the greyed out modal background or the x inside the modal. For some reason, adding event.target.className == "modal-close" to the list of or's in the conditional does not work to close the modal when the user clicks the x in the top right corner of the modal background, so I'm doing that in separate event listeners above, for the moment.
window.onclick = function(event) {
    if (event.target.className == "modal-background" || event.target.className == "delete") {
        breweryModal.style.display = "none";
        eventModal.style.display = "none";
    }
}

// THE BELOW WAS AN ATTEMPT TO CREATE THE FUNCTIONALITY FOR OPENING AND CLOSING BOTH MODALS USING THE SAME CODE. IT DOESN'T WORK.
// var modalOpenBtns = document.querySelectorAll(".modal-btn");
// // console.log(modalOpenBtns);
// var modals = document.querySelectorAll(".modal");
// var closeModal = document.querySelectorAll(".modal-close");

// modalOpenBtns.onclick = function() {
//     modals.style.display = "block";
// }
// closeModal.onclick = function() {
//     modals.style.display = "none";
// }

// window.onclick = function(event) {
//     if (event.target.className == "modal-background" || event.target.className == "delete") {
//         modals.style.display = "none";
//     }
// }

brewerySelectEl.addEventListener("click", function(event) {
    var breweryCity = event.target;
    // When user clicks a brewery city, it will appear selected until they click on a different brewery city. If they want to select multiple brewery cities, due to the functionality of the html option element, they will have to control + click to add an additional city past the first one. Current bug would be that if user clicks on a different brewery city after their first brewery city, it will appear to the user that their first brewery city has been un-selected, but in our code, it would still have the data-selected attribute value of selected.
    breweryCity.setAttribute("data-selected", "selected");
    console.log(breweryCity);
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
            getBrewery("Arvada");
        } else if (selectedBreweryCities[i] == breweryLakewood) {
            getBrewery("Lakewood");
        } else if (selectedBreweryCities[i] == breweryDenver) {
            getBrewery("Denver");
        } else {
            return;
        }
    }
}

function getBrewery(city) {
    var requestURL = `https://api.openbrewerydb.org/v1/breweries?by_city=${city}`;
        // console.log(requestURL);
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var breweryData = data;
            localStorage.setItem(`brewery${city}Stored`, JSON.stringify(breweryData));
            var retrievedBrewery = JSON.parse(localStorage.getItem(`brewery${city}Stored`));
            console.log(retrievedBrewery);
            for (i = 0; i < retrievedBrewery.length; i++) {
                var li = document.createElement("li");
                if (retrievedBrewery[i].brewery_type == null) {
                    retrievedBrewery[i].brewery_type = "[unavailable]";
                }
                if (retrievedBrewery[i].address_1 == null) {
                    retrievedBrewery[i].address_1 = "[unavailable]";
                }
                if (retrievedBrewery[i].website_url == null) {
                    retrievedBrewery[i].website_url = "[unavailable]";
                }
                li.textContent = retrievedBrewery[i].name + ": " + retrievedBrewery[i].brewery_type + " at " + retrievedBrewery[i].address_1 + ". View the website at " + retrievedBrewery[i].website_url + ".";
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
    var requestURL = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&sort=date,asc&city=${city}&apikey=ZNzKLs0LgFjnzr7MbEoFJueWt1j24tfW`;
        console.log(requestURL);
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var eventData = data._embedded.events;
            localStorage.setItem(`event${city}Stored`, JSON.stringify(eventData));
            var retrievedEvent = JSON.parse(localStorage.getItem(`event${city}Stored`));
            console.log(retrievedEvent);
            var ul = document.querySelector("ul.event-results");
            var li = document.createElement("li");
            li.textContent = city;
            ul.appendChild(li);
            for (i = 0; i < retrievedEvent.length; i++) {
                var li = document.createElement("li");
                var unformattedDate = retrievedEvent[i].dates.start.localDate;
                var formattedDate = dayjs(unformattedDate).format("MMM D, YYYY");
                var unformattedTime = new Date(unformattedDate);
                var formattedTime = unformattedTime.toLocaleTimeString("en-us");
                var venue = retrievedEvent[i]._embedded.venues[0].name;
                // STILL NEED TO VERIFY THE BELOW IS WORKING FOR EVENTS.
                if (formattedDate == null) {
                    formattedDate = "[unavailable]";
                }
                if (formattedTime == null) {
                    formattedTime = "[unavailable]";
                }
                if (venue == null) {
                    venue = "[unavailable]";
                }
                li.textContent = retrievedEvent[i].name + " on " + formattedDate + " at " + formattedTime + " at " + venue;
                var ul = document.querySelector("ul.event-results");
                ul.appendChild(li);
            }
        });
}



