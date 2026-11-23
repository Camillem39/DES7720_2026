let ellipses = {}; // { Left: {x, y, taille}, Right: {...} }

//SON!
let osc;
let enveloppe;
let reverb;

function setup() {
  createCanvas(640, 640);
  demarrerMain();

  // SETUP SYNTH (inchangé)
  enveloppe = new p5.Envelope();
  reverb = new p5.Reverb(5);
  enveloppe.setADSR(0.05, 1.0, 1.0, 1.0);

  osc = new p5.Oscillator('sawtooth');
  osc.disconnect();
  osc.connect(enveloppe);
  reverb.wet(0.5);

  enveloppe.disconnect();
  enveloppe.connect(reverb);
  osc.amp(0.3);
  osc.start();
}

function draw() {
  background(190, 56, 243);

  // Fond bleu dès qu'au moins une main pince.
  let unePince = Object.values(etats).some(function(m) { return m.pince; });
  if (unePince) {
    push();
    fill(0, 0, 255);
    rect(0, 0, width, height);
    pop();
  }

  for (let cote in etats) {
    let m = etats[cote];
    if (!m.visible) continue;

    if (!ellipses[cote]) {
      ellipses[cote] = { x: width / 2, y: height / 2, taille: 200 };
    }
    let e = ellipses[cote];

    // Ton comportement de fuite, maintenant par main.
    let distance = dist(m.doigtX, m.doigtY, e.x, e.y);
    let vitesse = map(distance, 0, width, 5, 0.001);

    if (m.doigtX > e.x) e.x -= vitesse;
    else if (m.doigtX < e.x) e.x += vitesse;

    if (m.doigtY > e.y) e.y -= vitesse;
    else if (m.doigtY < e.y) e.y += vitesse;

    // Pince : l'ellipse vient vers le doigt.
    if (m.pince) {
      e.x = lerp(e.x, m.doigtX, 0.2);
      e.y = lerp(e.y, m.doigtY, 0.2);
    }

    // Taille : petite quand on pince, grande quand on lâche.
    e.taille = lerp(e.taille, m.pince ? 60 : 200, 0.1);

    push();
    noStroke();
    fill(cote === "Left" ? color(255, 220, 0) : color(0, 200, 255));
    ellipse(e.x, e.y, e.taille);
    pop();
  }

  dessinerMain();
}

function doigtPressed(cote) {
  let e = ellipses[cote];
  let m = etats[cote];
  let distance = e ? dist(m.doigtX, m.doigtY, e.x, e.y) : 0;
  osc.freq(map(distance, 0, width, 820, 60));
  enveloppe.play();
}

function doigtReleased(cote) {
  osc.freq(280);
  enveloppe.play();
}