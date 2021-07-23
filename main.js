function preload(){

}

noseX = 0;
noseY = 0;
leftWristX = 0;
rightWristX = 0;
difference = 0;

function setup(){
    canvas = createCanvas(500,500);
    canvas.position(950,100);
    video = createCapture(VIDEO);
    video.position(100,100);
    video.size(500,500);
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet model is ready.")
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("X of nose = "+noseX+" Y of nose = "+noseY);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        console.log("left wrist x = "+leftWristX+" right wrist x = "+rightWristX);
        difference = floor(leftWristX - rightWristX);
        console.log("difference = "+difference);
    }
}

function draw(){
    background('#800080');
    fill('#9e52c4');
    stroke('#9e52c4');
    square(noseX, noseY, difference);
    document.getElementById("squareSide").innerHTML = "The side of the square is "+difference+"px";
}