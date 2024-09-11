import { saveFormat } from "./createGIFF.js";

const canvasCreation = document.getElementById("createCanvas")
const canvasL1 = document.getElementById("canvasL1");
const contextL1 = canvasL1.getContext("2d");
setBackgroundColour("white");

const previewCanvas = document.getElementById("previewColour");
const contextPreview = previewCanvas.getContext("2d");

const save = document.getElementById("save");
const weightSlider = document.getElementById("weight");
const redSlider = document.getElementById("red");
const greenSlider = document.getElementById("green");
const blueSlider = document.getElementById("blue");

const backgroundColour = document.getElementById("backgroundColour");


document.body.addEventListener("mousemove", ()=>{
    document.getElementById("weightValue").innerText = weightSlider.value + "px";
    document.getElementById("redValue").innerText = redSlider.value;
    document.getElementById("greenValue").innerText = greenSlider.value;
    document.getElementById("blueValue").innerText = blueSlider.value;
    contextPreview.fillStyle = `rgb(${redSlider.value} ${greenSlider.value} ${blueSlider.value})`;
    contextPreview.fillRect(0, 0, previewCanvas.width, previewCanvas.height);
});

backgroundColour.addEventListener("click", ()=>{
    setBackgroundColour(`rgb(${redSlider.value} ${greenSlider.value} ${blueSlider.value})`);
});

save.addEventListener("click", ()=>{
    let imageData = contextL1.getImageData(0, 0, canvasL1.width, canvasL1.height);
    saveFormat(imageData);
});

let pixelPoints = [];
canvasCreation.addEventListener("click", ()=>{ 
    canvasL1.width = document.getElementById("width").value;
    canvasL1.height = document.getElementById("height").value;
    setBackgroundColour("white");
});

let isMouseDown = false;
canvasL1.addEventListener("mousedown", ()=>{
    isMouseDown = true;
    contextL1.strokeStyle = `rgb(${redSlider.value} ${greenSlider.value} ${blueSlider.value})`;
    contextL1.beginPath();
});

document.body.addEventListener("mouseup", ()=>{
    isMouseDown = false;
    pixelPoints = [];
});

canvasL1.addEventListener("mousemove", (MouseEvent)=>{
    let weight = document.getElementById("weight").value;
    contextL1.lineWidth = weight;
    
    let position = canvasL1.getBoundingClientRect();
    let x = MouseEvent.clientX - position.left;
    let y = MouseEvent.clientY - position.top;

    let startOffset = 0;
    if(pixelPoints.length > 6){
        startOffset = pixelPoints.length - 6;
    }

    if(isMouseDown){
        for(let i = startOffset; i < pixelPoints.length; i+=2){
            contextL1.quadraticCurveTo(pixelPoints[i + 2], pixelPoints[i + 3], pixelPoints[i + 4], pixelPoints[i + 5]);
            contextL1.stroke();
        }
    
        pixelPoints.push(x);
        pixelPoints.push(y);
    }

});

function setBackgroundColour(colour){
    contextL1.fillStyle = colour;
    contextL1.fillRect(0, 0, canvasL1.width, canvasL1.height);
}
