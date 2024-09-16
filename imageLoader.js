import { canvasL1, contextL1 } from "./imageCreation.js";
import { getHeader, getPixelData } from "./hexParser.js";
import { giffFileStructure } from "./giffFileStructure.js";

let fileInput = document.getElementById("fileInput");


fileInput.addEventListener("change", (event)=>{
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
   
    fileReader.onload = (event)=>{
        let arrayBuffer = event.target.result;
        let byteData = new Uint8Array(arrayBuffer);
        let hexString = "";

        for(let byte of byteData){
            hexString += byte.toString(16).padStart(2, "0");
        }
        
        getHeader(hexString, ()=>{
            let width = parseInt(giffFileStructure.Width.data);
            let height = parseInt(giffFileStructure.Height.data);

            canvasL1.width = width
            canvasL1.height = height

            let rowOffset = 0;
            let pixelData = getPixelData(hexString).match(/.{1,8}/g);
            pixelData.forEach((pixel, index) => {
                contextL1.fillStyle = "#" + pixel; 
                if((index % width) == 0){
                    rowOffset ++;
                }

                contextL1.fillRect(index % width, rowOffset, 1, 1);
            });
        });
    }; 
});


