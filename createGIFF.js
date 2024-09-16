import { giffFileStructure } from "./giffFileStructure.js";

const FIXED_HEADER_SIZE = 22;

export async function saveFormat(imageData){
    await writeHeaders(imageData);
    let pixelData = await writeImageData(imageData);
    let signature = await getSignature();
    let headers = await getHeaders();
    
    let blob = new Blob([signature, headers, pixelData], { type: "application/octet-stream" });
    downloadFile(URL.createObjectURL(blob));
}

function writeHeaders(imageData){
    giffFileStructure.Signature.data = "GR";
    giffFileStructure.FileSize.data = imageData.data.length + FIXED_HEADER_SIZE;
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
        headersInt.setUint32(index * 4, value, false);
    });
    
    return headersInt;
}

async function writeImageData(imageData){
    let compression = await getCompressionType();
    giffFileStructure.Compression.data = compression.code;
    
    switch (compression.key) {
        case "RLE":
            return storeRLE(imageData);

        case "raw":
            return storeRaw(imageData);
        }    
        
}

function storeRLE(imageData){
    //TODO
}

function storeRaw(imageData){
    let pixelData = new ArrayBuffer(imageData.data.length);
    let pixelDataViewer = new Uint8Array(pixelData);
    pixelDataViewer.set(imageData.data);
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

function getCompressionType(){
    return new Promise((res)=>{
        let keys = document.getElementsByName("compressionType");
        keys.forEach((keys, index)=>{
            if(keys.checked == true){
                res({key: keys.value, code: index + 1});
            }
        });
    });
    
}