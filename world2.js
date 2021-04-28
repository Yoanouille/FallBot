function World2(tutorial){
    this.tutorial = true;
    if(tutorial == undefined) this.tutorial = tutorial;
    this.player = new Player(-25, -25, .29, 50, 50, false);
    this.player.state = "walk";
    this.platforms = [new Platform(-100, -50, .4, 200, 100), new Platform(-80, 30, 15,500, 200)];

    
    this.player.platformStop = this.platforms[0];


    this.particles = [];
    this.cam = {x:-200, y:0, z:0};
    this.time = 0;
    this.endtime = -1;
    this.saveTime = 0;
    this.nbPlatformPerPro = 400;
    this.gameState = 0;
    this.tutorialState = 0;

    this.genProfondeur();
    let p = this.player;
    let w =  Math.random() * 1000 + 300;
    let h =  Math.random() * 1000 + 300;
    let pro = this.player.z;
    this.target = new Platform(p.x + Math.random() * 5000 - 2500 - w / 2, p.y + Math.random() * 5000 - 2500 - h / 2, pro + 25,w, h, true);
    
    this.platforms.push(this.target);
    this.timeLeft = 10;
    this.difficulty = 25;
}

World2.prototype.update = function(keyList, dt){
    this.timeLeft -= dt;
    this.player.update({up:keyList[38], down:keyList[40], left:keyList[37], right:keyList[39], accelerate:keyList[88]}, dt, this);
    //this.cam.z = this.player.z - 1;
    this.cam.z += (this.player.z-1-this.cam.z)*.3;
    this.cam.x += (this.player.x+this.player.w/2-this.cam.x)*.2;
    this.cam.y += (this.player.y+this.player.h/2-this.cam.y)*.2;
    this.time += dt;

    for(let i = 0; i < this.platforms.length; i++){
        if(this.platforms[i].z < this.cam.z ) {
            
            if(this.platforms[i] == this.target){
                let p = this.player;
                let w =  Math.random() * 1000 + 300;
                let h =  Math.random() * 1000 + 300;
                let pro = this.player.z;
                this.target = new Platform(p.x + Math.random() * 5000 - 2500 - w / 2, p.y + Math.random() * 5000 - 2500 - h / 2, pro + this.difficulty,w, h, true);            
                this.platforms.push(this.target);
            }
            this.platforms.shift();
            i--;
        } else {
            break;
        }
    }

    for(let i = 0; i < this.particles.length; i++){
        if(this.particles[i].z < this.cam.z || this.particles[i].life <= 0) {
            this.particles.shift();
            i--;
        } else {
            break;
        }
    }

    if(this.platforms.length <= this.nbPlatformPerPro) {
        this.genProfondeur();
    }

    for(let i = 0; i < this.particles.length; i++){
        this.particles[i].update(dt);
    }

}

World2.prototype.genProfondeur = function() {
    let pro = this.platforms[this.platforms.length - 1].z;

    for(let i = 0; i < this.nbPlatformPerPro; i++) {
        let p = this.player;
        let w =  Math.random() * 1000 + 300;
        let h =  Math.random() * 1000 + 300;
        this.platforms.push(new Platform(p.x + Math.random() * 20000 - 10000 - w / 2, p.y + Math.random() * 20000 - 10000 - h / 2, pro + Math.random() * 15 + 3,w, h));
    }
}

World2.prototype.draw = function(ctx, transparency){
    ctx.fillStyle = "rgb(20, 20, 20)";
    ctx.fillRect(0, 0, cv.width, cv.height);
    let drawList = [];

    drawList.push(this.player);
    let dx = this.target.x+this.target.w/2 - this.player.x;
    let dy = this.target.y+this.target.h/2 - this.player.y;
    let dz = (this.target.z - this.player.z)*50;
    let d = Math.sqrt(dx*dx + dy*dy + dz*dz);
    drawList.push(new Arrow(this.player.x+this.player.w/2+70*dx/d, this.player.y+this.player.h/2+70*dy/d, this.player.z+1.*dz/d, this.player.x+this.player.w/2+120*dx/d, this.player.y+this.player.h/2+120*dy/d, this.player.z+1.2*dz/d, "rgb(20, 185, 255)"));
    //console.log(drawList);

    drawList = drawList.concat(this.platforms);
    drawList = drawList.concat(this.particles);
    drawList.sort(function(a, b){
        return b.z-a.z;
    });

    for(let i = 0; i < drawList.length; i++){
        drawList[i].draw(this.cam, ctx, this, transparency);
    }

    ctx.fillStyle = "white";
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let t = this.timeLeft;
    let txt = ""+Math.floor(t*100)/100;
    if(t < 10) txt = "0"+txt;
    while(txt.length < 5) txt += "0";
    ctx.fillText("Time left: "+txt, cv.width / 2, cv.height / 8);
    ctx.fillText("Depth: "+Math.floor((this.player.z-0.29)), cv.width / 2, cv.height * 1.5/ 8);
    //ctx.fillText("Press Enter to start", cv.width / 2, cv.height * 2 / 8);
    ctx.restore();

    /*let dz = this.player.z-this.cam.z;
    for(let i = 0; i < this.gems.length; i++){
        let dx = this.gems[i].x - this.player.x;
        let dy = this.gems[i].y - this.player.y;

        let angle = Math.atan2(dy, dx);
        ctx.strokeStyle = this.gems[i].color;
        drawTriangle((this.player.x + this.player.w / 2 - this.cam.x )/dz +ctx.canvas.width/2, (this.player.y + this.player.h / 2 -this.cam.y)/dz+ctx.canvas.height/2,angle - Math.PI / 2, 75, 55, 10);
    }*/
}