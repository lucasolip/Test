let agents;
let gravity;
let mouse;
let sprite;

function preload() {
  sprite = loadImage("peh.png");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  stroke(0);
  noFill();
  imageMode(CENTER);
  mouse = createVector(mouseX, mouseY);
  gravity = createVector(0, -9.81);
  agents = [];
  for (let i = 0; i < 100; i++) {
    agents.push(new Agent(createVector(random(width), random(height))));
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

