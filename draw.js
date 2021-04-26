function drawRectangle(rect, cam, ctx, transparency){
    let dz = rect.z-cam.z;
    if(dz >= 1 || transparency != undefined){
        let cv = ctx.canvas;
        ctx.fillRect((rect.x-cam.x)/dz+cv.width/2, (rect.y-cam.y)/dz+cv.height/2, rect.w/dz, rect.h/dz);
        tmp = ctx.fillStyle;
        ctx.fillStyle = "rgba(20, 20, 20, "+dz/15+")";
        ctx.fillRect((rect.x-cam.x)/dz+cv.width/2-1, (rect.y-cam.y)/dz+cv.height/2-1, rect.w/dz+2, rect.h/dz+2);
        ctx.fillStyle = tmp;
    } else if(dz > 0){
        let cv = ctx.canvas;
        ctx.globalAlpha = dz;
        ctx.fillRect((rect.x-cam.x)/dz+cv.width/2, (rect.y-cam.y)/dz+cv.height/2, rect.w/dz, rect.h/dz);
        ctx.globalAlpha = 1;
    }
}

function drawTriangle(centerX, centerY, angle, hmax, hmin, w) {
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, hmax);
    ctx.lineTo(-w / 2, hmin);
    ctx.lineTo(w / 2, hmin);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();

}