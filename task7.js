var apiKey = "d644433300951b8e8c83167db1a20f23";
var btn = document.getElementById("btn");
var cityInput = document.getElementById("city");
var result = document.getElementById("result");
btn.addEventListener("click", function () {
    var city = cityInput.value.trim();
    if (city === "") {
        result.innerText = "Please enter a city name";
        return;
    }
    var url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&units=metric&appid=").concat(apiKey);
    fetch(url)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        if ("main" in data) {
            var temp = data.main.temp;
            var hum = data.main.humidity;
            result.innerHTML =
                "Temperature : ".concat(temp, " \u00B0C <br> Humidity : ").concat(hum, " %");
        }
        else {
            result.innerText = "City not found";
        }
    })
        .catch(function () {
        result.innerText = "Network error";
    });
});
