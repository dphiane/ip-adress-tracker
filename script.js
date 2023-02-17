const inputSearch = document.getElementById("search");
const ipAddress = document.getElementById("ipAdress");
const domain_location = document.getElementById("location");
const isp = document.getElementById("isp");
const timezone = document.getElementById("timezone");

const URL = "https://geo.ipify.org/api/v2/country,city?apiKey=at_DZ1VdYQwNiUJXhND5O2Y3DSM6qDyt";

const map = L.map("map").setView([0, 0], 2);
let icon=L.icon({iconUrl: 'images/icon-location.svg'})

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function getResponse(search) {
  let params = "";
  if (!isNaN(search)) {
    params = "&ipAdress=" + search;
  } else if (search) {
    params = "&domain=" + search;
  }

  fetch(URL + params)
    .then((response) => response.json())
    .then((data) => {
      (ipAddress.innerHTML = data.ip),
        (domain_location.innerHTML =
          data.location.country + " " + data.location.region),
        (timezone.innerHTML ="UTC " + data.location.timezone),
        (isp.innerHTML = data.isp),
        L.marker([data.location.lat, data.location.lng],{icon:icon}).addTo(map).openPopup();
      map.setView([data.location.lat, data.location.lng], 13);
    })
    .catch((err) => console.error(err));
}

document.addEventListener("load", getResponse());

const btnSubmit = document.getElementById("btn");

btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  getResponse(inputSearch.value);
  inputSearch.value="";
});
