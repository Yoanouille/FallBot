function Game(mouse){
    this.interval;
    this.screen = "menu";
    this.world = new World();
    this.lastR = false;
    this.time = 0;
    this.p = new Player(-25, -25, .299, 50, 50);
    this.mouse = mouse;
}

Game.prototype.start = function(keyList, ctx){
    let g = this;
    this.interval = setInterval(function(){g.update(1/30, keyList, ctx)}, 1000/30);
}

Game.prototype.end = function(){
    clearInterval(this.interval);
}


Game.prototype.update = function(dt, keyList, ctx){
    this.time += dt;
    switch(this.screen){
        case "menu":
            this.drawMenu(ctx);
            break;
        case "game":
            if(keyList[82] && !this.lastR){
                this.world = new World();
            }
            this.lastR = keyList[82];
            this.world.draw(ctx);
            this.world.update(keyList, dt);
            break;

        default:
            this.end();
            break;
    }
}

Game.prototype.drawMenu = function(ctx){
    let cv = ctx.canvas;
    ctx.fillStyle = "rgb(20, 20, 20)";
    ctx.fillRect(0, 0, cv.width, cv.height);

    
    //p.draw({x:0, y:0, z:0}, ctx, new World(), true);
    let w = new World();
    w.gems = [];
    w.platforms = [new Platform(-100, -50, .3, 200, 100)]
    w.player = this.p;
    ctx.save()
    ctx.translate(200, 0);
    //this.p.update({up:this.p.yspd > -10 && Math.sin(this.time*5) > 0, down: this.p.yspd > 10 && Math.sin(this.time*5) < 0, left: this.p.xspd > -50 && Math.sin(this.time*5) > 0, right: this.p.xspd < 50 && Math.sin(this.time*5) < 0, accelerate: false}, 1/30, w);
    //console.log(Math.sin(this.time*10));
    //this.p.z = .299;
    //console.log(this.p);
    //w.draw(ctx, false);
    w.platforms[0].draw(w.cam, ctx, w, false);
    let angle = Math.atan2(mouse.y-cv.height/2, mouse.x-cv.width/2-200);
    w.player.drawMenu(w.cam, ctx, w, false, angle);
    ctx.restore();

    ctx.fillStyle = "white";
    ctx.font = "80px Verdana";
    ctx.fillText("FALLBOT", cv.width/8, cv.height*0.8/4);

    let dPlayX = mouse.x - cv.width/8;
    let dPlayY = mouse.y - cv.height*1.5/4-cv.height*1.5/12;

    let dTutorialX = mouse.x - cv.width/8;
    let dTutorialY = mouse.y - cv.height*1.5/4;
    ctx.font = "30px Verdana";
    if(dTutorialX > 0 && dTutorialX < 100 && dTutorialY > -20 && dTutorialY < 20){
        ctx.font = "40px Verdana";
    }
    ctx.fillText("Tutorial", cv.width/8, cv.height*1.5/4);
    ctx.font = "30px Verdana";
    if(dPlayX > 0 && dPlayX < 100 && dPlayY > -20 && dPlayY < 20){
        ctx.font = "40px Verdana";
    }
    ctx.fillText("Play", cv.width/8, cv.height*1.5/4+cv.height*1.5/12);
    
    //ctx.fillText("Settings", cv.width/8, cv.height*1.5/4+cv.height*2/12);
}