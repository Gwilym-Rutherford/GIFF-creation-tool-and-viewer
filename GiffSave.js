import { Giff } from "./Giff.js";

export class GiffSave extends Giff{

    async saveFormat(imageData){
        super.writeHeaders(imageData);
        let pixelData = await this.writeImageData(imageData);
        let signature = super.getSignature();
        let headers = super.getHeaders();
        
        let blob = new Blob([signature, headers, pixelData], { type: "application/octet-stream" });
        this.downloadFile(URL.createObjectURL(blob));
    }

    async writeImageData(imageData){
        let compression = await this.getCompressionType();
        Giff.giffFileStructure.Compression.data = compression.code;
        
        switch (compression.key) {
            case "RLE":
                return this.storeRLE(imageData);
    
            case "raw":
                return this.storeRaw(imageData);
            }    
            
    }


    getCompressionType(){
        return new Promise((res)=>{
            let keys = document.getElementsByName("compressionType");
            keys.forEach((keys, index)=>{
                if(keys.checked == true){
                    res({key: keys.value, code: index + 1});
                }
            });
        });   
    }
    
    storeRaw(imageData){
        let pixelData = new ArrayBuffer(imageData.data.length);
        let pixelDataViewer = new Uint8Array(pixelData);
        pixelDataViewer.set(imageData.data);
        return pixelData;
    }

    storeRLE(imageData){
        let splitIntoRGBA = []
        for (let i = 0; i < imageData.data.length; i+=4 ) {
            splitIntoRGBA.push(imageData.data.slice(i, i+4));
        }
    
        let counter = 0;
        let currColour;
        let RLEArr = [];
        for(let i = 0; i < splitIntoRGBA.length; i++){
            if(counter == 0){
                currColour = splitIntoRGBA[i];
            }
    
            if(this.compareArrays(currColour, splitIntoRGBA[i+1])){
                counter++;
            }else{
                RLEArr.push(counter + 1);
                RLEArr.push(...splitIntoRGBA[i]);
                counter = 0;
            }
        }
        this.addPadding(RLEArr, (4 - (RLEArr.length % 4)));
    
        let pixelData = new ArrayBuffer(RLEArr.length * 4);
        let pixelDataViewer = new Uint32Array(pixelData);
    
        pixelDataViewer.set(RLEArr);
        return pixelData;
    }

    downloadFile(blobURL){
        let temp = document.createElement("a");
        temp.href = blobURL;
        temp.download = "giffTest.giff";
        document.body.appendChild(temp);
        temp.click();
        URL.revokeObjectURL(blobURL);
        document.body.removeChild(temp);
    }

    compareArrays(arr1, arr2){
        if(typeof arr2 == "undefined"){
            return false;
        }
    
        if(arr1.join("").toString() == arr2.join("").toString()){
            return true;
        }
        return false;
    }

    addPadding(arr, n){
        for(let i = 0; i < n; i++){
            arr.push(0);
        }
    }
}