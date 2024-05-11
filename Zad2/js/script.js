//Zad2
var map = L.map('map').setView([52.4, 16.9596], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Losowy marker
var marker1 = L.marker([52.4, 16.9596]).addTo(map);
// Sołacz
var marker2 = L.marker([52.4254, 16.904]).addTo(map);
// Łazarz
var marker3 = L.marker([52.3949, 16.9007]).addTo(map);

var popup = L.popup({content: '<button class=\"solacz\">Sołacz</button>', className: 'myPopup'});

marker2.bindPopup(popup).openPopup();

var polygon = L.polygon([
  [52.4, 16.9596],
  [52.4254, 16.904],
  [52.3949, 16.9007]
]).addTo(map);

polygon.setStyle({
  fillColor: 'cyan',
  color: 'green'
});

polygon.on('mouseover', function (e) {
  this.setStyle({
      fillColor: 'green',
      color: 'cyan'
  });
});

polygon.on('mouseout', function (e) {
  this.setStyle({
    fillColor: 'cyan',
    color: 'green'
  });
});

function copyToClipboard(e) {
  navigator.clipboard.writeText(e.latlng)
  alert(`${e.latlng}`);
}
 
map.on("click", copyToClipboard);

let counter = 0;

function addMarker(lat, lng, popupText, buttonText, popupColor) {
  var marker = L.marker([lat, lng]).addTo(map);
  var popup = L.popup({content: `${popupText}<br><button>${buttonText}</button>`, className: `newPopup${counter}`});
  marker.bindPopup(popup).openPopup();
  document.querySelector(`.newPopup${counter}`).firstChild.style.background = popupColor;
  document.querySelector(`.newPopup${counter}`).querySelector('.leaflet-popup-tip').style.background = popupColor;
  counter++;
}

document.getElementById('markerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var lat = parseFloat(document.getElementById('latInput').value);
  var lng = parseFloat(document.getElementById('lngInput').value);
  var popupText = document.getElementById('popupText').value;
  var buttonText = document.getElementById('buttonText').value;
  var popupColor = document.getElementById('popupColorInput').value;

  if (isNaN(lat) || isNaN(lng)) {
    alert('Latitude and Longitude must be numbers.');
    return;
  }

  addMarker(lat, lng, popupText, buttonText, popupColor);
});

