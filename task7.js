var button = document.getElementById("btn");
var result = document.getElementById("result");
button.addEventListener("click", function () {
    var cityInput = document.getElementById("city");
    var city = cityInput.value;
    var apiKey = "d644433300951b8e8c83167db1a20f23";
    if (city === "") {
        result.innerText = "Please enter city name";
        return;
    }
    var url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&units=metric&appid=").concat(apiKey);
    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        if (data.main) {
            var temperature = data.main.temp;
            var humidity = data.main.humidity;
            result.innerHTML =
                "Temperature: ".concat(temperature, " \u00B0C <br>\n                 Humidity: ").concat(humidity, " %");
        }
        else {
            result.innerText = "City not found";
        }
    })
        .catch(function (error) {
        result.innerText = "Network error";
    });
});
