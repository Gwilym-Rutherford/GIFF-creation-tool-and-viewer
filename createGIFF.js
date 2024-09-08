export function saveFormat(imageData){
    let byteArray = new ArrayBuffer(imageData.data.length);
    let typeArray = new Uint8Array(byteArray);
    typeArray.set(imageData.data);

    let blob = new Blob([byteArray], { type: "application/octet-stream" });
    let blobURL =  URL.createObjectURL(blob);

    let temp = document.createElement("a");
    temp.href = blobURL;
    temp.download = "giffTest.giff";
    document.body.appendChild(temp);
    temp.click();
    URL.revokeObjectURL(blobURL);
    document.body.removeChild(temp);
}