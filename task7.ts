type WeatherSuccess = {
    main : {
        temp : number
        humidity : number
    }
}

type WeatherError = {
    message : string
}

type WeatherResponse = WeatherSuccess | WeatherError

const apiKey : string = "d644433300951b8e8c83167db1a20f23"

const btn = document.getElementById("btn") as HTMLButtonElement
const cityInput = document.getElementById("city") as HTMLInputElement
const result = document.getElementById("result") as HTMLDivElement

btn.addEventListener("click", () => {

    const city : string = cityInput.value.trim()

    if(city === ""){
        result.innerText = "Please enter a city name"
        return
    }

    const url : string =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    fetch(url)
    .then(res => res.json())
    .then((data : WeatherResponse) => {

        if("main" in data){

            const temp : number = data.main.temp
            const hum : number = data.main.humidity

            result.innerHTML =
            `Temperature : ${temp} °C <br> Humidity : ${hum} %`
        }
        else{
            result.innerText = "City not found"
        }
    })
    .catch(() => {
        result.innerText = "Network error"
    })
})
