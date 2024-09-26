function loadMap() {
		mapboxgl.accessToken = 'pk.eyJ1IjoicG9zdGVycHJvamVjdCIsImEiOiJjaWwxNWoxczQwMG5wdWFseGVhNG9la3NzIn0.eEjusFY9OqNsXyp9Y_jnrw';
		
		var map = new mapboxgl.Map({
		container: 'map',
	    center: [-76.15, 43.042],
		zoom: 11.71,
		hash: true,
		style: 'mapbox://styles/posterproject/cjuljnu2g2vn81fnrpz4n7g8q' // replace this with your style
		
    	
		});
		
//        map.addControl(new mapboxgl.FullscreenControl());

    
       
		
		map.doubleClickZoom.disable();
		
		map.on('click', function(e) {
			var features = map.queryRenderedFeatures(e.point, {
			layers: ['poster-map'] // replace this with the name of the layer 
			});
	
			if (!features.length) return;
			
			var feature = features[0];

			feature.properties.Poster = feature.properties.Poster.slice(0, 4) + " width = 194 height = 300" + feature.properties.Poster.slice(4);
	
			var popup = new mapboxgl.Popup({ offset: [0, 0] })
		
			.setHTML(`<h3>${feature.properties.Poster}</h3>
				<p style="margin: 0; font-size: 10.5px">
				${feature.properties.Title}<br>
				${feature.properties.Poet}<br>
				${feature.properties.Artist}<br>
				${feature.properties.Series}<br>
				${feature.properties.Price}<br>
				${feature.properties.Link}<br>
				</p>`)
			.setLngLat(feature.geometry.coordinates)
			.addTo(map);		
		});

		map.on('dblclick', () => {
			maximizeMap(isMax);
			map.resize();
			isMax = isMax == true ? false : true;
		})
}


function maximizeMap(isMax) {
	let map = document.getElementById('map');
	if (isMax) {
		// minimize map
		map.style.width = `590px`;
		map.style.height = `850px`;
		map.style.position = 'relative';
		document.getElementById('navmenu').style.display = "block";
		document.getElementById('left-top-label-id').remove();  //test
		
	} else {
		// max map
		map.style.width = `${window.innerWidth}px`;
		map.style.height = `${window.innerHeight}px`;
		map.style.position = 'absolute';
		map.style.top = "0px";
		map.style.left = "0px";
		document.getElementById('navmenu').style.display = "none";
		createLabel();  //test
	}
}






function createLabel() {
	let label = document.createElement('div');
	
	label.id = 'left-top-label-id';
	label.style.position = 'absolute';
	label.style.cssText = 'width: 200px; height: 250px; padding: 10px; line-height: 1.5; opacity: 0.75; background-color: #ffffff; position: absolute; top: 0; left: 0;' 

	label.innerHTML = 'Welcome to our interactive map of landmarks and locales featured in posters. <br /> Guide: <br /> Double click on the map to open a full screen map. Double click again to return to the web page map. Right click and swipe up to access a perspective view. Right click and swipe around to change perspective. Right click and swipe down to return to normal view. If you get lost, send smoke signals.';
	

	document.getElementById('map').parentElement.appendChild(label);

}



window.onload = () => {
	let m = document.getElementById('map');
	m.style.width = "590px";
	m.style.height = "850px";
	loadMap()
}

let isMax = false;
