// DES7720 — EXERCICE 3 — Conditions, animations et sons


// roule 1 fois au début du script     
//let ellipseposX = 0;
//let ellipseposY = 0; 

function setup() {

createCanvas(640,640); 

ellipseposX = width/2;
ellipseposY = height/2; 

}

// Dessiner en boucle.
function draw() {
background(255,64,19); 

if (mouseX > ellipseposX) {
ellipseposX =  ellipseposX - 1;
}
else if (mouseX < ellipseposX) {
ellipseposX =  ellipseposX - 1;
}

if (mouseY > ellipseposY) {
ellipseposY =  ellipseposY - 1;
}
else if (mouseY < ellipseposY) {
ellipseposY =  ellipseposY + 1;
}



// ellipseposY =  ellipseposY + 1;

ellipse(ellipseposX, ellipseposY, 200); 

}

