function Arrow(x0, y0, z0, x, y, z, color){
    this.x0 = x0;
    this.y0 = y0;
    this.z0 = z0;
    this.x = x;
    this.y = y;
    this.z = z;
    this.color = color;
}


Arrow.prototype.draw = function(cam, ctx, world){
    let cv = ctx.canvas;
    ctx.strokeStyle = this.color;
    //ctx.beginPath();
    //ctx.moveTo((this.x0-cam.x)/dz0+cv.width/2, (this.y0-cam.y)/dz0+cv.height/2);
    for(let i = .1; i <= 1; i+=.1){
        let dz = this.z0+(this.z-this.z0)*i-cam.z;
        let dz1 = this.z0+(this.z-this.z0)*(i-.1)-cam.z;
        if(dz > .1 && dz1 > .1){
            ctx.lineWidth = 10*(1-i);
            ctx.beginPath();
            ctx.moveTo((this.x0+(this.x-this.x0)*(i-.1)-cam.x)/dz1+cv.width/2, (this.y0+(this.y-this.y0)*(i-.1)-cam.y)/dz1+cv.height/2)
            ctx.lineTo((this.x0+(this.x-this.x0)*i-cam.x)/dz+cv.width/2, (this.y0+(this.y-this.y0)*i-cam.y)/dz+cv.height/2);
            ctx.stroke();
        }
    }
    
    //ctx.lineTo((world.player.x+world.player.w/2-cam.x)/dz2+cv.width/2, (world.player.y+world.player.h/2-cam.y)/dz2+cv.height/2);
    
}