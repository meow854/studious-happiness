Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera= document.getElementById("camera");
Webcam.attach('#camera');

function takepic() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML= "<img src='" + data_uri + "' id='takenimg'>";
    });
}

console.log("ml5 version", ml5.version);
classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/jfzNXfPo8/model.json", modelLoaded);

function modelLoaded() {
    console.log("model loaded");
}

function check() {
    ima= document.getElementById("takenimg");
    classifier.classify(ima, gotresults);
}

function gotresults(error, results) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById("meaning").innerHTML= results[0].label;
        speak();
        if(results[0].label == "Good") {
            document.getElementById("meaningemoji").innerHTML= "&#128077";
        }
        else if(results[0].label == "Bad") {
            document.getElementById("meaningemoji").innerHTML= "&#128078";
        }
        else if(results[0].label == "Superb") {
            document.getElementById("meaningemoji").innerHTML= "&#128076";
        }
        else if(results[0].label == "Peace") {
            document.getElementById("meaningemoji").innerHTML= "&#9996";
        }
        else if(results[0].label == "Hello") {
            document.getElementById("meaningemoji").innerHTML= "&#9995";
        }
    }  
}