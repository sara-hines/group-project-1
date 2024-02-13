var submitBtn = document.getElementById("submit-btn");
var resultsContainer = document.getElementById("results-container");

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
    // console.log(breweryCity);
});

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    getBreweries();
    getEvents();
});

var selectedBreweryCities = [];
console.log(selectedBreweryCities);
function getBreweries() {
    console.log("function getBreweries was triggered!");
    for (i = 0; i < 3; i++) {
        var state = brewerySelectEl.children[i].getAttribute("data-selected");
        if (state === "selected") {
            if (!(selectedBreweryCities.includes(brewerySelectEl.children[i]))) {
                selectedBreweryCities.push(brewerySelectEl.children[i]);
            }
        }
    }
    for (i = 0; i < selectedBreweryCities.length; i++) {
        if (selectedBreweryCities[i] == breweryArvada) {
            getBrewery("Arvada");
            console.log('getBrewery("Arvada") was triggered');
            breweryArvada.setAttribute("data-selected", "unselected");
        } else if (selectedBreweryCities[i] == breweryLakewood) {
            getBrewery("Lakewood");
            console.log('getBrewery("Lakewood") was triggered');
            breweryLakewood.setAttribute("data-selected", "unselected");
        } else if (selectedBreweryCities[i] == breweryDenver) {
            getBrewery("Denver");
            console.log('getBrewery("Denver") was triggered');
            breweryDenver.setAttribute("data-selected", "unselected");
        } else {
            return;
        }
    }
    console.log(selectedBreweryCities);
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
            // console.log(retrievedBrewery);

            // if (!breweryResults) {
                // var breweryResults = document.createElement("div");
                // document.body.append(breweryResults);
            // } else {
            //     breweryResults.innerHTML = "";
            // }

            if (breweryResults) {
                breweryResults.remove();
                var breweryResults = document.createElement("div");
                resultsContainer.append(breweryResults);
            } else {
                var breweryResults = document.createElement("div");
                resultsContainer.append(breweryResults);
            }

            // The below 3 lines create the table to display brewery results, add the class of "table" to the table, and append the table to the results container div. 
            var breweryTable = document.createElement("table");
            function addClass() {
                breweryTable.setAttribute("class", "table mt-6");
            }
            addClass();
            // breweryTable.classList.add("table");
            breweryResults.append(breweryTable);

            // The below lines of code add a table head, a table row within the table head, and th elements within that table row to act as titles for each column of the table. 
            var breweryHead = document.createElement("thead");
            breweryTable.append(breweryHead);
            var breweryHeadTr = document.createElement("tr");
            breweryHead.append(breweryHeadTr);
            var breweryCityTh = document.createElement("th");
            breweryCityTh.textContent = "City";
            breweryCityTh.classList.add("table-sm");
            breweryHeadTr.append(breweryCityTh);
            var breweryNameTh = document.createElement("th");
            breweryNameTh.textContent = "Brewery Name";
            breweryNameTh.classList.add("table-md");
            breweryHeadTr.append(breweryNameTh);
            var breweryTypeTh = document.createElement("th");
            breweryTypeTh.textContent = "Brewery Type";
            breweryTypeTh.classList.add("table-sm");
            breweryHeadTr.append(breweryTypeTh);
            var breweryAddressTh = document.createElement("th");
            breweryAddressTh.textContent = "Address";
            breweryAddressTh.classList.add("table-md");
            breweryHeadTr.append(breweryAddressTh);
            var breweryWebsiteTh = document.createElement("th");
            breweryWebsiteTh.textContent = "Website";
            breweryWebsiteTh.classList.add("table-lg");
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
                var breweryCityTd = document.createElement("td");
                breweryCityTd.textContent = `${city}`;
                breweryCityTd.classList.add("table-sm");
                breweryTr.append(breweryCityTd);
                var breweryNameTd = document.createElement("td");
                breweryNameTd.textContent = retrievedBrewery[i].name;
                breweryNameTd.classList.add("table-md");
                breweryTr.append(breweryNameTd);
                var breweryTypeTd = document.createElement("td");
                breweryTypeTd.textContent = retrievedBrewery[i].brewery_type;
                breweryTypeTd.classList.add("table-sm");
                breweryTr.append(breweryTypeTd);
                var breweryAddressTd = document.createElement("td");
                breweryAddressTd.textContent = retrievedBrewery[i].address_1;
                breweryAddressTd.classList.add("table-md");
                breweryTr.append(breweryAddressTd);
                var breweryWebsiteTd = document.createElement("td");
                breweryWebsiteTd.textContent = retrievedBrewery[i].website_url;
                breweryWebsiteTd.classList.add("table-lg");
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
        // console.log("function getEvents was triggered!");
        var state = eventSelectEl.children[i].getAttribute("data-selected");
        if (state === "selected") {
            if (!(selectedEventCities.includes(eventSelectEl.children[i]))) {
                selectedEventCities.push(eventSelectEl.children[i]);
            }
        }
    }
    for (i = 0; i < selectedEventCities.length; i++) {
        if (selectedEventCities[i] == eventDenver) {
            getEvent("Denver");
            console.log('getEvent("Denver") was triggered')
            eventDenver.setAttribute("data-selected", "unselected");
        } else if (selectedEventCities[i] == eventAurora) {
            getEvent("Aurora");
            console.log('getEvent("Aurora") was triggered')
            eventAurora.setAttribute("data-selected", "unselected");
        } else if (selectedEventCities[i] == eventBoulder) {
            getEvent("Boulder");
            console.log('getEvent("Boulder") was triggered')
            eventBoulder.setAttribute("data-selected", "unselected");
        } else {
            return;
        }
    }
    console.log(selectedEventCities);
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
            // console.log(retrievedEvent);

            // if (!eventResults) {
                // var eventResults = document.createElement("div");
                // document.body.append(eventResults);
            // } else {
            //     eventResults.innerHTML = "";
            // }

            if (eventResults) {
                eventResults.remove();
                var eventResults = document.createElement("div");
                resultsContainer.append(eventResults);
            } else {
                var eventResults = document.createElement("div");
                resultsContainer.append(eventResults);
            }

            // The below 3 lines create the table to display event results, add the class of "table" to the table, and append the table to the results container div. 
            var eventTable = document.createElement("table");
            function addClass() {
                eventTable.setAttribute("class", "table mt-6");
            }
            addClass();
            // eventTable.classList.add("table");
            eventResults.append(eventTable);

            // The below lines of code add a table head, a table row within the table head, and th elements within that table row to act as titles for each column of the table. 
            var eventHead = document.createElement("thead");
            eventTable.append(eventHead);
            var eventHeadTr = document.createElement("tr");
            eventHead.append(eventHeadTr);
            var eventCityTh = document.createElement("th");
            eventCityTh.textContent = "City";
            eventCityTh.classList.add("table-sm");
            eventHeadTr.append(eventCityTh);
            var eventNameTh = document.createElement("th");
            eventNameTh.textContent = "Event";
            eventNameTh.classList.add("table-md");
            eventHeadTr.append(eventNameTh);
            var eventVenueTh = document.createElement("th");
            eventVenueTh.textContent = "Venue";
            eventVenueTh.classList.add("table-sm");
            eventHeadTr.append(eventVenueTh);
            var eventWhenTh = document.createElement("th");
            eventWhenTh.textContent = "Date and Time";
            eventWhenTh.classList.add("table-md");
            eventHeadTr.append(eventWhenTh);
            var eventWebsiteTh = document.createElement("th");
            eventWebsiteTh.textContent = "Website";
            eventWebsiteTh.classList.add("table-lg");
            eventHeadTr.append(eventWebsiteTh);

            // The below 2 lines of code create and append a table body to the table. The retrieved data on breweries will be appended to the table body.
            var eventBody = document.createElement("tbody");
            eventTable.append(eventBody);

            for (i = 0; i < retrievedEvent.length; i++) {
                var venue = retrievedEvent[i]._embedded.venues[0].name;
                var unformattedDate = retrievedEvent[i].dates.start.localDate;
                var formattedDate = dayjs(unformattedDate).format("MMM D, YYYY");
                var unformattedTime = new Date(unformattedDate);
                var formattedTime = unformattedTime.toLocaleTimeString("en-us");
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
                var eventCityTd = document.createElement("td");
                eventCityTd.textContent = `${city}`;
                eventCityTd.classList.add("table-sm");
                eventTr.append(eventCityTd);
                var eventNameTd = document.createElement("td");
                eventNameTd.textContent = retrievedEvent[i].name;
                eventNameTd.classList.add("table-md");
                eventTr.append(eventNameTd);
                var eventVenueTd = document.createElement("td");
                eventVenueTd.textContent = venue;
                eventVenueTd.classList.add("table-sm");
                eventTr.append(eventVenueTd);
                var eventWhenTd = document.createElement("td");
                eventWhenTd.textContent = formattedDate + " at " + formattedTime
                eventWhenTd.classList.add("table-md");
                eventTr.append(eventWhenTd);
                var eventWebsiteTd = document.createElement("td");
                eventWebsiteTd.textContent = retrievedEvent[i].url;
                eventWebsiteTd.classList.add("table-lg");
                eventTr.append(eventWebsiteTd);
            }
        });
}



