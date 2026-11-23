// DES7720 — EXERCICE 3 — Conditions, animations et sons


// roule 1 fois au début du script     
let ellipseposX = 0;
let ellipseposY = 0; 

let distanceMouseEllipse;
let vitesse;


function setup() {

createCanvas(640,640); 

ellipseposX = width/2;
ellipseposY = height/2; 

}

// Dessiner en boucle.
function draw() {
background(255,64,19); 


distanceMouseEllipse = dist(mouseX, mouseY, ellipseposX, ellipseposY);

//console.log(distanceMouseEllipse); 


vitesse = map(distanceMouseEllipse, 0, width, 5, 0.001);  


//ellipseposX = constrain(ellipseposX, 100, width - 100); 
//ellipseposY = constrain(ellipseposY, 100, height - 100);


if (mouseX > ellipseposX) { 
ellipseposX =  ellipseposX - vitesse;
}
else if (mouseX < ellipseposX) {
ellipseposX =  ellipseposX + vitesse;
}

if (mouseY > ellipseposY) {
ellipseposY =  ellipseposY - vitesse;
}
else if (mouseY < ellipseposY) {
ellipseposY =  ellipseposY + vitesse ;
}

if (mouseIsPressed) {
    ellipseposX = lerp(ellipseposX, mouseX, 0.2);
    ellipseposY = lerp(ellipseposY, mouseY, 0.2);

    push();
    fill(255, 0, 0);
    rect(0, 0, width, height);
    pop();
}    

noStroke();
// ellipseposY =  ellipseposY + 1;
ellipse(ellipseposX, ellipseposY, 200); 
}

function mousePressed() {
 console.log("CLICK !"); 

}


