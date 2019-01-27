function empezar(){
	 var x = document.getElementById("myAudio"); 
  	x.play();
  	x.currentTime=0;
	var elmnt = document.getElementById("eleccion");
  	elmnt.scrollIntoView();
}

function llevame(identificacion){
	var id = document.getElementById(identificacion);
	id.scrollIntoView();
}