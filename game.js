function Game(){
    this.interval;
    this.screen = "game";
    this.world = new World();
    this.lastR = false;
}

Game.prototype.start = function(keyList, ctx){
    let g = this;
    this.interval = setInterval(function(){g.update(1/60, keyList, ctx)}, 1000/60);
}

Game.prototype.end = function(){
    clearInterval(this.interval);
}


Game.prototype.update = function(dt, keyList, ctx){
    switch(this.screen){
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