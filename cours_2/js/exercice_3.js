// DES7720 — EXERCICE 3 — Conditions, animations et sons


// roule 1 fois au début du script     
let ellipseposX = 0;
let ellipseposY = 0; 
let tailleEllipse = 200;


let distanceMouseEllipse;
let vitesse;

//SON!
let osc;
let enveloppe;
let reverb;
let frequency;

function setup() {

createCanvas(640,640); 

ellipseposX = width/2;
ellipseposY = height/2; 

demarrerMain();


// SETUP SYNTH 
enveloppe = new p5.Envelope();
reverb = new p5.Reverb(5);
enveloppe.setADSR(0.05, 1.0, 1.0, 1.0);

osc = new p5.Oscillator('sawtooth');
osc.disconnect();        // Retirer la sortie directe
osc.connect(enveloppe);  // Faire passer le son par l’enveloppe
reverb.wet(0.5);          // Mélange : 50 % d’effet

enveloppe.disconnect();
enveloppe.connect(reverb);
osc.amp(0.3);            // Volume du son
osc.start();

}

// Dessiner en boucle.
function draw() {
background(190,56, 243); 



distanceMouseEllipse = dist(doigtX, doigtY, ellipseposX, ellipseposY);

//console.log(distanceMouseEllipse); 


vitesse = map(distanceMouseEllipse, 0, width, 5, 0.001);  


//ellipseposX = constrain(ellipseposX, 100, width - 100); 
//ellipseposY = constrain(ellipseposY, 100, height - 100);


if (doigtX > ellipseposX) { 
ellipseposX =  ellipseposX - vitesse;
}
else if (doigtX < ellipseposX) {
ellipseposX =  ellipseposX + vitesse;
}

if (doigtY > ellipseposY) {
ellipseposY =  ellipseposY - vitesse;
}
else if (doigtY < ellipseposY) {
ellipseposY =  ellipseposY + vitesse ;
}

if (pince) {
    ellipseposX = lerp(ellipseposX, doigtX, 0.2);
    ellipseposY = lerp(ellipseposY, doigtY, 0.2);

    push();
    fill(0, 0, 255);
    rect(0, 0, width, height);
    pop();


}    

let tailleCible = pince ? 60 : 200;
tailleEllipse = lerp(tailleEllipse, tailleCible, 0.1);

push();
noStroke();
// ellipseposY =  ellipseposY + 1;
ellipse(ellipseposX, ellipseposY, tailleEllipse); 
pop();

dessinerMain();

}


function mousePressed() {

}

function mouseReleased() {

}

function doigtPressed() {
 //console.log("CLICK !"); 
frequency = map(distanceMouseEllipse, 0, width, 820, 60); 
osc.freq(frequency);
enveloppe.play();
 
}

function doigtReleased() {
    osc.freq(280);
    enveloppe.play();
}