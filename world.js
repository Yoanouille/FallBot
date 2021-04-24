function World(){
    this.player = new Player(-25, -25, 1, 50, 50);
    this.platforms = [new Platform(0, -50, 10, 100, 150)];
    this.cam = {x:0, y:0, z:0};
}

World.prototype.update = function(keyList, dt){
    this.player.update({up:keyList[38], down:keyList[40], left:keyList[37], right:keyList[39]}, 1/60);
    this.cam.z = this.player.z - 1;
}

World.prototype.draw = function(ctx){
    ctx.clearRect(0, 0, cv.width, cv.height);
    let drawList = [this.player];
    drawList = drawList.concat(this.platforms);
    drawList.sort(function(a, b){
        return b.z-a.z;
    });

    for(let i = 0; i < drawList.length; i++){
        drawList[i].draw(this.cam, ctx);
    }
}