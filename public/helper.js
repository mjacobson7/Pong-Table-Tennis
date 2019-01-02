calculateMousePos = (event) => {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = event.clientX - rect.left - root.scrollLeft;
    let mouseY = event.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    }
}

colorRect = (x, y, w, h, drawColor) => {
    c.fillStyle = drawColor;
    c.fillRect(x, y, w, h)
}

colorCircle = (x, y, r, color) => {
    c.fillStyle = color;
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2, true);
    c.fill();
}

getSound = (type) => {
    let sound;
    if (type == 'WIN') sound = document.getElementById('win').play();
    if (type == 'LOSE') sound = document.getElementById('lose').play();
    if (type == 'HIT') sound = document.getElementById('paddleHit').play();
    if (type == 'POINT') sound = document.getElementById('point').play();
    if (type == 'WALL') sound = document.getElementById('wallHit').play();


}