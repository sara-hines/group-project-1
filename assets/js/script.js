var submitBtn = document.getElementById("submit-btn");
var resultsContainer = document.getElementById("results-container");

// Modals have a display = "none" until the modal link is clicked. For the brewery modal and event modal, when the modal link is clicked, the display will be changed to "block" so that the modal is visible.
var breweryModalLink = document.getElementById("brewery-modal-link");
var breweryModal = document.getElementById("brewery-modal");
var closeBreweryModal = document.getElementsByClassName("modal-close")[0];
breweryModalLink.onclick = function() {
    breweryModal.style.display = "block";
}
var eventModalLink = document.getElementById("event-modal-link");
var eventModal = document.getElementById("event-modal");
var closeEventModal = document.getElementsByClassName("modal-close")[1];
eventModalLink.onclick = function() {
    eventModal.style.display = "block";
}

closeBreweryModal.onclick = function() {
    breweryModal.style.display = "none";
}
closeEventModal.onclick = function() {
    eventModal.style.display = "none";
}

// The below works on classes shared by the brewery modal and event modal, and closes the modal if the user clicks the greyed out modal background or the X inside the modal. Adding event.target.className == "modal-close" to the list of OR's in the conditional does not close the modal when the user clicks the X in the top right corner of the modal background, so that is handled with separate event listeners above this comment.
window.onclick = function(event) {
    if (event.target.className == "modal-background" || event.target.className == "delete") {
        breweryModal.style.display = "none";
        eventModal.style.display = "none";
    }
}

// When the user selects a city to search for breweries (when the brewery select element's onchange attribute fires), the below getSelectedBreweryCity function is called. The function returns the value of the select element (the city the user chose) as the variable selectedBreweryCity. 
function getSelectedBreweryCity() {
    var selectedBreweryCity = document.getElementById("brewery-cities").value;
    return selectedBreweryCity;
}

// When the user selects a city to search for events (when the event select element's onchange attribute fires), the below getSelectedEventCity function is called. The function returns the value of the select element (the city the user chose) as the variable selectedEventCity. 
function getSelectedEventCity() {
    var selectedEventCity = document.getElementById("event-cities").value;
    return selectedEventCity;
}

// When the "See Breweries and Events" button is clicked, the results container is first cleared to remove the any results from previous searches. The selected city for breweries is obtained by creating a variable and assigning the value to be the getSelectedBreweryCity() function, so that the return value of function getSelectedBreweryCity() can be used. Then, the selected city for breweries is passed as a parameter to the getBrewery function. The same steps are conducted for the selected city for events.
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    resultsContainer.innerHTML = "";
    var selectedBreweryCity = getSelectedBreweryCity();
    if (selectedBreweryCity !== "Select a City") {
        getBrewery(selectedBreweryCity);
    }
    var selectedEventCity = getSelectedEventCity();
    if (selectedEventCity !== "Select a City") {
        getEvent(selectedEventCity);
    }
});

