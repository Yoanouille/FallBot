function Particle(x, y, z, w, h, xspd, yspd, zspd, grav, life, color){
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.xspd = xspd;
    this.yspd = yspd;
    this.zspd = zspd;
    this.life = life;
    this.startLife = life;
    this.grav = grav;
    this.color = color;
}
Particle.prototype.update = function(dt){
    this.life -= dt;
    this.zspd += this.grav*dt;

    this.x += this.xspd*dt;
    this.y += this.yspd*dt;
    this.z += this.zspd*dt;
}

Particle.prototype.draw = function(cam, ctx, world){
    ctx.fillStyle = "rgba(235, 212, 160,"+Math.max(this.life/this.startLife, 0)+")";
    if(this.color != undefined){
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(this.life/this.startLife, 0);
    }
    drawRectangle(this, cam, ctx);
    ctx.globalAlpha = 1;
}