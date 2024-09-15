import { giffFileStructure } from "./giffFileStructure.js";

const FIXED_HEADER_SIZE = 22;

export function getHeader(hexData, callback){
    let keys = Object.keys(giffFileStructure);
    keys.forEach((value)=>{
        let offset = giffFileStructure[value].offset * 2;
        let size = giffFileStructure[value].size * 2;
        giffFileStructure[value].data = "0x" + hexData.substring(offset, offset + size);
        console.log(value + ": " + giffFileStructure[value].data);
    });
    callback();
}

export function getPixelData(hexData){
    return hexData.substring(FIXED_HEADER_SIZE * 2);
}


export function decodeSignature(hexData){
    let decoder = new TextDecoder();
    return decoder.decode(hexData);
}