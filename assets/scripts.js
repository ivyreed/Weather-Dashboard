var curLoc   = document.getElementById('clocation');
var curDate  = document.getElementById('cdate');
var curTemp  = document.getElementById('ctemp');
var startBtn = document.getElementById('start')
var jsArea = document.getElementById('landing')
var btnbtn = document.getElementsByClassName('city-btns')
const apiKey   = '1fb309de6e34405a44ff7a7f2f85306b';
// Sets the current date 
setInterval(() => {
    var curentDate = new Date();
    var dd = String(curentDate.getDate()).padStart(2, '0');
    var mm = String(curentDate.getMonth() + 1).padStart(2, '0');
    var yyyy = curentDate.getFullYear();
    curentDate ='(' + mm + '/' + dd + '/' + yyyy + ')';
    curDate.innerHTML = curentDate;
}, 1000);
// grabs city and info about city

function current(city){
fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&limit=1&units=imperial&appid=${apiKey}`)
.then(res => res.json())
.then(data =>{
    console.log(data)
  console.log(data.main.humidity)
        let hum =('Humidity: ' + (data.main.humidity) + '%');
        let icon=(data.weather[0].icon)
        let nDate=(data.dt)
        var s = new Date(nDate).toLocaleDateString("en-US")
        console.log(s)
        


        console.log(icon)
        let iPlace= document.getElementById('i' + [0])
        iPlace.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`)
        let wind=('Wind: ' + (Math.round(data.wind.speed)) + ' MPH');
        let temp = ('Temperature: ' + (Math.round(data.main.temp)));
        let hPlace = document.getElementById('h' + [0])
        hPlace.innerHTML =(hum)
        let wPlace = document.getElementById('w' + [0])
        wPlace.innerHTML =(wind)
        let tPlace = document.getElementById('t' + [0])
        tPlace.innerHTML =(temp)
})
}

function geocache(city){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
    .then(res => res.json())
    .then(data =>{
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=${apiKey}`)
        .then(res => res.json())
        .then(wdata =>{ 
            // console.log(wdata)
        let cName=(wdata.city.name)
        curLoc.innerHTML  = cName
            for (let i = 7; i <= 39;i += 8) {
                let hum =('Humidity: ' + (wdata.list[i].main.humidity) + '%');
                let icon=(wdata.list[i].weather[0].icon)
                let date=(wdata.list[i].dt_txt)
                // console.log(date)
                let fDay = new Date(date).toLocaleDateString('en-us')
                // console.log(fDay)
                let dPlace = document.getElementById('d' + [i])
                dPlace.innerHTML =('(' + fDay + ')')

                // console.log(icon)
                let iPlace= document.getElementById('i' + [i])
                iPlace.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`)
                let wind=('Wind: ' + (Math.round(wdata.list[i].wind.speed)) + ' MPH');
                let temp = ('Temperature: ' + (Math.round(wdata.list[i].main.temp)));
                let hPlace = document.getElementById('h' + [i])
                hPlace.innerHTML =(hum)
                let wPlace = document.getElementById('w' + [i])
                wPlace.innerHTML =(wind)
                let tPlace = document.getElementById('t' + [i])
                tPlace.innerHTML =(temp)
            }   
        })   
    })
}
// grabs citys out of local storage and makes them into buttons
function loadData() {
    var loadData = localStorage.getItem('cityNames')
    if (loadData == null || loadData == "") return;

    var cityNamesArray = JSON.parse(loadData)
    for (let i = 0; i < cityNamesArray.length; i++) {
        var btn = document.createElement("BUTTON");
        btn.classList.add('city-btns')
        btn.innerHTML = cityNamesArray[i];
        jsArea.appendChild(btn);
    }
} 
loadData();
function grabOffArray(i){
    let city = i.target.innerHTML
    geocache(city);
    current(city);
}
// makes the save button work 
function sbtn(){
    var city = document.querySelector(`#aside-text-area`)
    let citys = JSON.parse(localStorage.getItem('cityNames'))
    if (citys ===null){
        citys = []
    }
    citys.push(city.value)
    localStorage.setItem('cityNames', JSON.stringify(citys))
    var btn = document.createElement("BUTTON");
    btn.classList.add('city-btns')
    btn.innerHTML = city.value;
    btn.addEventListener('click', grabOffArray)
    jsArea.appendChild(btn);
    geocache(city.value);
    current(city.value);
}
for(let i = 0; i < btnbtn.length; i++){
        btnbtn[i].addEventListener('click', grabOffArray);

}
startBtn.addEventListener('click',sbtn,);
