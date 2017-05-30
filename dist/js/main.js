var affichage_panneau = false;
var links, linksarr = new Array();
var map, panorama;
var markerArr = [];
var lat = 44.86700502015272; //45.0441010447183;
var lon = 0.37943605495445354; //-0.6670684413326171;
var lieupano = {
	lat: lat,
	lng: lon
};

var isplaying = false;
var audio = new Audio();
var liszt = new Audio();
var curhotspotsound;

var panoid = 'ReUaWuLstmMAAAQ3j-SoeQ'; //pano dde départ ReUaWuLstmMAAAQ3j-SoeQ

function addmarker(name, icon, latitude, longitude, mp3) {
	var hotspoticon = {
		url: icon,
		size: new google.maps.Size(128, 128),
		scaledSize: new google.maps.Size(128, 128),
		origin: new google.maps.Point(0, 0)
	}
	var hotspot = new google.maps.Marker({
		position: {
			lat: latitude,
			lng: longitude
		},
		map: map,
		icon: hotspoticon,
		//draggable:true,
		visible: false,
		optimized: false,
		title: name
	});
	markerArr.push(hotspot);


	hotspot.addListener('rightclick', function() {
		//hotspot.setMap(null);
		console.log(hotspot.position.lat() + "," + hotspot.position.lng());
	});
	hotspot.addListener('click', function(event) {
		//if( mp3 != '' ){
			audio.pause();
			document.getElementById("subtitles").innerHTML = name;
			audio = new Audio(mp3);
			audio.play();
			audio.onended = function() {
				document.getElementById("subtitles").innerHTML = "";
			};
		//} else {
		//}
	});

	/*
	var myoverlay = new google.maps.OverlayView();
	myoverlay.draw = function() {
		this.getPanes().markerLayer.id = 'markerLayer';
		console.log(this.getPanes().markerLayer);
	};
	myoverlay.setMap(map);
	*/

	return hotspot;

}

function simplefloat(num) {
	return num.toFixed(4);
}

function setpano(panoid) {
	document.getElementById("subtitles").innerHTML = "";
	panorama = map.getStreetView();
	panorama.setOptions({
		pano: panoid
	});
	panorama.setPov(({
		heading: 265,
		pitch: 0
	}));
	panorama.setVisible(true);
	panorama.setOptions({
		linksControl: true,
		panControl: false,
		clickToGo: false,
		enableCloseButton: false
	});

}

function playaudio(url) {
	if (audio.paused) {
		audio = new Audio(url);
		audio.play();
	}
}

function playliszt() {
	if (liszt.paused) {
		liszt = new Audio('audio/salle3.mp3');
		liszt.play();
		liszt.volume = 0.2;
	}
}

function resetbuttons(t) {
	var thumbs = document.getElementsByClassName("wrapperpics");
	for (var i = 0, max = thumbs.length; i < max; i++) {
		thumbs[i].style.border = "none";
	}
	document.getElementById(t).style.border = "rgb(58, 113, 42) 5px solid";
}