// Function getBrewery(city) takes in the selectedBreweryCity and passes it as the city variable. Brewery data for the relevant city is obtained from the Open Brewery DB API, saved to local storage, and parsed and retrieved from local storage. A table is rendered to the page to display the favorited status, brewery name, brewery type, address, and website for each brewery.
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

            // The breweryResults div is created to help keep brewery data organized together. The breweryResults div is appended into the resultsContainer which will contain brewery results and event results, assuming the user selected a city for both breweries and events.
            var breweryResults = document.createElement("div");
            resultsContainer.append(breweryResults);
            var breweryHeading = document.createElement("p");

            // The below lines of code create, style, and append the heading which will appear above the breweries table.
            breweryHeading.textContent = `Breweries in ${city}`;
            breweryHeading.classList.add("is-bold");
            breweryHeading.classList.add("is-size-3");
            breweryHeading.classList.add("table-title");
            breweryResults.append(breweryHeading);

            // The below lines of code create, style, and append the breweries table into the breweryResults div.
            var breweryTable = document.createElement("table");
            breweryTable.classList.add("table");
            breweryTable.classList.add("mt-6");
            breweryResults.append(breweryTable);
            var brewCol1 = document.createElement("col");
            brewCol1.setAttribute("width", "10%");
            breweryTable.append(brewCol1);
            var brewCol2 = document.createElement("col");
            brewCol2.setAttribute("width", "20%");
            breweryTable.append(brewCol2);
            var brewCol3 = document.createElement("col");
            brewCol3.setAttribute("width", "20%");
            breweryTable.append(brewCol3);
            var brewCol4 = document.createElement("col");
            brewCol4.setAttribute("width", "20%");
            breweryTable.append(brewCol4);
            var brewCol5 = document.createElement("col");
            brewCol5.setAttribute("width", "30%");
            breweryTable.append(brewCol5);

            // The below lines of code add a table head, a table row within the table head, and th elements within that table row to act as titles for each column of the table. (The favBrewIconTh creates a table head element for the column which will display the unfavorited star, if the brewery has not been favorited, or the favorited star, if the brewery has been favorited.)
            var breweryHead = document.createElement("thead");
            breweryTable.append(breweryHead);
            var breweryHeadTr = document.createElement("tr");
            breweryHead.append(breweryHeadTr);
            var favBrewIconTh = document.createElement("th");
            favBrewIconTh.textContent = "Favorited";
            breweryHeadTr.append(favBrewIconTh);
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
                // One table row will be created for each retrieved brewery, and table data elements will be created and appended to the table row in order to display: the unfavorited star (which becomes the favorited star on click); the brewery name; brewery type; address; and website. Each table row created will be appended to the table body. 
                var breweryTr = document.createElement("tr");
                breweryBody.append(breweryTr);
                var favBrewIconTd = document.createElement("td");
                var breweryStar = document.createElement("img");
                breweryStar.classList.add("brewery-star");
                breweryStar.src = "/group-project-1/assets/images/unfavorited-star.png";
                breweryStar.setAttribute("width", "15px");
                breweryStar.setAttribute("height", "15px");
                favBrewIconTd.append(breweryStar);
                breweryTr.append(favBrewIconTd);
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
            // An event listener is set on each unfavorited star for the breweries table which switches the unfavorited star to the favorited star on click, and toggles between the favorited star and unfavorited star each time the user clicks on the star.
            const breweryStars = document.querySelectorAll(".brewery-star");
            breweryStars.forEach(img => {
                img.addEventListener("click", (event) => {
                    if (img.src == "http://127.0.0.1:5500/group-project-1/assets/images/unfavorited-star.png") {
                        img.src = "http://127.0.0.1:5500/group-project-1/assets/images/favorited-star.png";
                        } else if (img.src == "http://127.0.0.1:5500/group-project-1/assets/images/favorited-star.png") {
                        img.src = "http://127.0.0.1:5500/group-project-1/assets/images/unfavorited-star.png";
                        }
                })
            });
        });
}

