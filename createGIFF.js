import { giffFileStructure } from "./giffFileStructure.js";

const FIXED_HEADER_SIZE = 14;
const NUM_OF_PROPERTIES = 6;

export function saveFormat(imageData){
    writeHeaders(imageData);
    let pixelData = writeImageData(imageData);
    let signature = getSignature();
    let headers = getHeaders();
    
    let blob = new Blob([signature, headers, pixelData], { type: "application/octet-stream" });
    downloadFile(URL.createObjectURL(blob));
}

function writeHeaders(imageData){
    giffFileStructure.Signature.data = "GR";
    giffFileStructure.FileSize.data = imageData.data.length + FIXED_HEADER_SIZE;
    giffFileStructure.Compression.data = 1;
    giffFileStructure.Mode.data = 1;
    giffFileStructure.Width.data = imageData.width;
    giffFileStructure.Height.data = imageData.height;
}

function getSignature(){
    let encoder = new TextEncoder();
    return encoder.encode(giffFileStructure.Signature.data);
}

function getHeaders(){
    let headers = [];
    let keys = Object.keys(giffFileStructure);

    for(let i = 1; i < keys.length; i++){
        let data = giffFileStructure[keys[i]].data;
        headers.push(parseInt(data, 10));
    }
    
    let headersByteArray = new ArrayBuffer(headers.length * 4);
    let headersInt = new DataView(headersByteArray);
    
    headers.forEach((value, index)=>{
        headersInt.setUint32(index * 4, value, false)
        console.log(headersInt[index]);
    });
    
    return headersInt;
}

function writeImageData(imageData){
    let pixelData = new ArrayBuffer(imageData.data.length);
    let pixelDataViwer = new Uint8Array(pixelData);
    pixelDataViwer.set(imageData.data);
    return pixelData;
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