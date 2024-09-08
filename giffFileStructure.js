export let giffFileStructure = {
    Signature: {offset: 0x00, size: 2},
    FileSize: {offset: 0x02, size: 4},
    Compression: {offset: 0x06, size: 1},
    Width: {offset: 0x07, size: 2},
    Height: {offset: 0x09, size: 2},
    DataOffset: {offset: 0x11, size: 4}
};