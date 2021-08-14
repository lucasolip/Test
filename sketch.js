let agents, gravity, mouse, sprite;

function preload() {
  sprite = loadImage("peh.png");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  let mobile = window.mobileCheck();
  let population = mobile? 25 : 100;
  let sizeFactor = mobile? 3 : 1;
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  stroke(0);
  noFill();
  imageMode(CENTER);
  mouse = createVector(mouseX, mouseY);
  gravity = createVector(0, -9.81);
  agents = [];
  for (let i = 0; i < population; i++) {
    agents.push(new Agent(createVector(random(width), random(height)), sizeFactor));
  }
}

function draw() {
  background(235);

  mouse.x = mouseX;
  mouse.y = mouseY;
  for (let agent of agents) {
    agent.update();
    agent.behaviour(mouse);
    agent.noisyMovement();
    agent.display();
  }
}

