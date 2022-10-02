var textWrapper = document.querySelector('.ml9 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
var section= document.querySelector("section");

function animate(){
  anime.timeline({loop: 1}).add({
  targets: '.ml9 .letter',
  scale: [0, 1],
  duration: 1500,
  elasticity: 600,
  delay: (el, i) => 45 * (i+1)
}).add({
  
  //targets: '.ml9',
  //opacity: 0,
  //duration: 1000,
  //easing: "easeOutExpo",
  //delay: 1000
});}
animate();
var breakLine= document.createElement("br");
var but = document.createElement("button");

but.innerHTML="YESSIR";
//section.appendChild(breakLine);
//section.appendChild(but);


  