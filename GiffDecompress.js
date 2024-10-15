import { Giff } from "./Giff.js";

export class GiffDecompress extends Giff{
    getRLEPixelData(pixelHex){
        let pixelData = Giff.getRawPixelData(pixelHex);
        pixelData = this.removePadding(pixelData);
        let returnPixelData = [];
        for(let i = 0; i < pixelData.length; i += 5){
            for(let j = 0; j < pixelData[i]; j++){
                returnPixelData.push(pixelData[j + 1].toString().splice(1) + pixelData[j + 2].toString().splice(1) + pixelData[j + 3].toString().splice(1));
            }
        }

        console.log(returnPixelData);

        return returnPixelData;
    }

    removePadding(splitData){
        for(let i = splitData.length - 1; i > 0; i--){
            if(new Set(splitData[i]).size === 1){
                splitData.splice(i, 1);
            }
        }

        return splitData
    }
}