status = "";
objects = "";

function setup(){
canvas = createCanvas(480,380);
canvas.center();
video = createCapture(VIDEO);
video.hide();
}
function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
   objectName =  document.getElementById("ObjectName").value;

}
function modelLoaded(){
    console.log("modelLoad");
    status = true ;
   
}
function gotResult(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
    
    }
    function draw(){
        image(video,0,0,480,380);
        if (status !=""){
            objectDetector.detect(video,gotResult);
            for (i = 0;i < objects.length;i++){
                document.getElementById("status").innerHTML = "Status : Objects Detected";
               
                fill("red");
                percent = floor(objects[i].confidence*100);
                text(objects[i].label+" "+percent+" % ",objects[i].x+15,objects[i].y+15);
                noFill();
                stroke("red");
                rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
                if (objects[i].label == objectName){
                    objectDetector.detect(video,gotResult);
                    document.getElementById("numberofobjects").innerHTML = objectName+" found";
                }
                else{
                    document.getElementById("numberofobjects").innerHTML = objectName+" not found";
                }
            }
        }
    
    }
    
    
    


