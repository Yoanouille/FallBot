function World(tutorial){
    this.tutorial = true;
    if(tutorial == undefined) this.tutorial = tutorial;
    this.player = new Player(-25, -25, .29, 50, 50);
    this.player.state = "walk";
    this.platforms = [new Platform(-100, -50, .4, 200, 100), new Platform(-80, 30, 15,500, 200), new Platform(-20, -50, 20, 100, 100)];
    this.player.platformStop = this.platforms[0];
    this.gems = [new Gem(-20, -20, 2, 15, 15), new Gem(60, -20, 2, 15, 15)];
    for(let i = 0; i < 10; i++){
        this.gems.push(new Gem(Math.random()*200-100, Math.random()*200-100, 0, 15, 15));
    }
    if(this.tutorial) {
        this.gems = [new Gem(-60, -100, 0, 15, 15), new Gem(60, -30, 0, 15, 15)];
    }
    this.startGemNumber = this.gems.length;
    this.cam = {x:-200, y:0, z:0};
    this.time = 0;
    this.saveTime = 0;
    this.nbPlatformPerPro = 75;
    this.tutorialState = 0;
}

World.prototype.update = function(keyList, dt){
    this.player.update({up:keyList[38], down:keyList[40], left:keyList[37], right:keyList[39], accelerate:keyList[88]}, dt, this);
    //this.cam.z = this.player.z - 1;
    this.cam.z += (this.player.z-1-this.cam.z)*.3;
    this.cam.x += (this.player.x+this.player.w/2-this.cam.x)*.2;
    this.cam.y += (this.player.y+this.player.h/2-this.cam.y)*.2;
    this.time += dt;

    for(let i = 0; i < this.platforms.length; i++){
        if(this.platforms[i].z < this.cam.z ) {
            this.platforms.shift();
            i--;
        } else {
            break;
        }
    }
    if(this.platforms.length <= this.nbPlatformPerPro) {
        this.genProfondeur();
    }

    for(let i = 0; i < this.gems.length; i++){
        this.gems[i].update(dt, this);
    }

    if(this.tutorial) {
        switch(this.tutorialState) {
            case 0: 
                if(this.player.state == "fall") this.tutorialState++;
                break;
            case 1:
                if(keyList[88]) this.tutorialState++;
                break;
            case 2:
                if(this.gems.length == 0) this.tutorialState++;
                break;
        }
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

World.prototype.draw = function(ctx, transparency){
    ctx.fillStyle = "rgb(20, 20, 20)";
    ctx.fillRect(0, 0, cv.width, cv.height);
    let drawList = [];

    for(let i = 0; i < this.gems.length; i++){
        let dx = this.gems[i].x - this.player.x;
        let dy = this.gems[i].y - this.player.y;
        let dz = (this.gems[i].z - this.player.z)*50;
        let d = Math.sqrt(dx*dx + dy*dy + dz*dz);
        drawList.push(new Arrow(this.player.x+this.player.w/2+70*dx/d, this.player.y+this.player.h/2+70*dy/d, this.player.z+1.*dz/d, this.player.x+this.player.w/2+120*dx/d, this.player.y+this.player.h/2+120*dy/d, this.player.z+1.2*dz/d, this.gems[i].color));
    }
    drawList.push(this.player);
    drawList = drawList.concat(this.gems);
    //console.log(drawList);
    for(let i = 0; i < this.gems.length; i++) {
        let shadow = this.gems[i].calculeShadow(this, this.cam)
        //console.log(shadow);

        if(shadow != undefined) drawList.push(shadow);
    }
    drawList = drawList.concat(this.platforms);
    drawList.sort(function(a, b){
        return b.z-a.z;
    });

    for(let i = 0; i < drawList.length; i++){
        drawList[i].draw(this.cam, ctx, this, transparency);
    }

    if(this.tutorial) {
        ctx.font = "30px Verdana";
        switch(this.tutorialState) {
            case 0:
                ctx.fillStyle = "white";
                ctx.save();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("You need to retrieve your gems !", cv.width / 2, cv.height / 8);
                ctx.fillText("Use the arrows keys to move.", cv.width / 2, cv.height * 1.5/ 8);
                ctx.restore();
                break;

            case 1:
                ctx.fillStyle = "white";
                ctx.save();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("Follow the red arrows to retrieve your gems", cv.width / 2, cv.height / 8);
                ctx.fillText("Press x to fall faster", cv.width / 2, cv.height * 1.5/ 8);
                ctx.restore();
                break;
            case 3:
                ctx.fillStyle = "white";
                ctx.save();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("You are now ready to play the game!", cv.width / 2, cv.height / 8);
                ctx.fillText("Press Enter to start and catch the 12 gems as fast as possible!", cv.width / 2, cv.height * 1.5/ 8);
                //ctx.fillText("Press Enter to start", cv.width / 2, cv.height * 2 / 8);
                ctx.restore();
                break;
        }
    }
    if(!this.tutorial || this.tutorialState >= 1){
        ctx.font = "20px Verdana";
        ctx.fillStyle = "white";
        ctx.save();
        //ctx.textAlign = "left";
        //ctx.textBaseline = "middle";
        ctx.fillText("Gems: "+(this.startGemNumber-this.gems.length)+"/"+this.startGemNumber, cv.width / 20, cv.width/20);
        ctx.restore();
    }


    /*let dz = this.player.z-this.cam.z;
    for(let i = 0; i < this.gems.length; i++){
        let dx = this.gems[i].x - this.player.x;
        let dy = this.gems[i].y - this.player.y;

        let angle = Math.atan2(dy, dx);
        ctx.strokeStyle = this.gems[i].color;
        drawTriangle((this.player.x + this.player.w / 2 - this.cam.x )/dz +ctx.canvas.width/2, (this.player.y + this.player.h / 2 -this.cam.y)/dz+ctx.canvas.height/2,angle - Math.PI / 2, 75, 55, 10);
    }*/
}