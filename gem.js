function Gem(x, y, z, w, h){
    this.x = x;
    this.y = y;

    this.z = z;
    this.w = w;
    this.h = h;

    this.color = "red";

    this.xspd = 0;
    this.yspd = 0;

    this.grav = 4;
    this.zspd = 0;
    this.maxZSpd = 5;

    this.lastPlatform = null;
    this.isAttracted = false;
}

Gem.prototype.update = function(dt, world){
    if(!this.isAttracted){
        let lastZ = this.z;

        this.zspd += this.grav * dt;
        if(this.zspd > this.maxZSpd) {
            this.zspd = this.maxZSpd;
        }
    
        this.x += this.xspd * dt;
        this.y += this.yspd * dt;
        this.z += this.zspd * dt;
    
        this.collision(world, lastZ);
    
        if(this.lastPlatform != null && !rectCollision(this, this.lastPlatform)){
            this.xspd *= Math.pow(.01, dt);
            this.yspd *= Math.pow(.01, dt);
        }
        if(this.z > world.player.z+20) this.z = world.player.z+20;
    }
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
                this.xspd = Math.random()*1000-500;
                this.yspd = Math.random()*1000-500;
                this.lastPlatform = world.platforms[i];
            }
            return;
        }
    }
}

Gem.prototype.draw = function(cam, ctx, world){
    world.platforms.sort(function(a, b){
        return a.z-b.z;
    });
    for(let i = 0; i < world.platforms.length; i++){
        if(this.z <= world.platforms[i].z && rectCollision(this, world.platforms[i])){
            ctx.fillStyle = "rgba(20, 20, 20, 0.2)";
            let d = this.z-cam.z;
            if(d < .2) d = .2;
            if(d > 0) drawRectangle({x:this.x+this.w/2-(this.w/d)/2, y:this.y+this.h/2-(this.h/d)/2, z:world.platforms[i].z, w:this.w/d, h:this.h/d}, cam, ctx);
            break;
        }
    }
    ctx.fillStyle = "red";
    drawRectangle(this, cam, ctx);
}