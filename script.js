let weather ={
    "apikey": "4*****************************",
    fetchweather: function (city)
    {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            + "&units=metric&appid=" 
            + this.apikey 
        ).then((response) => response.json())
        .then((data) => {
            if (data.cod === "404") {
                this.displayError(data.message);
            } else {
                this.displayweather(data);
                this.clearError();
            }
        });
    },
    displayweather: function(data){
        const { name }= data;
        const { icon, description }= data.weather[0];
        const { temp, humidity }= data.main;
        const { speed }= data.wind;
        console.log(name,icon,description,temp,humidity,speed)
        document.querySelector(".city").innerText="Weather in " + name;
        document.querySelector(".icon").src="https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText= description;
        document.querySelector(".temp").innerText="Temp: "+ temp + "°C";
        document.querySelector(".humidity").innerText="Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText="wind speed: " + speed +"km/hr";
    },
    displayError: function(message) {
        document.querySelector(".error").innerText = message;
    },

    clearError: function() {
        document.querySelector(".error").innerText = "";
    },
    search:function (){
        this.fetchweather(document.querySelector(".search-bar").value);
    },
    init: function() {
        this.fetchweather("pokhara");
    }
};

document.addEventListener("DOMContentLoaded", function() {
    weather.init();
});

document.querySelector(".search button")
.addEventListener("click",function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if (event.key == "Enter"){
        weather.search();
    }
});

//display location details

var loca=document.getElementById("location");
function getlocation()
    {
        if (navigator.geolocation)
            {
                navigator.geolocation.getCurrentPosition(showposition,showerror);
            }
        else{
            loca.innerHTML="The browser doesnot support location";

        }

    }
function showposition(position)
{
    showLocation(position);
}
var permission=document.querySelector(".error");
function showerror(error)
{
    if(error.PERMISSION_DENIED)
    {
        permission.innerHTML="User doesnot give the permission ";
    }
}
let address=document.getElementById("Address");
var City;
const showLocation = async (position) => {

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
        );
        const data = await response.json();
        address.innerHTML = "&nbsp&nbsp Your Location Details"+ "<br><br>&nbsp&nbsp Latitude: " + position.coords.latitude + "<br/>&nbsp&nbsp Longitude: " + position.coords.longitude +
        `<br>&nbsp&nbsp City : ${data.address.city || "Unknown city"}&emsp;
        <br>&nbsp&nbsp Country: ${data.address.country || "Unknown country"} &emsp;
        <br>&nbsp&nbsp  Tole: ${data.address.suburb || "Unknown"}&emsp;
        <br>&nbsp&nbsp  Address Type: ${data.addresstype || "Unknown"} &emsp;
        <br>&nbsp&nbsp  House No.: ${data.address.house_number || "Unknown"}&emsp;
         `;
         
        City=data.address.city;
    } 
    catch (error) {
        address.innerText = "Unable to fetch location details";
    }
    console.log(City);
    
    if (City) {
        weather.fetchweather(City);
    } else {
        weather.displayError("City information is not available.");
    }
  };
  
