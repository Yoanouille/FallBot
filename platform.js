function Platform(x, y, z, w, h, target){
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.target = target;
    if(this.target == undefined) this.target = false;
}

Platform.prototype.draw = function(cam, ctx, world, transparency) {
    ctx.fillStyle = this.target ? "rgb(20, 185, 255)" : "rgb(138, 120, 81)";
    drawRectangle(this, cam, ctx, transparency);
}