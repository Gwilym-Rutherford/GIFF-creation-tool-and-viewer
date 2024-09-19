export class Giff{
    static giffFileStructure = {
        Signature: {offset: 0x00, size: 2},
        FileSize: {offset: 0x02, size: 4},
        Compression: {offset: 0x06, size: 4},
        Mode: {offset: 0x0a, size: 4},
        Width: {offset: 0x0e, size: 4},
        Height: {offset: 0x12, size: 4},
    };
    static FIXED_HEADER_SIZE = 22;

    writeHeaders(imageData){
        Giff.giffFileStructure.Signature.data = "GR";
        Giff.giffFileStructure.FileSize.data = imageData.data.length + Giff.FIXED_HEADER_SIZE;
        Giff.giffFileStructure.Mode.data = 1;
        Giff.giffFileStructure.Width.data = imageData.width;
        Giff.giffFileStructure.Height.data = imageData.height;
    }
    

    getSignature(){
        let encoder = new TextEncoder();
        return encoder.encode(Giff.giffFileStructure.Signature.data);
    }

    getHeaders(){
        let headers = [];
        let keys = Object.keys(Giff.giffFileStructure);
    
        for(let i = 1; i < keys.length; i++){
            let data = Giff.giffFileStructure[keys[i]].data;
            headers.push(parseInt(data, 10));
        }
        
        let headersByteArray = new ArrayBuffer(headers.length * 4);
        let headersInt = new DataView(headersByteArray);
        
        headers.forEach((value, index)=>{
            headersInt.setUint32(index * 4, value, false);
        });
        
        return headersInt;
    }

}