// Function getEvent(city) takes in the selectedEventCity and passes it as the city variable. Event data for the relevant city is obtained from the Ticketmaster API, saved to local storage, and parsed and retrieved from local storage. A table is rendered to the page to display the favorited status, event name, venue, date & time, and website link for each event.
function getEvent(city) {
    var requestURL = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&sort=date,asc&stateCode=CO&city=${city}&apikey=ZNzKLs0LgFjnzr7MbEoFJueWt1j24tfW`;
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var eventData = data._embedded.events;
            localStorage.setItem(`event${city}Stored`, JSON.stringify(eventData));
            var retrievedEvent = JSON.parse(localStorage.getItem(`event${city}Stored`));

            // The eventResults div is created to help keep event data organized together. The eventResults div is appended into the resultsContainer which will contain brewery results and event results, assuming the user selected a city for both breweries and events.
            var eventResults = document.createElement("div");
            resultsContainer.append(eventResults);

            // The below lines of code create, style, and append the heading which will appear above the events table.
            var eventHeading = document.createElement("p");
            eventHeading.textContent = `Concerts and Events in ${city}`;
            eventHeading.classList.add("is-bold");
            eventHeading.classList.add("is-size-3");
            eventHeading.classList.add("table-title");
            eventResults.append(eventHeading);

            // The below lines of code create, style, and append the events table into the eventResults div.
            var eventTable = document.createElement("table");
            eventTable.classList.add("table");
            eventTable.classList.add("mt-6");
            eventTable.setAttribute("width", "100%");
            eventResults.append(eventTable);
            var eventCol1 = document.createElement("col");
            eventCol1.setAttribute("width", "10%");
            eventTable.append(eventCol1);
            var eventCol2 = document.createElement("col");
            eventCol2.setAttribute("width", "20%");
            eventTable.append(eventCol2);
            var eventCol3 = document.createElement("col");
            eventCol3.setAttribute("width", "20%");
            eventTable.append(eventCol3);
            var eventCol4 = document.createElement("col");
            eventCol4.setAttribute("width", "20%");
            eventTable.append(eventCol4);
            var eventCol5 = document.createElement("col");
            eventCol5.setAttribute("width", "30%");
            eventTable.append(eventCol5);

            // The below lines of code add a table head, a table row within the table head, and th elements within that table row to act as titles for each column of the table. (The favEventIconTh creates a table head element for the column which will display the unfavorited star, if the event has not been favorited, or the favorited star, if the event has been favorited.)
            var eventHead = document.createElement("thead");
            eventTable.append(eventHead);
            var eventHeadTr = document.createElement("tr");
            eventHead.append(eventHeadTr);
            var favEventIconTh = document.createElement("th");
            favEventIconTh.textContent = "Favorited"
            eventHeadTr.append(favEventIconTh);
            var eventNameTh = document.createElement("th");
            eventNameTh.textContent = "Event";
            eventHeadTr.append(eventNameTh);
            var eventVenueTh = document.createElement("th");
            eventVenueTh.textContent = "Venue";
            eventHeadTr.append(eventVenueTh);
            var eventWhenTh = document.createElement("th");
            eventWhenTh.textContent = "Date and Time";
            eventHeadTr.append(eventWhenTh);
            var eventWebsiteTh = document.createElement("th");
            eventWebsiteTh.textContent = "Website";
            eventHeadTr.append(eventWebsiteTh);

            // The below 2 lines of code create and append a table body to the table. The retrieved data on events will be appended to the table body.
            var eventBody = document.createElement("tbody");
            eventTable.append(eventBody);

            for (i = 0; i < retrievedEvent.length; i++) {
                var venue = retrievedEvent[i]._embedded.venues[0].name;
                var unformattedDate = retrievedEvent[i].dates.start.localDate;
                var formattedDate = dayjs(unformattedDate).format("MMM D, YYYY");
                var unformattedTime = new Date(unformattedDate);
                var formattedTime = unformattedTime.toLocaleTimeString("en-us");
                if (formattedDate == null) {
                    formattedDate = "[unavailable]";
                }
                if (formattedTime == null) {
                    formattedTime = "[unavailable]";
                }
                if (venue == null) {
                    venue = "[unavailable]";
                }
                // One table row will be created for each retrieved event, and table data elements will be created and appended to the table row in order to display: the unfavorited star (which becomes the favorited star on click); the event name; event date & time; venue; and website. Each table row created will be appended to the table body.
                var eventTr = document.createElement("tr");
                eventBody.append(eventTr);
                var favEventIconTd = document.createElement("td");
                var eventStar = document.createElement("img");
                eventStar.classList.add("event-star");
                eventStar.src = "/group-project-1/assets/images/unfavorited-star.png";
                eventStar.setAttribute("width", "15px");
                eventStar.setAttribute("height", "15px");
                favEventIconTd.append(eventStar);
                eventTr.append(favEventIconTd);
                var eventNameTd = document.createElement("td");
                eventNameTd.textContent = retrievedEvent[i].name;
                eventTr.append(eventNameTd);
                var eventVenueTd = document.createElement("td");
                eventVenueTd.textContent = venue;
                eventTr.append(eventVenueTd);
                var eventWhenTd = document.createElement("td");
                eventWhenTd.textContent = formattedDate + " at " + formattedTime
                eventTr.append(eventWhenTd);
                var eventWebsiteTd = document.createElement("td");
                eventWebsiteTd.textContent = retrievedEvent[i].url;
                eventTr.append(eventWebsiteTd);
            }
            // An event listener is set on each unfavorited star for the events table which switches the unfavorited star to the favorited star on click, and toggles between the favorited star and unfavorited star each time the user clicks on the star.
            const eventStars = document.querySelectorAll(".event-star");
            eventStars.forEach(img => {
                img.addEventListener("click", (event) => {
                    if (img.src == "http://127.0.0.1:5500/group-project-1/assets/images/unfavorited-star.png") {
                    img.src = "http://127.0.0.1:5500/group-project-1/assets/images/favorited-star.png";
                    } else if (img.src == "http://127.0.0.1:5500/group-project-1/assets/images/favorited-star.png") {
                    img.src = "http://127.0.0.1:5500/group-project-1/assets/images/unfavorited-star.png";
                    }
                })
            });
        });
}

