const cv = document.getElementById("canvas");
const ctx = cv.getContext("2d");

cv.width = window.innerWidth;
cv.height = window.innerHeight;

keyList = [];
window.addEventListener('keydown',function(event){
    keyList[event.keyCode] = true;
    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }
});
window.addEventListener('keyup',function(event){
    keyList[event.keyCode] = false;
});

let mouse = {x: 0, y: 0, down: false, lastDown: false};
onmousemove = function(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
};
onmousedown = function(e){mouse.down = true;};
onmouseup = function(e){mouse.down = false;};

let game = new Game(mouse);
game.start(keyList, ctx);