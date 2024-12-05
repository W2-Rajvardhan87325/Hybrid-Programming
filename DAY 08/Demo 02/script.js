var angle = 0;

function Rotate() {
    setInterval(Rotation, 100);
}


function Rotation() {
    RotationEarth("earthImageId");
    RotateRocket();
}

function RotationEarth(divId) {
    var earthDivImage = document.getElementById(divId);
    angle = angle + 10;
    earthDivImage.style.transform = 'rotate(' + (angle % 360) + 'deg)';
}

function RotateRocket() {
    var rocketImage = document.getElementById("rocketImageId");
    angle = angle + 10;
    rocketImage.style.transform = 'rotate(' + (angle % 360) + 'deg)';
}

