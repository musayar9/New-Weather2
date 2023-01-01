

showDayWeather = (city) => {

  const request = new XMLHttpRequest()
  request.open("GET", `https://api.collectapi.com/weather/getWeather?data.lang=tr&data.city=${city}`);

 request.setRequestHeader("content-type", "application/json");
  request.setRequestHeader("authorization", "apikey 2oYaPJqEyMTvSWXhoBoaXA:0CIbTdSXIwFlQtMHqGLP89");
  request.send()
  request.addEventListener('load', function () {
    console.log(this)
    console.log(this.responseText)
    const data = JSON.parse(this.responseText);
    console.log(data.success)

    if (data.success == false) {
      document.querySelector(".not-found").style.opacity = 1;
      document.querySelector(".not-found").style.height = "200px";
      const errorDay = document.querySelector(".errorDay")
      errorDay.innerText = `${data.message}`
      document.querySelector(".card-body").classList.add("d-none")
      textSearch.value = ""
    } else {
      document.querySelector(".not-found").style.opacity = 0;
      document.querySelector(".not-found").style.height = 0;
    }
    const weatherResult = data.result;
    console.log(weatherResult)
    const dayTitle = document.querySelector('#dayTitle');
    dayTitle.innerText = `${weatherResult[0].day} / ${weatherResult[0].date}`
    let dayWeatherStatus = "";
    for (let day of weatherResult) {
      console.log(day)
      dayWeatherStatus += `
        <div class="card daycard slide  tab" >
        <div class="cardBody text-center">
        <h5 class="card-title" title="Tarih">${day.date}</h5>
          <h5 class="card-title" title="Gün">${day.day}</h5>
          <img src="${day.icon}" id="dayImg" class="mb-2 mt-2" >
          <p class="text-capitalize card-subtitle dayTitle mb-2 mt-2" title="Hava Durumu">${day.description}</p>
          <p class=" dayTitle mb-2 text-danger" title="Sıcaklık"><i class="fa-solid fa-temperature-2 "></i> ${day.degree}°C</p>  
          <p title= "Gece Sıcaklığı" class="text-black dayTitle">   <i class="fa-solid fa-moon "></i> ${day.night}°C</p>         
          <p class="text-primary dayTitle" title="Nem Oranı">  <i class="fa-solid fa-smog text-primary"></i> %${day.humidity}</p>
        </div>
      </div>
    `
      const img = day.status;
      document.querySelector(".daycontainer").innerHTML = dayWeatherStatus;
    }
    textSearch.value = "";
    const firstDay = document.querySelector(".daycontainer")
    console.log(firstDay)
    for (i = 0; i < firstDay.children.length; i++) {
      if (i == 0) {
        firstDay.children[i].classList.add("d-none")
      }
    }
  })
}



