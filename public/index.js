var app = function(){
     var url = 'https://restcountries.eu/rest/v1/all';
     makeRequest(url, requestComplete);
     var selectCountry = document.querySelector('select');
     selectCountry.onchange = handleSelectChanged;
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
     var select = document.getElementById('country-list');
     for (country of countries){
          var option = document.createElement('option');
          // var dummy = document.createElement('option');
          // dummy.innerText = "Choose a country";
          option.innerText = country.name;
          option.value = country.alpha3Code;
          // console.log(country.nativeName);
          select.appendChild(option);
     }
}

var getCountryFromCountries = function(countries, value) {
     for (country of countries){
          if (country.alpha3Code === value){
               return country;
          }
     }
}

var displayCountry = function(country){
     console.log(country);
     // var country = findCountryByCode( countryCode );
     var countriesDiv = document.getElementById('countries');
     var article = document.createElement('article');
     var header = document.createElement('h3');
     header.innerText = country.name;
     var dataList = document.createElement('ul');
     var population = document.createElement('li');
     population.innerText = country.population;
     var capital = document.createElement('li');
     capital.innerText = country.capital;

     countriesDiv.appendChild(article);
     article.appendChild(header);
     article.appendChild(dataList);
     dataList.appendChild(population);
     dataList.appendChild(capital);
}

var handleSelectChanged = function(event){
     console.log(event.target.value);
     var country = getCountryFromCountries(allCountries,event.target.value);
     displayCountry(country);
}

window.onload = app;