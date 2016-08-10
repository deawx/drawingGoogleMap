function initMap() {
var arr = {};
var marker, i;
var arrPoints = {};
var sidebar = document.querySelector('.sidebar');


//test array points
var locations = [
     ['Title A', 3.180,101.715, 1],
     ['Title B', 3.200,101.616, 2],
     ['Title C', 3.147,101.597, 3],
     ['Title D', 3.190,101.710, 4],
     ['Title E', 3.201,101.71, 5],
     ['Title F', 3.154,101.777, 6]
];

  
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 3.180967, lng: 101.715546},
    zoom: 12
  });

  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.POLYGON
      ]
    },
    polygonOptions: {
      fillColor: '#ffff00',
      fillOpacity: 0.2,
      strokeWeight: 5,
      clickable: true,
      editable: true,
      draggable: true
    }
  });


  	drawingManager.setMap(map);


function setCoordinate(polygon){
	  drawingManager.setDrawingMode(null);
  var len = polygon.getPath().getLength();

  for (var i = 0; i < len; i++) {
    arr[i] = new google.maps.LatLng(polygon.getPath().getAt(i).toUrlValue(3));
  }
  	//clear coordinates on sidebar
  	sidebar.innerHTML = '';
  	for (i = 0; i < locations.length; i++) {
      if (google.maps.geometry.poly.containsLocation(arrPoints[i], polygon)){
      		
      		var div = document.createElement('div');
				div.innerHTML = locations[i][1]+ ":" + locations[i][2] + " = " + locations[i][0];
				sidebar.appendChild(div);
          }
}}
for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
         position: new google.maps.LatLng(locations[i][1], locations[i][2]),
         map: map
    })
    //make array for check
    arrPoints[i] = new google.maps.LatLng(locations[i][1], locations[i][2]);
	};


google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
	setCoordinate(polygon);
    google.maps.event.addListener(polygon.getPath(), 'set_at', function() {
        setCoordinate(polygon);
  });
});
}