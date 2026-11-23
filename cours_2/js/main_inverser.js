let cameraMain;
let modeleMain;
let mains = [];
let connexions = [];

// true  : main gauche utilisée -> main droite affichée (et inversement)
// false : miroir classique (ta main gauche reste à gauche)
const INVERSER_COTES = true;

// Un état par main, rangé par côté : "Left" / "Right"
// etats[cote] = { doigtX, doigtY, pince, visible }
let etats = {};

function demarrerMain() {
  cameraMain = createCapture(VIDEO, function() {
    modeleMain = ml5.handPose({
      maxHands: 2,
      minDetectionConfidence: 0.8,
      minTrackingConfidence: 0.8
    }, function() {
      connexions = modeleMain.getConnections();

      modeleMain.detectStart(cameraMain, function(resultats) {
        mains = resultats;
      });
    });
  });

  cameraMain.size(640, 480);
  cameraMain.hide();
}

function dessinerMain() {
  // Tout le monde est "invisible" tant qu'on ne l'a pas retrouvé ce tour-ci.
  for (let cote in etats) {
    etats[cote].visible = false;
  }

  for (let main of mains) {
    let cote = main.handedness; // "Left" ou "Right"

    if (!etats[cote]) {
      etats[cote] = { doigtX: width / 2, doigtY: height / 2, pince: false, visible: false };
    }
    let etat = etats[cote];
    etat.visible = true;

    // Adapter les points au canevas (avec ou sans inversion).
    let points = main.keypoints.map(function(point) {
      let x = point.x * width / cameraMain.width;
      return {
        x: INVERSER_COTES ? x : width - x,
        y: point.y * height / cameraMain.height
      };
    });

    etat.doigtX = points[8].x;
    etat.doigtY = points[8].y;

    // Distance pouce / index, avec deux seuils pour éviter le clignotement.
    let distanceDoigts = dist(points[4].x, points[4].y, points[8].x, points[8].y);

    if (distanceDoigts < 30 && !etat.pince) {
      etat.pince = true;
      doigtPressed(cote);
    }
    else if (distanceDoigts > 45 && etat.pince) {
      etat.pince = false;
      doigtReleased(cote);
    }

    // --- Rendu de la main ---
    push();
    stroke(0, 255, 0);
    strokeWeight(2);
    for (let connexion of connexions) {
      let a = points[connexion[0]];
      let b = points[connexion[1]];
      line(a.x, a.y, b.x, b.y);
    }

    noStroke();
    fill(255);
    for (let point of points) {
      circle(point.x, point.y, 8);
    }

    fill(etat.pince ? color(255, 255, 0) : color(255, 0, 0));
    circle(etat.doigtX, etat.doigtY, 16);
    pop();
  }

  // Si une main disparaît en pleine pince, on relâche proprement.
  for (let cote in etats) {
    if (!etats[cote].visible && etats[cote].pince) {
      etats[cote].pince = false;
      doigtReleased(cote);
    }
  }
}