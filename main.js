song=""
objects=[]
status=""
function setup() {
    canvas=createCanvas(380,380)
canvas.center()
v=createCapture(VIDEO)
v.size(380,380)
v.hide()
objectdetect=ml5.objectDetector("cocossd",modelloaded)
}
function preload() {
    img=loadImage("animals.jpg")
    song=loadSound("music.mp3")
}
function draw() {
 image(v,0,0,380,380)
 if (status!="") {
    objectdetect.detect(v,gotresult)
    r=random(255)
    g=random(255)
    b=random(255)
    for (let index = 0; index < objects.length; index++) {
        document.getElementById('status').innerHTML="object detected"  
       fill(r,g,b)
       p=floor(objects[index].confidence*100)
       text(objects[index].label+" "+p+"%",objects[index].x,objects[index].y)
       noFill()
       stroke(r,g,b)
       rect(objects[index].x,objects[index].y,objects[index].width,objects[index].height)
       if(objects[index].label=="person"){
        document.getElementById('status').innerHTML="baby detected"  
        song.stop()
       }
       else{
        document.getElementById('status').innerHTML="baby not detected"
        song.play()
       }
    }
    if (objects.length==0) {
        document.getElementById('status').innerHTML="baby not detected"
        song.play()
    }
 }
}
function modelloaded(){
    console.log("model loaded")
    status="true"
    objectdetect.detect(v,gotresult)
}
function gotresult(error,results) {
    if (error==true) {
        console.error(error)
    }
    else{
        console.log(results)
        objects=results
    }
}