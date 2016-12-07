var app = function(){
     var url = 'https://restcountries.eu/rest/v1/all';
     makeRequest(url, requestComplete);
     var selectCountry = document.querySelector('select');
     selectCountry.onchange = handleSelectChanged;
     var lastCountryName = localStorage.getItem('name');
     var lastCountryCapital = localStorage.getItem('capital');
     var lastCountryPopulation = localStorage.getItem('population');
     makePersistentArticle(lastCountryName, lastCountryCapital, lastCountryPopulation);
     console.log(lastCountryCapital);
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
     var topItem = document.createElement('option');
     topItem.innerText = "Select a country";
     select.appendChild(topItem);
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

var makePersistentArticle = function(lastCountry, lastCapital, lastPopulation){
     var countriesDiv = document.getElementById('countries');
     var article = document.createElement('article');
     var header = document.createElement('h3');
     header.innerText = lastCountry;
     var dataList = document.createElement('ul');
     var capital = document.createElement('li');
     capital.innerText = "Capital: " + lastCapital;
     var population = document.createElement('li');
     population.innerText = "Population: " + lastPopulation;
     // console.log(population);

     countriesDiv.appendChild(article);
     article.appendChild(header);
     article.appendChild(dataList);
     dataList.appendChild(capital);
     dataList.appendChild(population);

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
     var capital = document.createElement('li');
     capital.innerText = "Capital: " + country.capital;
     var population = document.createElement('li');
     population.innerText = "Population: " + country.population;

     countriesDiv.appendChild(article);
     article.appendChild(header);
     article.appendChild(dataList);
     dataList.appendChild(population);
     dataList.appendChild(capital);
}

var removeCountry = function(){
     var currentCountry = document.getElementById('countries');
     var article = document.getElementById('article');
     currentCountry.removeChild(article);
}

var handleSelectChanged = function(event){
     console.log(event.target.value);
     var country = getCountryFromCountries(allCountries,event.target.value);
     // removeCountry();
     displayCountry(country);
     localStorage.setItem('name', country.name);
     localStorage.setItem('capital', country.capital);
     localStorage.setItem('population', country.population);
}

window.onload = app;