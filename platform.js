function Platform(x, y, z, w, h){
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
}

Platform.prototype.draw = function(cam, ctx) {
    ctx.fillStyle = "green";
    drawRectangle(this, cam, ctx);
}