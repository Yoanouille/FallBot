function Player(x, y, z, w, h) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;

    this.xspd = 0;
    this.yspd = 0;

    this.acc = 800;
    this.spd = 300;
}

Player.prototype.draw = function(cam, ctx) {
    ctx.fillStyle = "blue";
    drawRectangle(this, cam, ctx);
}

Player.prototype.update = function(keys, dt) {
    let xDir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    let yDir = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);

    let d = Math.sqrt(xDir*xDir + yDir*yDir);

    if(d == 0){
        this.xspd *= Math.pow(.1, dt);
        this.yspd *= Math.pow(.1, dt);
    }

    this.xspd += xDir*this.acc*dt/(d>0?d:1);
    this.yspd += yDir*this.acc*dt/(d>0?d:1);

    let s = Math.sqrt(this.xspd * this.xspd + this.yspd * this.yspd);
    if(s > this.spd){
        this.xspd *= this.spd/s;
        this.yspd *= this.spd/s;
    }

    this.x += this.xspd * dt;
    this.y += this.yspd * dt;
    this.z += .1;
}

