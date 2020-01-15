window.onload = () => {

  getRestaurants();
  
};

function getRestaurants() {
  axios.get("/restaurants/api")
  .then( response => {
    placeRestaurants(response.data.restaurants);
  })
  .catch(error => {
    console.log(error);
  })
}

function placeRestaurants(restaurants){
  const markers = []
  const ironhackBCN = {
    lat: 41.386230, 
    lng: 2.174980
  };
  
  
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: ironhackBCN
  });
  
  let center = {
    lat: undefined,
    lng: undefined
  }; 

  restaurants.forEach(function(restaurant){
    const center = {
      lat: restaurant.location.coordinates[1],
      lng: restaurant.location.coordinates[0]
    };
    const pin = new google.maps.Marker({
      position: center,
      map: map,
      title: restaurant.name
    });

    markers.push(pin);
  });
}


const geocoder = new google.maps.Geocoder();

document.getElementById('address').addEventListener('focusout', function () {
  geocodeAddress(geocoder);
});

function geocodeAddress(geocoder) {
  let address = document.getElementById('address').value;

  geocoder.geocode({ 'address': address }, function (results, status) {

    if (status === 'OK') {
      console.log(results)
      document.getElementById('latitude').value = results[0].geometry.location.lat();
      document.getElementById('longitude').value = results[0].geometry.location.lng();
    } else {
      // alert('Geocode was not successful for the following reason: ' + status);
      alert('Digite um endereço válido');
    }
  });
}