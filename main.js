const cv = document.getElementById("canvas");
const ctx = cv.getContext("2d");
cv.width = 800;
cv.height = 500;

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

let rect = {x:0, y:-50, z:10, w:100, h:150};
let cam = {x:0, y:0, z:0}; 
let player = new Player(-25,-25,2,50,50);

function loop(){
    player.update({up:keyList[38], down:keyList[40], left:keyList[37], right:keyList[39]}, 1/60);
    cam.z = player.z - 1;
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = "green";
    drawRectangle(rect, cam, ctx);

    ctx.fillStyle = "blue";
    player.draw(cam, ctx);
}

setInterval(loop, 1000/60);