"use-strict";

//------------------SELECTORS-------------------

const popUp = document.querySelector(".popup");
const input = document.querySelector(".input");
const Button = document.querySelector(".add-memory-button");
const closePopUp = document.querySelector(".close-popup");
const infoText = document.querySelector(".info-left-h1");
const memoryContainer = document.querySelector(".memory-container");
const memoryDiv = document.querySelector(".memory-div");
const mapHTML = document.getElementById("map");
const map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

//-----------------------FUNCTIONS---------------------------

let latGeo = [];
let lngGeo = [];
let markers = [];

let divId = -1;

// MAP CLICK

const markerClick = function (e) {
    divId++;

    infoText.style.display = "none";
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    const marker = new L.marker([lat, lng]).addTo(map);
    markers.push(marker);

    popUp.style.display = "block";

    latGeo.push(lat);
    lngGeo.push(lng);
};

// MEMORY CLICK SUBMISSION

const submissionClick = function () {
    const value = input.value;

    if (!value) {
        alert("Please insert a memory before submitting :) ");
    } else if (value.length > 25) {
        alert("Keep the memory up to 25 letters maximum. ");
    } else {
        memoryContainer.innerHTML += `  <div class="memory-div" id="${divId}">
       <i class="fa-sharp fa-solid fa-location-dot"></i>
       <p class="paragraph-left"> ${value} </p>
       <i class="fa fa-trash trash" id="trash" ></i>


   </div>`;

        popUp.style.display = "none";
        input.value = "";
    }
};

// MEMORY ENTER SUBMISSION

const submissionEnter = function (e) {
    if (e.key === "Enter") {
        const value = input.value;

        if (!value) {
            alert("Please insert a memory before submitting :) ");
        } else {
            memoryContainer.innerHTML += `  <div class="memory-div" id="${divId}">
       <i class="fa-sharp fa-solid fa-location-dot"></i>
       <p class="paragraph-left"> ${value} </p>
       <i class="fa fa-trash " id="trash" ></i>


   </div>`;

            popUp.style.display = "none";
            input.value = "";
        }
    }
};

// CLOSE POP UP

const popUpClose = function () {
    popUp.style.display = "none";
    input.value = "";
    map.removeLayer(markers.pop());
    latGeo.pop();
    lngGeo.pop();
    divId--;
};

// MOVE MAP TO GEOCOORDS

const moveMapToGeo = function (e) {
    if (e.target.className === "memory-div") {
        const arrayNumber = e.target.id;
        map.flyTo(new L.LatLng(latGeo[arrayNumber], lngGeo[arrayNumber]));
    } else {
        return;
    }
};

// DELETE MEMORY DIV & MARKER

const deleteMarkerAndDiv = function (e) {
    if (e.target.id === "trash") {
        const divID = e.target.closest("div").getAttribute("id");
        map.removeLayer(markers[divID]);
        document.getElementById(divID).style.display = "none ";
    }
};

//-----------------------EVENT LISTENERS---------------------

//------MAP CLICK ----------

map.on("click", markerClick);

//------Form Click Submission ----------

Button.addEventListener("click", submissionClick);

//------Form Enter Submission ----------

input.addEventListener("keypress", submissionEnter);

//------Pop Up Close ----------

closePopUp.addEventListener("click", popUpClose);

//------Move Map To Memory Div Coords ----------

document.addEventListener("click", moveMapToGeo);

//------Delete Memory ----------

document.addEventListener("click", deleteMarkerAndDiv);
