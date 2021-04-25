function Gem(x, y, z, w, h){
    this.x = x;
    this.y = y;

    this.z = z;
    this.w = w;
    this.h = h;

    
    this.xspd = 0;
    this.yspd = 0;

    this.grav = 4;
    this.zspd = 0;
    this.maxZSpd = 5;

    this.lastPlatform = null;
}

Gem.prototype.update = function(dt, world){
    let lastZ = this.z;

    this.zspd += this.grav * dt;
    if(this.zspd > this.maxZSpd) {
        this.zspd = this.maxZSpd;
    }

    this.x += this.xspd * dt;
    this.y += this.yspd * dt;
    this.z += this.zspd * dt;

    this.collision(world, lastZ);
}

Gem.prototype.collision = function(world, lastZ) {
    for(let i = 0; i < world.platforms.length; i++) {
        let z = world.platforms[i].z;
        if(lastZ <= z && this.z >= z && rectCollision(this, world.platforms[i])) {
            this.z = z-0.0001;
            this.zspd *= -0.5;
            if(this.zspd > -1){
                this.zspd = -1;
            }
            if(this.lastPlatform != world.platforms[i]){
                this.xspd = Math.random()*100-50;
                this.yspd = Math.random()*100-50;
                this.lastPlatform = world.platforms[i];
            }
            return;
        }
    }
}

Gem.prototype.draw = function(cam, ctx, world){
    ctx.fillStyle = "red";
    drawRectangle(this, cam, ctx);
}