import { Giff } from "./Giff.js";

export class GiffDecompress extends Giff{
    getRLEPixelData(pixelHex){
        let pixelData = Giff.getRawPixelData(pixelHex);
        pixelData = this.removePadding(pixelData);
        let returnPixelData = [];
        for(let i = 0; i < pixelData.length; i += 5){
            let constructedHex = pixelData[i+1].substring(0, 2) + pixelData[i+2].substring(0, 2) + pixelData[i+3].substring(0, 2) + pixelData[i+4].substring(0, 2);
            let length = parseInt(this.convertToLittleEndian(pixelData[i]), 16);
            returnPixelData.push(...Array(length).fill(constructedHex));
        }

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


    convertToLittleEndian(hex){
        return hex.match(/.{1,2}/g).reverse().join("");
    }
}