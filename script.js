var submitBtn = document.getElementById("submit-btn");
console.log(submitBtn);
var results = document.getElementById("results-container");

// // function getTripAdvisor() {
// //     // For New Orleans, LA: 
// //     var requestURL = "http://api.tripadvisor.com/api/partner/2.0/location/60864?key=BF9FE0AB499947D4BD6BA603F53D7847";
// //         console.log(requestURL);
   
// //     // I tried the below for the fetch request, but it didn't work either.
// //     // fetch(requestURL, {
// //     //     mode: "no-cors",
// //     // })

// //     fetch(requestURL)
// //         .then(function (response) {
// //             return response.json();
// //         })
// //         .then(function (data) {
// //             console.log(data)
// //             var table = document.createElement("table");
// //             var tableRow = document.createElement("tr");
// //             var tableData = document.createElement("td");
// //             var link = document.createElement("a");

// //             link.textContent = data.html_url;
// //             link.href = data.html_url;

// //             results.appendChild(table);
// //             table.appendChild(tableRow);
// //             tableRow.appendChild(tableData)
// //             tableData.appendChild(link);
// //         });
// // }

// submitBtn.addEventListener("click", getTripAdvisor());

// function getSpoonacular() {
//     var requestURL = "https://api.spoonacular.com/recipes/716429/information?apiKey=74473ad991184d2d8122a3c993689b87&includeNutrition=true.";
//         console.log(requestURL);

//     fetch(requestURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data)
//             var ulEl = document.createElement("ul");
//             var liEL = document.createElement("li");
//             liEL.textContent = data.vegetarian;
//             results.appendChild(ulEl);
//             ulEl.appendChild(liEl);
//             }
//         );
// }

// submitBtn.addEventListener("click", getSpoonacular());

// var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://api.kroger.com/v1/connect/oauth2/token",
//     "method": "POST",
//     "headers": {
//         "Access-Control-Allow-Origin": "*",
//         "mode": "no-cors",
//       "Content-Type": "application/x-www-form-urlencoded",
//       "Authorization":"BASIC groupproject1-ae4226c20cfc153c7ddfc238c916cb5c9078793211480511866=jYs0TaqmpyGWNcvjOjpifeuE7ANoMSNm5mPgqf1W"
//     },
//     "data": {
//       "grant_type": "client_credentials",
//       "scope": "product.compact"
//     }
//   }
  
//   $.ajax(settings).done(function (response) {
//     console.log(response);

    // var settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://api.kroger.com/v1/products?filter.brand={{BRAND}}&filter.term={{TERM}}&filter.locationId={{LOCATION_ID}}",
    //     "method": "GET",
    //     "headers": {
    //       "Accept": "application/json",
    //       "Authorization": "Bearer {{TOKEN}}"
    //     }
    //   }
      
    //   $.ajax(settings).done(function (response) {
    //     console.log(response);
    //   });
      
//   });
  

function getSimpleGroceryStore() {
    var requestURL = "https://api.openbrewerydb.org/v1/breweries";
        console.log(requestURL);

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            // var ulEl = document.createElement("ul");
            // var liEL = document.createElement("li");
            // liEL.textContent = data;
            // results.appendChild(ulEl);
            // ulEl.appendChild(liEl);
            }
        );
}

submitBtn.addEventListener("click", getSimpleGroceryStore());



