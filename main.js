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


let game = new Game();
game.start(keyList, ctx);