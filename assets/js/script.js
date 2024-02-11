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
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var breweryData = data;
            localStorage.setItem(`brewery${city}Stored`, JSON.stringify(breweryData));
            var retrievedBrewery = JSON.parse(localStorage.getItem(`brewery${city}Stored`));
            console.log(retrievedBrewery);

            // The below 3 lines create the table to display brewery results, add the class of "table" to the table, and append the table to the results container div. 
            var breweryTable = document.createElement("table");
            breweryTable.classList.add("table");
            results.append(breweryTable);

            // The below lines of code add a table head, a table row within the table head, and th elements within that table row to act as titles for each column of the table. 
            var breweryHead = document.createElement("thead");
            breweryTable.append(breweryHead);
            var breweryHeadTr = document.createElement("tr");
            breweryHead.append(breweryHeadTr);
            var breweryNameTh = document.createElement("th");
            breweryNameTh.textContent = "Brewery Name";
            breweryHeadTr.append(breweryNameTh);
            var breweryTypeTh = document.createElement("th");
            breweryTypeTh.textContent = "Brewery Type";
            breweryHeadTr.append(breweryTypeTh);
            var breweryAddressTh = document.createElement("th");
            breweryAddressTh.textContent = "Address";
            breweryHeadTr.append(breweryAddressTh);
            var breweryWebsiteTh = document.createElement("th");
            breweryWebsiteTh.textContent = "Website";
            breweryHeadTr.append(breweryWebsiteTh);

            // The below 2 lines of code create and append a table body to the table. The retrieved data on breweries will be appended to the table body.
            var breweryBody = document.createElement("tbody");
            breweryTable.append(breweryBody);

            for (i = 0; i < retrievedBrewery.length; i++) {
                if (retrievedBrewery[i].brewery_type == null) {
                    retrievedBrewery[i].brewery_type = "[unavailable]";
                }
                if (retrievedBrewery[i].address_1 == null) {
                    retrievedBrewery[i].address_1 = "[unavailable]";
                }
                if (retrievedBrewery[i].website_url == null) {
                    retrievedBrewery[i].website_url = "[unavailable]";
                }
                // One table row will be created for each retrieved brewery, and table data elements will be created and appended to the table row in order to display the brewery name, type, address, and website. Each table row created will be appended to the table body.
                var breweryTr = document.createElement("tr");
                breweryBody.append(breweryTr);
                var breweryNameTd = document.createElement("td");
                breweryNameTd.textContent = retrievedBrewery[i].name;
                breweryTr.append(breweryNameTd);
                var breweryTypeTd = document.createElement("td");
                breweryTypeTd.textContent = retrievedBrewery[i].brewery_type;
                breweryTr.append(breweryTypeTd);
                var breweryAddressTd = document.createElement("td");
                breweryAddressTd.textContent = retrievedBrewery[i].address_1;
                breweryTr.append(breweryAddressTd);
                var breweryWebsiteTd = document.createElement("td");
                breweryWebsiteTd.textContent = retrievedBrewery[i].website_url;
                breweryTr.append(breweryWebsiteTd);
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
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var eventData = data._embedded.events;
            localStorage.setItem(`event${city}Stored`, JSON.stringify(eventData));
            var retrievedEvent = JSON.parse(localStorage.getItem(`event${city}Stored`));
            console.log(retrievedEvent);

            // The below 3 lines create the table to display event results, add the class of "table" to the table, and append the table to the results container div. 
            var eventTable = document.createElement("table");
            eventTable.classList.add("table");
            results.append(eventTable);

            // The below lines of code add a table head, a table row within the table head, and th elements within that table row to act as titles for each column of the table. 
            var eventHead = document.createElement("thead");
            eventTable.append(eventHead);
            var eventHeadTr = document.createElement("tr");
            eventHead.append(eventHeadTr);
            var eventNameTh = document.createElement("th");
            eventNameTh.textContent = "Event";
            eventHeadTr.append(eventNameTh);
            var eventWhenTh = document.createElement("th");
            eventWhenTh.textContent = "Date and Time";
            eventHeadTr.append(eventWhenTh);
            var eventVenueTh = document.createElement("th");
            eventVenueTh.textContent = "Venue";
            eventHeadTr.append(eventVenueTh);
            var eventWebsiteTh = document.createElement("th");
            eventWebsiteTh.textContent = "Website";
            eventHeadTr.append(eventWebsiteTh);

            // The below 2 lines of code create and append a table body to the table. The retrieved data on breweries will be appended to the table body.
            var eventBody = document.createElement("tbody");
            eventTable.append(eventBody);

            for (i = 0; i < retrievedEvent.length; i++) {

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
                // One table row will be created for each retrieved event, and table data elements will be created and appended to the table row in order to display the event name, date & time, venue, and website. Each table row created will be appended to the table body.
                var eventTr = document.createElement("tr");
                eventBody.append(eventTr);
                var eventNameTd = document.createElement("td");
                eventNameTd.textContent = retrievedEvent[i].name;
                eventTr.append(eventNameTd);
                var eventWhenTd = document.createElement("td");
                eventWhenTd.textContent = formattedDate + " at " + formattedTime
                eventTr.append(eventWhenTd);
                var eventVenueTd = document.createElement("td");
                eventVenueTd.textContent = venue;
                eventTr.append(eventVenueTd);
                var eventWebsiteTd = document.createElement("td");
                eventWebsiteTd.textContent = retrievedEvent[i].url;
                eventTr.append(eventWebsiteTd);
            }
        });
}



