
const url = 'https://api.openweathermap.org/data/2.5/'
const apıKey = '<your_api_key>';

const container = document.querySelector(".container")
const textSearch = document.querySelector("#textSearch");
const localBtn = document.querySelector("#btnLocal")
const temp = document.querySelector(".temp")
const wheather = document.querySelector(".wheather")
const wheatImg = document.querySelector("img");
const city2 = document.querySelector(".city")
const feel = document.querySelector(".feel")
const hummidity = document.querySelector(".humdty")
const maxTemp = document.querySelector(".maxTemp")
const minTemp = document.querySelector(".minTemp")
const turnSearch = document.querySelector(".fa-arrow-circle-left")
const wind = document.querySelector(".wind")
const icon = document.querySelector(".icon")
const notFound = document.querySelector(".not-found")
const errorText = document.querySelector(".error-text")
const errorWeather = document.querySelector(".error-weather")


textSearch.addEventListener("keyup", e => {
    if (e.key == "Enter" && textSearch.value != "") {
        textValue = textSearch.value;
        showWheather(textValue);
        console.log(textValue)
        showDayWeather(textValue);
    }
})
async function showWheather(city) {
    try {
        const response = `${url}weather?q=${city}&appid=${apıKey}&units=metric&lang=tr`
        const res = await fetch(response);
        console.log(res)
        const data = await res.json()
        console.log(data)
        if (data.cod === "404") {
            document.querySelector(".not-found").style.opacity = 1;
            document.querySelector(".not-found").style.height = "200 px";
            errorText.innerText = `Ooops! ${data.message}`
            document.querySelector(".card-body").classList.add("d-none")
            textSearch.value = ""
        } else {
            document.querySelector(".not-found").style.opacity = 0;
            document.querySelector(".not-found").style.height = 0;
        }
        city2.innerText = `${data.name}, ${data.sys.country}`
        temp.innerText = `${data.main.temp}°C`
        wheather.innerText = `${data.weather[0].description}`
        hummidity.innerText = `${data.main.humidity} %`;
        feel.innerText = `${data.main.feels_like}° c`
        maxTemp.innerText = `${data.main.temp_max}° c`
        minTemp.innerText = `${data.main.temp_min} ° c`
        wind.innerText = `${parseInt(data.wind.speed)} Km/h`
        const jpg = data.weather[0].id
        console.log(jpg)
        if (jpg == 800) {
            wheatImg.src = "ımg/clear.svg";
            icon.classList = "fa-solid fa-temperature-full text-danger me-2"
        } else if (jpg >= 200 && jpg <= 232) {
            wheatImg.src = "ımg/storm.svg";
            icon.classList = "fa-solid fa-temperature-2 text-danger me-2"
        }
        else if (jpg >= 600 && jpg <= 622) {
            wheatImg.src = "ımg/snow.svg"
            icon.classList = "fa-solid fa-temperature-empty text-danger me-2"
        }
        else if (jpg >= 701 && jpg <= 781) {
            wheatImg.src = "ımg/haze.svg";
            icon.classList = "fa-solid fa-temperature-2 text-danger me-2"
        } else if (jpg >= 801 && jpg <= 804) {
            wheatImg.src = "ımg/cloud.svg"
            icon.classList = "fa-solid fa-temperature-low text-danger me-2"
        } else if ((jpg >= 500 && jpg <= 531) || (jpg >= 300 && jpg <= 321)) {
            wheatImg.src = "ımg/rain.svg";
            icon.classList = "fa-solid fa-temperature-half text-danger me-2"
        }
        textSearch.value = "";
        container.classList.add("active")
        document.querySelector(".not-cıty").style.opacity = 1;
        document.querySelector(".not-cıty").style.height = "250px";
        const dayContainer = document.querySelector(".daycontainer")
        dayContainer.style.display = "grid"
    } catch (err) {

    }
}
localBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onselect)
    }
    async function onselect(location) {
        let lat = location.coords.latitude;
        let lang = location.coords.longitude;
        console.log(lang, lat)
        const api_key = '<your_api_key>'
        const locUrl = ` https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lang}&key=${api_key}`
        const rsp = await fetch(locUrl)
        console.log(rsp)
        const data1 = await rsp.json()
        console.log(data1)
        const localHome = data1.results[0].components.town
        console.log(localHome)
        textSearch.value = localHome;
        showWheather(localHome)
        showDayWeather(localHome)

        if (data1.cod === "404") {
            document.querySelector(".not-found").style.opacity = 1;
            document.querySelector(".not-found").style.height = "200 px";
            errorText.innerText = `Ooops! ${data1.message}`;
            document.querySelector(".card-body").classList.add("d-none")
        } else {
            document.querySelector(".not-found").style.opacity = 0;
            document.querySelector(".not-found").style.height = "";
            // document.querySelector(".card-body").classList.add("d-block")
        }
    }

})

turnSearch.addEventListener('click', () => {
    container.classList.remove("active")
    document.querySelector(".not-found").style.opacity = 0;
    document.querySelector(".not-found").style.height = "";
    document.querySelector(".card-body").classList.remove("d-none")
    const dayContainer = document.querySelector(".daycontainer")
    dayContainer.style.display = "none"
})


