import { giffFileStructure } from "./giffFileStructure.js";

export function saveFormat(imageData){
    let byteArray = new ArrayBuffer(imageData.data.length);
    let typeArray = new Uint8Array(byteArray);
    writeHeader(typeArray);
    writeImageData(imageData, typeArray);

    let blob = new Blob([byteArray], { type: "application/octet-stream" });
    downloadFile(URL.createObjectURL(blob));
}

function writeHeader(typeArray){

}

function writeImageData(imageData, typeArray){
    typeArray.set(imageData.data)
}

function downloadFile(blobURL){
    let temp = document.createElement("a");
    temp.href = blobURL;
    temp.download = "giffTest.giff";
    document.body.appendChild(temp);
    temp.click();
    URL.revokeObjectURL(blobURL);
    document.body.removeChild(temp);
}