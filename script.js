var submitBtn = document.getElementById("submit-btn");
console.log(submitBtn);
var results = document.getElementById("results-container");

// function getTripAdvisor() {
//     // For New Orleans, LA: 
//     var requestURL = "http://api.tripadvisor.com/api/partner/2.0/location/60864?key=BF9FE0AB499947D4BD6BA603F53D7847";
//         console.log(requestURL);
   
//     // I tried the below for the fetch request, but it didn't work either.
//     // fetch(requestURL, {
//     //     mode: "no-cors",
//     // })

//     fetch(requestURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data)
//             var table = document.createElement("table");
//             var tableRow = document.createElement("tr");
//             var tableData = document.createElement("td");
//             var link = document.createElement("a");

//             link.textContent = data.html_url;
//             link.href = data.html_url;

//             results.appendChild(table);
//             table.appendChild(tableRow);
//             tableRow.appendChild(tableData)
//             tableData.appendChild(link);
//         });
// }

// submitBtn.addEventListener("click", getTripAdvisor());

function getSpoonacular() {
    // For New Orleans, LA: 
    var requestURL = "https://api.spoonacular.com/recipes/716429/information?apiKey=74473ad991184d2d8122a3c993689b87&includeNutrition=true.";
        console.log(requestURL);
   
    // I tried the below for the fetch request, but it didn't work either.
    // fetch(requestURL, {
    //     mode: "no-cors",
    // })

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var ulEl = document.createElement("ul");
            var liEL = document.createElement("li");
            liEL.textContent = data.vegetarian;
            results.appendChild(ulEl);
            ulEl.appendChild(liEl);
            }
        );
}

submitBtn.addEventListener("click", getSpoonacular());

