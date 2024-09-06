import { saveFormat } from "./createGIFF.js";

let canvasCreation = document.getElementById("createCanvas")
let save = document.getElementById("save");
let canvasL1 = document.getElementById("canvasL1");
let contextL1 = canvasL1.getContext("2d");

let pixelPoints = [];

canvasCreation.addEventListener("click", ()=>{ 
    canvasL1.width = document.getElementById("width").value;
    canvasL1.height = document.getElementById("height").value;
});

save.addEventListener("click", ()=>{
    let imageData = contextL1.getImageData(0, 0, canvasL1.width, canvasL1.height);
    saveFormat(imageData);
});

let isMouseDown = false;
canvasL1.addEventListener("mousedown", ()=>{
    isMouseDown = true;

    let selectedColour = getSelectedRadioButtonValue(document.getElementsByName("colourOption"));
    contextL1.strokeStyle = selectedColour;
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

function getSelectedRadioButtonValue(element){
    for(let i = 0; i < element.length; i++){
        if(element[i].checked){
            return element[i].value;
        }
    }
}
