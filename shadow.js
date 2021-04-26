function Shadow(x, y, z, w, h) {
    this.x = x;
    this.y = y;
    this.z = z - 0.000001;
    this.h = h;
    this.w = w;
}

Shadow.prototype.draw = function(cam, ctx, world) {
    ctx.fillStyle = "rgba(20, 20, 20, 0.2)";
    drawRectangle({x:this.x, y:this.y, z:this.z, w:this.w, h:this.h}, cam, ctx);
}