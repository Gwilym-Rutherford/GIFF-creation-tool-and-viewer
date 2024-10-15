import { Giff } from "./Giff.js";
import { GiffCompress } from "./GiffCompress.js";

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
                return GiffCompress.storeRLE(imageData);
    
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

    downloadFile(blobURL){
        let temp = document.createElement("a");
        temp.href = blobURL;
        temp.download = "giffTest.giff";
        document.body.appendChild(temp);
        temp.click();
        URL.revokeObjectURL(blobURL);
        document.body.removeChild(temp);
    }
}