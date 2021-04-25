function Player(x, y, z, w, h) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;

    this.state = "fall";

    this.xspd = 0;
    this.yspd = 0;

    this.grav = 4;
    this.zspd = 0;
    this.maxZSpd = 5;

    this.accWalk = 2000;
    this.spdWalk = 100;
    this.acc = 800;
    this.spd = 300;

    this.platformStop;
}

Player.prototype.draw = function(cam, ctx) {
    ctx.fillStyle = "blue";
    drawRectangle(this, cam, ctx);
}

Player.prototype.update = function(keys, dt, world) {
    let xDir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    let yDir = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
    let d = Math.sqrt(xDir*xDir + yDir*yDir);

    if(this.state == "fall"){
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

        lastZ = this.z;

        this.zspd += this.grav * dt;
        if(this.zspd > this.maxZSpd) {
            this.zspd = this.maxZSpd;
        }

        this.x += this.xspd * dt;
        this.y += this.yspd * dt;
        this.z += this.zspd * dt;

        //APPELLE LA FONCTION COLLISION
        this.collision(world, lastZ);
    } else if(this.state == "walk") {

        if(d == 0){
            this.xspd *= Math.pow(.01, dt);
            this.yspd *= Math.pow(.01, dt);
        }

        this.xspd += xDir*this.accWalk*dt/(d>0?d:1);
        this.yspd += yDir*this.accWalk*dt/(d>0?d:1);

        let s = Math.sqrt(this.xspd * this.xspd + this.yspd * this.yspd);
        if(s > this.spdWalk){
            this.xspd *= this.spdWalk/s;
            this.yspd *= this.spdWalk/s;
        }

        this.x += this.xspd * dt;
        this.y += this.yspd * dt;

        this.isOnPlatform();
    }
    
}

Player.prototype.collision = function(world, lastZ) {
    for(let i = 0; i < world.platforms.length; i++) {
        let z = world.platforms[i].z;
        if(lastZ <= z && this.z >= z && rectCollision(this, world.platforms[i])) {
            this.state = "walk";
            this.z = z - 0.001;
            this.zspd = 0;
            this.platformStop = world.platforms[i];
            return;
        }
    }
}

Player.prototype.isOnPlatform = function() {
    if(!rectCollision(this, this.platformStop)) {
        this.state = "fall";
        this.zspd = -0.7;
    }
}

