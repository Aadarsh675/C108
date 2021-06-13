Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
Webcam.attach("camera")
function snap() {
    Webcam.snap(
        function (img) {
            document.getElementById("snapshot").innerHTML = `<img id="captured_image" src=${img}>`;
        }
    )
}
console.log("ml5.version: " + ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/eVUQFO0py/model.json", modelLoader);
function modelLoader() {
    console.log("Model loaded successfully.");
}
function speak(){
    speechAPI = window.speechSynthesis;
    textData = "The first prediction is " + prediction1 + ", and the second prediction is " + prediction2 + ".";
    utterThis = new SpeechSynthesisUtterance(textData);
    speechAPI.speak(utterThis);
}

function predict() {
    image = document.getElementById("captured_image");
    classifier.classify(image, gotResult);
}
function gotResult (error, result){
        if (error) {
            console.log(error);
        } else {
            console.log(result);
            prediction1 = result[0].label
            prediction2 = result[1].label
            document.getElementById("emotion1").innerHTML = prediction1
            document.getElementById("emotion2").innerHTML = prediction2
            speak()
            if (prediction1 == "Sad") {
                document.getElementById("emoji1").innerHTML = "&#128532";
            }
            if (prediction1 == "Happy") {
                document.getElementById("emoji1").innerHTML = "&#128512";
            }
            if (prediction1 == "Angry") {
                document.getElementById("emoji1").innerHTML = "&#128545";
            }
            if (prediction1 == "Crying") {
                document.getElementById("emoji1").innerHTML = "&#128546";
            }
            if (prediction2 == "Sad") {
                document.getElementById("emoji2").innerHTML = "&#128532";
            }
            if (prediction2 == "Happy") {
                document.getElementById("emoji2").innerHTML = "&#128512";
            }
            if (prediction2 == "Angry") {
                document.getElementById("emoji2").innerHTML = "&#128545";
            }
            if (prediction2 == "Crying") {
                document.getElementById("emoji2").innerHTML = "&#128546";
            }
        }
}