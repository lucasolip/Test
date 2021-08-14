class Agent {
    constructor(pos, sizeFactor) {
        this.pos = pos;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxvel = 5;
        this.maxforce = 1;
        this.seed = random(100000);
        this.noiseOffset = 0;
        this.sizeFactor = sizeFactor;
    }
  
    noisyMovement() {
      noiseSeed(this.seed);
      let force = p5.Vector.fromAngle(map(noise(this.noiseOffset), 0, 1, 0, 2*PI));
      force.setMag(this.maxforce);
      this.applyForce(force);
      this.noiseOffset += 0.01;
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.edges();
        this.vel.limit(this.maxvel);

        this.acc.mult(0);
    }

    applyForce(force) {
        let f = force.copy();
        this.acc.add(force);
    }

    behaviour(mouse) {
        //this.avoid();
        this.flee(mouse);
    }

    avoid() {
        for (let other of agents) {
            if (other !== this && dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y) < 150) {
                let desired = p5.Vector.sub(this.pos, other.pos);
                let steer = desired.sub(this.vel);
                steer.setMag(this.maxforce);
                this.applyForce(steer);
            }
        }
    }

    flee() {
        let distance = dist(this.pos.x, this.pos.y, mouse.x, mouse.y);
        let fieldOfView = 300;
        if (mouse !== this && distance < fieldOfView) {
            let desired = p5.Vector.sub(this.pos, mouse);
            let steer = desired.sub(this.vel);
            steer.setMag(map(distance, 0, fieldOfView, 10, 0));
            this.applyForce(steer);
        }
    }

    edges() {
        if (this.pos.x < 0) {
            this.pos.x = width;
        } else if (this.pos.x > width) {
            this.pos.x = 0;
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
        } else if (this.pos.y > height) {
            this.pos.y = 0;
        }
    }

    display() {
      push();
      translate(this.pos.x, this.pos.y);
      let angle = this.vel.heading();
      
      rotate(angle + PI);
      image(sprite, 0, 0, 23 * this.sizeFactor, 16 * this.sizeFactor);
      pop();
      //ellipse(this.pos.x, this.pos.y, 5);
    }

}