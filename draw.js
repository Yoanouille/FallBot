function drawRectangle(rect, cam, ctx){
    let dz = rect.z-cam.z;
    if(dz > 0.5){
        let cv = ctx.canvas;
        ctx.fillRect((rect.x-cam.x)/dz+cv.width/2, (rect.y-cam.y)/dz+cv.height/2, rect.w/dz, rect.h/dz);
        tmp = ctx.fillStyle;
        ctx.fillStyle = "rgba(20, 20, 20, "+dz/15+")";
        ctx.fillRect((rect.x-cam.x)/dz+cv.width/2-1, (rect.y-cam.y)/dz+cv.height/2-1, rect.w/dz+2, rect.h/dz+2);
        ctx.fillStyle = tmp;
    }
}
