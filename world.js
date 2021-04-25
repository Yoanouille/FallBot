function World(){
    this.player = new Player(-25, -25, 1, 50, 50);
    this.platforms = [new Platform(0, -50, 10, 300, 400), new Platform(-80, 30, 15,500, 200), new Platform(-20, -50, 20, 100, 100)];
    this.gems = [new Gem(-20, -20, 2, 10, 10)];
    this.cam = {x:0, y:0, z:0};
    this.time = 0;
    this.nbPlatformPerPro = 75;
}

World.prototype.update = function(keyList, dt){
    this.player.update({up:keyList[38], down:keyList[40], left:keyList[37], right:keyList[39], accelerate:keyList[88]}, dt, this);
    //this.cam.z = this.player.z - 1;
    this.cam.z += (this.player.z-1-this.cam.z)*.3;
    this.cam.x += (this.player.x+this.player.w/2-this.cam.x)*.2;
    this.cam.y += (this.player.y+this.player.h/2-this.cam.y)*.2;
    this.time += dt;

    if(this.platforms[0].z < this.cam.z ) {
        this.platforms.shift();
        if(this.platforms.length <= this.nbPlatformPerPro) {
            this.genProfondeur();
        }
    }

    for(let i = 0; i < this.gems.length; i++){
        this.gems[i].update(dt, this);
    }
}

World.prototype.genProfondeur = function() {
    let pro = this.platforms[this.platforms.length - 1].z;

    for(let i = 0; i < this.nbPlatformPerPro; i++) {
        let p = this.player;
        let w =  Math.random() * 1000 + 300;
        let h =  Math.random() * 1000 + 300;
        this.platforms.push(new Platform(p.x + Math.random() * 8000 - 4000 - w / 2, p.y + Math.random() * 8000 - 4000 - h / 2, pro + Math.random() * 15 + 3,w, h));
    }
}

World.prototype.draw = function(ctx){
    ctx.fillStyle = "rgb(20, 20, 20)";
    ctx.fillRect(0, 0, cv.width, cv.height);
    let drawList = this.platforms.concat(this.gems);
    drawList.push(this.player);
    drawList.sort(function(a, b){
        return b.z-a.z;
    });

    for(let i = 0; i < drawList.length; i++){
        drawList[i].draw(this.cam, ctx, this);
    }

    let dz = this.player.z-this.cam.z;
    
    let dx = this.gems[0].x - this.player.x;
    let dy = this.gems[0].y - this.player.y;

    let angle = Math.atan2(dy, dx);
    drawTriangle((this.player.x + this.player.w / 2 - this.cam.x )/dz +ctx.canvas.width/2, (this.player.y + this.player.h / 2 -this.cam.y)/dz+ctx.canvas.height/2,angle - Math.PI / 2, 150, 100,50);
}