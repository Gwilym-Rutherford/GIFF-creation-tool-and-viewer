import { Giff } from "./Giff.js";
import { GiffDecompress } from "./GiffDecompress.js";
import { canvasL1, contextL1 } from "./imageCreation.js";

export class GiffLoad extends Giff{

    load(event){
        let file = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
   
        fileReader.onload = ((event)=>{
            let arrayBuffer = event.target.result;
            let byteData = new Uint8Array(arrayBuffer);
            this.hexString = "";  

            for(let byte of byteData){
                this.hexString += byte.toString(16).padStart(2, "0");
            }

            this.getHeaders(this.hexString, ()=>{
            let width = parseInt(Giff.giffFileStructure.Width.data);
            let height = parseInt(Giff.giffFileStructure.Height.data);

            canvasL1.width = width
            canvasL1.height = height

                switch (parseInt(Giff.giffFileStructure.Compression.data)) {
                    // raw
                    case 1:
                        this.drawToCanvas(Giff.getRawPixelData(this.hexString), width);
                        break;
                    // rle
                    case 2:
                        let decompress = new GiffDecompress()
                        this.drawToCanvas(decompress.getRLEPixelData(this.hexString), width);
                        break;
                }
            });
        });
    }

    drawToCanvas(pixelData, width){
        let rowOffset = 0;
        pixelData.forEach((pixel, index) => {
            contextL1.fillStyle = "#" + pixel; 
            if((index % width) == 0){
                rowOffset ++;
            }
    
            contextL1.fillRect(index % width, rowOffset, 1, 1);
        });
    }

    getHeaders(hexData, callback){
        let keys = Object.keys(Giff.giffFileStructure);
        keys.forEach((value)=>{
            let offset = Giff.giffFileStructure[value].offset * 2;
            let size = Giff.giffFileStructure[value].size * 2;
            Giff.giffFileStructure[value].data = "0x" + hexData.substring(offset, offset + size);
            console.log(value + ": " + Giff.giffFileStructure[value].data);
        });
        callback();
    }
}