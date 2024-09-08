export let giffFileStructure = {
    Signature: {offset: 0x00, size: 2},
    FileSize: {offset: 0x02, size: 4},
    Compression: {offset: 0x06, size: 1},
    Mode: {offset: 0x07, size: 1},
    Width: {offset: 0x08, size: 2},
    Height: {offset: 0x0a, size: 2},
    DataOffset: {offset: 0x0c, size: 4}
};