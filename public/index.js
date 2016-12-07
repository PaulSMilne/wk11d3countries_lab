var app = function(){
     var url = 'https://restcountries.eu/rest/v1/all';
     makeRequest(url, requestComplete);
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

var requestComplete = function(){
     console.log("Whoot! Success!");
     if(this.status !==200) return;
     var jsonString = this.responseText;
     var countries = JSON.parse(jsonString);
     populateList(countries); 
     console.log(countries);    
}

var populateList = function(countries){
     var select = document.getElementById('country-list');
     for (country of countries){
          var option = document.createElement('option');
          option.innerText = country.name;
          // console.log(country.nativeName);
          select.appendChild(option);
     }
}

window.onload = app;