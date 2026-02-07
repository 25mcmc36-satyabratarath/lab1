const button = document.getElementById("btn") as HTMLButtonElement
const result = document.getElementById("result") as HTMLDivElement

button.addEventListener("click", () => {

    const cityInput = document.getElementById("city") as HTMLInputElement
    const city : string = cityInput.value

    const apiKey : string = "d644433300951b8e8c83167db1a20f23"

    if(city === ""){
        result.innerText = "Please enter city name"
        return
    }

    const url : string =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    fetch(url)
        .then(response => response.json())
        .then((data : any) => {

            if(data.main){
                const temperature : number = data.main.temp
                const humidity : number = data.main.humidity

                result.innerHTML =
                `Temperature: ${temperature} °C <br>
                 Humidity: ${humidity} %`
            }
            else{
                result.innerText = "City not found"
            }
        })
        .catch((error : unknown) => {
            result.innerText = "Network error"
        })
})
