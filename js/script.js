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

function siguiente(){
	$.scrollify.next();
}

scrollify.next = function() {
if(index<names.length) {
  index += 1;
  //index, instant, callbacks, toTop
  animateScroll(index,false,true,true);
}
};
scrollify.previous = function() {
if(index>0) {
  index -= 1;
  //index, instant, callbacks, toTop
  animateScroll(index,false,true,true);
}
};