var app = function(){
     var url = 'https://restcountries.eu/rest/v1/all';
     makeRequest(url, requestComplete);
     var selectCountry = document.querySelector('select');
     selectCountry.onchange = handleSelectChanged;
     if (localStorage.getItem('name') != null) {
          var lastCountryName = localStorage.getItem('name');
          var lastCountryCapital = localStorage.getItem('capital');
          var lastCountryPopulation = localStorage.getItem('population');
          updateCountry(lastCountryName, lastCountryCapital, lastCountryPopulation);
     }
}

var makeRequest = function(url, callback){
     //create a new XMLHttpRequest
     var request = new XMLHttpRequest();
     //open the request and tell it what method we want to use
     request.open("GET", url);
     //set the callback we want it to run when it's complete
     request.onload = callback;
     //send the request
     request.send();
}

var allCountries = [];

var requestComplete = function(){
     // console.log("Whoot! Success!");
     if(this.status !==200) return;
     var jsonString = this.responseText;
     var countries = JSON.parse(jsonString);
     allCountries = countries;
     populateList(countries); 
     // console.log(countries[0]);    
}

var populateList = function(countries){
     var select = document.querySelector('select');
     var topItem = document.createElement('option');
     topItem.innerText = "Select a country";
     select.appendChild(topItem);
     for (country of countries){
          var option = document.createElement('option');
          option.innerText = country.name;
          option.value = country.alpha3Code;
          select.appendChild(option);
     }
}


var getCountryFromList = function(countries, value) {
     for (country of countries){
          if (country.alpha3Code === value){
               return country;
          }
     }
}

var handleSelectChanged = function(event){
     var country = getCountryFromList(allCountries,event.target.value);

     updateCountry (country.name, country.capital, country.population);

     localStorage.setItem('name', country.name);
     localStorage.setItem('capital', country.capital);
     localStorage.setItem('population', country.population);
}

var updateCountry = function(countryName, countryCapital, countryPop){
     var header = document.querySelector('h3');
     var tags = document.querySelectorAll('li');

     header.innerText = countryName;
     tags[0].innerText = "Capital: " + countryCapital;
     tags[1].innerText = "Population: " + countryPop;

}

window.onload = app;