// DES7720 — EXERCICE 1 — Introduction à p5.js

// Charger les fichiers avant de commencer.
function preload() {
}

// Préparer le sketch une seule fois.
function setup() {

createCanvas(640, 640);


rectMode(CENTER);


}

// Dessiner en boucle.
function draw() {
background(mouseX,0,45); // Changer la couleur de fond en fonction de la position horizontale de la souris.

rect(mouseX,mouseY, 100, 100) // Dessiner un rectangle centré sur la position de la souris.
}
