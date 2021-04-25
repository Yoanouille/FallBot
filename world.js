function World(){
    this.player = new Player(-25, -25, 1, 50, 50);
    this.platforms = [new Platform(0, -50, 10, 300, 400), new Platform(-80, 30, 15,500, 200), new Platform(-20, -50, 20, 100, 100)];
    this.cam = {x:0, y:0, z:0};
    this.time = 0;
}

World.prototype.update = function(keyList, dt){
    this.player.update({up:keyList[38], down:keyList[40], left:keyList[37], right:keyList[39]}, dt, this);
    //this.cam.z = this.player.z - 1;
    this.cam.z += (this.player.z-1-this.cam.z)*.3;
    this.cam.x += (this.player.x+this.player.w/2-this.cam.x)*.2;
    this.cam.y += (this.player.y+this.player.h/2-this.cam.y)*.2;
    this.time += dt;
}

World.prototype.draw = function(ctx){
    ctx.fillStyle = "rgb(20, 20, 20)";
    ctx.fillRect(0, 0, cv.width, cv.height);
    let drawList = [this.player];
    drawList = drawList.concat(this.platforms);
    drawList.sort(function(a, b){
        return b.z-a.z;
    });

    for(let i = 0; i < drawList.length; i++){
        drawList[i].draw(this.cam, ctx, this);
    }
}