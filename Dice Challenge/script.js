var randomnumber1 = Math.floor(Math.random()*6) + 1;
var randomnumber2 = Math.floor(Math.random()*6) + 1;
document.querySelector("img").setAttribute("src", "images/dice" + randomnumber1+".png")
document.querySelector(".container").lastElementChild.lastElementChild.setAttribute("src", "images/dice" + randomnumber2+".png");

if (randomnumber1===randomnumber2) {
  document.querySelector("h1").textContent = "Draw!";
}

else if (randomnumber1>randomnumber2){
  document.querySelector("h1").textContent = "🚩Player 1 wins!";
}

else {
  document.querySelector("h1").textContent = "Player 2 wins.🚩";
}
