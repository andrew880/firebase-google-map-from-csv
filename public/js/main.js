var map;

var markers = []; // Store All the Markers to Display on Map
var locations = []; // Every Location for All Brand
var brandLocations = []; // Temp List to Store Every Location for One Brand. Used in register()
var colors = ["red", "orange", "yellow", "green", "blue", "purple", "ltblue", "pink"] // Used to Set Different Marker Color



// Load all the csv Files when the webpage is loaded
function backendLoading() {
	var corp = ["PetPark", "ETtoday", "Fish"];
	corp.forEach(element => {
		db.collection(element).get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				brandLocations.push({
					store: doc.data()["Store"], 
					lat: doc.data()["GeoLocation"]["x_"],
					lng: doc.data()["GeoLocation"]["N_"]
				});
			});
			locations.push( Array.from(brandLocations))
			brandLocations = [];
		});	
	});
}

// Initial Base Map
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 25.04, lng: 121.54},
		zoom: 14,
		mapTypeControl: false
	});
}


// Used to Check if which Brand Checkboxes are Checked, and Display the Markers for that Brand
function checkCheckBox() {
	var checkBoxes = document.getElementsByClassName('brandCheckbox');

	clearMarkers()
	for (i = 0; i < checkBoxes.length; i++) {
		if (checkBoxes[i].checked) {
			for (j = 0; j < locations[checkBoxes[i].value].length; j++) {
				addMarker(checkBoxes[i].value, j)
			}
		}
	}

}

// Add Markers on Map
function addMarker(brandIndex, index) {
	setTimeout(function() {

		// Different color for different Brand
		let url = "http://maps.google.com/mapfiles/ms/icons/";
		url += colors[brandIndex] + "-dot.png";

		markers.push(new google.maps.Marker({
			position: {
				lat: parseFloat(locations[brandIndex][index].lat),
				lng: parseFloat(locations[brandIndex][index].lng)
			},
			icon: {
				url: url
			},
			map: map,
			//label: position[e].label,
			animation: google.maps.Animation.DROP
		}));
	}, index * 10);
}
  
// Clear All the Markers on Map
function clearMarkers() {
	for (var i = 0; i < markers.length; i++) {
		if(markers[i]){
			markers[i].setMap(null);
	  	}
	}
	markers = [];
}
var db = firebase.firestore();