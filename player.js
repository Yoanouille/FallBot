function Player(x, y, z, w, h) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;

    this.angle = Math.PI / 4;

    this.state = "fall";

    this.xspd = 0;
    this.yspd = 0;

    this.grav = 4;
    this.zspd = 0;
    this.maxZSpd = 5;

    this.accWalk = 2000;
    this.spdWalk = 250;
    this.acc = 800;
    this.spd = 300;

    this.ACCspd = 600;

    this.platformStop;

    this.feetDist = 0.05;
    this.feetHDist = 0;
    this.footSize = 20;
}

Player.prototype.draw = function(cam, ctx, world) {
    
    let coeff = .01;
    let lux = -this.yspd*coeff;
    let luy = -this.xspd*coeff;
    let ldx = this.yspd*coeff;
    let ldy = this.xspd*coeff;
    let rux = this.yspd*coeff;
    let ruy = this.xspd*coeff;
    let rdx = -this.yspd*coeff;
    let rdy = -this.xspd*coeff;

    let luz = 0;
    let ldz = 0;
    let ruz = 0;
    let rdz = 0;
    if(this.state == "walk"){
        let c = .0005;
        let s = 10;
        let speed = Math.sqrt(this.xspd*this.xspd+this.yspd*this.yspd);
        luz -= Math.abs(Math.sin(world.time*s)*c)*speed;
        ldz -= Math.abs(Math.sin(world.time*s+Math.PI/4)*c)*speed;
        ruz -= Math.abs(Math.sin(world.time*s+2*Math.PI/4)*c)*speed;
        rdz -= Math.abs(Math.sin(world.time*s+3*Math.PI/4)*c)*speed;
    }

    world.platforms.sort(function(a, b){
        return a.z-b.z;
    });
    let shadow = {x:this.x, y:this.y, w:this.w, h:this.h};
    for(let i = 0; i < world.platforms.length; i++){
        if(this.z <= world.platforms[i].z && rectCollision(this, world.platforms[i])){

            ctx.fillStyle = "rgba(20, 20, 20, 0.2)";
            drawRectangle({x:this.x-this.feetHDist-this.footSize/2+lux, y:this.y-this.feetHDist-this.footSize/2+luy, z:world.platforms[i].z, w:this.footSize, h:this.footSize}, cam, ctx);
            drawRectangle({x:this.x-this.feetHDist-this.footSize/2+ldx, y:this.y+this.h+this.feetHDist-this.footSize/2+ldy, z:world.platforms[i].z, w:this.footSize, h:this.footSize}, cam, ctx);
            drawRectangle({x:this.x+this.w+this.feetHDist-this.footSize/2+rux, y:this.y-this.feetHDist-this.footSize/2+ruy, z:world.platforms[i].z, w:this.footSize, h:this.footSize}, cam, ctx);
            drawRectangle({x:this.x+this.w+this.feetHDist-this.footSize/2+rdx, y:this.y+this.h+this.feetHDist-this.footSize/2+rdy, z:world.platforms[i].z, w:this.footSize, h:this.footSize}, cam, ctx);
            drawRectangle({x:shadow.x, y:shadow.y, z:world.platforms[i].z, w:shadow.w, h:shadow.h}, cam, ctx);
            break;
            /*isShadowLeft = false;
            if(shadow.x < world.platforms[i].x){
                shadow.w = world.platforms[i].x-shadow.x;
                isShadowLeft = true;
            }
            if(shadow.y < world.platforms[i].y){
                shadow.h = world.platforms[i].y-shadow.y;
                isShadowLeft = true;
            }
            if(shadow.x+shadow.w > world.platforms[i].x+world.platforms[i].w){
                shadow.w = shadow.x+shadow.w - world.platforms[i].x+world.platforms[i].w;
                shadow.x = world.platforms[i].x+world.platforms[i].w;
                isShadowLeft = true;
            }
            if(shadow.y+shadow.h > world.platforms[i].y+world.platforms[i].h){
                shadow.h = shadow.y+shadow.h - world.platforms[i].y+world.platforms[i].h;
                shadow.y = world.platforms[i].y+world.platforms[i].h;
                isShadowLeft = true;
            }
            
            if(!isShadowLeft) break;*/
        }
    }
    ctx.fillStyle = "rgb(104, 107, 140)";
    //drawRectangle({x:this.x-this.feetHDist-this.footSize/2, y:this.y-this.feetHDist-this.footSize/2, z:this.z+this.feetDist, w:this.footSize, h:this.footSize}, cam, ctx);
    //drawRectangle({x:this.x-this.feetHDist-this.footSize/2, y:this.y+this.h+this.feetHDist-this.footSize/2, z:this.z+this.feetDist, w:this.footSize, h:this.footSize}, cam, ctx);
    //drawRectangle({x:this.x+this.w+this.feetHDist-this.footSize/2, y:this.y-this.feetHDist-this.footSize/2, z:this.z+this.feetDist, w:this.footSize, h:this.footSize}, cam, ctx);
    //drawRectangle({x:this.x+this.w+this.feetHDist-this.footSize/2, y:this.y+this.h+this.feetHDist-this.footSize/2, z:this.z+this.feetDist, w:this.footSize, h:this.footSize}, cam, ctx);
    
    drawRectangle({x:this.x-this.feetHDist-this.footSize/2+lux, y:this.y-this.feetHDist-this.footSize/2+luy, z:this.z+this.feetDist+luz, w:this.footSize, h:this.footSize}, cam, ctx);
    drawRectangle({x:this.x-this.feetHDist-this.footSize/2+ldx, y:this.y+this.h+this.feetHDist-this.footSize/2+ldy, z:this.z+this.feetDist+ldz, w:this.footSize, h:this.footSize}, cam, ctx);
    drawRectangle({x:this.x+this.w+this.feetHDist-this.footSize/2+rux, y:this.y-this.feetHDist-this.footSize/2+ruy, z:this.z+this.feetDist+ruz, w:this.footSize, h:this.footSize}, cam, ctx);
    drawRectangle({x:this.x+this.w+this.feetHDist-this.footSize/2+rdx, y:this.y+this.h+this.feetHDist-this.footSize/2+rdy, z:this.z+this.feetDist+rdz, w:this.footSize, h:this.footSize}, cam, ctx);
    //ctx.fillStyle = "rgb(104, 107, 140)";
    drawRectangle(this, cam, ctx);

    let speed = Math.sqrt(this.xspd*this.xspd+this.yspd*this.yspd);
    //if(speed != 0) {
        this.angle = Math.atan2(this.yspd, this.xspd);
    //}

    let dz = this.z-cam.z;
    ctx.save();
    ctx.translate((this.x + this.w / 2-cam.x)/dz+ctx.canvas.width/2, (this.y + this.h / 2 -cam.y)/dz+ctx.canvas.height/2);
    ctx.rotate(this.angle);
    ctx.fillStyle = "rgb(150, 157, 190)";
    ctx.fillRect(-15 / dz, -15 / dz, 30 / dz, 30 / dz);
    ctx.fillStyle = "rgb(0, 7,0)";
    ctx.fillRect(9 / dz, -6 / dz, 2 / dz, 2 / dz);
    ctx.fillRect(9 / dz, 4 / dz, 2 / dz, 2 / dz);
    ctx.restore();


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
        maxSpeedZ = (keys.accelerate ? this.ACCspd : this.maxZSpd);
        if(this.zspd > maxSpeedZ) {
            this.zspd = maxSpeedZ;
        }

        this.x += this.xspd * dt;
        this.y += this.yspd * dt;
        this.z += this.zspd * dt;

        this.collision(world, lastZ);
    } else if(this.state == "walk") {

        if(d == 0){
            this.xspd *= Math.pow(.0001, dt);
            this.yspd *= Math.pow(.0001, dt);
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
        if(lastZ+this.feetDist <= z && this.z+this.feetDist >= z && rectCollision(this, world.platforms[i])) {
            this.state = "walk";
            this.z = z - this.feetDist-0.0001;
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

