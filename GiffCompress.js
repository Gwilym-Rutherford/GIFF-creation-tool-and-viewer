import { Giff } from "./Giff.js";

export class GiffCompress extends Giff{
    static storeRLE(imageData){

        let splitIntoRGBA = []
        for (let i = 0; i < imageData.data.length; i+=4 ) {
            splitIntoRGBA.push(imageData.data.slice(i, i+4));
        }
    
        let counter = 1;
        let currColour = splitIntoRGBA[0]
        let RLEArr = [];
        for(let i = 0; i < splitIntoRGBA.length; i++){
            if(counter == 1){
                currColour = splitIntoRGBA[i];
            }
        
            if(this.compareArrays(currColour, splitIntoRGBA[i+1])){
                counter++;
            }else{
                RLEArr.push(counter);
                RLEArr.push(...splitIntoRGBA[i]);
                counter = 1;
            }
        }
        this.addPadding(RLEArr, (4 - (RLEArr.length % 4)));
    
        let pixelData = new ArrayBuffer(RLEArr.length * 4);
        let pixelDataViewer = new Uint32Array(pixelData);
        pixelDataViewer.set(RLEArr);


        return pixelData;
    }

    static compareArrays(arr1, arr2){
        if(typeof arr2 == "undefined"){
            return false;
        }
    
        if(arr1.join("").toString() == arr2.join("").toString()){
            return true;
        }
        return false;
    }

    static addPadding(arr, n){
        for(let i = 0; i < n; i++){
            arr.push(0);
        }
    }
}