function initPano() {
	map = new google.maps.Map(document.getElementById('pano'), {
		center: lieupano,
		zoom: 18,
		streetViewControl: false
	});

	setpano(panoid);
	resetbuttons("thumb01");

	// hotspots salle1
	var hotspot1 = addmarker('Photographie de John et Eugénie Bost, 1862 @coll.JL Fourcaud', "images/icons/hotspot01/icon.png", 44.866928979019015, 0.37946596274014155, "audio/BOST-H.mp3");
	var hotspot2 = addmarker('Les Asiles de Laforce. Gravure de A. Deroy, 1878 @FJB - MJEB', "images/icons/hotspot01/icon.png", 44.86693759246723, 0.37934587862923763, "audio/BOST-I.mp3");

	//hotspots salle 2
	var hotspot3 = addmarker('Le buste de Gaspard de Coligny, offert aux asiles par la paroisse de Briands en 1894 @Coll. FJB - MJEB', "images/icons/hotspot01/icon.png", 44.86688444258257, 0.3793607623817934, "audio/BOST-K.mp3");
	var hotspot4 = addmarker('Les rues de Paris où se dessine la vocation de John Bost', "images/icons/hotspot01/icon.png", 44.8670497620263, 0.3792609966387772, "audio/BOST-J.mp3");

	//hotspots salle 3
	var hotspot5 = addmarker('Lit roulant, fin du 19ème siècle. Asile de Béthesda.', "images/icons/hotspot01/icon.png", 44.866981030864416, 0.37924679337515954, "audio/BOST-O.mp3");
	var hotspot6 = addmarker('Le piano de John Bost.', "images/icons/hotspot01/icon.png", 44.866981030864416, 0.37924679337515954, "audio/BOST-M.mp3");

	//hotspots salle 4
	var hotspot7 = addmarker('Dessin d\'un résident, années 2000.', "images/icons/hotspot01/icon.png", 44.866981030864416, 0.37924679337515954, "audio/BOST-Q.mp3");
	
	//hotspots salle 5
	var hotspot8 = addmarker('Les années 2000 au sein de la Fondation John Bost', "images/icons/hotspot01/icon.png", 44.866981030864416, 0.37924679337515954, "audio/BOST-R.mp3");
	
	//hotspots salle 6
	var hotspot9 = addmarker('“La Famille” de Francis Masson, années 1950', "images/icons/hotspot01/icon.png", 44.866981030864416, 0.37924679337515954, "audio/BOST-S.mp3");
	var hotspot10 = addmarker('Salle des expositions temporaires - <a target="_blank" style="color:#61c342;" href="http://maisonbost.com/exposition-temporaire/">Cliquez ici pour voir l\'exposition</a>', "images/icons/hotspot01/icon.png", 44.866981030864416, 0.37924679337515954, 'audio/BOST-G.mp3');

	panorama.addListener('links_changed', function() {
		if (panorama.getPano() == "ReUaWuLstmMAAAQ3j-SoeQ") {
			// virer le pano exterieur
			panorama.getLinks().splice(0, 1);
			
			// lien vers photosphere salle 4>5
		}  else if( panorama.getPano() == "lW7iC2IHZicAAAQ3j-Sodg" ){
			 panorama.getLinks().push({
				description: '',
				heading: 75,
				pano: 'F:-cQJGhbuVzco/WLg3ovZbFCI/AAAAAAAAwlM/LAg01lhmFLkzQUMU_NIXKRNZTbOH_ufyACLIB'
			 });
			 
		} else if( panorama.getPano() == "F:-cQJGhbuVzco/WLg3ovZbFCI/AAAAAAAAwlM/LAg01lhmFLkzQUMU_NIXKRNZTbOH_ufyACLIB" ){
			 panorama.getLinks().push({
				description: '',
				heading: -75,
				pano: 'lW7iC2IHZicAAAQ3j-Sodg'
			 });
			 
		}
	});

	panorama.addListener('pano_changed', function() {
		console.log("pano courant :" + panorama.getPano());
		panoid = panorama.getPano();


		if (panoid == "6H8YaaL5pswAAAQ3j-Soeg" || panoid == "ReUaWuLstmMAAAQ3j-SoeQ" || panoid == "n98ArGv0y34AAAQ3j-Soew" || panoid == "dynJLy1XqoMAAAQ3j-SoZA" || panoid == "hmsx_cBw9Q0AAAQ3j-SoZQ" || panoid == "sGcFcoMWvnIAAAQ3j-SoZg" || panoid == "ET89i5KH1ZoAAAQ3j-SoZw") {
			// salle1
			resetbuttons("thumb01");
			hotspot3.visible = false;
			hotspot4.visible = false;
			hotspot5.visible = false;
			hotspot6.visible = false;
			hotspot7.visible = false;
			hotspot8.visible = false;
			hotspot9.visible = false;
			hotspot10.visible = false;

			liszt.pause();
			document.getElementById("textepanos").innerHTML = "<strong>SALLE 1 / Une oeuvre prophétique : les Asiles de Laforce</strong><br/>Mise en valeur de l’originalité et de l’ampleur de cette « cité prophétique » conçue par John Bost au XIXème siècle.";

			if (panoid == "n98ArGv0y34AAAQ3j-Soew") {
				hotspot1.setPosition(new google.maps.LatLng(44.866928979019015, 0.37946596274014155));
				hotspot1.visible = true;
			} else if (panoid == "6H8YaaL5pswAAAQ3j-Soeg") {
				hotspot1.setPosition(new google.maps.LatLng(44.86691918110303, 0.3793795236808819));
				hotspot1.visible = true;
			} else if (panoid == "dynJLy1XqoMAAAQ3j-SoZA") {
				hotspot1.setPosition(new google.maps.LatLng(44.86695029280749, 0.37953649931432665));
				hotspot1.visible = true;
			} else {
				hotspot1.visible = false;
			}

			if (panoid == "hmsx_cBw9Q0AAAQ3j-SoZQ") {
				hotspot2.setPosition(new google.maps.LatLng(44.86694934614252, 0.3793641148997722));
				hotspot2.visible = true;
			} else if (panoid == "dynJLy1XqoMAAAQ3j-SoZA") {
				hotspot2.setPosition(new google.maps.LatLng(44.86694612389029, 0.37932509829272476));
				hotspot2.visible = true;
			} else if (panoid == "sGcFcoMWvnIAAAQ3j-SoZg") {
				hotspot2.setPosition(new google.maps.LatLng(44.86691303625237, 0.37939844697427816));
				hotspot2.visible = true;
			} else {
				hotspot2.visible = false;
			}

			if (panoid == "6H8YaaL5pswAAAQ3j-Soeg") {
				playaudio('audio/BOST-A.mp3');
			}

		} else if (panoid == "_8I_cH9rq6sAAAQ3j-SoaA" || panoid == "tmVoBXFjm5IAAAQ3j-SoaQ" || panoid == "r2aUWpf2HBEAAAQ3j-Soag" || panoid == "a2hm_G811b4AAAQ3j-Soaw" || panoid == "837zNjhHeMcAAAQ3j-SobA" || panoid == "LyyukB3OhQIAAAQ3j-SobQ") {
			// salle 2
			resetbuttons("thumb02");
			hotspot1.visible = false;
			hotspot2.visible = false;
			hotspot5.visible = false;
			hotspot6.visible = false;
			hotspot7.visible = false;
			hotspot8.visible = false;
			hotspot9.visible = false;
			hotspot10.visible = false;
			liszt.pause();

			document.getElementById("textepanos").innerHTML = "<strong>SALLE 2 / L'émergence du protestantisme et l’histoire de la famille Bost</strong><br/>Quelques repères simples de l’histoire du protestantisme au sein de l’histoire générale des religions et des conceptions du monde. Puis, la découverte de John Bost et Eugénie Meynardie-Ponterie, des histoires personnelles et familiales.";
			if (panoid == "_8I_cH9rq6sAAAQ3j-SoaA") {
				playaudio('audio/BOST-B.mp3');
			}

			if (panoid == "r2aUWpf2HBEAAAQ3j-Soag") {
				hotspot4.setPosition(new google.maps.LatLng(44.8670497620263, 0.3792609966387772));
				hotspot4.visible = true;
			} else if (panoid == "tmVoBXFjm5IAAAQ3j-SoaQ") {
				hotspot4.setPosition(new google.maps.LatLng(44.86700633291105, 0.37918701123180654));
				hotspot4.visible = true;
			} else if (panoid == "a2hm_G811b4AAAQ3j-Soaw") {
				hotspot4.setPosition(new google.maps.LatLng(44.86710565028954, 0.3792923369783239));
				hotspot4.visible = true;
			} else {
				hotspot4.visible = false;
			}

			if (panoid == "_8I_cH9rq6sAAAQ3j-SoaA") {
				hotspot3.setPosition(new google.maps.LatLng(44.86688444258257, 0.3793607623817934));
				hotspot3.visible = true;
			} else if (panoid == "LyyukB3OhQIAAAQ3j-SobQ") {
				hotspot3.setPosition(new google.maps.LatLng(44.86692189124497, 0.37934170469861783));
				hotspot3.visible = true;
			} else if (panoid == "837zNjhHeMcAAAQ3j-SobA") {
				hotspot3.setPosition(new google.maps.LatLng(44.866939470909635, 0.37945997751489813));
				hotspot3.visible = true;
			} else {
				hotspot3.visible = false;
			}

		} else if (panoid == "bMC6HVCz34EAAAQ3j-Sobg" || panoid == "sHxv3OFNBzEAAAQ3j-SocQ" || panoid == "yGwry4eHrhAAAAQ3j-Sobw" || panoid == "9MwPvpplX7kAAAQ3j-SocA" || panoid == "sHxv3OFNBzEAAAQ3j-SocQ" || panoid == "aWurh8Kf5C4AAAQ3j-Socg" || panoid == "k_pUl_dmeTIAAAQ3j-Socw") {
			// salle 3
			resetbuttons("thumb03");
			hotspot1.visible = false;
			hotspot2.visible = false;
			hotspot3.visible = false;
			hotspot4.visible = false;
			hotspot7.visible = false;
			hotspot8.visible = false;
			hotspot9.visible = false;
			hotspot10.visible = false;
			playliszt();

			document.getElementById("textepanos").innerHTML = "<strong>SALLE 3 / John et Eugénie Bost : l’oeuvre de leur vie</strong><br/>Création des « Asiles de Laforce » à partir de l’édification du premier bâtiment La Famille en 1848, et leur développement au cours du XIXème siècle.";

			if (panoid == "bMC6HVCz34EAAAQ3j-Sobg") {
				hotspot5.setPosition(new google.maps.LatLng(44.866981030864416, 0.37924679337515954));
				hotspot5.visible = true;
			} else if (panoid == "yGwry4eHrhAAAAQ3j-Sobw") {
				hotspot5.setPosition(new google.maps.LatLng(44.867003590771205, 0.3792682660897526));
				hotspot5.visible = true;
			} else if (panoid == "9MwPvpplX7kAAAQ3j-SocA") {
				hotspot5.setPosition(new google.maps.LatLng(44.8669625650338, 0.37927556706586074));
				hotspot5.visible = true;
			} else {
				hotspot5.visible = false;
			}

			if (panoid == "aWurh8Kf5C4AAAQ3j-Socg") {
				hotspot6.setPosition(new google.maps.LatLng(44.86692034846274, 0.379302064067474));
				hotspot6.visible = true;
			} else if (panoid == "sHxv3OFNBzEAAAQ3j-SocQ") {
				hotspot6.setPosition(new google.maps.LatLng(44.866911599696294, 0.3792600345735764));
				hotspot6.visible = true;

			} else {
				hotspot6.visible = false;
			}

			if (panoid == "bMC6HVCz34EAAAQ3j-Sobg") {
				playaudio('audio/BOST-C.mp3');
			}
		} else if (panoid == "IeqxQ0dBLh8AAAQ3j-SodQ" || panoid == "lW7iC2IHZicAAAQ3j-Sodg" || panoid == "xNPx6Qb1Y9YAAAQ3j-SodA") {
			// salle 4
			resetbuttons("thumb04");
			hotspot1.visible = false;
			hotspot2.visible = false;
			hotspot3.visible = false;
			hotspot4.visible = false;
			hotspot5.visible = false;
			hotspot6.visible = false;
			hotspot8.visible = false;
			hotspot9.visible = false;
			hotspot10.visible = false;
			
			if (panoid == "IeqxQ0dBLh8AAAQ3j-SodQ") {
				hotspot7.setPosition(new google.maps.LatLng(44.86706542314707, 0.3792240722370934));
				hotspot7.visible = true;
			} else if (panoid == "lW7iC2IHZicAAAQ3j-Sodg") {
				hotspot7.setPosition(new google.maps.LatLng(44.86709040749748, 0.3792122413584593));
				hotspot7.visible = true;

			} else {
				hotspot7.visible = false;
			}

			liszt.pause();

			document.getElementById("textepanos").innerHTML = "<strong>SALLE 4 / Quelques Bost au XXème siècle</strong><br/>Découvrez les portraits de personnages divers et forts : de Charles Bost, historien au chanteur Renaud.";
			if (panoid == "IeqxQ0dBLh8AAAQ3j-SodQ") {
				playaudio('audio/BOST-D.mp3');
			}
		} else if (panoid == "F:-5iZC5WgmsU8/WLg3yOvQcSI/AAAAAAAAwlA/sNZ7hKJrEnMD15oeH6r4vAwBim3UtEZ4wCLIB" || panoid == "F:-cQJGhbuVzco/WLg3ovZbFCI/AAAAAAAAwlM/LAg01lhmFLkzQUMU_NIXKRNZTbOH_ufyACLIB"){
			// salle 5
			resetbuttons("thumb05");
			hotspot1.visible = false;
			hotspot2.visible = false;
			hotspot3.visible = false;
			hotspot4.visible = false;
			hotspot5.visible = false;
			hotspot6.visible = false;
			hotspot7.visible = false;
			hotspot9.visible = false;
			hotspot10.visible = false;
			
			liszt.pause();
			document.getElementById("textepanos").innerHTML = "<strong>SALLE 5 / La Fondation John BOST aux XXème et XXIème siècles</strong><br/>Le contenu de l’œuvre est abordé ici par une mise en lumière de l’évolution des méthodes d’accueil, d’accompagnement et de soin des résidents.";
			if (panoid == "F:-cQJGhbuVzco/WLg3ovZbFCI/AAAAAAAAwlM/LAg01lhmFLkzQUMU_NIXKRNZTbOH_ufyACLIB") {
				playaudio('audio/BOST-E.mp3');
			}
			if (panoid == "F:-cQJGhbuVzco/WLg3ovZbFCI/AAAAAAAAwlM/LAg01lhmFLkzQUMU_NIXKRNZTbOH_ufyACLIB") {
				hotspot8.setPosition(new google.maps.LatLng(44.86696799394511,0.37922000522405597));
				hotspot8.visible = true;
			//} else if (panoid == "F:-5iZC5WgmsU8/WLg3yOvQcSI/AAAAAAAAwlA/sNZ7hKJrEnMD15oeH6r4vAwBim3UtEZ4wCLIB") {
				//hotspot8.setPosition(new google.maps.LatLng(44.86709040749748, 0.3792122413584593));
				//hotspot8.visible = true;

			} else {
				hotspot8.visible = false;
			}
			
		} else if (panoid == "F:-QIhAQux4eBE/WLg3_ouLAsI/AAAAAAAAwlA/2FzQI_D_-KUc0mhbPQVZRQPtlD8k2hWUACLIB") {
			// salle 6
			resetbuttons("thumb06");
			hotspot1.visible = false;
			hotspot2.visible = false;
			hotspot3.visible = false;
			hotspot4.visible = false;
			hotspot5.visible = false;
			hotspot6.visible = false;
			hotspot7.visible = false;
			hotspot8.visible = false;
			liszt.pause();
			document.getElementById("textepanos").innerHTML = "<strong>SALLE 6 / Espace “un autre regard”</strong><br/>Cet espace est consacré aux créations réalisées par les résidents au fil du temps. Ces « regards autres », sont la caractéristique visuelle de ce lieu muséal, sa spécificité et son originalité.";
			playaudio('audio/BOST-F.mp3');
			
			hotspot9.setPosition(new google.maps.LatLng(44.8670487512369,0.37928112107795187));
			hotspot9.visible = true;

			hotspot10.setPosition(new google.maps.LatLng(44.86707101768535,0.3795415205175914));
			hotspot10.visible = true;
			
		} else {
			hotspot1.visible = false;
			hotspot2.visible = false;
			hotspot3.visible = false;
			hotspot4.visible = false;
			hotspot5.visible = false;
			hotspot6.visible = false;
			hotspot7.visible = false;
			hotspot8.visible = false;
			hotspot9.visible = false;
			hotspot10.visible = false;
			
			liszt.pause();
			document.getElementById("textepanos").innerHTML = "";
		}

	});

	panorama.addListener('pov_changed', function() {

	});
	// loadé OK
	setTimeout(function() {
		$('.loader').fadeOut(2000);
	}, 2000);

	// autorotation
	/*
	window.setInterval(function() {
		var pov = panorama.getPov();
		pov.heading += 0.008;
		panorama.setPov(pov);
	}, 20);
	*/
}

$(function() {
	$(window).resize();
});
$(window).resize(function() {
	$('#pano').height(window.innerHeight);
	$('.scroll').height(window.innerHeight);
});