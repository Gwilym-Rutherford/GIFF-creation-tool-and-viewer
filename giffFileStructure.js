export let giffFileStructure = {
    Signature: {offset: 0x00, size: 2},
    FileSize: {offset: 0x02, size: 4},
    Compression: {offset: 0x06, size: 4},
    Mode: {offset: 0x0a, size: 4},
    Width: {offset: 0x0e, size: 4},
    Height: {offset: 0x12, size: 4},
};