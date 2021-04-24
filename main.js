const cv = document.getElementById("canvas");
const ctx = cv.getContext("2d");
cv.width = 800;
cv.height = 500;


function drawRectangle(rect, cam, ctx){
    let dz = rect.z-cam.z;
    if(dz > 0){
        let cv = ctx.canvas;
        ctx.fillRect((rect.x-cam.x)/dz+cv.width/2, (rect.y-cam.y)/dz+cv.height/2, rect.w/dz, rect.h/dz);
        tmp = ctx.fillStyle;
        ctx.fillStyle = "rgba(255, 255, 255, "+dz/10+")";
        ctx.fillRect((rect.x-cam.x)/dz+cv.width/2-1, (rect.y-cam.y)/dz+cv.height/2-1, rect.w/dz+2, rect.h/dz+2);
        ctx.fillStyle = tmp;
    }
}

let rect = {x:-50, y:-75, z:10, w:100, h:150};
let cam = {x:0, y:0, z:0}; 


function loop(){
    cam.z += .1;
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = "green";
    drawRectangle(rect, cam, ctx);
}

setInterval(loop, 1000/60);